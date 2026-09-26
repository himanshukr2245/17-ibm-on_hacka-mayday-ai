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

export default function MaydayWarRoom() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const [step, setStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'diff' | 'tests' | 'postmortem'>('matrix');
  const [selectedIncident, setSelectedIncident] = useState<'A' | 'B' | 'D'>('A');

  // Detective State
  const [detectives, setDetectives] = useState<Hypothesis[]>([
    {
      agent: 'RECON-1',
      name: 'Recent Changes Detective',
      avatar: '🕵️',
      theory: 'Dependency bump paylink-sdk 2.4 → 3.0 broke response schema contract',
      status: 'INVESTIGATING',
      rungs: { r0: true, r1: false, r2: false, r3: false },
      evidence: 'Scanning git blame on src/payment/adapter.ts...'
    },
    {
      agent: 'RECON-2',
      name: 'Null-Safety & Logic Detective',
      avatar: '🛡️',
      theory: 'Missing optional chaining on response.fee; upstream returned null',
      status: 'INVESTIGATING',
      rungs: { r0: true, r1: false, r2: false, r3: false },
      evidence: 'Auditing adapter.ts:31 for undefined member access...'
    },
    {
      agent: 'RECON-3',
      name: 'Concurrency & Race Detective',
      avatar: '⚡',
      theory: 'Check-then-act race condition in parallel checkout promise handling',
      status: 'INVESTIGATING',
      rungs: { r0: true, r1: false, r2: false, r3: false },
      evidence: 'Tracing request lifecycle in checkout.ts for async gaps...'
    }
  ]);

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
    if (step >= 1) {
      // Step 1: Suspects located
      setDetectives((prev) => [
        { ...prev[0], rungs: { ...prev[0].rungs, r1: true }, evidence: 'Found commit e9a18f4: bump paylink-sdk 2.4 → 3.0' },
        { ...prev[1], rungs: { ...prev[1].rungs, r1: true }, evidence: 'Located rawPaylinkGatewayCall() reading fee.amount' },
        { ...prev[2], status: 'FALSIFIED', falsifiedReason: 'Execution graph is completely serial. No race condition.' }
      ]);
    }
    if (step >= 2) {
      // Step 2: Reproduction test
      setDetectives((prev) => [
        { ...prev[0], rungs: { ...prev[0].rungs, r2: true }, evidence: 'Reproduction test written: checkout.test.ts (Fails: 2.9% fee expected)' },
        { ...prev[1], evidence: 'Proposes band-aid patch: res.fee?.amount ?? 0' },
        prev[2]
      ]);
    }
    if (step >= 3) {
      // Step 3: Cross Examination Matrix eliminates RECON-2
      setDetectives((prev) => [
        { ...prev[0], rungs: { ...prev[0].rungs, r3: true }, status: 'VERIFIED', evidence: 'Patch passes reproduction test & preserves 2.9% fee!' },
        { ...prev[1], status: 'FALSIFIED', falsifiedReason: 'Band-aid patch silently omits fee and fails business invariant!' },
        prev[2]
      ]);
    }
  }, [step]);

  const resetInvestigation = () => {
    setIsPlaying(false);
    setStep(0);
    setElapsedMs(0);
    setDetectives([
      {
        agent: 'RECON-1',
        name: 'Recent Changes Detective',
        avatar: '🕵️',
        theory: 'Dependency bump paylink-sdk 2.4 → 3.0 broke response schema contract',
        status: 'INVESTIGATING',
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Scanning git blame on src/payment/adapter.ts...'
      },
      {
        agent: 'RECON-2',
        name: 'Null-Safety & Logic Detective',
        avatar: '🛡️',
        theory: 'Missing optional chaining on response.fee; upstream returned null',
        status: 'INVESTIGATING',
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Auditing adapter.ts:31 for undefined member access...'
      },
      {
        agent: 'RECON-3',
        name: 'Concurrency & Race Detective',
        avatar: '⚡',
        theory: 'Check-then-act race condition in parallel checkout promise handling',
        status: 'INVESTIGATING',
        rungs: { r0: true, r1: false, r2: false, r3: false },
        evidence: 'Tracing request lifecycle in checkout.ts for async gaps...'
      }
    ]);
  };

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
                <span>Target: <span className="text-slate-200">shopfront-api</span></span>
                <span>•</span>
                <span className="text-blue-400 font-semibold flex items-center gap-1">
                  <Cpu className="w-3 h-3" /> Powered by IBM Bob 2.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: MTTR Live Clock */}
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
              onClick={() => { setSelectedIncident('A'); resetInvestigation(); }}
              className={`px-3 py-1 rounded text-xs font-medium transition ${selectedIncident === 'A' ? 'bg-red-500 text-white font-semibold shadow-lg shadow-red-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              🅰️ Incident A (Hero)
            </button>
            <button 
              onClick={() => { setSelectedIncident('B'); resetInvestigation(); }}
              className={`px-3 py-1 rounded text-xs font-medium transition ${selectedIncident === 'B' ? 'bg-amber-500 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              🅱️ Incident B (Race)
            </button>
            <button 
              onClick={() => { setSelectedIncident('D'); resetInvestigation(); }}
              className={`px-3 py-1 rounded text-xs font-medium transition ${selectedIncident === 'D' ? 'bg-blue-500 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              🅳 Incident D (Escalate)
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
                  INC-2041 [SEV-1]
                </span>
                <h1 className="font-bold text-white text-base">
                  TypeError: Cannot read properties of undefined (reading 'amount')
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Unhandled rejection in <span className="text-red-400">src/payment/adapter.ts:31</span> during customer checkout. 100% failure rate for live transactions.
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
            {detectives.map((d, index) => (
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
                    <div className="border-4 border-red-500/80 text-red-500 font-black text-2xl px-4 py-1 rounded-lg uppercase tracking-widest stamp-falsified bg-black/60 shadow-2xl">
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
                      <th className="p-3">Repro Test 1 (2.9% Fee Invariant)</th>
                      <th className="p-3">Crash Prevention Test</th>
                      <th className="p-3">Full Regression Suite</th>
                      <th className="p-3">Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    <tr className="hover:bg-slate-900/30 transition">
                      <td className="p-3 font-semibold text-slate-200">
                        RECON-1: Contract Adapter Update
                      </td>
                      <td className="p-3 text-emerald-400 font-semibold">✅ PASSED ($10.29 charged)</td>
                      <td className="p-3 text-emerald-400 font-semibold">✅ PASSED (No 500 error)</td>
                      <td className="p-3 text-emerald-400 font-semibold">✅ 8/8 PASSED</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                          VALID CROWN FIX
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-900/30 transition">
                      <td className="p-3 font-semibold text-slate-400">
                        RECON-2: Lazy Optional Chaining (`res.fee?.amount ?? 0`)
                      </td>
                      <td className="p-3 text-red-400 font-semibold">❌ FAILED ($0.00 charged)</td>
                      <td className="p-3 text-emerald-400 font-semibold">✅ PASSED (Stops crash)</td>
                      <td className="p-3 text-red-400 font-semibold">❌ INVARIANT BROKEN</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                          REJECTED: SILENT DATA LOSS
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Surgeon Code Diff */}
          {activeTab === 'diff' && (
            <div className="p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>File: <span className="text-white">src/payment/adapter.ts</span></span>
                <span className="text-emerald-400">Self-Healing Attempt: 1/3 (Green on First Try)</span>
              </div>
              <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800/80 space-y-1 overflow-x-auto">
                <div className="text-slate-500">// PayLink SDK v3.0 contract mapping</div>
                <div className="text-slate-400">  const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);</div>
                <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded -mx-2 flex items-center gap-2">
                  <span>-</span>
                  <span>const fee = (gatewayRaw as any).fee.amount; // BUG: Undefined in SDK v3.0</span>
                </div>
                <div className="bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-1 rounded -mx-2 flex items-center gap-2">
                  <span>+</span>
                  <span>const fee = (gatewayRaw as any).data.feeCents / 100; // FIX: Map v3.0 feeCents</span>
                </div>
                <div className="text-slate-400">  const total = req.amountDollars + fee;</div>
              </div>
            </div>
          )}

          {/* Tab 3: Vitest Logs */}
          {activeTab === 'tests' && (
            <div className="p-6 font-mono text-xs bg-[#07090e]">
              <div className="text-slate-400 pb-2 border-b border-slate-800 mb-3 flex items-center justify-between">
                <span>Test Runner: <span className="text-white">vitest v1.5.0</span></span>
                <span className="text-emerald-400">✓ All Suites Passed (3/3)</span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-emerald-400 font-bold">✓ test/checkout.test.ts (1 test passed)</div>
                <div className="text-slate-400 pl-4">→ should successfully complete checkout with correct 2.9% fee calculation (38ms)</div>
                <div className="text-emerald-400 font-bold">✓ test/payment.test.ts (3 tests passed)</div>
                <div className="text-emerald-400 font-bold">✓ test/orders.test.ts (4 tests passed)</div>
                <div className="pt-3 border-t border-slate-800 text-slate-400 flex items-center gap-6">
                  <span>Test Files: <span className="text-emerald-400 font-bold">3 passed</span></span>
                  <span>Tests: <span className="text-emerald-400 font-bold">8 passed</span> (8 total)</span>
                  <span>Duration: <span className="text-white">412ms</span></span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Auto-Generated Postmortem */}
          {activeTab === 'postmortem' && (
            <div className="p-6 space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">INC-2041 Postmortem: PayLink SDK v3.0 Contract Drift</h3>
                  <p className="text-slate-400">Generated automatically by IBM Bob 2.0 Scribe Agent</p>
                </div>
                <a 
                  href="https://github.com/team-sita/shopfront/pull/104"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold flex items-center gap-1.5 hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
                >
                  <GitPullRequest className="w-3.5 h-3.5" /> Open Verified PR #104 <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Time to Root Cause</div>
                  <div className="text-lg font-bold text-white font-mono">14 Seconds</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Time to Verified Fix</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">42 Seconds</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">Human Baseline MTTR</div>
                  <div className="text-lg font-bold text-slate-300 font-mono">28 Minutes</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-mono">MTTR Improvement</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">97.5% Faster ⚡</div>
                </div>
              </div>

              <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800 space-y-2 text-slate-300 leading-relaxed">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider font-mono">Root Cause & Rejection Analysis</h4>
                <p>
                  At 03:14 UTC, commit <code className="text-blue-400">e9a18f4</code> bumped <code className="text-slate-200">paylink-sdk</code> to version 3.0. The SDK changed its response schema from <code className="text-amber-300">fee.amount</code> to <code className="text-emerald-300">data.feeCents</code>.
                </p>
                <p>
                  <strong>Why RECON-2's theory was rejected:</strong> Agent RECON-2 proposed an optional chaining fallback (<code className="text-red-300">res.fee?.amount ?? 0</code>). While this stopped the crash, MAYDAY's automated Cross-Examination Matrix revealed it charged $0 processing fees, resulting in direct business revenue loss. RECON-1's contract mapping was verified and crowned.
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
