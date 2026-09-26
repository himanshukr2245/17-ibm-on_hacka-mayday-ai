import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST() {
  const startTime = Date.now();
  const shopfrontDir = path.resolve(process.cwd(), '../targets/shopfront');

  return new Promise<NextResponse>((resolve) => {
    // Run real vitest against targets/shopfront
    exec('npx vitest run', { cwd: shopfrontDir }, (error, stdout, stderr) => {
      const durationMs = Date.now() - startTime;
      const passed = !error;
      const output = stdout || stderr || (error ? error.message : 'No output');

      // Parse test counts from Vitest output
      const testsMatch = output.match(/Tests\s+(\d+)\s+passed/);
      const testCount = testsMatch ? parseInt(testsMatch[1], 10) : (passed ? 2 : 0);

      resolve(
        NextResponse.json({
          success: passed,
          durationMs,
          output,
          testsPassed: testCount,
          timestamp: new Date().toISOString()
        })
      );
    });
  });
}
