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
  AlertTriangle
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
  injectedFailure: string;
  expectedResolution: string;
}

const SCENARIOS: ChaosScenario[] = [
  {
    id: 'drift-attack',
    name: 'PayLink SDK v3.0 Contract Drift',
    severity: 'SEV-1',
    icon: '💣',
    description: 'Silently switches third-party SDK gateway envelope from legacy fee.amount to v3 data.feeCents.',
    blastRadius: '100% of live EU and US checkout attempts throw unhandled TypeError exceptions.',
    targetService: 'shopfront-api (src/payment/adapter.ts:31)',
    injectedFailure: "TypeError: Cannot read properties of undefined (reading 'amount')",
    expectedResolution: 'RECON-1 detects contract drift, maps feeCents / 100, preserves 2.9% fee invariant.'
  },
  {
    id: 'race-attack',
    name: '50-Thread Flash Sale Concurrency Burst',
    severity: 'SEV-1',
    icon: '⚡',
    description: 'Simulates 50 simultaneous checkout requests attempting to reserve a 10-item inventory pool.',
    blastRadius: 'Warehouse inventory collapses into negative numbers (-10), causing $24,000 in oversold merch.',
    targetService: 'shopfront-api (src/inventory/service.ts:32)',
    injectedFailure: 'AssertionError: expected 20 successful to be 10 (Inventory dipped below 0)',
    expectedResolution: 'RECON-3 models check-then-act async delay, applies per-SKU promise queue mutex, passes all 20 threads.'
  },
  {
    id: 'outage-attack',
    name: 'Upstream External Cloud Outage (Honesty Test)',
    severity: 'SEV-1',
    icon: '🔌',
    description: 'Simulates complete network partition and 504 Gateway Timeouts from the payment acquiring bank.',
    blastRadius: 'All outbound HTTP gateway requests terminate in ECONNRESET and 504 timeouts.',
    targetService: 'external-provider (gateway.visa.com)',
    injectedFailure: 'HTTP 504 Gateway Timeout: External banking network unreachable',
    expectedResolution: 'MAYDAY correctly falsifies internal code fixes and escalates to human on-call without fabricating code.'
  }
];

export default function SimulatorPage() {
  const [selectedScenario, setSelectedScenario] = useState<ChaosScenario>(SCENARIOS[0]);
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [injectionLogs, setInjectionLogs] = useState<string[]>([]);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);

  const handleInject = () => {
    setIsInjecting(true);
    setIsTriggered(false);
    setInjectionLogs([]);
    sounds.playKlaxon();

    const sequence = [
      `[00:00:01] ⚡ INITIATING CHAOS MONKEY INJECTION: ${selectedScenario.name}...`,
      `[00:00:02] Target service: ${selectedScenario.targetService}`,
      `[00:00:03] Injecting synthetic failure payload: "${selectedScenario.injectedFailure}"`,
      `[00:00:04] 🚨 SEV-1 OUTAGE GENERATED! Blast radius: ${selectedScenario.blastRadius}`,
      `[00:00:05] PagerDuty webhook fired -> Ingested by MAYDAY Signal Processor`,
      `[00:00:06] 🚀 Dispatched 3 parallel IBM Bob 2.0 subagent detectives (RECON-1, RECON-2, RECON-3)...`
    ];

    sequence.forEach((log, index) => {
      setTimeout(() => {
        setInjectionLogs((prev) => [...prev, log]);
        sounds.playTerminalClick();
        if (index === sequence.length - 1) {
          setIsInjecting(false);
          setIsTriggered(true);
          sounds.playRadarPing();
        }
      }, (index + 1) * 450);
    });
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
            Interactive enterprise fault-injection sandbox. Inject catastrophic production bugs on demand and observe MAYDAY's real-time autonomous self-healing.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
            Fault Injection Mode: Active
          </span>
        </div>
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SCENARIOS.map((s) => {
          const isSelected = selectedScenario.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => { setSelectedScenario(s); setInjectionLogs([]); setIsTriggered(false); sounds.playTerminalClick(); }}
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

              <div className="pt-3 border-t border-slate-800/80 font-mono text-[11px] text-slate-400">
                Target: <span className="text-slate-200">{s.targetService}</span>
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
              <span>Selected Fault:</span>
              <span className="text-rose-400">{selectedScenario.name}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Blast Radius: {selectedScenario.blastRadius}</p>
          </div>

          <button
            onClick={handleInject}
            disabled={isInjecting}
            className={`px-5 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition shadow-xl ${
              isInjecting
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white hover:from-red-500 hover:to-rose-500 shadow-red-600/30'
            }`}
          >
            {isInjecting ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Injecting Chaos...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>Trigger Catastrophic SEV-1</span>
              </>
            )}
          </button>
        </div>

        {/* Live Terminal Stream of Chaos Injection */}
        <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800/80 font-mono text-xs space-y-1.5 min-h-[160px]">
          {injectionLogs.length === 0 ? (
            <div className="text-slate-600 flex items-center gap-2 py-8 justify-center">
              <Terminal className="w-4 h-4" />
              <span>Awaiting fault injection trigger. Select a scenario and click Trigger Catastrophic SEV-1.</span>
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

        {/* Navigation Action after trigger */}
        {isTriggered && (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-sm text-emerald-400 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Incident Dispatched to War Room!</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                MAYDAY is currently racing competing subagents to reproduce and repair this failure.
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
