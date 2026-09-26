// Automated CI Quality Gate: Target Microservices Invariant Linter
// Executes Vitest unit tests in targets/shopfront and confirms 100% pass

import { execSync } from 'child_process';
import path from 'path';

const SHOPFRONT_DIR = path.resolve('targets/shopfront');

console.log('🧪 [CI GATE: TARGETS CHECKER] Executing Vitest invariant suite in targets/shopfront...');

try {
  const output = execSync('npx vitest run', {
    cwd: SHOPFRONT_DIR,
    encoding: 'utf8',
    stdio: 'pipe'
  });

  console.log(output);

  if (output.includes('failed') || output.includes('FAIL')) {
    console.error('❌ Vitest suite reported test failures!');
    process.exit(1);
  }

  console.log('✨ [CI GATE: TARGETS CHECKER] All target microservice invariant tests passed 100%!\n');
  process.exit(0);
} catch (error) {
  console.error('🚨 FATAL: Vitest execution failed:');
  console.error(error.stdout || error.message);
  process.exit(1);
}
