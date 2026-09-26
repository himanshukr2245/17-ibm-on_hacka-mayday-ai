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
  ExternalLink
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

const INCIDENT_DATA = {
  A: {
    id: 'INC-2041',
    severity: 'SEV-1',
    title: "TypeError: Cannot read properties of undefined (reading 'amount')",
    target: 'payment-service (src/payment/adapter.ts:31)',
    alertSnippet: 'Unhandled rejection during customer checkout. 100% failure rate for live transactions.',
    winner: 'RECON-1',
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
      added: '+ const fee = (gatewayRaw as any).data.feeCents / 100; // FIX: Map v3.0 feeCents (/ 100 mandatory)',
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
    alertSnippet: 'Ghost 500s during flash sale burst. Warehouse stock dipped to -10 with 10 units oversold.',
    winner: 'RECON-3',
    detectives: [
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Commit 4b91f02: Batch processing optimization removed serial checkout lock',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing git history for inventory fulfillment batching...'
      },
      {
        agent: 'RECON-2',
        name: 'Resilience & Retry Detective',
        avatar: '🛡️',
        theory: 'Transient database lock timeout; wrapping reserveStock in retry loop will fix it',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Checking database lock wait metrics & connection timeouts...'
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Check-then-act race in reserveStock(): read of currentStock interleaves with async delay',
        status: 'INVESTIGATING' as const,
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Modeling non-atomic async execution window in reserveStock()...'
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
      context: 'const skuLocks = new Map<string, Promise<void>>();',
      removed: '- // Check then act without concurrency guard:\n- const currentStock = inventoryDb[sku];\n- await delay(10);\n- inventoryDb[sku] = currentStock - qty;',
      added: '+ // FIX (INC-2042): Serialize per-SKU inventory reservations via mutex queue\n+ await acquireLock(sku, async () => {\n+   if (inventoryDb[sku] >= qty) { inventoryDb[sku] -= qty; return true; }\n+   return false;\n+ });',
      after: 'return { success, remaining: inventoryDb[sku] };'
    },
    tests: [
      { name: '✓ test/inventory.test.ts (1 test passed)', detail: '→ should prevent overselling and negative stock under high concurrency (33ms)' },
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
  }
};

export default function MaydayWarRoom() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const [step, setStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'diff' | 'tests' | 'postmortem'>('matrix');
  const [selectedIncident, setSelectedIncident] = useState<'A' | 'B'>('A');

  const currentIncident = INCIDENT_DATA[selectedIncident];
  const [detectives, setDetectives] = useState<Hypothesis[]>(currentIncident.detectives);

  // Switch incident
  const switchIncident = (inc: 'A' | 'B') => {
    setSelectedIncident(inc);
    setIsPlaying(false);
    setStep(0);
    setElapsedMs(0);
    setDetectives(INCIDENT_DATA[inc].detectives);
  };

  const resetInvestigation = () => {
    setIsPlaying(false);
    setStep(0);
    setElapsedMs(0);
    setDetectives(currentIncident.detectives);
  };

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && step < 6) {
      interval = setInterval(() => {
        setElapsedMs((prev) => prev + 100 * speed);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, speed]);

  // Stepper simulation loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && step < 6) {
      const delays = [1500, 2200, 2500, 2200, 2500, 2000];
      timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, delays[step] / speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, speed]);

  // Update detective state based on step
  useEffect(() => {
    if (step === 1) sounds.playRadarPing();
    if (step === 2) sounds.playTestFailure();
    if (step === 3) sounds.playGreenChime();

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

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white">
      {/* Top Banner: Incident Alert */}
      <header className="border-b border-slate-800/80 bg-[#0d121d]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 animate-pulse">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-white text-lg flex items-center gap-1.5">
                  MAYDAY <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold bg-red-500/20 text-red-400 border border-red-500/30">WAR ROOM</span>
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">| Autonomous Incident Commander</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span>Target: <span className="text-slate-200">{currentIncident.target}</span></span>
                <span>•</span>
                <span className="text-blue-400 font-semibold flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> Powered by IBM Bob 2.0
                </span>
              </div>
            </div>
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

          {/* Incident Selector */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => switchIncident('A')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedIncident === 'A' 
                  ? 'bg-red-500 text-white font-semibold shadow-lg shadow-red-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🅰️ Incident A (Contract Drift)
            </button>
            <button 
              onClick={() => switchIncident('B')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                selectedIncident === 'B' 
                  ? 'bg-amber-500 text-white font-semibold shadow-lg shadow-amber-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🅱️ Incident B (Concurrency Race)
            </button>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition shadow-lg ${
              isPlaying
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-500 hover:to-rose-500 shadow-red-600/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isPlaying ? 'Pause Investigation' : step === 0 ? 'Launch Triage Squad' : 'Resume'}
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
      </header>

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
                {step === 3 && 'CROSS-EXAMINATION MATRIX'}
                {step === 4 && 'SURGEON SELF-HEALING LOOP'}
                {step >= 5 && '✅ RESOLVED & VERIFIED'}
              </div>
            </div>
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

        {/* Section 2: Interactive Tabs (Cross-Exam Matrix, Code Diff, Vitest Logs, Postmortem) */}
        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tab Bar */}
          <div className="border-b border-slate-800 px-6 py-3 flex items-center justify-between bg-slate-900/50">
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
                <span>File: <span className="text-white">{currentIncident.diff.file}</span></span>
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

          {/* Tab 3: Vitest Logs */}
          {activeTab === 'tests' && (
            <div className="p-6 font-mono text-xs bg-[#07090e]">
              <div className="text-slate-400 pb-2 border-b border-slate-800 mb-3 flex items-center justify-between">
                <span>Test Runner: <span className="text-white">vitest v1.6.1</span></span>
                <span className="text-emerald-400">✓ Invariant Tests Passing</span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                {currentIncident.tests.map((t, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-emerald-400 font-bold">{t.name}</div>
                    <div className="text-slate-400 pl-4">{t.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Auto-Generated Postmortem */}
          {activeTab === 'postmortem' && (
            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">{currentIncident.postmortem.title}</h3>
                  <p className="text-slate-400">Generated automatically by IBM Bob 2.0 Scribe Agent</p>
                </div>
                <a 
                  href={currentIncident.postmortem.prUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1.5 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
                >
                  <GitPullRequest className="w-3.5 h-3.5" /> Open Verified PR #{currentIncident.postmortem.prNumber} <ExternalLink className="w-3 h-3 ml-1" />
                </a>
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
          <span className="text-emerald-400 font-semibold">● 3 Subagents Active</span>
          <span className="text-slate-400">Deterministic Proof Ladder v1.0</span>
        </div>
      </footer>
    </div>
  );
}
