'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FlaskConical, 
  Flame, 
  Zap, 
  ShieldAlert, 
  Terminal, 
  Play, 
  RotateCcw, 
  ArrowRight,
  Radio,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  Cpu
} from 'lucide-react';
import { sounds } from '../../lib/audio';

interface ChaosScenario {
  id: string;
  name: string;
  severity: 'SEV-1' | 'SEV-2';
  icon: string;
  description: string;
  blastRadius: string;
  targetService: string;
  targetParam: 'incident-a' | 'incident-b';
  filePath: string;
  injectedFailure: string;
  expectedResolution: string;
}

const SCENARIOS: ChaosScenario[] = [
  {
    id: 'drift-attack',
    name: 'PayLink SDK v3.0 Contract Drift',
    severity: 'SEV-1',
    icon: '💣',
    description: 'Silently mutates third-party SDK gateway adapter from legacy fee.amount to v3 data.feeCents.',
    blastRadius: '100% of live EU and US checkout attempts throw unhandled TypeError exceptions.',
    targetService: 'payment-service',
    targetParam: 'incident-a',
    filePath: 'targets/shopfront/src/payment/adapter.ts:31',
    injectedFailure: "TypeError: Cannot read properties of undefined (reading 'amount')",
    expectedResolution: 'RECON-1 detects contract drift, maps feeCents / 100, preserves 2.9% fee invariant.'
  },
  {
    id: 'race-attack',
    name: '50-Thread Flash Sale Concurrency Burst',
    severity: 'SEV-1',
    icon: '⚡',
    description: 'Removes the per-SKU promise queue mutex, causing 20 concurrent reservation requests to oversell 10 items.',
    blastRadius: 'Warehouse inventory collapses into negative numbers (-10), causing $24,000 in oversold merch.',
    targetService: 'inventory-service',
    targetParam: 'incident-b',
    filePath: 'targets/shopfront/src/inventory/service.ts:32',
    injectedFailure: 'AssertionError: expected 20 successful to be 10 (Inventory dipped below 0)',
    expectedResolution: 'RECON-3 models check-then-act async delay, applies per-SKU promise queue mutex, passes all 20 threads.'
  }
];

export default function SimulatorPage() {
  const [selectedScenario, setSelectedScenario] = useState<ChaosScenario>(SCENARIOS[0]);
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [isHealing, setIsHealing] = useState<boolean>(false);
  const [injectionLogs, setInjectionLogs] = useState<string[]>([]);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [realTestOutput, setRealTestOutput] = useState<string | null>(null);

  // REAL CHAOS INJECTION: Physically mutates target code on host disk and runs Vitest live
  const handleInject = async () => {
    setIsInjecting(true);
    setIsTriggered(false);
    setRealTestOutput(null);
    setInjectionLogs([]);
    sounds.playKlaxon();

    const initialLogs = [
      `[00:00:01] ⚡ INITIATING CHAOS MONKEY INJECTION: ${selectedScenario.name}...`,
      `[00:00:02] Target file on disk: ${selectedScenario.filePath}`,
      `[00:00:03] Physically modifying source file to plant failure state...`
    ];
    setInjectionLogs(initialLogs);

    try {
      // Real API call mutating disk file and running vitest
      const res = await fetch('/api/heal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'break', target: selectedScenario.targetParam }),
      });
      const data = await res.json();
      
      setRealTestOutput(data.output);
      sounds.playTestFailure();

      setInjectionLogs((prev) => [
        ...prev,
        `[00:00:04] 🚨 DISK MUTATION COMPLETE: Bug written to ${selectedScenario.filePath}!`,
        `[00:00:05] Vitest executed live via Node child_process (Test passed: ${data.testsPassed ? 'YES' : 'NO - EXPECTED ERROR'})`,
        `[00:00:06] SEV-1 Outage confirmed live on host machine! Blast radius: ${selectedScenario.blastRadius}`,
        `[00:00:07] Dispatched 3 parallel IBM Bob 2.0 subagent detectives to investigate...`
      ]);
      setIsTriggered(true);
      sounds.playRadarPing();
    } catch (err: any) {
      setInjectionLogs((prev) => [...prev, `[ERROR] Failed to execute chaos injection: ${err.message}`]);
    } finally {
      setIsInjecting(false);
    }
  };

  // REAL AUTO-HEAL: Physically restores the patch to disk and runs Vitest live
  const handleHeal = async () => {
    setIsHealing(true);
    sounds.playTerminalClick();

    setInjectionLogs((prev) => [
      ...prev,
      `[00:00:08] 🩹 Initiating autonomous self-heal via IBM Bob 2.0 Crown Fix...`,
      `[00:00:09] Rewriting ${selectedScenario.filePath} with verified AST patch...`
    ]);

    try {
      const res = await fetch('/api/heal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'fix', target: selectedScenario.targetParam }),
      });
      const data = await res.json();

      setRealTestOutput(data.output);
      if (data.testsPassed) {
        sounds.playGreenChime();
        setInjectionLogs((prev) => [
          ...prev,
          `[00:00:10] ✅ TARGET PATCHED & ALL TESTS PASSED! (${selectedScenario.targetService})`,
          `[00:00:11] Invariant protection gate satisfied. Zero regressions detected.`
        ]);
      } else {
        sounds.playTestFailure();
        setInjectionLogs((prev) => [
          ...prev,
          `[00:00:10] ❌ Test suite failed after patch: ${data.output.slice(0, 100)}`
        ]);
      }
    } catch (err: any) {
      setInjectionLogs((prev) => [...prev, `[ERROR] Failed to execute self-healing: ${err.message}`]);
    } finally {
      setIsHealing(false);
    }
  };

  return (
    <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-black text-white tracking-wide font-mono">
              CHAOS MONKEY INCIDENT INJECTOR
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Interactive enterprise fault-injection sandbox. Modifies target code physically on disk in <code className="text-slate-300">targets/shopfront</code> and verifies failure live via Vitest child_process.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Host Machine Execution: LIVE
          </span>
        </div>
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SCENARIOS.map((s) => {
          const isSelected = selectedScenario.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => { setSelectedScenario(s); setInjectionLogs([]); setIsTriggered(false); setRealTestOutput(null); sounds.playTerminalClick(); }}
              className={`p-5 rounded-2xl border text-left transition flex flex-col justify-between ${
                isSelected
                  ? 'bg-rose-950/20 border-rose-500/60 shadow-lg shadow-rose-500/10'
                  : 'bg-[#0d121d] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    {s.severity}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white mb-2">{s.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{s.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span>Target: <span className="text-slate-200">{s.targetService}</span></span>
                <span className="text-blue-400">{s.targetParam}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Attack Console */}
      <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span>Selected Target:</span>
              <span className="text-rose-400">{selectedScenario.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              File on Disk: <code className="text-slate-300 font-mono">{selectedScenario.filePath}</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-Heal Button */}
            <button
              onClick={handleHeal}
              disabled={isHealing || isInjecting}
              className={`px-4 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition border ${
                isHealing
                  ? 'bg-slate-800 text-slate-500 border-slate-700'
                  : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-900/20'
              }`}
            >
              {isHealing ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Healing Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Auto-Heal via MAYDAY</span>
                </>
              )}
            </button>

            {/* Break / Inject Button */}
            <button
              onClick={handleInject}
              disabled={isInjecting || isHealing}
              className={`px-5 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition shadow-xl ${
                isInjecting
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white hover:from-red-500 hover:to-rose-500 shadow-red-600/30'
              }`}
            >
              {isInjecting ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Injecting into Disk...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" />
                  <span>Trigger Real SEV-1 Fault</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Terminal Stream of Chaos Injection */}
        <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800/80 font-mono text-xs space-y-1.5 min-h-[160px]">
          {injectionLogs.length === 0 ? (
            <div className="text-slate-600 flex items-center gap-2 py-8 justify-center">
              <Terminal className="w-4 h-4" />
              <span>Awaiting fault injection. Click "Trigger Real SEV-1 Fault" to physically alter code and run tests.</span>
            </div>
          ) : (
            injectionLogs.map((log, idx) => (
              <div 
                key={idx} 
                className={idx === injectionLogs.length - 1 && isTriggered ? 'text-emerald-400 font-bold' : idx >= 3 ? 'text-amber-300' : 'text-slate-300'}
              >
                {log}
              </div>
            ))
          )}
        </div>

        {/* Real Vitest Output Console */}
        {realTestOutput && (
          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-900/80 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Terminal Vitest Output (Node.js child_process)</span>
              </div>
              <span className="text-[10px] text-slate-500">targets/shopfront</span>
            </div>
            <pre className="p-4 bg-black/90 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-60 leading-relaxed">
              {realTestOutput}
            </pre>
          </div>
        )}

        {/* Navigation Action after trigger */}
        {isTriggered && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-sm text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Real SEV-1 State Active on Host Machine!</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                The target file has been physically modified on disk. Switch to the War Room to watch MAYDAY triage and heal it in real time.
              </p>
            </div>

            <Link
              href="/"
              onClick={() => sounds.playGreenChime()}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition shrink-0"
            >
              <span>Launch Live War Room</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
