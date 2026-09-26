import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const ADAPTER_PATH = path.resolve(process.cwd(), '../targets/shopfront/src/payment/adapter.ts');
const INVENTORY_PATH = path.resolve(process.cwd(), '../targets/shopfront/src/inventory/service.ts');
const SHOPFRONT_DIR = path.resolve(process.cwd(), '../targets/shopfront');

const DEMO_KEY = process.env.DEMO_KEY || '';

function checkAuth(req: Request): boolean {
  if (!DEMO_KEY) return true; // local dev: open when key not set
  return req.headers.get('x-demo-key') === DEMO_KEY;
}

// Check disk state for both incidents
function checkStatus() {
  const adapterContent = fs.existsSync(ADAPTER_PATH) ? fs.readFileSync(ADAPTER_PATH, 'utf8') : '';
  const inventoryContent = fs.existsSync(INVENTORY_PATH) ? fs.readFileSync(INVENTORY_PATH, 'utf8') : '';

  const incidentAFixed = adapterContent.includes('gatewayRaw.data.feeCents / 100');
  const incidentBFixed = inventoryContent.includes('const skuQueue = new Map<string, Promise<unknown>>();');

  return {
    incidentA: {
      status: incidentAFixed ? 'HEALTHY_PATCHED' : 'SEV1_BROKEN',
      file: 'targets/shopfront/src/payment/adapter.ts',
      isFixed: incidentAFixed
    },
    incidentB: {
      status: incidentBFixed ? 'HEALTHY_PATCHED' : 'SEV1_BROKEN',
      file: 'targets/shopfront/src/inventory/service.ts',
      isFixed: incidentBFixed
    }
  };
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const status = checkStatus();
    return NextResponse.json({ success: true, ...status });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { action, target = 'incident-a' } = await req.json(); // action: 'break' | 'fix' | 'status' | 'reset-all', target: 'incident-a' | 'incident-b' | 'all'

    // Reset ALL targets to healthy patched state
    if (target === 'all' || action === 'reset-all') {
      let adapterContent = fs.existsSync(ADAPTER_PATH) ? fs.readFileSync(ADAPTER_PATH, 'utf8') : '';
      adapterContent = adapterContent.replace(
        /const fee = \(gatewayRaw as any\)\.fee\.amount;/g,
        'const fee = gatewayRaw.data.feeCents / 100;'
      );
      if (fs.existsSync(ADAPTER_PATH)) fs.writeFileSync(ADAPTER_PATH, adapterContent, 'utf8');

      let inventoryContent = fs.existsSync(INVENTORY_PATH) ? fs.readFileSync(INVENTORY_PATH, 'utf8') : '';
      if (!inventoryContent.includes('const skuQueue = new Map<string, Promise<unknown>>()')) {
        inventoryContent = inventoryContent.replace('// skuQueue removed for chaos reproduction', 'const skuQueue = new Map<string, Promise<unknown>>();');
      }
      if (fs.existsSync(INVENTORY_PATH)) fs.writeFileSync(INVENTORY_PATH, inventoryContent, 'utf8');

      const finalStatus = checkStatus();
      return NextResponse.json({ success: true, message: 'All targets restored to healthy state', ...finalStatus });
    }

    if (action === 'status') {
      return NextResponse.json({ success: true, ...checkStatus() });
    }

    let testFile = 'test/checkout.test.ts';

    if (target === 'incident-a' || target === 'INC-2041') {
      testFile = 'test/checkout.test.ts';
      let content = fs.readFileSync(ADAPTER_PATH, 'utf8');

      if (action === 'break') {
        // Re-plant the contract drift bug
        content = content.replace(
          /const fee = gatewayRaw\.data\.feeCents \/ 100;/g,
          'const fee = (gatewayRaw as any).fee.amount;'
        );
        fs.writeFileSync(ADAPTER_PATH, content, 'utf8');
      } else {
        // Apply the IBM Bob 2.0 fix
        content = content.replace(
          /const fee = \(gatewayRaw as any\)\.fee\.amount;/g,
          'const fee = gatewayRaw.data.feeCents / 100;'
        );
        fs.writeFileSync(ADAPTER_PATH, content, 'utf8');
      }
    } else if (target === 'incident-b' || target === 'INC-2042') {
      testFile = 'test/inventory.test.ts';
      let content = fs.readFileSync(INVENTORY_PATH, 'utf8');

      if (action === 'break') {
        // Break by removing per-SKU promise queue and replacing with vulnerable check-then-act
        const vulnerableCode = `export async function reserveStock(
  sku: string,
  qty: number
): Promise<{ success: boolean; remaining: number }> {
  const currentStock = inventoryDb[sku] ?? 0;
  // Simulated async database / remote storage latency gap (10ms)
  await new Promise((resolve) => setTimeout(resolve, 10));
  if (currentStock < qty) {
    return { success: false, remaining: currentStock };
  }
  inventoryDb[sku] = currentStock - qty;
  return { success: true, remaining: inventoryDb[sku] };
}`;
        // If skuQueue exists, replace the whole reserveStock
        if (content.includes('const skuQueue = new Map<string, Promise<unknown>>();')) {
          content = content.replace('const skuQueue = new Map<string, Promise<unknown>>();', '// skuQueue removed for chaos reproduction');
          const regex = /export async function reserveStock[\s\S]*?return next;\s*\}/m;
          content = content.replace(regex, vulnerableCode);
          fs.writeFileSync(INVENTORY_PATH, content, 'utf8');
        }
      } else {
        // Apply the IBM Bob 2.0 mutex fix
        const fixedQueueDeclaration = 'const skuQueue = new Map<string, Promise<unknown>>();';
        const fixedFunction = `export async function reserveStock(
  sku: string,
  qty: number
): Promise<{ success: boolean; remaining: number }> {
  // Grab the current tail (or a resolved promise if the queue is empty)
  const tail = skuQueue.get(sku) ?? Promise.resolve();

  // Build the next task: wait for the previous one, then run our critical section
  const next = tail.then(async () => {
    // 1. Read stock – now guaranteed to see all previous writes for this SKU
    const currentStock = inventoryDb[sku] ?? 0;

    // Simulated async database / remote storage latency gap (10ms)
    await new Promise((resolve) => setTimeout(resolve, 10));

    // 2. Validate availability
    if (currentStock < qty) {
      return { success: false, remaining: currentStock };
    }

    // 3. Decrement stock – no concurrent request can interleave here
    inventoryDb[sku] = currentStock - qty;
    return { success: true, remaining: inventoryDb[sku] };
  });

  // Advance the tail; swallow errors so a failed reservation never stalls the queue
  skuQueue.set(sku, next.catch(() => {}));

  return next;
}`;
        if (!content.includes('const skuQueue = new Map<string, Promise<unknown>>();')) {
          content = content.replace('// skuQueue removed for chaos reproduction', fixedQueueDeclaration);
        }
        const regex = /export async function reserveStock[\s\S]*?return \{ success: true, remaining: inventoryDb\[sku\] \};\s*\}/m;
        content = content.replace(regex, fixedFunction);
        fs.writeFileSync(INVENTORY_PATH, content, 'utf8');
      }
    }

    // Run vitest against the specific test file
    return new Promise<NextResponse>((resolve) => {
      exec(`npx vitest run ${testFile}`, { cwd: SHOPFRONT_DIR }, (error, stdout, stderr) => {
        const passed = !error;
        const currentStatus = checkStatus();
        resolve(
          NextResponse.json({
            success: true,
            target,
            action,
            testsPassed: passed,
            output: stdout || stderr || (error ? error.message : 'No output'),
            currentStatus,
            timestamp: new Date().toISOString()
          })
        );
      });
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
