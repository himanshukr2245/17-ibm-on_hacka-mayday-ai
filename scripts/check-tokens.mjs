// Automated CI Quality Gate: Design Tokens & Theme Linter
// Verifies that Cyber-Slate theme variables and essential color tokens adhere to the design system

import fs from 'fs';
import path from 'path';

const GLOBALS_CSS = path.resolve('web/src/app/globals.css');

console.log('🎨 [CI GATE: TOKEN CHECKER] Auditing globals.css and design tokens...');

if (!fs.existsSync(GLOBALS_CSS)) {
  console.error(`❌ globals.css not found at ${GLOBALS_CSS}`);
  process.exit(1);
}

const css = fs.readFileSync(GLOBALS_CSS, 'utf8');

const requiredTokens = [
  '--bg-space',
  '--bg-card',
  '--border-dim',
  '--alert-red',
  '--success-green',
  '--ibm-blue',
  '--text-primary'
];

let missing = 0;
for (const token of requiredTokens) {
  if (!css.includes(token)) {
    console.error(`❌ Missing CSS token definition: ${token}`);
    missing++;
  } else {
    console.log(`✅ CSS token verified: ${token}`);
  }
}

if (missing > 0) {
  console.error(`🚨 FATAL: ${missing} design tokens missing!`);
  process.exit(1);
}

console.log('✨ [CI GATE: TOKEN CHECKER] Cyber-Slate design token architecture verified!\n');
process.exit(0);
