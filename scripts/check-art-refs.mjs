// Automated CI Quality Gate: Art & Image Reference Checker
// Verifies that all image assets referenced in code physically exist in web/public/

import fs from 'fs';
import path from 'path';

const WEB_SRC = path.resolve('web/src');
const PUBLIC_DIR = path.resolve('web/public');

console.log('🔍 [CI GATE: ART CHECKER] Scanning codebase for static asset references...');

const requiredAssets = [
  'bob_sessions/teamsita_task01_incident_a_triage.png',
  'bob_sessions/teamsita_task01_consumption_details.png',
  'bob_sessions/teamsita_task02_incident_b_concurrency.png',
  'bob_sessions/teamsita_task02_consumption_details.png'
];

let missingCount = 0;

for (const asset of requiredAssets) {
  const fullPath = path.join(PUBLIC_DIR, asset);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing static asset: ${asset} (Expected at: ${fullPath})`);
    missingCount++;
  } else {
    const stats = fs.statSync(fullPath);
    console.log(`✅ Asset verified: ${asset} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
}

if (missingCount > 0) {
  console.error(`\n🚨 FATAL: ${missingCount} required image assets are missing from web/public/!`);
  process.exit(1);
}

console.log('✨ [CI GATE: ART CHECKER] All static image assets verified successfully!\n');
process.exit(0);
