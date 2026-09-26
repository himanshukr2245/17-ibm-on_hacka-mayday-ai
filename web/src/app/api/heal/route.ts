import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export async function POST(req: Request) {
  try {
    const { action } = await req.json(); // 'break' or 'fix'
    const adapterPath = path.resolve(process.cwd(), '../targets/shopfront/src/payment/adapter.ts');
    const shopfrontDir = path.resolve(process.cwd(), '../targets/shopfront');

    let content = fs.readFileSync(adapterPath, 'utf8');

    if (action === 'break') {
      // Re-plant the bug
      content = content.replace(
        /const fee = gatewayRaw\.data\.feeCents \/ 100;/g,
        'const fee = (gatewayRaw as any).fee.amount;'
      );
      fs.writeFileSync(adapterPath, content, 'utf8');
    } else {
      // Apply the fix
      content = content.replace(
        /const fee = \(gatewayRaw as any\)\.fee\.amount;/g,
        'const fee = gatewayRaw.data.feeCents / 100;'
      );
      fs.writeFileSync(adapterPath, content, 'utf8');
    }

    // Execute vitest live to verify
    return new Promise<NextResponse>((resolve) => {
      exec('npx vitest run test/checkout.test.ts', { cwd: shopfrontDir }, (error, stdout, stderr) => {
        const passed = !error;
        resolve(
          NextResponse.json({
            success: true,
            action,
            testsPassed: passed,
            output: stdout || stderr,
            timestamp: new Date().toISOString()
          })
        );
      });
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
