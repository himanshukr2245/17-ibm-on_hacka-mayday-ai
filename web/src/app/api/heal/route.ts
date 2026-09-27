import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// Required for Next.js output: 'export' static build compatibility
export const dynamic = 'force-static';

const ADAPTER_PATH = path.resolve(process.cwd(), '../targets/shopfront/src/payment/adapter.ts');
const INVENTORY_PATH = path.resolve(process.cwd(), '../targets/shopfront/src/inventory/service.ts');
const SHOPFRONT_DIR = path.resolve(process.cwd(), '../targets/shopfront');

const DEMO_KEY = process.env.DEMO_KEY || '';

const VALID_TARGETS = ['incident-a', 'incident-b', 'all', 'INC-2041', 'INC-2042'];
const VALID_ACTIONS = ['break', 'fix', 'status', 'reset-all'];

// In-memory token bucket: 20 req/min per cold-start instance (local dev only)
const requestBucket = { count: 0, resetAt: Date.now() + 60_000 };
function checkRateLimit(): boolean {
  if (Date.now() > requestBucket.resetAt) {
    requestBucket.count = 0;
    requestBucket.resetAt = Date.now() + 60_000;
  }
  return ++requestBucket.count <= 20;
}

function checkAuth(req: Request): boolean {
  if (!DEMO_KEY) return true; // local dev: open when key not set
  return req.headers.get('x-demo-key') === DEMO_KEY;
}

// Check disk state for both incidents
function checkStatus() {
  if (!fs.existsSync || !fs.existsSync(SHOPFRONT_DIR)) {
    return {
      mode: 'CLOUDFLARE_EDGE_SIMULATION',
      incidentA: {
        status: 'HEALTHY_PATCHED',
        file: 'targets/shopfront/src/payment/adapter.ts',
        isFixed: true,
      },
      incidentB: {
        status: 'HEALTHY_PATCHED',
        file: 'targets/shopfront/src/inventory/service.ts',
        isFixed: true,
      },
    };
  }

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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  if (!checkRateLimit()) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 });
  }
  try {
    const { action, target = 'incident-a' } = await req.json(); // action: 'break' | 'fix' | 'status' | 'reset-all', target: 'incident-a' | 'incident-b' | 'all'

    // Whitelist validation
    if (!VALID_ACTIONS.includes(action) || !VALID_TARGETS.includes(target)) {
      return NextResponse.json({ success: false, error: 'Invalid action or target' }, { status: 400 });
    }

    // Cloudflare Edge / Serverless Fallback
    if (!fs.existsSync || !fs.existsSync(SHOPFRONT_DIR)) {
      if (action === 'status') {
        return NextResponse.json({ success: true, ...checkStatus() });
      }
      const isFixed = action === 'fix' || action === 'reset-all';
      const targetName = target === 'incident-b' || target === 'INC-2042' ? 'incident-b' : 'incident-a';
      const output = isFixed
        ? targetName === 'incident-b'
          ? `✓ test/inventory.test.ts (1 test) 315ms\n✓ should prevent overselling and negative stock under high concurrency\n(10 succeeded, 10 rejected, finalStock = 0)\n\nTest Files  1 passed (1)\nTests  1 passed (1)\nDuration  892ms`
          : `✓ test/checkout.test.ts (1 test) 38ms\n✓ should successfully complete checkout with correct 2.9% fee calculation\n\nTest Files  1 passed (1)\nTests  1 passed (1)\nDuration  312ms`
        : targetName === 'incident-b'
          ? `FAIL  test/inventory.test.ts [ test/inventory.test.ts ]\n× should prevent overselling and negative stock under high concurrency\n\nAssertionError: expected 20 to be at most 10\n  Expected: ≤ 10\n  Received: 20\n  [Inventory dipped below 0: finalStock = -10]\n\nTest Files  1 failed (1)\nTests  1 failed (1)`
          : `FAIL  test/checkout.test.ts [ test/checkout.test.ts ]\n× should successfully complete checkout with correct 2.9% fee calculation\n\nTypeError: Cannot read properties of undefined (reading 'amount')\n ❯ rawPaylinkGatewayCall adapter.ts:31:38\n ❯ processCheckout checkout.ts:18:20\n\nTest Files  1 failed (1)\nTests  1 failed (1)`;

      const incidentAFixed = targetName === 'incident-a' ? isFixed : true;
      const incidentBFixed = targetName === 'incident-b' ? isFixed : true;

      return NextResponse.json({
        success: true,
        mode: 'CLOUDFLARE_EDGE_SIMULATION',
        target,
        action,
        testsPassed: isFixed,
        output,
        currentStatus: {
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
        },
        timestamp: new Date().toISOString()
      });
    }

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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
