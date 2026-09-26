'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Terminal,
  Cpu,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
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
  Radio,
  DollarSign,
  Activity,
  Compass,
  Volume2,
  VolumeX,
  ShieldCheck,
  Eye,
  Code2,
  HardDrive,
  TrendingDown,
  CheckCheck,
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { callHealAPI, callRunTestsAPI, DEMO_MODE } from '../../lib/demoMode';
import { useTypewriter } from '../../lib/typewriter';
import { saveIncidentToLocal } from '../../db/local';

function TypewriterText({ text }: { text: string }) {
  const displayed = useTypewriter(text, 14);
  return (
    <span>
      {displayed}
      <span className="inline-block w-1.5 h-3 bg-blue-400 ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

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
    category: 'CONTRACT DRIFT',
    title: "TypeError: Cannot read properties of undefined (reading 'amount')",
    tagline: 'The Silent Fee Leak: PayLink SDK v3.0 Breaking Envelope',
    lossRate: '$14.50 / sec',
    dailyLoss: '$11,600 / day',
    target: 'payment-service (src/payment/adapter.ts:37)',
    targetFile: 'targets/shopfront/src/payment/adapter.ts',
    targetLine: 37,
    targetParam: 'incident-a' as const,
    alertSnippet: 'Unhandled rejection during customer checkout. 100% failure rate for live credit card transactions.',
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
        diffSnippet: '+ export function applyCoupon(code: string, total: number): number {\n+   return total * 0.9;\n+ }',
      },
      {
        sha: 'f48a192',
        author: '@alex-ui',
        avatar: '🎨',
        timeAgo: '2 hours ago',
        message: 'style(cart): polish mobile padding and typography tokens',
        type: 'STABLE' as const,
        fileChanged: 'src/components/CartModal.tsx',
        diffSnippet: '- <div className="p-2">\n+ <div className="p-4 sm:p-6 font-mono">',
      },
      {
        sha: 'e9a18f4',
        author: '@bot-renovate',
        avatar: '🤖',
        timeAgo: '48 mins ago',
        message: 'chore(deps): bump paylink-sdk from 2.4 to 3.0',
        type: 'CULPRIT' as const,
        fileChanged: 'package.json, src/payment/adapter.ts',
        diffSnippet: '// Breaking envelope change silently shipped in v3.0!\n- "paylink-sdk": "2.4.1"\n+ "paylink-sdk": "3.0.0"\n// Response structure changed: { fee: { amount } } -> { data: { feeCents } }',
      },
      {
        sha: 'b819d04',
        author: '@mike-ops',
        avatar: '🛠️',
        timeAgo: '35 mins ago',
        message: 'docs(readme): update staging deployment runbook and flags',
        type: 'STABLE' as const,
        fileChanged: 'README.md',
        diffSnippet: '+ ### Deployment Notes\n+ Ensure all external webhooks respond with 200 OK.',
      },
      {
        sha: 'c931e05',
        author: '@ibm-bob-2.0',
        avatar: '👑',
        timeAgo: 'Just now',
        message: 'fix(payment): map PayLink SDK v3.0 feeCents / 100 [PR #104]',
        type: 'CROWN_FIX' as const,
        fileChanged: 'src/payment/adapter.ts',
        diffSnippet: '- const fee = (gatewayRaw as any).fee.amount;\n+ const fee = gatewayRaw.data.feeCents / 100; // Preserves 2.9% fee invariant ($10.29 charged)',
      },
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Dependency bump paylink-sdk 2.4 → 3.0 broke response schema contract',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Scanning git blame on src/payment/adapter.ts...',
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Missing optional chaining on response.fee; upstream returned null',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing adapter.ts:37 for undefined member access...',
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Check-then-act race condition in parallel checkout promise handling',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Tracing request lifecycle in checkout.ts for async gaps...',
      },
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Found commit e9a18f4: bump paylink-sdk 2.4 → 3.0' },
          { index: 1, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Located rawPaylinkGatewayCall() reading fee.amount' },
          { index: 2, status: 'FALSIFIED' as const, falsifiedReason: 'Execution graph is completely serial. No race condition detected.' },
        ],
      },
      {
        step: 2,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: true, r3: false }, evidence: 'Reproduction test written: checkout.test.ts (Fails: 2.9% fee expected)' },
          { index: 1, evidence: 'Proposes band-aid patch: res.fee?.amount ?? 0' },
        ],
      },
      {
        step: 3,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: true, r3: true }, status: 'VERIFIED' as const, evidence: 'Patch passes reproduction test & preserves 2.9% fee!' },
          { index: 1, status: 'FALSIFIED' as const, falsifiedReason: 'Band-aid patch silently omits fee and fails business invariant!' },
        ],
      },
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
          isWinner: true,
        },
        {
          name: 'RECON-2: Lazy Optional Chaining (res.fee?.amount ?? 0)',
          repro: '❌ FAILED ($0.00 charged)',
          crash: '✅ PASSED (Stops crash)',
          suite: '❌ INVARIANT BROKEN',
          verdict: 'REJECTED: SILENT REVENUE LOSS',
          isWinner: false,
        },
      ],
    },
    diff: {
      file: 'src/payment/adapter.ts',
      context: 'const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);',
      removed: '- const fee = (gatewayRaw as any).fee.amount; // BUG: Undefined in SDK v3.0',
      added: '+ const fee = gatewayRaw.data.feeCents / 100; // FIX: Map v3.0 feeCents (/ 100 mandatory)',
      after: 'const total = req.amountDollars + fee;',
    },
    tests: [
      { name: '✓ test/checkout.test.ts (1 test passed)', detail: '→ should successfully complete checkout with correct 2.9% fee calculation (38ms)' },
      { name: '✓ test/payment.test.ts (3 tests passed)', detail: '→ gateway schema validation passed' },
      { name: '✓ test/orders.test.ts (4 tests passed)', detail: '→ order creation and ledger verification passed' },
    ],
    postmortem: {
      title: 'INC-2041 Postmortem: PayLink SDK v3.0 Contract Drift',
      prNumber: 104,
      prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/pull/1',
      ttrc: '14 Seconds',
      ttvf: '42 Seconds',
      humanBaseline: '28 Minutes',
      improvement: '97.5% Faster ⚡',
      rootCause: 'Commit e9a18f4 bumped paylink-sdk to version 3.0. The SDK changed its response envelope from fee.amount to data.feeCents.',
      rejectionReason: 'Agent RECON-2 proposed optional chaining (res.fee?.amount ?? 0). While this silenced the TypeError, the automated Cross-Examination Matrix caught that it charged $0 processing fee, violating the 2.9% business invariant and losing $11,600/day.',
    },
    codeSnippet: {
      before: `32: export async function chargeCustomer(req: ChargeRequest): Promise<ChargeResult> {
33:   // PayLink Gateway Integration (v3.0.0)
34:   const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);
35:   
36:   // 🚨 CRITICAL MUTATION LINE 37 ON YOUR HARD DRIVE:`,
      brokenLine: `37:   const fee = (gatewayRaw as any).fee.amount;  // 🚨 BROKEN (TypeError at runtime)`,
      fixedLine: `37:   const fee = gatewayRaw.data.feeCents / 100;   // ✅ CROWN FIX (Preserves 2.9% invariant)`,
      after: `38:   const total = req.amountDollars + fee;
39:   return { success: true, transactionId: gatewayRaw.id, chargedTotal: total };
40: }`,
    },
  },
  B: {
    id: 'INC-2042',
    severity: 'SEV-1',
    category: 'CONCURRENCY RACE',
    title: 'Intermittent 500: Insufficient Stock & Negative Warehouse Balance Under Concurrency',
    tagline: 'The Flash-Sale Crash: 20 Simultaneous Buyers Overselling Last 10 Items',
    lossRate: 'Warehouse Balance < 0',
    dailyLoss: '-10 Stock Oversold',
    target: 'inventory-service (src/inventory/service.ts:32)',
    targetFile: 'targets/shopfront/src/inventory/service.ts',
    targetLine: 32,
    targetParam: 'incident-b' as const,
    alertSnippet: 'Ghost 500s during flash sale burst. Warehouse stock dipped to -10 with 10 physical units oversold.',
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
        diffSnippet: '+ export async function notifyLowStock(sku: string) {\n+   await dispatchWebhook("low-stock", { sku });\n+ }',
      },
      {
        sha: '4b91f02',
        author: '@speed-demon',
        avatar: '🏎️',
        timeAgo: '1 hour ago',
        message: 'perf(orders): validate and reserve order lines in parallel with Promise.all()',
        type: 'CULPRIT' as const,
        fileChanged: 'src/inventory/service.ts',
        diffSnippet: '// Introduced asynchronous check-then-act race gap!\n- for (const item of cart) { await reserve(item); }\n+ await Promise.all(cart.map(reserve)); // Interleaving async delay causes overselling',
      },
      {
        sha: 'd77a810',
        author: '@devops-bot',
        avatar: '🤖',
        timeAgo: '40 mins ago',
        message: 'chore(ci): update Vitest timeout threshold to 10000ms',
        type: 'STABLE' as const,
        fileChanged: 'vitest.config.ts',
        diffSnippet: '- testTimeout: 5000\n+ testTimeout: 10000',
      },
      {
        sha: '6a18f03',
        author: '@ibm-bob-2.0',
        avatar: '👑',
        timeAgo: 'Just now',
        message: 'fix(inventory): apply per-SKU promise queue mutex to serialize reservations [PR #105]',
        type: 'CROWN_FIX' as const,
        fileChanged: 'src/inventory/service.ts',
        diffSnippet: '+ const skuQueue = new Map<string, Promise<unknown>>();\n+ const tail = skuQueue.get(sku) ?? Promise.resolve();\n+ const next = tail.then(async () => { /* critical section */ });',
      },
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Parallel order fulfillment batching broke serial inventory decrement assumption',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing recent batching merge in orders.ts...',
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Negative check guard missing in warehouse stock table update query',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Checking SQL constraints and balance assertions...',
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Check-then-act race window in reserveStock allows parallel reads before write',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Simulating concurrent fiber interleaving across 10ms async delay...',
      },
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Found commit 4b91f02: replaced serial checkout with Promise.all()' },
          { index: 2, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Located 10ms async delay between stock read & stock decrement in service.ts:32' },
          { index: 1, evidence: 'Suggests exponential backoff retry loop around reserveStock()' },
        ],
      },
      {
        step: 2,
        updates: [
          { index: 2, rungs: { r0: true, r1: true, r2: true, r3: false }, evidence: 'Reproduction test written: inventory.test.ts (20 concurrent requests oversell 10 items)' },
          { index: 1, status: 'FALSIFIED' as const, falsifiedReason: 'Retry loop re-fires stale requests into critical section, worsening overselling 2×!' },
          { index: 0, evidence: 'Trigger identified, but root cause is lack of serialization' },
        ],
      },
      {
        step: 3,
        updates: [
          { index: 2, rungs: { r0: true, r1: true, r2: true, r3: true }, status: 'VERIFIED' as const, evidence: 'Per-SKU Promise Mutex serializes reservations. Zero overselling invariant verified!' },
          { index: 0, status: 'FALSIFIED' as const, falsifiedReason: 'Commit trigger only; cannot fix by reverting batching without degrading throughput.' },
        ],
      },
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
          isWinner: true,
        },
        {
          name: 'RECON-2: Exponential Backoff Retry Loop',
          repro: '❌ FAILED (All 20 Succeeded)',
          crash: '❌ FAILED (Stock = -10 Oversold)',
          suite: '❌ INVARIANT BROKEN',
          verdict: 'REJECTED: EXACERBATES RACE',
          isWinner: false,
        },
      ],
    },
    diff: {
      file: 'src/inventory/service.ts',
      context: 'const skuQueue = new Map<string, Promise<unknown>>();',
      removed: '- // Vulnerable check-then-act with async delay:\n- const currentStock = inventoryDb[sku];\n- await delay(10);\n- inventoryDb[sku] = currentStock - qty;',
      added: '+ // FIX (INC-2042): Per-SKU async mutex queue serializes reservations\n+ const tail = skuQueue.get(sku) ?? Promise.resolve();\n+ const next = tail.then(async () => { /* critical section */ });\n+ skuQueue.set(sku, next.catch(() => {}));',
      after: 'return next;',
    },
    tests: [
      { name: '✓ test/inventory.test.ts (1 test passed)', detail: '→ should prevent overselling and negative stock under high concurrency (315ms)' },
      { name: '✓ test/checkout.test.ts (1 test passed)', detail: '→ checkout invariants verified under load' },
    ],
    postmortem: {
      title: 'INC-2042 Postmortem: Concurrency Race Condition in Flash-Sale Reservations',
      prNumber: 105,
      prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/pull/2',
      ttrc: '11 Seconds',
      ttvf: '38 Seconds',
      humanBaseline: '45 Minutes',
      improvement: '98.6% Faster ⚡',
      rootCause: 'Commit 4b91f02 introduced parallel order fulfillment batching. Between reading available stock and decrementing it, an asynchronous I/O gap allowed concurrent requests to oversell inventory into negative values.',
      rejectionReason: "Agent RECON-2 proposed exponential backoff retries. The Cross-Examination Matrix revealed retrying failed calls exacerbated thread contention and caused 20 out of 10 items to be sold. RECON-3's atomic per-SKU mutex was crowned.",
    },
    codeSnippet: {
      before: `28: export async function reserveStock(sku: string, qty: number): Promise<boolean> {
29:   // Check-then-act race vulnerability:
30:   const currentStock = inventoryDb[sku] ?? 0;
31:   if (currentStock < qty) return false;`,
      brokenLine: `32:   await delay(10); // 🚨 RACE GAP: parallel fibers read old stock before write!`,
      fixedLine: `32:   return await serializeSku(sku, async () => { /* atomic mutex decrements */ });`,
      after: `33:   inventoryDb[sku] = currentStock - qty;
34:   return true;
35: }`,
    },
  },
  C: {
    id: 'INC-2043',
    severity: 'SEV-2',
    category: 'RESOURCE LEAK',
    title: 'OOMKilled & Event Loop Freeze: Unbounded EventEmitter Listener Leak',
    tagline: 'The Memory Bleed: 500 Requests = 500 Uncollected Listeners on Node Heap',
    lossRate: '+2.8 MB / request',
    dailyLoss: '1.4 GB Heap OOMKilled',
    target: 'order-service (src/order/service.ts:44)',
    targetFile: 'targets/shopfront/src/order/service.ts',
    targetLine: 44,
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
        diffSnippet: '+ export const eventBus = new EventEmitter();',
      },
      {
        sha: '8f3c21a',
        author: '@junior-dev',
        avatar: '🐣',
        timeAgo: '2 hours ago',
        message: 'feat(notifications): attach inventory alert listener per order request',
        type: 'CULPRIT' as const,
        fileChanged: 'src/order/service.ts',
        diffSnippet: '// Registered on every incoming request without cleanup!\n+ export async function createOrder(req: OrderReq) {\n+   eventBus.on("inventory:low", handleLowStockAlert); // LEAK: 500 orders = 500 listeners\n+ }',
      },
      {
        sha: '9e44f12',
        author: '@ibm-bob-2.0',
        avatar: '👑',
        timeAgo: 'Just now',
        message: 'fix(order): convert per-request listener to singleton startup listener [PR #106]',
        type: 'CROWN_FIX' as const,
        fileChanged: 'src/order/service.ts',
        diffSnippet: '- eventBus.on("inventory:low", handleLowStockAlert);\n+ // Registered once at application boot\n+ eventBus.once("inventory:low", handleLowStockAlert);',
      },
    ],
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Commit 8f3c21a introduced per-request event subscriptions without lifecycle cleanup',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing eventBus.on calls in order/service.ts...',
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Event listener collection lacks garbage collection bounds, exhausting heap memory',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Profiling listener count under 500 synthetic orders...',
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Simultaneous requests triggering circular event dispatch loops',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Checking for recursive event emissions...',
      },
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Located eventBus.on() inside createOrder()' },
          { index: 1, rungs: { r0: true, r1: true, r2: false, r3: false }, evidence: 'Listener count grows monotonically with traffic' },
          { index: 2, status: 'FALSIFIED' as const, falsifiedReason: 'Event flow is strictly linear, not recursive.' },
        ],
      },
      {
        step: 2,
        updates: [
          { index: 1, rungs: { r0: true, r1: true, r2: true, r3: false }, evidence: 'Reproduction test written: 500 orders create 500 listeners' },
          { index: 0, evidence: 'Culprit commit identified' },
        ],
      },
      {
        step: 3,
        updates: [
          { index: 1, rungs: { r0: true, r1: true, r2: true, r3: true }, status: 'VERIFIED' as const, evidence: 'Singleton listener registration verified. Memory footprint stable at 42MB.' },
          { index: 0, status: 'VERIFIED' as const, evidence: 'Confirmed fix clears listener leak' },
        ],
      },
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
          isWinner: true,
        },
        {
          name: 'RECON-3: setMaxListeners(Infinity)',
          repro: '❌ FAILED (Still leaks memory)',
          crash: '❌ FAILED (OOMCrash still occurs)',
          suite: '❌ REJECTED',
          verdict: 'REJECTED: SILENT HEAP BLEED',
          isWinner: false,
        },
      ],
    },
    diff: {
      file: 'src/order/service.ts',
      context: 'export async function createOrder(req: OrderReq) {',
      removed: '- eventBus.on("inventory:low", handleLowStockAlert); // LEAKS ON EVERY REQUEST',
      added: '+ // MOVED: Registered once at server bootstrap in index.ts\n+ // eventBus.once("inventory:low", handleLowStockAlert);',
      after: 'return { orderId: generateId() };',
    },
    tests: [
      { name: '✓ test/order.test.ts (1 test passed)', detail: '→ listener count remains bounded to 1 under 500 orders (14ms)' },
    ],
    postmortem: {
      title: 'INC-2043 Postmortem: Unbounded EventEmitter Memory Leak in Order Worker',
      prNumber: 106,
      prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/pull/3',
      ttrc: '9 Seconds',
      ttvf: '28 Seconds',
      humanBaseline: '35 Minutes',
      improvement: '98.7% Faster ⚡',
      rootCause: 'Commit 8f3c21a registered an event listener inside a per-request controller function instead of application bootstrap. Each transaction appended a new listener to the heap.',
      rejectionReason: 'RECON-3 suggested increasing setMaxListeners. The matrix proved this merely silenced the warning while the Node process crashed with OOMKilled under production traffic.',
    },
    codeSnippet: {
      before: `40: export async function createOrder(req: OrderReq): Promise<OrderResult> {
41:   const orderId = crypto.randomUUID();
42:   // Unbounded leak triggered per incoming request:`,
      brokenLine: `43:   eventBus.on("inventory:low", handleLowStockAlert); // 🚨 LEAKS 1 listener per HTTP request`,
      fixedLine: `43:   // Moved to server boot: eventBus.once("inventory:low", ...);`,
      after: `44:   await persistOrder(orderId, req);
45:   return { success: true, orderId };
46: }`,
    },
  },
  D: {
    id: 'INC-2044',
    severity: 'SEV-1',
    category: 'EXTERNAL DEPENDENCY',
    title: 'Upstream Network Partition: HTTP 504 Gateway Timeout from Acquiring Bank',
    tagline: 'The Visa Outage: Proving Enterprise Honesty with Empirical Invariant Verification',
    lossRate: 'External BGP Route Down',
    dailyLoss: 'Escalated in 14s',
    target: 'external-provider (gateway.visa.com:443)',
    targetFile: 'external: api.visa.com (Cloud Gateway)',
    targetLine: 0,
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
        diffSnippet: 'All test suites green. 0 pending PRs.',
      },
      {
        sha: 'a401f89',
        author: '@security',
        avatar: '🔒',
        timeAgo: '48 hours ago',
        message: 'docs(security): rotate quarterly compliance keys',
        type: 'STABLE' as const,
        fileChanged: 'SECURITY.md',
        diffSnippet: 'No application code modified.',
      },
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
        falsifiedReason: 'Zero repository commits in 72 hours. Not an internal code change.',
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Internal request payload failed serialization or schema contract',
        status: 'FALSIFIED' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Payload serialization verified against RFC-7159 JSON specification.',
        falsifiedReason: 'Internal serialization 100% valid. Upstream server returning 504.',
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Connection pool saturation or local TCP socket exhaustion',
        status: 'FALSIFIED' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Local socket pool: 12/1000 in use. Host networking healthy.',
        falsifiedReason: 'Host sockets healthy. External bank BGP route unreachable.',
      },
    ],
    timeline: [
      {
        step: 1,
        updates: [
          { index: 0, status: 'FALSIFIED' as const, falsifiedReason: '0 commits in 72h. Internal code is untouched.' },
          { index: 1, status: 'FALSIFIED' as const, falsifiedReason: 'Payload schema valid. Outbound TCP timeout.' },
          { index: 2, status: 'FALSIFIED' as const, falsifiedReason: 'Local networking normal. External banking API down.' },
        ],
      },
      {
        step: 2,
        updates: [],
      },
      {
        step: 3,
        updates: [],
      },
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
          isWinner: false,
        },
      ],
    },
    diff: {
      file: 'External Cloud Provider (gateway.visa.com)',
      context: '// MAYDAY ENTERPRISE HONESTY GUARANTEE:',
      removed: '// No hallucinated code edits applied for external partner outages.',
      added: '+ // ESCALATED TO HUMAN SRE: Downstream Banking Outage (Incident INC-2044)',
      after: '// PagerDuty status page alert dispatched to provider NOC.',
    },
    tests: [
      { name: '⚠ External Network Diagnostics', detail: '→ traceroute to api.visa.com timed out at hop 14 (Level3 BGP partition)' },
    ],
    postmortem: {
      title: 'INC-2044 Postmortem: External Acquiring Bank Cloud Outage (Honesty Escalation)',
      prNumber: 0,
      prUrl: 'https://status.visa.com',
      ttrc: '6 Seconds',
      ttvf: 'Instant Escalation',
      humanBaseline: '45 Minutes (Investigating wrong servers)',
      improvement: 'Saved 45 min of wasted internal debugging ⚡',
      rootCause: 'The acquiring banking provider suffered an unannounced BGP route partition resulting in HTTP 504 timeouts. No internal code was broken.',
      rejectionReason: 'MAYDAY disproved all internal code theories within 6 seconds. Instead of fabricating hallucinated code patches, MAYDAY declared an HONEST ESCALATION to human on-call with non-urgent circuit breaker recommendations.',
    },
    codeSnippet: {
      before: `// 🛡️ MAYDAY HONESTY AUDIT: External Gateway Triage
// Target: https://gateway.visa.com/v1/charge
// Internal Git Blame: 0 commits in past 72 hours`,
      brokenLine: `// 🚨 OUTAGE SOURCE: Upstream Level3 BGP Route Partition (HTTP 504)`,
      fixedLine: `// ✅ HONEST VERDICT: Internal Code is 100% HEALTHY. DO NOT MUTATE CODE.`,
      after: `// Escalating to human SRE with upstream status link: https://status.visa.com
// Circuit breaker tripped to avoid queue backup.`,
    },
  },
};

export default function MaydayWarRoom() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const [step, setStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [mttrFrozen, setMttrFrozen] = useState<number | null>(null);
  const [showCrownBanner, setShowCrownBanner] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'matrix' | 'diff' | 'tests' | 'postmortem'>('matrix');
  const [selectedIncident, setSelectedIncident] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [appMode, setAppMode] = useState<'DEMO' | 'REAL'>('DEMO');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 🚀 30-Second Autopilot Tour state
  const [isAutopilot, setIsAutopilot] = useState(false);
  const [autopilotMsg, setAutopilotMsg] = useState<string | null>(null);

  // Live Revenue Bleed calculation: base $145.00 + $14.50/s during outage
  const [bleedAmount, setBleedAmount] = useState(145.0);

  const currentIncident = INCIDENT_DATA[selectedIncident];
  const [detectives, setDetectives] = useState<Hypothesis[]>(currentIncident.detectives);

  // Stale timeout cleanup ref — prevents ghost updates on incident switch
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

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
  const [isResettingAll, setIsResettingAll] = useState(false);
  const [copiedPostmortem, setCopiedPostmortem] = useState(false);

  // Check physical disk status on initial load
  const checkLiveDiskStatus = async () => {
    try {
      const data = await callHealAPI('status', 'incident-a');
      if (data.success && data.currentStatus) {
        setDiskStatus(data.currentStatus);
      }
    } catch (e) {
      console.error('Failed to query disk status', e);
    }
  };

  // Read URL params on mount: ?incident=A&autoplay=true
  useEffect(() => {
    const init = async () => {
      await checkLiveDiskStatus();
      const params = new URLSearchParams(window.location.search);
      const incParam = params.get('incident') as 'A' | 'B' | 'C' | 'D' | null;
      if (incParam && ['A', 'B', 'C', 'D'].includes(incParam)) {
        switchIncident(incParam);
      }
      const modeParam = params.get('mode');
      if (modeParam === 'real' || modeParam === 'REAL') {
        setAppMode('REAL');
      }
      if (params.get('autoplay') === 'true') {
        const id = setTimeout(() => {
          setSpeed(4);
          setTimeout(() => handleLaunchTriageSquad(), 200);
        }, 500);
        timeoutRefs.current.push(id);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase color sweep: update <html data-phase> for CSS variables
  useEffect(() => {
    const phase = step === 0 ? 'IDLE' : step < 3 ? 'RACING' : 'VERIFIED';
    document.documentElement.dataset.phase = phase;
  }, [step]);

  // Switch incident — clear all stale timeouts first
  const switchIncident = (inc: 'A' | 'B' | 'C' | 'D') => {
    clearAllTimeouts();
    setSelectedIncident(inc);
    setIsPlaying(false);
    setIsAutopilot(false);
    setAutopilotMsg(null);
    setStep(0);
    setElapsedMs(0);
    setMttrFrozen(null);
    setShowCrownBanner(false);
    setBleedAmount(145.0);
    setDetectives(INCIDENT_DATA[inc].detectives);
    setSelectedCommit(
      INCIDENT_DATA[inc].commits.find((c) => c.type === 'CULPRIT') || INCIDENT_DATA[inc].commits[0]
    );
    setLiveTestOutput(null);
    setLiveTestPassed(null);
    checkLiveDiskStatus();
  };

  const resetInvestigation = () => {
    clearAllTimeouts();
    setIsPlaying(false);
    setIsAutopilot(false);
    setAutopilotMsg(null);
    setStep(0);
    setElapsedMs(0);
    setMttrFrozen(null);
    setShowCrownBanner(false);
    setBleedAmount(145.0);
    setDetectives(currentIncident.detectives);
    setSelectedCommit(
      currentIncident.commits.find((c) => c.type === 'CULPRIT') || currentIncident.commits[0]
    );
    setLiveTestOutput(null);
    setLiveTestPassed(null);
    checkLiveDiskStatus();
  };

  // Run live Vitest via Node child_process (or demo simulation)
  const runLiveTests = async () => {
    setLiveTestRunning(true);
    if (soundEnabled) sounds.playTerminalClick();
    setActiveTab('tests');
    try {
      const data = await callRunTestsAPI();
      setLiveTestOutput(data.output);
      setLiveTestPassed(data.success);
      if (data.success) {
        if (soundEnabled) sounds.playGreenChime();
      } else {
        if (soundEnabled) sounds.playTestFailure();
      }
      checkLiveDiskStatus();
    } catch (err: any) {
      setLiveTestOutput('Failed to execute test API: ' + err.message);
      setLiveTestPassed(false);
      if (soundEnabled) sounds.playTestFailure();
    } finally {
      setLiveTestRunning(false);
    }
  };

  // Trigger real file mutation on host disk (Break or Fix)
  const triggerHeal = async (action: 'break' | 'fix') => {
    setIsHealing(true);
    if (soundEnabled) sounds.playTerminalClick();
    setActiveTab('tests');
    const target = currentIncident.targetParam;

    try {
      const data = await callHealAPI(action, target);
      setLiveTestOutput(data.output ?? null);
      setLiveTestPassed(data.testsPassed ?? null);

      if (data.currentStatus) {
        setDiskStatus(data.currentStatus);
      }

      if (data.testsPassed) {
        if (soundEnabled) sounds.playGreenChime();
        setStep(3);
      } else {
        if (soundEnabled) sounds.playTestFailure();
        setStep(1);
      }
    } catch (err: any) {
      setLiveTestOutput('Failed to mutate code: ' + err.message);
    } finally {
      setIsHealing(false);
    }
  };

  // Reset all targets to healthy state
  const resetAllTargets = async () => {
    setIsResettingAll(true);
    if (soundEnabled) sounds.playTerminalClick();
    try {
      const data = await callHealAPI('reset-all', 'all');
      if (data.currentStatus) setDiskStatus(data.currentStatus);
      if (soundEnabled) sounds.playGreenChime();
    } catch {
      // silent
    } finally {
      setIsResettingAll(false);
    }
  };

  // 🚀 30-Second Autopilot Tour Launcher
  const startAutopilotTour = async () => {
    if (isPlaying) {
      clearAllTimeouts();
      setIsPlaying(false);
    }
    // Switch to Incident A for canonical contract drift story
    if (selectedIncident !== 'A') {
      setSelectedIncident('A');
    }
    setSpeed(4);
    setIsAutopilot(true);
    setElapsedMs(0);
    setMttrFrozen(null);
    setShowCrownBanner(false);
    setStep(0);
    setBleedAmount(145.0);

    setAutopilotMsg('🚨 1/4: Production Outage Detected! 100% checkout failure. Bleeding -$14.50/s...');
    if (soundEnabled) sounds.playKlaxon();

    // Step 1: Detectives racing
    const t1 = setTimeout(() => {
      setStep(1);
      setAutopilotMsg('🔍 2/4: IBM Bob 2.0 launches 3 detective subagents in parallel to audit git & schemas...');
      if (soundEnabled) sounds.playRadarPing();
    }, 1500);

    // Step 2: Invariant proof & tests
    const t2 = setTimeout(() => {
      setStep(2);
      setAutopilotMsg('🧪 3/4: Reproduction tests generated! Generic LLM band-aid ($0 fee) falsified by invariant matrix...');
      if (soundEnabled) sounds.playTestFailure();
    }, 3500);

    // Step 3: Real file healed on disk
    const t3 = setTimeout(async () => {
      try {
        const data = await callHealAPI('fix', 'incident-a');
        setLiveTestOutput(data.output ?? null);
        setLiveTestPassed(data.testsPassed ?? null);
        await checkLiveDiskStatus();
      } catch (e) {
        console.error(e);
      }

      setStep(3);
      setMttrFrozen(5600);
      setShowCrownBanner(true);
      setAutopilotMsg('👑 4/4: Physical SSD healed! Vitest passes on your machine. Outage resolved in 38 seconds!');
      
      setConfetti(
        Array.from({ length: 24 }, (_, i) => ({
          id: Date.now() + i,
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 50,
          color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][i % 6],
        }))
      );
      setTimeout(() => setConfetti([]), 2500);
      if (soundEnabled) sounds.playGreenChime();

      saveIncidentToLocal({
        id: currentIncident.id,
        severity: currentIncident.severity as any,
        title: currentIncident.title,
        target: currentIncident.target,
        alertSnippet: currentIncident.alertSnippet,
        winner: currentIncident.winner,
        detectives: detectives,
        matrix: currentIncident.matrix,
        diff: currentIncident.diff,
        tests: currentIncident.tests,
        postmortem: currentIncident.postmortem,
      }).catch(() => {});
    }, 5500);

    timeoutRefs.current.push(t1, t2, t3);
  };

  // Real end-to-end Triage Squad Launch
  const handleLaunchTriageSquad = async () => {
    if (isPlaying) {
      clearAllTimeouts();
      setIsPlaying(false);
      return;
    }

    if (!DEMO_MODE && step > 0) {
      try {
        await callHealAPI('reset-all', 'all');
      } catch {
        /* silent */
      }
    }

    setIsPlaying(true);
    setElapsedMs(0);
    setMttrFrozen(null);
    setShowCrownBanner(false);
    if (soundEnabled) sounds.playKlaxon();

    const isAnimationOnly = currentIncident.isEscalation || currentIncident.id === 'INC-2043';

    if (isAnimationOnly) {
      const t1 = setTimeout(() => {
        setStep(1);
        if (soundEnabled) sounds.playRadarPing();
      }, 1200 / speed);
      const t2 = setTimeout(() => {
        setStep(2);
        if (soundEnabled) sounds.playTestFailure();
      }, 3200 / speed);
      const t3 = setTimeout(() => {
        setStep(3);
        setMttrFrozen(5600 / speed);
        setShowCrownBanner(true);
        if (!currentIncident.isEscalation) {
          setConfetti(
            Array.from({ length: 16 }, (_, i) => ({
              id: Date.now() + i,
              x: 20 + Math.random() * 60,
              y: 10 + Math.random() * 50,
              color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
            }))
          );
          setTimeout(() => setConfetti([]), 1500);
        }
        setTimeout(() => setShowCrownBanner(false), 3000);
        if (soundEnabled) sounds.playGreenChime();
        setIsPlaying(false);
      }, 5600 / speed);
      timeoutRefs.current.push(t1, t2, t3);
      return;
    }

    const target = currentIncident.targetParam;
    const isCurrentlyFixed =
      selectedIncident === 'A'
        ? (diskStatus.incidentA?.isFixed ?? true)
        : (diskStatus.incidentB?.isFixed ?? true);

    if (isCurrentlyFixed) {
      setStep(0);
      try {
        await callHealAPI('break', target);
        await checkLiveDiskStatus();
      } catch (e) {
        console.error(e);
      }
    }

    const t1 = setTimeout(() => {
      setStep(1);
      if (soundEnabled) sounds.playRadarPing();
    }, 1200 / speed);
    const t2 = setTimeout(() => {
      setStep(2);
      if (soundEnabled) sounds.playTestFailure();
    }, 3200 / speed);
    const t3 = setTimeout(async () => {
      try {
        const data = await callHealAPI('fix', target);
        setLiveTestOutput(data.output ?? null);
        setLiveTestPassed(data.testsPassed ?? null);
        await checkLiveDiskStatus();
      } catch (e) {
        console.error(e);
      }

      setStep(3);
      setMttrFrozen(5600 / speed);
      setShowCrownBanner(true);
      setConfetti(
        Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          x: 20 + Math.random() * 60,
          y: 10 + Math.random() * 50,
          color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
        }))
      );
      setTimeout(() => setConfetti([]), 1500);
      setTimeout(() => setShowCrownBanner(false), 3000);
      if (soundEnabled) sounds.playGreenChime();
      setIsPlaying(false);

      saveIncidentToLocal({
        id: currentIncident.id,
        severity: currentIncident.severity as any,
        title: currentIncident.title,
        target: currentIncident.target,
        alertSnippet: currentIncident.alertSnippet,
        winner: currentIncident.winner,
        detectives: detectives,
        matrix: currentIncident.matrix,
        diff: currentIncident.diff,
        tests: currentIncident.tests,
        postmortem: currentIncident.postmortem,
      }).catch(() => {});
    }, 5600 / speed);
    timeoutRefs.current.push(t1, t2, t3);
  };

  // Timer loop & revenue bleed ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((isPlaying || isAutopilot) && step < 3) {
      interval = setInterval(() => {
        setElapsedMs((prev) => prev + 100 * speed);
        setBleedAmount((prev) => prev + 1.45 * speed);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isAutopilot, step, speed]);

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
  const currentDiskState =
    selectedIncident === 'A'
      ? diskStatus.incidentA
      : selectedIncident === 'B'
      ? diskStatus.incidentB
      : undefined;

  const isTargetFixedOnDisk = currentDiskState?.isFixed ?? true;
  const displayMs = mttrFrozen !== null ? mttrFrozen : elapsedMs;
  const isCrownVerified = step >= 3 && !currentIncident.isEscalation && currentIncident.id !== 'INC-2044';

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
    if (soundEnabled) sounds.playTerminalClick();
    setTimeout(() => setCopiedPostmortem(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white pb-16">
      {/* ========================================================================= */}
      {/* 🚨 ZONE 1: COMMAND CENTER CRISIS HERO & TELEMETRY                        */}
      {/* ========================================================================= */}

      {/* Top Emergency Siren Marquee */}
      <div className="bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white font-mono text-[11px] font-black tracking-widest uppercase px-4 py-1.5 flex items-center justify-between shadow-xl shadow-red-900/30 overflow-hidden relative border-b border-red-500/40">
        <div className="flex items-center gap-3 animate-pulse">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="siren-glow">
            🚨 CRITICAL PRODUCTION OUTAGE • SERVICE: shopfront-api • 100% CHECKOUT FAILURE RATE • CUSTOMER IMPACT: SEVERE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] tracking-normal">
          <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">
            ENGINE: IBM Bob 2.0 Subagent Swarm
          </span>
          <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">
            HARDWARE: Physical Host SSD Execution
          </span>
        </div>
      </div>

      {/* Hero Header Area */}
      <header className="border-b border-slate-800/80 bg-[#0a0e17] px-6 py-6 backdrop-blur-md shadow-2xl relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Headline & Mission */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                AUTONOMOUS INCIDENT COMMANDER
              </span>
              <span className="text-xs font-mono text-slate-400">Team SITA • IBM AI Hackathon</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              MAYDAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">WAR ROOM</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Production is down at 2:00 AM. Watch <strong className="text-white">IBM Bob 2.0</strong> deploy a competing subagent squad, eliminate naive code band-aids, and physically heal real code on your hard drive in <strong className="text-emerald-400">38 seconds</strong>.
            </p>
          </div>

          {/* Dials & Live Telemetry Deck */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
            {/* Dial 1: Live MTTR Clock */}
            <div
              className={`relative border rounded-2xl p-3.5 flex items-center gap-3.5 shadow-xl transition-all duration-500 ${
                isCrownVerified
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-emerald-500/10'
                  : 'bg-slate-900/90 border-slate-700/60'
              }`}
            >
              {showCrownBanner && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-lg shadow-lg animate-bounce font-mono tracking-wide z-30">
                  👑 CROWN FIX VERIFIED
                </div>
              )}
              {confetti.map((c) => (
                <div
                  key={c.id}
                  className="confetti-dot absolute w-2 h-2 rounded-sm pointer-events-none z-30"
                  style={{ left: `${c.x}%`, top: `${c.y}%`, background: c.color }}
                />
              ))}
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
                <Clock
                  className={`w-5 h-5 ${isCrownVerified ? 'text-emerald-400' : 'text-amber-400'} ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '4s' }}
                />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <span>{isCrownVerified ? 'MTTR Frozen ✓' : 'Live MTTR Clock'}</span>
                </div>
                <div
                  className={`font-mono font-black text-xl tabular-nums tracking-wider ${
                    isCrownVerified ? 'text-emerald-400' : 'text-white'
                  }`}
                >
                  {formatTimer(displayMs)}
                </div>
              </div>
            </div>

            {/* Dial 2: Live Financial Bleed Ticker */}
            <div className="border border-red-500/40 bg-red-950/30 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-xl">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <DollarSign className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-red-300/80 flex items-center gap-1">
                  <span>Outage Loss Bleed</span>
                  <span className="text-red-400 font-bold">(-$14.50/s)</span>
                </div>
                <div className="font-mono font-black text-xl tabular-nums text-red-400 tracking-wider">
                  -${bleedAmount.toFixed(2)}
                </div>
                <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                  {step >= 3 ? (
                    <span className="text-emerald-400 font-bold">● Bleed Halted & Protected</span>
                  ) : (
                    <span className="text-red-400/90 font-medium">Active Revenue Bleeding</span>
                  )}
                </div>
              </div>
            </div>

            {/* Dial 3: IBM Instana APM Beacon */}
            <div className="hidden xl:flex border border-blue-500/30 bg-blue-950/20 rounded-2xl p-3.5 items-center gap-3 shadow-xl">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  IBM Instana APM
                </div>
                <div className="font-mono font-bold text-xs text-blue-300 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  Telemetry Stream Active
                </div>
                <div className="text-[9px] font-mono text-slate-500 mt-0.5">100% Ingress Trace Hooked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Action Bar: Autopilot Tour + Controls */}
        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* 🚀 30-Second Autopilot Tour Button */}
            <button
              onClick={startAutopilotTour}
              className="px-4 py-2.5 rounded-xl font-bold text-xs font-mono flex items-center gap-2 transition shadow-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98]"
              title="Runs an automated 30-second guided tour showing the entire self-healing workflow"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>🚀 30-Second Autopilot Tour</span>
            </button>

            {/* Launch Triage Squad Playback */}
            <button
              onClick={handleLaunchTriageSquad}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono flex items-center gap-2 transition shadow-xl ${
                isPlaying
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 shadow-red-600/30'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause Triage' : step === 0 ? 'Launch Triage Squad' : 'Re-Run Triage'}</span>
            </button>

            {/* Reset Simulation */}
            <button
              onClick={resetInvestigation}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Speed Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-mono">
              {[1, 2, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s as any)}
                  className={`px-2.5 py-1.5 rounded-lg transition ${
                    speed === s ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sound Toggle & Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-2 transition"
              title="Toggle Web Audio SFX"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Audio SFX On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Muted</span>
                </>
              )}
            </button>

            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase font-mono text-slate-400">Current Phase</div>
              <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                {step === 0 && 'OUTAGE ACTIVE'}
                {step === 1 && '3 DETECTIVES RACING'}
                {step === 2 && 'REPRODUCING INVARIANT'}
                {step >= 3 && (currentIncident.isEscalation ? 'HONESTLY ESCALATED' : 'PHYSICAL FIX APPLIED')}
              </div>
            </div>
          </div>
        </div>

        {/* Autopilot Guide Floating Subtitle Banner */}
        {isAutopilot && autopilotMsg && (
          <div className="max-w-7xl mx-auto mt-4 p-3 rounded-xl bg-purple-950/60 border border-purple-500/50 flex items-center justify-between gap-3 text-xs font-mono text-purple-200 shadow-xl animate-pulse">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>{autopilotMsg}</span>
            </div>
            <button
              onClick={() => setIsAutopilot(false)}
              className="text-[11px] px-2 py-0.5 rounded bg-purple-800 hover:bg-purple-700 text-white font-bold"
            >
              Exit Tour
            </button>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* ⚡ ZONE 2: THE INTERACTIVE SYSTEM LOGIC PIPELINE (ANIMATED FLOW MAP)      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="bg-[#0b0f19] border border-slate-800/90 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-200 font-mono">
                System Logic Pipeline: How MAYDAY Resolves Outages Without Guesswork
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Deterministic 5-Stage Autonomous Circuit
            </span>
          </div>

          {/* 5-Node Animated Pipeline Map */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {[
              {
                stage: 1,
                title: '1. Outage Trigger',
                subtitle: '500 Server Errors Spike',
                desc: 'Customer checkouts fail with unhandled TypeError.',
                icon: '🚨',
                isActive: true,
                isCompleted: step >= 1,
                badgeColor: 'border-red-500/50 bg-red-950/30 text-red-300',
              },
              {
                stage: 2,
                title: '2. Instana APM Alert',
                subtitle: 'Webhook Ingestion',
                desc: 'Synthetic alert captured with stack trace & blame SHA.',
                icon: '⚡',
                isActive: true,
                isCompleted: step >= 1,
                badgeColor: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
              },
              {
                stage: 3,
                title: '3. Bob 2.0 Swarm',
                subtitle: '3 Parallel Detectives',
                desc: 'Subagents compete: Git blame, contract schema, concurrency.',
                icon: '🤖',
                isActive: step >= 1,
                isCompleted: step >= 2,
                badgeColor: 'border-blue-500/50 bg-blue-950/30 text-blue-300',
              },
              {
                stage: 4,
                title: '4. Invariant Proof',
                subtitle: 'Vitest Repro Matrix',
                desc: 'Failing reproduction test created. Naive band-aids rejected.',
                icon: '🧪',
                isActive: step >= 2,
                isCompleted: step >= 3,
                badgeColor: 'border-purple-500/50 bg-purple-950/30 text-purple-300',
              },
              {
                stage: 5,
                title: '5. Host Disk Healed',
                subtitle: currentIncident.isEscalation ? 'Honest Escalation' : 'Physical SSD Patch',
                desc: currentIncident.isEscalation
                  ? 'Refused fake edits. Escalated to human SRE.'
                  : 'File rewritten on disk & verified by Node Vitest.',
                icon: currentIncident.isEscalation ? '🛡️' : '👑',
                isActive: step >= 3,
                isCompleted: step >= 3,
                badgeColor: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300',
              },
            ].map((node) => {
              const isCurrent =
                (node.stage === 1 && step === 0) ||
                (node.stage === 2 && step === 0) ||
                (node.stage === 3 && step === 1) ||
                (node.stage === 4 && step === 2) ||
                (node.stage === 5 && step >= 3);

              return (
                <div
                  key={node.stage}
                  className={`rounded-xl p-3.5 border transition-all duration-300 relative flex flex-col justify-between ${
                    isCurrent
                      ? `${node.badgeColor} ring-1 ring-white/20 shadow-lg scale-[1.01]`
                      : node.isCompleted
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{node.icon}</span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                          isCurrent
                            ? 'bg-white/20 text-white'
                            : node.isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isCurrent ? 'ACTIVE' : node.isCompleted ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-white">{node.title}</div>
                    <div className="text-[10px] font-mono text-slate-400 font-medium">{node.subtitle}</div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-sans">{node.desc}</p>
                  </div>

                  {isCurrent && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>Processing in real time</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 ZONE 3: 4-INCIDENT CRISIS LAUNCHPAD (HUMAN-FIRST STORIES)              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-400" />
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-200 font-mono">
              Crisis Launchpad: Choose a High-Stakes Scenario
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Click any card to load real repository target</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['A', 'B', 'C', 'D'] as const).map((key) => {
            const inc = INCIDENT_DATA[key];
            const isSelected = selectedIncident === key;

            return (
              <button
                key={key}
                onClick={() => switchIncident(key)}
                className={`text-left rounded-2xl p-4 border transition-all duration-300 relative flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#141b2b] to-[#0b101a] border-blue-500 shadow-xl shadow-blue-950/40 ring-1 ring-blue-400/50 scale-[1.02]'
                    : 'bg-[#0d121d] border-slate-800 hover:border-slate-700 hover:bg-[#111726]'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <span className="absolute -top-2.5 right-4 bg-blue-500 text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-md uppercase">
                    ACTIVE SCENARIO
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                        inc.severity === 'SEV-1'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {inc.id} • {inc.category}
                    </span>
                    <span className="text-lg">
                      {key === 'A' ? '🅰️' : key === 'B' ? '🅱️' : key === 'C' ? '🅲' : '🅳'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white leading-snug group-hover:text-blue-300 transition">
                    {inc.tagline}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                    {inc.alertSnippet}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-slate-400">Impact:</span>
                  <span
                    className={`font-bold ${
                      key === 'D' ? 'text-blue-400' : 'text-red-400'
                    }`}
                  >
                    {inc.dailyLoss}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🔬 ZONE 5: THE HARDWARE PROOF LAB & LIVE DISK CODE VIEWER (MOVED PROMINENTLY) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="bg-[#0b0f19] border border-blue-900/50 rounded-2xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
          {/* Glowing top line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-red-500"></div>

          {/* Header & Verification Promise */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <HardDrive className="w-5 h-5 text-blue-400" />
                <h2 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <span>Hardware Proof Lab: Real OS Disk & Vitest Execution</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    Live OS Kernel Bridge
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                <strong>Proof of Reality:</strong> This is NOT a pre-canned simulation. Clicking buttons below physically breaks/heals files on your SSD and runs <code className="text-slate-200">npx vitest run</code> via Node child_process.
              </p>
            </div>

            {/* Target Disk Status Badge */}
            <div className="flex items-center gap-2">
              {currentIncident.isEscalation ? (
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  STATUS: EXTERNAL CLOUD PROVIDER (CODE UNTOUCHED)
                </span>
              ) : selectedIncident === 'C' ? (
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  STATUS: IN-MEMORY HEAP HARNESS
                </span>
              ) : isTargetFixedOnDisk ? (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  DISK FILE: HEALTHY_PATCHED (PASSES INVARIANTS)
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
                  <Flame className="w-4 h-4 text-red-400" />
                  DISK FILE: SEV-1 BROKEN (REPRODUCIBLE BUG ON DISK)
                </span>
              )}
            </div>
          </div>

          {/* In-Browser Live Code Inspector (Shows Line 37 or 32 Glowing) */}
          <div className="bg-[#07090e] rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">Inspecting Target File on Disk:</span>
                <code className="text-blue-300 font-bold px-2 py-0.5 bg-slate-900 rounded border border-slate-800">
                  {currentIncident.targetFile}
                </code>
              </div>
              <div className="text-[11px] text-slate-500">
                Critical Line: <strong className="text-amber-400">Line {currentIncident.targetLine}</strong>
              </div>
            </div>

            {/* Code lines with glowing Line 37/32 */}
            <div className="space-y-1 overflow-x-auto text-[11px] sm:text-xs leading-relaxed py-1">
              <pre className="text-slate-500">{currentIncident.codeSnippet.before}</pre>

              {/* The Glowing Mutated Line */}
              {isTargetFixedOnDisk ? (
                <div className="bg-emerald-950/60 border border-emerald-500/70 text-emerald-300 px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 shadow-lg shadow-emerald-950/40 my-1">
                  <pre className="font-bold">{currentIncident.codeSnippet.fixedLine}</pre>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider shrink-0">
                    ✅ HEALED ON HARD DRIVE
                  </span>
                </div>
              ) : (
                <div className="bg-red-950/70 border border-red-500/80 text-red-300 px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 shadow-lg shadow-red-950/50 my-1 animate-pulse">
                  <pre className="font-bold">{currentIncident.codeSnippet.brokenLine}</pre>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/30 text-red-300 border border-red-500/50 uppercase tracking-wider shrink-0">
                    🚨 BROKEN ON HARD DRIVE
                  </span>
                </div>
              )}

              <pre className="text-slate-500">{currentIncident.codeSnippet.after}</pre>
            </div>
          </div>

          {/* The 4 Direct Hardware Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              {!currentIncident.isEscalation && selectedIncident !== 'C' && (
                <>
                  {/* Break Code on Disk */}
                  <button
                    onClick={() => triggerHeal('break')}
                    disabled={isHealing || liveTestRunning || isResettingAll}
                    className="px-4 py-2.5 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-200 border border-red-500/50 font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-red-950/50 hover:scale-[1.02] active:scale-[0.98]"
                    title="Physically edits target file on your SSD to broken state and executes Vitest"
                  >
                    <span>💣 Break Code on Disk</span>
                  </button>

                  {/* Auto-Heal (Bob 2.0 Fix) */}
                  <button
                    onClick={() => triggerHeal('fix')}
                    disabled={isHealing || liveTestRunning || isResettingAll}
                    className="px-4 py-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/50 font-mono text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98]"
                    title="Physically writes the Bob 2.0 crown fix to your SSD and verifies tests pass"
                  >
                    <span>🩹 Auto-Heal (Bob 2.0 Fix)</span>
                  </button>

                  {/* Run Machine Vitest */}
                  <button
                    onClick={runLiveTests}
                    disabled={liveTestRunning || isHealing || isResettingAll}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
                    title="Directly executes 'npx vitest run' via Node child_process"
                  >
                    {liveTestRunning ? (
                      <>
                        <RotateCcw className="w-4 h-4 animate-spin" />
                        <span>Running Machine Vitest...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Run Machine Vitest</span>
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Reset All Targets Button */}
              <button
                onClick={resetAllTargets}
                disabled={isResettingAll || isHealing || liveTestRunning}
                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono text-xs font-bold transition flex items-center gap-2"
                title="Restores all test targets to clean patched state"
              >
                {isResettingAll ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Resetting...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Targets</span>
                  </>
                )}
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-400">
              Target microservice: <code className="text-slate-200 font-bold">{currentIncident.target}</code>
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🕵️ ZONE 4: 3-LANE SUBAGENT DETECTIVE RACING ARENA                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-200 font-mono">
              Detective Squad: 3 Subagents Competing in Parallel
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Bob 2.0 Superpower: <strong className="text-blue-400">Adversarial Parallel Triage</strong>
          </span>
        </div>

        {/* The 3 Racing Lanes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {detectives.map((d) => (
            <div
              key={d.agent}
              className={`relative rounded-2xl p-5 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                d.status === 'VERIFIED'
                  ? 'bg-emerald-950/20 border-emerald-500/60 shadow-xl shadow-emerald-500/10'
                  : d.status === 'FALSIFIED'
                  ? 'bg-slate-900/40 border-slate-800 opacity-60'
                  : 'bg-[#0d121d] border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Animated FALSIFIED Rubber Stamp */}
              {d.status === 'FALSIFIED' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="stamp-falsified border-4 border-red-500/90 text-red-400 font-black text-2xl px-5 py-1.5 rounded-lg uppercase tracking-widest bg-black/75 shadow-2xl shadow-red-500/30">
                    FALSIFIED
                  </div>
                </div>
              )}

              {/* Champion Badge when Verified */}
              {d.status === 'VERIFIED' && (
                <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> CROWNED FIX
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

                {/* Theory Statement */}
                <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-xs text-slate-300 font-medium mb-4 leading-relaxed">
                  "{d.theory}"
                </div>

                {/* Proof Ladder */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Scientific Proof Ladder
                  </div>

                  <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded bg-slate-900/50 border border-slate-800/80">
                    <span className="font-mono text-slate-300">R0: Hypothesis Formulated</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs py-1 px-2.5 rounded border transition ${
                      d.rungs.r1
                        ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <span className="font-mono">R1: Suspect Line Located</span>
                    {d.rungs.r1 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-700"></span>
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs py-1 px-2.5 rounded border transition ${
                      d.rungs.r2
                        ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <span className="font-mono">R2: Failing Repro Test Created</span>
                    {d.rungs.r2 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-700"></span>
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between text-xs py-1 px-2.5 rounded border transition ${
                      d.rungs.r3
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200 font-semibold'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <span className="font-mono">R3: Invariant Fix Verified</span>
                    {d.rungs.r3 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-slate-700"></span>
                    )}
                  </div>
                </div>
              </div>

              {/* Shimmer during reasoning */}
              {d.status === 'INVESTIGATING' && (isPlaying || isAutopilot) && (
                <div className="mt-2 mb-2 space-y-1.5">
                  <div className="thinking-shimmer w-full h-2" />
                  <div className="thinking-shimmer w-3/4 h-2" />
                  <div className="text-[10px] text-blue-400/70 font-mono animate-pulse">
                    IBM Bob 2.0 reasoning in parallel...
                  </div>
                </div>
              )}

              {/* Evidence Typing Stream */}
              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                {d.falsifiedReason ? (
                  <div className="text-red-400 flex items-start gap-1.5">
                    <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{d.falsifiedReason}</span>
                  </div>
                ) : (
                  <div className="text-slate-400 flex items-start gap-1.5">
                    <Search className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-400" />
                    <TypewriterText text={d.evidence} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 🧠 "The AI Duel" (Why Generic LLMs Fail) */}
        {step >= 2 && detectives[1]?.status === 'FALSIFIED' && currentIncident.id !== 'INC-2044' && (
          <div className="mt-5 bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-emerald-950/30 border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-500/30 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-300 uppercase tracking-wider">
                  The AI Duel: Why Generic LLMs Fail vs. IBM Bob 2.0 Invariant Prover
                </span>
              </div>
              <span className="text-xs font-mono text-red-400 font-bold">
                Financial Risk: -$11,600 / day Silent Leak
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Naive LLM Side */}
              <div className="bg-black/60 rounded-xl p-4 border border-red-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-red-300">
                  <span className="font-bold">❌ Generic Copilot / ChatGPT Band-Aid:</span>
                  <span className="text-[10px] bg-red-500/20 px-2 py-0.5 rounded">Hides the Crash</span>
                </div>
                <div className="bg-black rounded-lg p-3 font-mono text-xs text-red-300 border border-red-900/50 leading-relaxed">
                  <span className="text-slate-500">// Naive fix: silences TypeError</span>
                  <br />
                  <span className="text-red-400">const fee = (gatewayRaw as any).fee?.amount ?? 0;</span>
                  <br />
                  <span className="text-slate-400">const total = req.amountDollars + fee;</span>
                </div>
                <div className="text-xs text-red-300/90 font-mono space-y-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>Customer charged $10.00 instead of $10.29 (fee silently $0.00)</span>
                  </div>
                  <div className="text-[11px] text-red-400 font-bold pl-5">
                    40,000 txns/day × $0.29 fee = <strong className="text-white">$11,600/day invisible loss</strong>
                  </div>
                </div>
              </div>

              {/* MAYDAY IBM Bob 2.0 Crown Fix Side */}
              <div className="bg-black/60 rounded-xl p-4 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                  <span className="font-bold">✅ MAYDAY Crown Fix (Invariant-Verified):</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">Preserves Invariant</span>
                </div>
                <div className="bg-black rounded-lg p-3 font-mono text-xs text-emerald-300 border border-emerald-900/50 leading-relaxed">
                  <span className="text-slate-500">// Maps PayLink SDK v3.0 feeCents (/100)</span>
                  <br />
                  <span className="text-emerald-400">const fee = gatewayRaw.data.feeCents / 100;</span>
                  <br />
                  <span className="text-slate-400">const total = req.amountDollars + fee;</span>
                </div>
                <div className="text-xs text-emerald-300/90 font-mono space-y-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Customer charged $10.29. 2.9% fee invariant preserved.</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold pl-5">
                    Automated Cross-Examination: <strong className="text-white">8/8 invariant tests pass ✓</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-amber-300/90 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                <strong>Enterprise Invariant Guarantee:</strong> MAYDAY rejects solutions that merely stop exceptions. It enforces mathematical business assertions to protect revenue.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* ⚖️ ZONE 6: BEFORE VS. AFTER: HUMAN ON-CALL VS. MAYDAY ROI                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6">
        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-200 font-mono">
                Executive ROI Matrix: Traditional Human On-Call vs. MAYDAY Autonomous Commander
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">98.2% Downtime Reduction</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/70 text-slate-400 font-mono">
                  <th className="p-3">Performance Dimension</th>
                  <th className="p-3 text-red-300">Traditional Human On-Call (The 3 AM Panic)</th>
                  <th className="p-3 text-emerald-300">MAYDAY + IBM Bob 2.0 Autonomous Swarm</th>
                  <th className="p-3 text-right">Enterprise Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                <tr className="hover:bg-slate-900/30 transition">
                  <td className="p-3 font-semibold text-white">Mean Time to Resolution (MTTR)</td>
                  <td className="p-3 text-slate-300">
                    <strong className="text-red-400">35 to 45 Minutes</strong> (waking engineers, reading logs)
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">38 Seconds (Autonomous Self-Healing)</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">98.2% Faster ⚡</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition">
                  <td className="p-3 font-semibold text-white">Downtime Financial Loss</td>
                  <td className="p-3 text-slate-300">
                    <strong className="text-red-400">$8,400 to $15,000</strong> in lost cart checkouts
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">&lt;$250 Total Exposure (Bleed Halted)</td>
                  <td className="p-3 text-right text-emerald-400 font-bold">$11,350+ Saved</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition">
                  <td className="p-3 font-semibold text-white">Patch Verification Quality</td>
                  <td className="p-3 text-slate-300">
                    Rushed band-aids (<code className="text-red-300">try/catch</code>, optional chaining)
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">
                    Mathematically Proven AST Patches (Passing Invariants)
                  </td>
                  <td className="p-3 text-right text-emerald-400 font-bold">Zero Regression</td>
                </tr>
                <tr className="hover:bg-slate-900/30 transition">
                  <td className="p-3 font-semibold text-white">Engineering Toll & Cost</td>
                  <td className="p-3 text-slate-300">
                    4 senior engineers paged at 3:00 AM (burnout & fatigue)
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">
                    $0.35 in Bobcoins (Autonomous Subagent Swarm)
                  </td>
                  <td className="p-3 text-right text-emerald-400 font-bold">Zero Human Fatigue</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📑 ZONE 7: DEEP-DIVE INVESTIGATION VAULT (THE 4 TABS)                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-6">
        {/* Feature: Black Box Git Crime-Scene Timeline */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 font-mono">
                Black Box Git Crime-Scene Timeline & Culprit Locator
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                branch: <strong className="text-white">main</strong>
              </span>
              <span>• Click any commit to inspect unified diff</span>
            </div>
          </div>

          {/* Interactive Commit Track */}
          <div className="relative py-4 px-2">
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -translate-y-1/2 z-0"></div>

            <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto">
              {currentIncident.commits.map((c) => {
                const isSelected = selectedCommit.sha === c.sha;
                const isCulprit = c.type === 'CULPRIT';
                const isFix = c.type === 'CROWN_FIX';

                return (
                  <button
                    key={c.sha}
                    onClick={() => {
                      setSelectedCommit(c);
                      if (soundEnabled) sounds.playTerminalClick();
                    }}
                    className={`flex flex-col items-center gap-2 group transition focus:outline-none min-w-[110px] ${
                      isSelected ? 'scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition shadow-lg ${
                          isCulprit
                            ? 'bg-red-500/20 border-red-500 text-red-400 shadow-red-500/30'
                            : isFix
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-emerald-500/30'
                            : isSelected
                            ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-blue-500/20'
                            : 'bg-slate-900 border-slate-700 text-slate-400 group-hover:border-slate-500'
                        }`}
                      >
                        {isCulprit ? (
                          <Flame className="w-4 h-4 animate-bounce" />
                        ) : isFix ? (
                          <Sparkles className="w-4 h-4" />
                        ) : (
                          <GitCommit className="w-4 h-4" />
                        )}
                      </div>

                      {isCulprit && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                      )}
                    </div>

                    <div className="text-center font-mono">
                      <div
                        className={`text-xs font-bold ${
                          isCulprit
                            ? 'text-red-400'
                            : isFix
                            ? 'text-emerald-400'
                            : isSelected
                            ? 'text-blue-300'
                            : 'text-slate-300'
                        }`}
                      >
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

          {/* Selected Commit Detail Box */}
          <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800 text-xs font-mono space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{selectedCommit.avatar}</span>
                <div>
                  <span className="font-bold text-white text-sm">{selectedCommit.message}</span>
                  <div className="text-[11px] text-slate-400">
                    Author: <strong className="text-slate-200">{selectedCommit.author}</strong> (
                    {selectedCommit.timeAgo}) • SHA: <code className="text-blue-400">{selectedCommit.sha}</code>
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
                    <Check className="w-3.5 h-3.5 text-blue-400" />✓ CLEAN COMMIT
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>
                  File: <strong className="text-slate-300">{selectedCommit.fileChanged}</strong>
                </span>
                <span>Unified Diff</span>
              </div>
              <pre className="p-3 bg-black/80 rounded-lg border border-slate-900 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                {selectedCommit.diffSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Deep-Dive Investigation Station Tabs */}
        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tab Navigation */}
          <div className="border-b border-slate-800 px-6 py-3 flex items-center justify-between bg-slate-900/50 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'matrix'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Cross-Examination Matrix
              </button>

              <button
                onClick={() => setActiveTab('diff')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'diff'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5" /> Surgeon Code Diff
              </button>

              <button
                onClick={() => setActiveTab('tests')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'tests'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Real Vitest Stream
              </button>

              <button
                onClick={() => setActiveTab('postmortem')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
                  activeTab === 'postmortem'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Scribe 5-Whys Postmortem
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400 hidden sm:inline">
              Evidence Engine: <span className="text-emerald-400 font-semibold">Deterministic Vitest Invariants</span>
            </div>
          </div>

          {/* Tab 1: Cross-Examination Matrix */}
          {activeTab === 'matrix' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Deterministic Cross-Examination Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Candidate patches tested against every detective's reproduction test. Band-aids are immediately exposed.
                  </p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  N×N Assertion Tournament
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
                        <td
                          className={`p-3 font-semibold ${
                            row.isWinner ? 'text-slate-200' : 'text-slate-400'
                          }`}
                        >
                          {row.name}
                        </td>
                        <td
                          className={`p-3 font-semibold ${
                            row.isWinner ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {row.repro}
                        </td>
                        <td
                          className={`p-3 font-semibold ${
                            row.isWinner ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {row.crash}
                        </td>
                        <td
                          className={`p-3 font-semibold ${
                            row.isWinner ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {row.suite}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded font-bold border ${
                              row.isWinner
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}
                          >
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
                <span>
                  Target: <span className="text-white">{currentIncident.diff.file}</span>
                </span>
                <span className="text-emerald-400">Self-Healing Attempt: 1/3 (Green on First Try)</span>
              </div>
              <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800/80 space-y-1 overflow-x-auto">
                <div className="text-slate-500">// {currentIncident.title}</div>
                <div className="text-slate-400"> {currentIncident.diff.context}</div>
                <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded -mx-2 whitespace-pre-wrap">
                  {currentIncident.diff.removed}
                </div>
                <div className="bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-1 rounded -mx-2 whitespace-pre-wrap">
                  {currentIncident.diff.added}
                </div>
                <div className="text-slate-400"> {currentIncident.diff.after}</div>
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
                    Direct execution via Node.js child_process against{' '}
                    <code className="text-slate-200">targets/shopfront</code>.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {!currentIncident.isEscalation && selectedIncident !== 'C' && (
                    <>
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
                    </>
                  )}

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
                      <span>
                        Click <strong>"Run Live Vitest"</strong> or <strong>"Break File on Disk"</strong> above to execute tests on your computer!
                      </span>
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
                  <p className="text-slate-400">Autonomously authored by IBM Bob 2.0 Scribe Agent</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyPostmortemMarkdown}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition border border-slate-700"
                  >
                    {copiedPostmortem ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
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
                      <GitPullRequest className="w-3.5 h-3.5" /> Open Verified PR #
                      {currentIncident.postmortem.prNumber} <ExternalLink className="w-3 h-3 ml-1" />
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
                  <div className="text-lg font-bold text-emerald-400 font-mono">
                    {currentIncident.postmortem.ttvf}
                  </div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Human Baseline MTTR</div>
                  <div className="text-lg font-bold text-slate-300 font-mono">
                    {currentIncident.postmortem.humanBaseline}
                  </div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">MTTR Improvement</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">
                    {currentIncident.postmortem.improvement}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800 space-y-2 text-slate-300 leading-relaxed">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                  Root Cause & Rejection Analysis
                </h4>
                <p>{currentIncident.postmortem.rootCause}</p>
                <p>
                  <strong>Why decoy theories were rejected:</strong>{' '}
                  {currentIncident.postmortem.rejectionReason}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Strip */}
      <footer className="mt-12 border-t border-slate-800/80 bg-[#07090e] px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">MAYDAY Autonomous Incident Commander</span>
          <span>•</span>
          <span>IBM Bob 2.0 AI Hackathon</span>
          <span>•</span>
          <span>Team SITA (Himanshu Kumar &amp; Priyansu Modi)</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="text-emerald-400 font-semibold">● 4 Outage Scenarios (A, B, C, D) Supported</span>
          <span className="text-slate-400">Deterministic Invariant Ladder v2.0</span>
        </div>
      </footer>
    </div>
  );
}
