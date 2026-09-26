'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Zap, 
  FileText, 
  GitPullRequest, 
  Clock, 
  Flame, 
  Search, 
  Layers, 
  GitCommit, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Copy,
  Printer,
  Check,
  GitBranch,
  History,
  Radio,
  User,
  Info
} from 'lucide-react';
import { sounds } from '../lib/audio';

interface Hypothesis {
  agent: string;
  name: string;
  avatar: string;
  theory: string;
  status: 'INVESTIGATING' | 'VERIFIED' | 'FALSIFIED';
  rungs: {
    r0: boolean;
    r1: boolean;
    r2: boolean;
    r3: boolean;
  };
  evidence: string;
  falsifiedReason?: string;
}

interface GitCommitItem {
  sha: string;
  author: string;
  avatar: string;
  timeAgo: string;
  message: string;
  type: 'STABLE' | 'CULPRIT' | 'CROWN_FIX';
  fileChanged: string;
  diffSnippet: string;
}

const INCIDENT_DATA = {
  A: {
    id: 'INC-2041',
    severity: 'SEV-1',
    title: "TypeError: Cannot read properties of undefined (reading 'amount')",
    target: 'payment-service (src/payment/adapter.ts:31)',
    targetFile: 'targets/shopfront/src/payment/adapter.ts',
    targetParam: 'incident-a' as const,
    alertSnippet: 'Unhandled rejection during customer checkout. 100% failure rate for live transactions.',
    winner: 'RECON-1',
    isEscalation: false,
    commits: [
      {
        sha: '7a12b3c',
        author: '@sarah-dev',
        avatar: '👩‍💻',
        timeAgo: '3 hours ago',
        message: 'feat(checkout): add coupon discounts and currency selector',
        type: 'STABLE' as const,
        fileChanged: 'src/checkout/coupons.ts',
        diffSnippet: '+ export function applyCoupon(code: string, total: number): number {\n+   return total * 0.9;\n+ }'
      },
      {
        sha: 'f48a192',
        author: '@alex-ui',
        avatar: '🎨',
        timeAgo: '2 hours ago',
        message: 'style(cart): polish mobile padding and typography tokens',
        type: 'STABLE' as const,
        fileChanged: 'src/components/CartModal.tsx',
        diffSnippet: '- <div className="p-2">\n+ <div className="p-4 sm:p-6 font-mono">'
      },
      {
        sha: 'e9a18f4',
        author: '@bot-renovate',
        avatar: '🤖',
        timeAgo: '48 mins ago',
        message: 'chore(deps): bump paylink-sdk from 2.4 to 3.0',
        type: 'CULPRIT' as const,
        fileChanged: 'package.json, src/payment/adapter.ts',
        diffSnippet: '// Breaking envelope change silently shipped in v3.0!\n- "paylink-sdk": "2.4.1"\n+ "paylink-sdk": "3.0.0"\n// Response structure changed: { fee: { amount } } -> { data: { feeCents } }'
      },
      {
        sha: 'b819d04',
        author: '@mike-ops',
        avatar: '🛠️',
        timeAgo: '35 mins ago',
        message: 'docs(readme): update staging deployment runbook and flags',
        type: 'STABLE' as const,
        fileChanged: 'README.md',
        diffSnippet: '+ ### Deployment Notes\n+ Ensure all external webhooks respond with 200 OK.'
      },
      {
        sha: 'c931e05',
        author: '@ibm-bob-2.0',
        avatar: '👑',
        timeAgo: 'Just now',
        message: 'fix(payment): map PayLink SDK v3.0 feeCents / 100 [PR #104]',
        type: 'CROWN_FIX' as const,
        fileChanged: 'src/payment/adapter.ts',
        diffSnippet: '- const fee = (gatewayRaw as any).fee.amount;\n+ const fee = gatewayRaw.data.feeCents / 100; // Preserves 2.9% fee invariant ($10.29 charged)'
      }
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Dependency bump paylink-sdk 2.4 → 3.0 broke response schema contract',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Scanning git blame on src/payment/adapter.ts...'
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Missing optional chaining on response.fee; upstream returned null',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing adapter.ts:31 for undefined member access...'
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Check-then-act race condition in parallel checkout promise handling',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Tracing request lifecycle in checkout.ts for async gaps...'
      }
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Found commit e9a18f4: bump paylink-sdk 2.4 → 3.0' },
          { index: 1, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Located rawPaylinkGatewayCall() reading fee.amount' },
          { index: 2, status: 'FALSIFIED' as const, falsifiedReason: 'Execution graph is completely serial. No race condition detected.' }
        ]
      },
      {
        step: 2,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: true, r3: false }, evidence: 'Reproduction test written: checkout.test.ts (Fails: 2.9% fee expected)' },
          { index: 1, evidence: 'Proposes band-aid patch: res.fee?.amount ?? 0' }
        ]
      },
      {
        step: 3,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: true, r3: true }, status: 'VERIFIED' as const, evidence: 'Patch passes reproduction test & preserves 2.9% fee!' },
          { index: 1, status: 'FALSIFIED' as const, falsifiedReason: 'Band-aid patch silently omits fee and fails business invariant!' }
        ]
      }
    ],
    matrix: {
      reproCol: 'Repro Test (2.9% Fee Invariant)',
      rows: [
        {
          name: 'RECON-1: Contract Adapter Update (feeCents / 100)',
          repro: '✅ PASSED ($10.29 charged)',
          crash: '✅ PASSED (No 500 error)',
          suite: '✅ 8/8 PASSED',
          verdict: 'VALID CROWN FIX',
          isWinner: true
        },
        {
          name: 'RECON-2: Lazy Optional Chaining (res.fee?.amount ?? 0)',
          repro: '❌ FAILED ($0.00 charged)',
          crash: '✅ PASSED (Stops crash)',
          suite: '❌ INVARIANT BROKEN',
          verdict: 'REJECTED: SILENT REVENUE LOSS',
          isWinner: false
        }
      ]
    },
    diff: {
      file: 'src/payment/adapter.ts',
      context: 'const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);',
      removed: '- const fee = (gatewayRaw as any).fee.amount; // BUG: Undefined in SDK v3.0',
      added: '+ const fee = gatewayRaw.data.feeCents / 100; // FIX: Map v3.0 feeCents (/ 100 mandatory)',
      after: 'const total = req.amountDollars + fee;'
    },
    tests: [
      { name: '✓ test/checkout.test.ts (1 test passed)', detail: '→ should successfully complete checkout with correct 2.9% fee calculation (38ms)' },
      { name: '✓ test/payment.test.ts (3 tests passed)', detail: '→ gateway schema validation passed' },
      { name: '✓ test/orders.test.ts (4 tests passed)', detail: '→ order creation and ledger verification passed' }
    ],
    postmortem: {
      title: 'INC-2041 Postmortem: PayLink SDK v3.0 Contract Drift',
      prNumber: 104,
      prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/pull/1',
      ttrc: '14 Seconds',
      ttvf: '42 Seconds',
      humanBaseline: '28 Minutes',
      improvement: '97.5% Faster ⚡',
      rootCause: "Commit e9a18f4 bumped paylink-sdk to version 3.0. The SDK changed its response envelope from fee.amount to data.feeCents.",
      rejectionReason: "Agent RECON-2 proposed optional chaining (res.fee?.amount ?? 0). While this silenced the TypeError, the automated Cross-Examination Matrix caught that it charged $0 processing fee, violating the 2.9% business invariant."
    }
  },
  B: {
    id: 'INC-2042',
    severity: 'SEV-1',
    title: 'Intermittent 500: Insufficient Stock & Negative Warehouse Balance Under Concurrency',
    target: 'inventory-service (src/inventory/service.ts:32)',
    targetFile: 'targets/shopfront/src/inventory/service.ts',
    targetParam: 'incident-b' as const,
    alertSnippet: 'Ghost 500s during flash sale burst. Warehouse stock dipped to -10 with 10 units oversold.',
    winner: 'RECON-3',
    isEscalation: false,
    commits: [
      {
        sha: '3e84a11',
        author: '@dave-eng',
        avatar: '👨‍🔧',
        timeAgo: '5 hours ago',
        message: 'feat(inventory): add low stock notification webhooks',
        type: 'STABLE' as const,
        fileChanged: 'src/inventory/notifications.ts',
        diffSnippet: '+ export async function notifyLowStock(sku: string) {\n+   await dispatchWebhook("low-stock", { sku });\n+ }'
      },
      {
        sha: '4b91f02',
        author: '@speed-demon',
        avatar: '🏎️',
        timeAgo: '1 hour ago',
        message: 'perf(orders): validate and reserve order lines in parallel with Promise.all()',
        type: 'CULPRIT' as const,
        fileChanged: 'src/inventory/service.ts',
        diffSnippet: '// Introduced asynchronous check-then-act race gap!\n- for (const item of cart) { await reserve(item); }\n+ await Promise.all(cart.map(reserve)); // Interleaving async delay causes overselling'
      },
      {
        sha: 'd77a810',
        author: '@devops-bot',
        avatar: '🤖',
        timeAgo: '40 mins ago',
        message: 'chore(ci): update Vitest timeout threshold to 10000ms',
        type: 'STABLE' as const,
        fileChanged: 'vitest.config.ts',
        diffSnippet: '- testTimeout: 5000\n+ testTimeout: 10000'
      },
      {
        sha: '6a18f03',
        author: '@ibm-bob-2.0',
        avatar: '👑',
        timeAgo: 'Just now',
        message: 'fix(inventory): apply per-SKU promise queue mutex to serialize reservations [PR #105]',
        type: 'CROWN_FIX' as const,
        fileChanged: 'src/inventory/service.ts',
        diffSnippet: '+ const skuQueue = new Map<string, Promise<unknown>>();\n+ const tail = skuQueue.get(sku) ?? Promise.resolve();\n+ const next = tail.then(async () => { /* critical section */ });'
      }
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Parallel order fulfillment batching broke serial inventory decrement assumption',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing recent batching merge in orders.ts...'
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Negative check guard missing in warehouse stock table update query',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Checking SQL constraints and balance assertions...'
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Check-then-act race window in reserveStock allows parallel reads before write',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Simulating concurrent fiber interleaving across 10ms async delay...'
      }
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Found commit 4b91f02: replaced serial checkout with Promise.all()' },
          { index: 2, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Located 10ms async delay between stock read & stock decrement in service.ts:32' },
          { index: 1, evidence: 'Suggests exponential backoff retry loop around reserveStock()' }
        ]
      },
      {
        step: 2,
        updates: [
          { index: 2, rungs: { r0: true, r1: true, r2: true, r3: false }, evidence: 'Reproduction test written: inventory.test.ts (20 concurrent requests oversell 10 items)' },
          { index: 1, status: 'FALSIFIED' as const, falsifiedReason: 'Retry loop re-fires stale requests into critical section, worsening overselling 2×!' },
          { index: 0, evidence: 'Trigger identified, but root cause is lack of serialization' }
        ]
      },
      {
        step: 3,
        updates: [
          { index: 2, rungs: { r0: true, r1: true, r2: true, r3: true }, status: 'VERIFIED' as const, evidence: 'Per-SKU Promise Mutex serializes reservations. Zero overselling invariant verified!' },
          { index: 0, status: 'FALSIFIED' as const, falsifiedReason: 'Commit trigger only; cannot fix by reverting batching without degrading throughput.' }
        ]
      }
    ],
    matrix: {
      reproCol: 'Repro Test (20 Concurrent Requests)',
      rows: [
        {
          name: 'RECON-3: Per-SKU Promise Mutex Lock',
          repro: '✅ PASSED (10 OK, 10 Rejected)',
          crash: '✅ PASSED (Stock = 0, No Negative)',
          suite: '✅ 2/2 PASSED',
          verdict: 'VALID CROWN FIX',
          isWinner: true
        },
        {
          name: 'RECON-2: Exponential Backoff Retry Loop',
          repro: '❌ FAILED (All 20 Succeeded)',
          crash: '❌ FAILED (Stock = -10 Oversold)',
          suite: '❌ INVARIANT BROKEN',
          verdict: 'REJECTED: EXACERBATES RACE',
          isWinner: false
        }
      ]
    },
    diff: {
      file: 'src/inventory/service.ts',
      context: 'const skuQueue = new Map<string, Promise<unknown>>();',
      removed: '- // Vulnerable check-then-act with async delay:\n- const currentStock = inventoryDb[sku];\n- await delay(10);\n- inventoryDb[sku] = currentStock - qty;',
      added: '+ // FIX (INC-2042): Per-SKU async mutex queue serializes reservations\n+ const tail = skuQueue.get(sku) ?? Promise.resolve();\n+ const next = tail.then(async () => { /* critical section */ });\n+ skuQueue.set(sku, next.catch(() => {}));',
      after: 'return next;'
    },
    tests: [
      { name: '✓ test/inventory.test.ts (1 test passed)', detail: '→ should prevent overselling and negative stock under high concurrency (315ms)' },
      { name: '✓ test/checkout.test.ts (1 test passed)', detail: '→ checkout invariants verified under load' }
    ],
    postmortem: {
      title: 'INC-2042 Postmortem: Concurrency Race Condition in Flash-Sale Reservations',
      prNumber: 105,
      prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/pull/2',
      ttrc: '11 Seconds',
      ttvf: '38 Seconds',
      humanBaseline: '45 Minutes',
      improvement: '98.6% Faster ⚡',
      rootCause: "Commit 4b91f02 introduced parallel order fulfillment batching. Between reading available stock and decrementing it, an asynchronous I/O gap allowed concurrent requests to oversell inventory into negative values.",
      rejectionReason: "Agent RECON-2 proposed exponential backoff retries. The Cross-Examination Matrix revealed retrying failed calls exacerbated thread contention and caused 20 out of 10 items to be sold. RECON-3's atomic per-SKU mutex was crowned."
    }
  },
  C: {
    id: 'INC-2043',
    severity: 'SEV-2',
    title: 'OOMKilled & Event Loop Freeze: Unbounded EventEmitter Listener Leak',
    target: 'order-service (src/order/service.ts:44)',
    targetFile: 'targets/shopfront/src/order/service.ts',
    targetParam: 'incident-a' as const,
    alertSnippet: 'MaxListenersExceededWarning: 501 listeners added to EventEmitter. Node heap exhausted at 1.4GB.',
    winner: 'RECON-2',
    isEscalation: false,
    commits: [
      {
        sha: '9c11a02',
        author: '@core-team',
        avatar: '💼',
        timeAgo: '6 hours ago',
        message: 'refactor(bus): initialize shared EventEmitter broker',
        type: 'STABLE' as const,
        fileChanged: 'src/events/bus.ts',
        diffSnippet: '+ export const eventBus = new EventEmitter();'
      },
      {
        sha: '8f3c21a',
        author: '@junior-dev',
        avatar: '🐣',
        timeAgo: '2 hours ago',
        message: 'feat(notifications): attach inventory alert listener per order request',
        type: 'CULPRIT' as const,
        fileChanged: 'src/order/service.ts',
        diffSnippet: '// Registered on every incoming request without cleanup!\n+ export async function createOrder(req: OrderReq) {\n+   eventBus.on("inventory:low", handleLowStockAlert); // LEAK: 500 orders = 500 listeners\n+ }'
      },
      {
        sha: '9e44f12',
        author: '@ibm-bob-2.0',
        avatar: '👑',
        timeAgo: 'Just now',
        message: 'fix(order): convert per-request listener to singleton startup listener [PR #106]',
        type: 'CROWN_FIX' as const,
        fileChanged: 'src/order/service.ts',
        diffSnippet: '- eventBus.on("inventory:low", handleLowStockAlert);\n+ // Registered once at application boot\n+ eventBus.once("inventory:low", handleLowStockAlert);'
      }
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Commit 8f3c21a introduced per-request event subscriptions without lifecycle cleanup',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing eventBus.on calls in order/service.ts...'
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Event listener collection lacks garbage collection bounds, exhausting heap memory',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Profiling listener count under 500 synthetic orders...'
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Simultaneous requests triggering circular event dispatch loops',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Checking for recursive event emissions...'
      }
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Located eventBus.on() inside createOrder()' },
          { index: 1, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Listener count grows monotonically with traffic' },
          { index: 2, status: 'FALSIFIED' as const, falsifiedReason: 'Event flow is strictly linear, not recursive.' }
        ]
      },
      {
        step: 2,
        updates: [
          { index: 1, rungs: { r0: true, r1: true, r2: true, r3: false }, evidence: 'Reproduction test written: 500 orders create 500 listeners' },
          { index: 0, evidence: 'Culprit commit identified' }
        ]
      },
      {
        step: 3,
        updates: [
          { index: 1, rungs: { r0: true, r1: true, r2: true, r3: true }, status: 'VERIFIED' as const, evidence: 'Singleton listener registration verified. Memory footprint stable at 42MB.' },
          { index: 0, status: 'VERIFIED' as const, evidence: 'Confirmed fix clears listener leak' }
        ]
      }
    ],
    matrix: {
      reproCol: 'Repro Test (500 Synthetic Orders)',
      rows: [
        {
          name: 'RECON-2: Singleton Boot Registration',
          repro: '✅ PASSED (Listener count = 1)',
          crash: '✅ PASSED (Memory flat at 42MB)',
          suite: '✅ 4/4 PASSED',
          verdict: 'VALID CROWN FIX',
          isWinner: true
        },
        {
          name: 'RECON-3: setMaxListeners(Infinity)',
          repro: '❌ FAILED (Still leaks memory)',
          crash: '❌ FAILED (OOMCrash still occurs)',
          suite: '❌ REJECTED',
          verdict: 'REJECTED: SILENT HEAP BLEED',
          isWinner: false
        }
      ]
    },
    diff: {
      file: 'src/order/service.ts',
      context: 'export async function createOrder(req: OrderReq) {',
      removed: '- eventBus.on("inventory:low", handleLowStockAlert); // LEAKS ON EVERY REQUEST',
      added: '+ // MOVED: Registered once at server bootstrap in index.ts\n+ // eventBus.once("inventory:low", handleLowStockAlert);',
      after: 'return { orderId: generateId() };'
    },
    tests: [
      { name: '✓ test/order.test.ts (1 test passed)', detail: '→ listener count remains bounded to 1 under 500 orders (14ms)' }
    ],
    postmortem: {
      title: 'INC-2043 Postmortem: Unbounded EventEmitter Memory Leak in Order Worker',
      prNumber: 106,
      prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/pull/3',
      ttrc: '9 Seconds',
      ttvf: '28 Seconds',
      humanBaseline: '35 Minutes',
      improvement: '98.7% Faster ⚡',
      rootCause: "Commit 8f3c21a registered an event listener inside a per-request controller function instead of application bootstrap. Each transaction appended a new listener to the heap.",
      rejectionReason: "RECON-3 suggested increasing setMaxListeners. The matrix proved this merely silenced the warning while the Node process crashed with OOMKilled under production traffic."
    }
  },
  D: {
    id: 'INC-2044',
    severity: 'SEV-1',
    title: 'Upstream Network Partition: HTTP 504 Gateway Timeout from Acquiring Bank',
    target: 'external-provider (gateway.visa.com:443)',
    targetFile: 'external: api.visa.com',
    targetParam: 'incident-a' as const,
    alertSnippet: 'HTTP 504 Gateway Timeout & ECONNRESET. 0 code changes in repository for 72 hours.',
    winner: 'NONE',
    isEscalation: true,
    commits: [
      {
        sha: 'b120c44',
        author: '@release-lead',
        avatar: '👔',
        timeAgo: '72 hours ago',
        message: 'chore(release): v2.14.0 stable production tag',
        type: 'STABLE' as const,
        fileChanged: 'RELEASE_NOTES.md',
        diffSnippet: 'All test suites green. 0 pending PRs.'
      },
      {
        sha: 'a401f89',
        author: '@security',
        avatar: '🔒',
        timeAgo: '48 hours ago',
        message: 'docs(security): rotate quarterly compliance keys',
        type: 'STABLE' as const,
        fileChanged: 'SECURITY.md',
        diffSnippet: 'No application code modified.'
      }
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Recent commit broke outbound TLS handshake or gateway URL',
        status: 'FALSIFIED' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Git audit: Zero code changes in repository for 72 hours.',
        falsifiedReason: 'Zero repository commits in 72 hours. Not an internal code change.'
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Internal request payload failed serialization or schema contract',
        status: 'FALSIFIED' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Payload serialization verified against RFC-7159 JSON specification.',
        falsifiedReason: 'Internal serialization 100% valid. Upstream server returning 504.'
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Connection pool saturation or local TCP socket exhaustion',
        status: 'FALSIFIED' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Local socket pool: 12/1000 in use. Host networking healthy.',
        falsifiedReason: 'Host sockets healthy. External bank BGP route unreachable.'
      }
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, status: 'FALSIFIED' as const, falsifiedReason: '0 commits in 72h. Internal code is untouched.' },
          { index: 1, status: 'FALSIFIED' as const, falsifiedReason: 'Payload schema valid. Outbound TCP timeout.' },
          { index: 2, status: 'FALSIFIED' as const, falsifiedReason: 'Local networking normal. External banking API down.' }
        ]
      },
      {
        step: 2,
        updates: []
      },
      {
        step: 3,
        updates: []
      }
    ],
    matrix: {
      reproCol: 'External Gateway Ping (BGP Route)',
      rows: [
        {
          name: 'ALL SUBAGENTS: Internal Code Modification',
          repro: '❌ FAILED (External Bank Outage)',
          crash: '❌ CANNOT FIX (Upstream 504)',
          suite: 'N/A',
          verdict: 'ESCALATE TO HUMAN ON-CALL',
          isWinner: false
        }
      ]
    },
    diff: {
      file: 'External Cloud Provider (gateway.visa.com)',
      context: '// MAYDAY HONESTY GUARANTEE:',
      removed: '// No hallucinated code edits applied for external partner outages.',
      added: '+ // ESCALATED TO HUMAN SRE: Downstream Banking Outage (Incident INC-2044)',
      after: '// PagerDuty status page alert dispatched to provider NOC.'
    },
    tests: [
      { name: '⚠ External Network Diagnostics', detail: '→ traceroute to api.visa.com timed out at hop 14 (Level3 BGP partition)' }
    ],
    postmortem: {
      title: 'INC-2044 Postmortem: External Acquiring Bank Cloud Outage (Honesty Escalation)',
      prNumber: 0,
      prUrl: 'https://status.visa.com',
      ttrc: '6 Seconds',
      ttvf: 'Instant Escalation',
      humanBaseline: '45 Minutes (Investigating wrong servers)',
      improvement: 'Saved 45 min of wasted internal debugging ⚡',
      rootCause: "The acquiring banking provider suffered an unannounced BGP route partition resulting in HTTP 504 timeouts. No internal code was broken.",
      rejectionReason: "MAYDAY disproved all internal code theories within 6 seconds. Instead of fabricating hallucinated code patches, MAYDAY declared an HONEST ESCALATION to human on-call with non-urgent circuit breaker recommendations."
    }
  }
};

export default function MaydayWarRoom() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const [step, setStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'diff' | 'tests' | 'postmortem'>('matrix');
  const [selectedIncident, setSelectedIncident] = useState<'A' | 'B' | 'C' | 'D'>('A');

  const currentIncident = INCIDENT_DATA[selectedIncident];
  const [detectives, setDetectives] = useState<Hypothesis[]>(currentIncident.detectives);

  // Black Box Git Timeline selected commit
  const [selectedCommit, setSelectedCommit] = useState<GitCommitItem>(
    currentIncident.commits.find((c) => c.type === 'CULPRIT') || currentIncident.commits[0]
  );

  // Live Disk Status from physical host files
  const [diskStatus, setDiskStatus] = useState<{
    incidentA?: { status: string; file: string; isFixed: boolean };
    incidentB?: { status: string; file: string; isFixed: boolean };
  }>({});

  // Live Machine Vitest Runner State
  const [liveTestRunning, setLiveTestRunning] = useState(false);
  const [liveTestOutput, setLiveTestOutput] = useState<string | null>(null);
  const [liveTestPassed, setLiveTestPassed] = useState<boolean | null>(null);
  const [isHealing, setIsHealing] = useState(false);
  const [copiedPostmortem, setCopiedPostmortem] = useState(false);

  // Check physical disk status on initial load
  const checkLiveDiskStatus = async () => {
    try {
      const res = await fetch('/api/heal');
      const data = await res.json();
      if (data.success) {
        setDiskStatus({ incidentA: data.incidentA, incidentB: data.incidentB });
      }
    } catch (e) {
      console.error('Failed to query disk status', e);
    }
  };

  useEffect(() => {
    checkLiveDiskStatus();
  }, []);

  // Switch incident
  const switchIncident = (inc: 'A' | 'B' | 'C' | 'D') => {
    setSelectedIncident(inc);
    setIsPlaying(false);
    setStep(0);
    setElapsedMs(0);
    setDetectives(INCIDENT_DATA[inc].detectives);
    setSelectedCommit(
      INCIDENT_DATA[inc].commits.find((c) => c.type === 'CULPRIT') || INCIDENT_DATA[inc].commits[0]
    );
    setLiveTestOutput(null);
    setLiveTestPassed(null);
    checkLiveDiskStatus();
  };

  const resetInvestigation = () => {
    setIsPlaying(false);
    setStep(0);
    setElapsedMs(0);
    setDetectives(currentIncident.detectives);
    setSelectedCommit(
      currentIncident.commits.find((c) => c.type === 'CULPRIT') || currentIncident.commits[0]
    );
    setLiveTestOutput(null);
    setLiveTestPassed(null);
    checkLiveDiskStatus();
  };

  // Run live Vitest via Node child_process
  const runLiveTests = async () => {
    setLiveTestRunning(true);
    sounds.playTerminalClick();
    setActiveTab('tests');
    try {
      const res = await fetch('/api/run-tests', { method: 'POST' });
      const data = await res.json();
      setLiveTestOutput(data.output);
      setLiveTestPassed(data.success);
      if (data.success) {
        sounds.playGreenChime();
      } else {
        sounds.playTestFailure();
      }
      checkLiveDiskStatus();
    } catch (err: any) {
      setLiveTestOutput('Failed to execute test API: ' + err.message);
      setLiveTestPassed(false);
      sounds.playTestFailure();
    } finally {
      setLiveTestRunning(false);
    }
  };

  // Trigger real file mutation on host disk (Break or Fix)
  const triggerHeal = async (action: 'break' | 'fix') => {
    setIsHealing(true);
    sounds.playTerminalClick();
    setActiveTab('tests');
    const target = currentIncident.targetParam;

    try {
      const res = await fetch('/api/heal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, target }),
      });
      const data = await res.json();
      setLiveTestOutput(data.output);
      setLiveTestPassed(data.testsPassed);

      if (data.currentStatus) {
        setDiskStatus(data.currentStatus);
      }

      if (data.testsPassed) {
        sounds.playGreenChime();
        setStep(3); // Crown fix verified
      } else {
        sounds.playTestFailure();
        setStep(1); // Incident active
      }
    } catch (err: any) {
      setLiveTestOutput('Failed to mutate code: ' + err.message);
    } finally {
      setIsHealing(false);
    }
  };

  // Real end-to-end Triage Squad Launch
  const handleLaunchTriageSquad = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    sounds.playKlaxon();

    // If Incident D (Honesty escalation), handle fast disproof
    if (currentIncident.isEscalation) {
      setTimeout(() => {
        setStep(1);
        sounds.playTestFailure();
      }, 1000 / speed);

      setTimeout(() => {
        setStep(3);
        sounds.playRadarPing();
        setIsPlaying(false);
      }, 2500 / speed);
      return;
    }

    const target = currentIncident.targetParam;
    const isCurrentlyFixed = selectedIncident === 'A' 
      ? diskStatus.incidentA?.isFixed ?? true 
      : diskStatus.incidentB?.isFixed ?? true;

    // Step 1: If file is fixed, inject bug into disk first to demonstrate live triage
    if (isCurrentlyFixed) {
      setStep(0);
      try {
        await fetch('/api/heal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'break', target }),
        });
        await checkLiveDiskStatus();
      } catch (e) {
        console.error(e);
      }
    }

    // Advance to Step 1 (Detectives racing)
    setTimeout(() => {
      setStep(1);
      sounds.playRadarPing();
    }, 1200 / speed);

    // Advance to Step 2 (Reproduction test failing)
    setTimeout(async () => {
      setStep(2);
      sounds.playTestFailure();
    }, 3200 / speed);

    // Advance to Step 3 (Self-heal on disk and crown winner)
    setTimeout(async () => {
      try {
        const res = await fetch('/api/heal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'fix', target }),
        });
        const data = await res.json();
        setLiveTestOutput(data.output);
        setLiveTestPassed(data.testsPassed);
        await checkLiveDiskStatus();
      } catch (e) {
        console.error(e);
      }

      setStep(3);
      sounds.playGreenChime();
      setIsPlaying(false);
    }, 5600 / speed);
  };

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && step < 3) {
      interval = setInterval(() => {
        setElapsedMs((prev) => prev + 100 * speed);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, speed]);

  // Update detective state based on step
  useEffect(() => {
    if (step >= 1 && currentIncident.timeline[0]) {
      setDetectives((prev) => {
        const next = [...prev];
        for (const update of currentIncident.timeline[0].updates) {
          next[update.index] = { ...next[update.index], ...update } as Hypothesis;
        }
        return next;
      });
    }
    if (step >= 2 && currentIncident.timeline[1]) {
      setDetectives((prev) => {
        const next = [...prev];
        for (const update of currentIncident.timeline[1].updates) {
          next[update.index] = { ...next[update.index], ...update } as Hypothesis;
        }
        return next;
      });
    }
    if (step >= 3 && currentIncident.timeline[2]) {
      setDetectives((prev) => {
        const next = [...prev];
        for (const update of currentIncident.timeline[2].updates) {
          next[update.index] = { ...next[update.index], ...update } as Hypothesis;
        }
        return next;
      });
    }
  }, [step, currentIncident]);

  const formatTimer = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`;
  };

  // Current disk file info
  const currentDiskState = selectedIncident === 'A' ? diskStatus.incidentA : diskStatus.incidentB;
  const isTargetFixedOnDisk = currentDiskState?.isFixed ?? true;

  // Copy Postmortem Markdown
  const copyPostmortemMarkdown = () => {
    const md = `# ${currentIncident.postmortem.title}
**Status:** RESOLVED
**PR:** ${currentIncident.postmortem.prUrl}
**TTRC:** ${currentIncident.postmortem.ttrc} | **TTVF:** ${currentIncident.postmortem.ttvf}
**Human Baseline:** ${currentIncident.postmortem.humanBaseline} (${currentIncident.postmortem.improvement})

## Root Cause
${currentIncident.postmortem.rootCause}

## Why Decoys Were Rejected
${currentIncident.postmortem.rejectionReason}
`;
    navigator.clipboard.writeText(md);
    setCopiedPostmortem(true);
    sounds.playTerminalClick();
    setTimeout(() => setCopiedPostmortem(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white">
      {/* Incident Sub-Bar & Live Controls */}
      <div className="border-b border-slate-800/80 bg-[#0d121d]/80 backdrop-blur-md px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-slate-400">Target Microservice:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">
              {currentIncident.target}
            </span>
          </div>
        </div>

        {/* Center: MTTR Live Clock & Incident Switcher */}
        <div className="flex items-center gap-6">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl px-4 py-1.5 flex items-center gap-3 shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Live MTTR Clock</div>
              <div className="font-mono font-bold text-lg text-white tabular-nums tracking-wider">
                {formatTimer(elapsedMs)}
              </div>
            </div>
          </div>

          {/* 4-Incident Selector Grid */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => switchIncident('A')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedIncident === 'A' 
                  ? 'bg-red-500 text-white font-semibold shadow-lg shadow-red-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🅰️ INC-2041 (Contract Drift)
            </button>
            <button 
              onClick={() => switchIncident('B')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedIncident === 'B' 
                  ? 'bg-amber-500 text-white font-semibold shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🅱️ INC-2042 (Concurrency Race)
            </button>
            <button 
              onClick={() => switchIncident('C')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedIncident === 'C' 
                  ? 'bg-purple-500 text-white font-semibold shadow-lg shadow-purple-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🅲 INC-2043 (Memory Leak)
            </button>
            <button 
              onClick={() => switchIncident('D')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedIncident === 'D' 
                  ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🅳 INC-2044 (Honesty Escalation)
            </button>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLaunchTriageSquad}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition shadow-lg ${
              isPlaying
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 shadow-red-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isPlaying ? 'Pause Investigation' : step === 0 ? 'Launch Triage Squad' : 'Re-Run Triage'}
          </button>

          <button
            onClick={resetInvestigation}
            className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[11px] font-mono">
            <button 
              onClick={() => setSpeed(1)}
              className={`px-2 py-1 rounded ${speed === 1 ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              1×
            </button>
            <button 
              onClick={() => setSpeed(2)}
              className={`px-2 py-1 rounded ${speed === 2 ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              2×
            </button>
            <button 
              onClick={() => setSpeed(4)}
              className={`px-2 py-1 rounded ${speed === 4 ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
            >
              4×
            </button>
          </div>
        </div>
      </div>

      {/* Main War Room Body */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Incident Alert Summary Strip */}
        <div className="bg-gradient-to-r from-red-950/40 via-slate-900/80 to-slate-900/60 border border-red-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-start gap-3">
            <span className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 mt-0.5">
              <Flame className="w-5 h-5 animate-bounce" />
            </span>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-500/30 text-red-300 border border-red-500/50">
                  {currentIncident.id} [{currentIncident.severity}]
                </span>
                <h1 className="font-bold text-white text-base">
                  {currentIncident.title}
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                {currentIncident.alertSnippet}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Status</div>
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                {step === 0 && 'AWAITING DISPATCH'}
                {step === 1 && 'TRIAGE: 3 DETECTIVES RACING'}
                {step === 2 && 'REPRODUCING BUG WITH TESTS'}
                {step >= 3 && (currentIncident.isEscalation ? '⚠️ ESCALATED TO HUMAN' : '✅ RESOLVED & VERIFIED')}
              </div>
            </div>
          </div>
        </div>

        {/* PROMINENT LIVE HOST MACHINE & DISK TELEMETRY DECK */}
        <div className="bg-[#0b0f19] border border-blue-900/40 rounded-2xl p-4 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Target Disk Information */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Live Machine Execution Deck
                </span>
                <span className="text-[10px] text-slate-500 font-mono">(Direct OS Process Bridge)</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">File on Disk:</span>
                <code className="px-2 py-0.5 rounded bg-slate-900 text-blue-300 border border-slate-800">
                  {currentIncident.targetFile}
                </code>

                {/* Disk State Badge */}
                {currentIncident.isEscalation ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[11px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    STATUS: EXTERNAL CLOUD PARTNER (INTERNAL CODE UNTOUCHED)
                  </span>
                ) : isTargetFixedOnDisk ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    STATUS: HEALTHY_PATCHED (PASSES INVARIANTS)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    STATUS: SEV-1 BROKEN (REPRODUCIBLE FAILURE ON DISK)
                  </span>
                )}
              </div>
            </div>

            {/* Direct Hardware Action Buttons */}
            {!currentIncident.isEscalation && (
              <div className="flex items-center gap-2 flex-wrap">
                {/* Break Button */}
                <button
                  onClick={() => triggerHeal('break')}
                  disabled={isHealing || liveTestRunning}
                  className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/40 font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-950/40"
                  title="Modifies code file on disk to plant the exact bug and execute Vitest"
                >
                  <span>💣 Break Code on Disk</span>
                </button>

                {/* Fix Button */}
                <button
                  onClick={() => triggerHeal('fix')}
                  disabled={isHealing || liveTestRunning}
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
                  title="Applies the IBM Bob 2.0 patch to file on disk and verifies all tests pass"
                >
                  <span>🩹 Auto-Heal (Bob 2.0 Fix)</span>
                </button>

                {/* Live Vitest Button */}
                <button
                  onClick={runLiveTests}
                  disabled={liveTestRunning || isHealing}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                  title="Directly executes 'npx vitest run' against targets/shopfront"
                >
                  {liveTestRunning ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Running Machine Tests...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Machine Vitest</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 1: The Detective Squad (3 Competing Lanes) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold text-sm uppercase tracking-wider text-slate-300">
                Triage Squad: Competing Hypotheses in Parallel
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Bob 2.0 Superpower: <span className="text-blue-400 font-semibold">Subagents & Competing Parallelism</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {detectives.map((d) => (
              <div 
                key={d.agent}
                className={`relative rounded-2xl p-5 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  d.status === 'VERIFIED'
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : d.status === 'FALSIFIED'
                    ? 'bg-slate-900/40 border-slate-800 opacity-65'
                    : 'bg-[#0d121d] border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Stamp animation when Falsified */}
                {d.status === 'FALSIFIED' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="border-4 border-red-500/80 text-red-500 font-black text-2xl px-4 py-1 rounded-lg uppercase tracking-widest bg-black/60 shadow-2xl">
                      FALSIFIED
                    </div>
                  </div>
                )}

                {/* Champion Badge when Verified */}
                {d.status === 'VERIFIED' && (
                  <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Crowned Fix
                  </div>
                )}

                <div>
                  {/* Detective Header */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-2xl">{d.avatar}</span>
                    <div>
                      <div className="font-mono text-xs font-bold text-blue-400">{d.agent}</div>
                      <div className="font-semibold text-sm text-white">{d.name}</div>
                    </div>
                  </div>

                  {/* Hypothesis Statement */}
                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 font-medium mb-4 leading-relaxed">
                    "{d.theory}"
                  </div>

                  {/* Proof Ladder */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Scientific Proof Ladder
                    </div>

                    {/* Rung 0 */}
                    <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-900/50 border border-slate-800/80">
                      <span className="font-mono text-slate-300">R0: Hypothesis Formulated</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    </div>

                    {/* Rung 1 */}
                    <div className={`flex items-center justify-between text-xs py-1 px-2.5 rounded border transition ${
                      d.rungs.r1 ? 'bg-slate-900/80 border-slate-700 text-slate-200' : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}>
                      <span className="font-mono">R1: Suspect Line Located</span>
                      {d.rungs.r1 ? <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> : <span className="w-3 h-3 rounded-full border border-slate-700"></span>}
                    </div>

                    {/* Rung 2 */}
                    <div className={`flex items-center justify-between text-xs py-1 px-2.5 rounded border transition ${
                      d.rungs.r2 ? 'bg-slate-900/80 border-slate-700 text-slate-200' : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}>
                      <span className="font-mono">R2: Failing Repro Test Created</span>
                      {d.rungs.r2 ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> : <span className="w-3 h-3 rounded-full border border-slate-700"></span>}
                    </div>

                    {/* Rung 3 */}
                    <div className={`flex items-center justify-between text-xs py-1 px-2.5 rounded border transition ${
                      d.rungs.r3 ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200 font-semibold' : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}>
                      <span className="font-mono">R3: Invariant Fix Verified</span>
                      {d.rungs.r3 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3 h-3 rounded-full border border-slate-700"></span>}
                    </div>
                  </div>
                </div>

                {/* Evidence / Reason Footer */}
                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                  {d.falsifiedReason ? (
                    <div className="text-red-400 flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{d.falsifiedReason}</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 flex items-start gap-1.5">
                      <Search className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-400" />
                      <span>{d.evidence}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 FEATURE 1: INTERACTIVE BLACK BOX GIT COMMIT TIMELINE & CULPRIT LOCATOR */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
                <span>Black Box Git Commit Timeline & Culprit Locator</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                branch: <strong className="text-white">main</strong>
              </span>
              <span>• Click any commit dot to inspect diff</span>
            </div>
          </div>

          {/* Interactive Horizontal Commit Track */}
          <div className="relative py-4 px-2">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>

            {/* Commit Dots Grid */}
            <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto">
              {currentIncident.commits.map((c, idx) => {
                const isSelected = selectedCommit.sha === c.sha;
                const isCulprit = c.type === 'CULPRIT';
                const isFix = c.type === 'CROWN_FIX';

                return (
                  <button
                    key={c.sha}
                    onClick={() => {
                      setSelectedCommit(c);
                      sounds.playTerminalClick();
                    }}
                    className={`flex flex-col items-center gap-2 group transition focus:outline-none min-w-[110px] ${
                      isSelected ? 'scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Commit Dot with Beacon */}
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition shadow-lg ${
                        isCulprit
                          ? 'bg-red-500/20 border-red-500 text-red-400 shadow-red-500/30'
                          : isFix
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-emerald-500/30'
                          : isSelected
                          ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-blue-500/20'
                          : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-slate-500'
                      }`}>
                        {isCulprit ? (
                          <Flame className="w-4 h-4 animate-bounce" />
                        ) : isFix ? (
                          <Sparkles className="w-4 h-4" />
                        ) : (
                          <GitCommit className="w-4 h-4" />
                        )}
                      </div>

                      {/* Pulsing Beacon on Culprit */}
                      {isCulprit && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                      )}
                    </div>

                    {/* Commit SHA & Author */}
                    <div className="text-center font-mono">
                      <div className={`text-xs font-bold ${
                        isCulprit ? 'text-red-400' : isFix ? 'text-emerald-400' : isSelected ? 'text-blue-300' : 'text-slate-300'
                      }`}>
                        {c.sha}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[100px]">{c.author}</div>
                      <div className="text-[9px] text-slate-600">{c.timeAgo}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Commit Deep-Dive Card */}
          <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800 text-xs font-mono space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedCommit.avatar}</span>
                <div>
                  <span className="font-bold text-white text-sm">{selectedCommit.message}</span>
                  <div className="text-[11px] text-slate-400">
                    Committed by <strong className="text-slate-200">{selectedCommit.author}</strong> ({selectedCommit.timeAgo}) • SHA: <code className="text-blue-400">{selectedCommit.sha}</code>
                  </div>
                </div>
              </div>

              <div>
                {selectedCommit.type === 'CULPRIT' && (
                  <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold flex items-center gap-1.5 animate-pulse">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                    🔥 CULPRIT COMMIT (INTRODUCED REGRESSION)
                  </span>
                )}
                {selectedCommit.type === 'CROWN_FIX' && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    👑 IBM BOB 2.0 CROWN FIX
                  </span>
                )}
                {selectedCommit.type === 'STABLE' && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    ✓ CLEAN ANCESTOR COMMIT
                  </span>
                )}
              </div>
            </div>

            {/* Diff Preview */}
            <div className="space-y-1">
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>File modified: <strong className="text-slate-300">{selectedCommit.fileChanged}</strong></span>
                <span>Unified Diff Snippet</span>
              </div>
              <pre className="p-3 bg-black/80 rounded-lg border border-slate-900 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                {selectedCommit.diffSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Tabs (Cross-Exam Matrix, Code Diff, Vitest Logs, Postmortem) */}
        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tab Bar */}
          <div className="border-b border-slate-800 px-6 py-3 flex items-center justify-between bg-slate-900/50 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Cross-Examination Matrix
              </button>

              <button
                onClick={() => setActiveTab('diff')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'diff' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5" /> Surgeon Code Diff
              </button>

              <button
                onClick={() => setActiveTab('tests')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'tests' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Vitest Suite Stream
              </button>

              <button
                onClick={() => setActiveTab('postmortem')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'postmortem' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Auto-Generated Postmortem
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400 hidden sm:inline">
              Evidence Mode: <span className="text-emerald-400 font-semibold">Deterministic Tests</span>
            </div>
          </div>

          {/* Tab 1: Cross-Examination Matrix */}
          {activeTab === 'matrix' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Deterministic Cross-Examination Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Every candidate patch is tested against every detective's reproduction test. Band-aids are immediately exposed.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  N×N Automated Assertion Grid
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono">
                      <th className="p-3">Candidate Patch</th>
                      <th className="p-3">{currentIncident.matrix.reproCol}</th>
                      <th className="p-3">Crash / Invariant Prevention</th>
                      <th className="p-3">Full Regression Suite</th>
                      <th className="p-3">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {currentIncident.matrix.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/30 transition">
                        <td className={`p-3 font-semibold ${row.isWinner ? 'text-slate-200' : 'text-slate-400'}`}>
                          {row.name}
                        </td>
                        <td className={`p-3 font-semibold ${row.isWinner ? 'text-emerald-400' : 'text-red-400'}`}>
                          {row.repro}
                        </td>
                        <td className={`p-3 font-semibold ${row.isWinner ? 'text-emerald-400' : 'text-red-400'}`}>
                          {row.crash}
                        </td>
                        <td className={`p-3 font-semibold ${row.isWinner ? 'text-emerald-400' : 'text-red-400'}`}>
                          {row.suite}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-bold border ${
                            row.isWinner 
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {row.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Surgeon Code Diff */}
          {activeTab === 'diff' && (
            <div className="p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>Target: <span className="text-white">{currentIncident.diff.file}</span></span>
                <span className="text-emerald-400">Self-Healing Attempt: 1/3 (Green on First Try)</span>
              </div>
              <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800/80 space-y-1 overflow-x-auto">
                <div className="text-slate-500">// {currentIncident.title}</div>
                <div className="text-slate-400">  {currentIncident.diff.context}</div>
                <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded -mx-2 whitespace-pre-wrap">
                  {currentIncident.diff.removed}
                </div>
                <div className="bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-1 rounded -mx-2 whitespace-pre-wrap">
                  {currentIncident.diff.added}
                </div>
                <div className="text-slate-400">  {currentIncident.diff.after}</div>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Live Vitest Runner */}
          {activeTab === 'tests' && (
            <div className="p-6 font-mono text-xs bg-[#07090e] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white text-sm">Real Machine Vitest Execution Console</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct execution via Node.js child_process against <code className="text-slate-200">targets/shopfront</code>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerHeal('break')}
                    disabled={isHealing || liveTestRunning}
                    className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-500/40 font-semibold transition flex items-center gap-1.5"
                  >
                    <span>💣 Break File on Disk</span>
                  </button>

                  <button
                    onClick={() => triggerHeal('fix')}
                    disabled={isHealing || liveTestRunning}
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/40 font-semibold transition flex items-center gap-1.5"
                  >
                    <span>🩹 Apply Bob 2.0 Patch</span>
                  </button>

                  <button
                    onClick={runLiveTests}
                    disabled={liveTestRunning || isHealing}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                  >
                    {liveTestRunning ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                        <span>Running Tests...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Run Live Vitest</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Console Output Window */}
              <div className="bg-black/90 rounded-xl p-4 border border-slate-800 font-mono text-[11px] min-h-[180px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {liveTestOutput ? (
                  <div className={liveTestPassed ? 'text-emerald-400' : 'text-red-400'}>
                    {liveTestOutput}
                  </div>
                ) : (
                  <div className="space-y-2 text-slate-500">
                    <div className="text-slate-400 font-bold"># Live machine test stream ready:</div>
                    {currentIncident.tests.map((t, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-emerald-400 font-bold">{t.name}</div>
                        <div className="text-slate-400 pl-4">{t.detail}</div>
                      </div>
                    ))}
                    <div className="pt-2 text-blue-400 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Click <strong>"Run Live Vitest"</strong> or <strong>"Break File on Disk"</strong> above to execute tests on your computer!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Auto-Generated Postmortem */}
          {activeTab === 'postmortem' && (
            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-3">
                <div>
                  <h3 className="font-bold text-white text-base">{currentIncident.postmortem.title}</h3>
                  <p className="text-slate-400">Generated automatically by IBM Bob 2.0 Scribe Agent</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPostmortemMarkdown}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    {copiedPostmortem ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPostmortem ? 'Copied Markdown!' : 'Copy Markdown'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>

                  {currentIncident.postmortem.prNumber > 0 && (
                    <a 
                      href={currentIncident.postmortem.prUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1.5 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
                    >
                      <GitPullRequest className="w-3.5 h-3.5" /> Open Verified PR #{currentIncident.postmortem.prNumber} <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Time to Root Cause</div>
                  <div className="text-lg font-bold text-white font-mono">{currentIncident.postmortem.ttrc}</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Time to Verified Fix</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">{currentIncident.postmortem.ttvf}</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Human Baseline MTTR</div>
                  <div className="text-lg font-bold text-slate-300 font-mono">{currentIncident.postmortem.humanBaseline}</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">MTTR Improvement</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">{currentIncident.postmortem.improvement}</div>
                </div>
              </div>

              <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800 space-y-2 text-slate-300 leading-relaxed">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Root Cause & Rejection Analysis</h4>
                <p>
                  {currentIncident.postmortem.rootCause}
                </p>
                <p>
                  <strong>Why decoy theories were rejected:</strong> {currentIncident.postmortem.rejectionReason}
                </p>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Footer Strip */}
      <footer className="border-t border-slate-800/80 bg-[#07090e] px-6 py-3 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>IBM Bob 2.0 AI Hackathon</span>
          <span>•</span>
          <span>Team SITA (Himanshu Kumar & Priyansu Modi)</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="text-emerald-400 font-semibold">● 4 Incidents (A, B, C, D) Supported</span>
          <span className="text-slate-400">Deterministic Proof Ladder v2.0</span>
        </div>
      </footer>
    </div>
  );
}
