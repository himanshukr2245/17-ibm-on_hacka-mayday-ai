'use client';

import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  XCircle,
  TrendingDown
} from 'lucide-react';
import { sounds } from '../../lib/audio';

interface Candidate {
  id: string;
  name: string;
  author: string;
  codeSnippet: string;
  reproFee: 'PASS' | 'FAIL';
  reproFeeDetail: string;
  reproRace: 'PASS' | 'FAIL';
  reproRaceDetail: string;
  crashPrevention: 'PASS' | 'FAIL';
  crashDetail: string;
  regressionSuite: 'PASS' | 'FAIL';
  regressionDetail: string;
  verdict: 'CROWNED' | 'REJECTED';
  verdictReason: string;
  financialRisk: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: 'patch-1',
    name: 'RECON-1: Contract Schema Adapter',
    author: 'Recent Change Detective',
    codeSnippet: 'const fee = (gatewayRaw as any).data.feeCents / 100;\nconst total = req.amountDollars + fee;',
    reproFee: 'PASS',
    reproFeeDetail: '$10.29 charged ($0.29 fee mapped)',
    reproRace: 'PASS',
    reproRaceDetail: 'Serial checkout unaffected',
    crashPrevention: 'PASS',
    crashDetail: 'Zero unhandled rejections',
    regressionSuite: 'PASS',
    regressionDetail: '8/8 Vitest suites green',
    verdict: 'CROWNED',
    verdictReason: 'Preserves the 2.9% fee invariant while adapting to PayLink SDK v3.0 response contract shape.',
    financialRisk: '$0.00 (Zero revenue loss)'
  },
  {
    id: 'patch-2',
    name: 'RECON-2: Lazy Null Check (Band-Aid)',
    author: 'Null-Safety Detective',
    codeSnippet: 'const fee = (gatewayRaw as any).fee?.amount ?? 0;\nconst total = req.amountDollars + fee;',
    reproFee: 'FAIL',
    reproFeeDetail: 'FAILED: $10.00 charged ($0 fee uncollected)',
    reproRace: 'PASS',
    reproRaceDetail: 'No race condition',
    crashPrevention: 'PASS',
    crashDetail: 'Silences TypeError crash',
    regressionSuite: 'FAIL',
    regressionDetail: 'FAILED: checkout.test.ts invariant broken',
    verdict: 'REJECTED',
    verdictReason: 'Silences the crash by dropping the fee to $0, causing silent business data and revenue loss.',
    financialRisk: '$12,400 / day in uncollected payment fees'
  },
  {
    id: 'patch-3',
    name: 'RECON-3: Per-SKU Promise Queue Mutex',
    author: 'Concurrency & Race Detective',
    codeSnippet: 'const tail = skuQueue.get(sku) ?? Promise.resolve();\nconst next = tail.then(async () => { /* atomic check & decrement */ });\nskuQueue.set(sku, next.catch(() => {}));',
    reproFee: 'PASS',
    reproFeeDetail: 'Fee calculations unaffected',
    reproRace: 'PASS',
    reproRaceDetail: '10 Succeeded, 10 Rejected, Stock = 0',
    crashPrevention: 'PASS',
    crashDetail: 'No unhandled promises',
    regressionSuite: 'PASS',
    regressionDetail: '2/2 Concurrency suites green',
    verdict: 'CROWNED',
    verdictReason: 'Serializes operations per-SKU, guaranteeing zero overselling and strict non-negative warehouse balance.',
    financialRisk: '$0.00 (Zero overselling)'
  }
];

export default function MatrixPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const handleSelect = (c: Candidate) => {
    setIsEvaluating(true);
    setSelectedCandidate(c);
    sounds.playTerminalClick();

    setTimeout(() => {
      setIsEvaluating(false);
      if (c.verdict === 'CROWNED') {
        sounds.playGreenChime();
      } else {
        sounds.playTestFailure();
      }
    }, 180);
  };

  return (
    <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Layers className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-black text-white tracking-wide font-mono">
              CROSS-EXAMINATION MATRIX PLAYGROUND
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            {`N×N Automated Assertion Laboratory. Every proposed patch is cross-examined against every detective's reproduction tests to expose band-aids.`}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            Deterministic Evaluation: 100%
          </span>
        </div>
      </div>

      {/* Candidate Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CANDIDATES.map((c) => {
          const isSelected = selectedCandidate.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelect(c)}
              className={`p-4 rounded-xl border text-left transition relative overflow-hidden cursor-pointer touch-manipulation select-none active:scale-[0.98] ${
                isSelected
                  ? c.verdict === 'CROWNED'
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-red-950/30 border-red-500/60 shadow-lg shadow-red-500/10'
                  : 'bg-[#0d121d] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  c.verdict === 'CROWNED'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {c.verdict}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>}
              </div>
              <h3 className="font-bold text-xs text-white mb-1">{c.name}</h3>
              <p className="text-[11px] text-slate-400 font-mono">By: {c.author}</p>
            </button>
          );
        })}
      </div>

      {/* Main Cross-Examination Table */}
      <div className="bg-[#0d121d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-300">Active Candidate Evaluation:</span>
            <span className="font-mono text-xs text-blue-400 font-semibold">{selectedCandidate.name}</span>
          </div>
          <div className="font-mono text-xs text-slate-400">
            Status: {isEvaluating ? <span className="text-amber-400 animate-pulse">Running Invariants...</span> : <span className="text-slate-200">Verified</span>}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono">
                <th className="p-3.5">Test Suite & Invariant</th>
                <th className="p-3.5">Assertion Goal</th>
                <th className="p-3.5">Execution Result</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {/* Test 1: Fee Invariant */}
              <tr className="hover:bg-slate-900/30 transition">
                <td className="p-3.5 font-semibold text-slate-200">
                  Repro Test 1: 2.9% Fee Invariant (`checkout.test.ts`)
                </td>
                <td className="p-3.5 text-slate-400">Must charge exactly $10.29 ($0.29 fee)</td>
                <td className={`p-3.5 font-semibold ${selectedCandidate.reproFee === 'PASS' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedCandidate.reproFeeDetail}
                </td>
                <td className="p-3.5">
                  {selectedCandidate.reproFee === 'PASS' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      PASSED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                      FAILED
                    </span>
                  )}
                </td>
              </tr>

              {/* Test 2: Concurrency Race Invariant */}
              <tr className="hover:bg-slate-900/30 transition">
                <td className="p-3.5 font-semibold text-slate-200">
                  Repro Test 2: 20-Thread Concurrency (`inventory.test.ts`)
                </td>
                <td className="p-3.5 text-slate-400">Inventory balance must never drop below 0</td>
                <td className={`p-3.5 font-semibold ${selectedCandidate.reproRace === 'PASS' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedCandidate.reproRaceDetail}
                </td>
                <td className="p-3.5">
                  {selectedCandidate.reproRace === 'PASS' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      PASSED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                      FAILED
                    </span>
                  )}
                </td>
              </tr>

              {/* Test 3: Crash Prevention */}
              <tr className="hover:bg-slate-900/30 transition">
                <td className="p-3.5 font-semibold text-slate-200">
                  Crash Prevention Test (Unhandled Rejections)
                </td>
                <td className="p-3.5 text-slate-400">No 500 error surfaces to HTTP caller</td>
                <td className={`p-3.5 font-semibold ${selectedCandidate.crashPrevention === 'PASS' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedCandidate.crashDetail}
                </td>
                <td className="p-3.5">
                  {selectedCandidate.crashPrevention === 'PASS' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      PASSED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                      FAILED
                    </span>
                  )}
                </td>
              </tr>

              {/* Test 4: Full Regression Suite */}
              <tr className="hover:bg-slate-900/30 transition">
                <td className="p-3.5 font-semibold text-slate-200">
                  Full Vitest Regression Suite
                </td>
                <td className="p-3.5 text-slate-400">Zero regressions across untouched services</td>
                <td className={`p-3.5 font-semibold ${selectedCandidate.regressionSuite === 'PASS' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {selectedCandidate.regressionDetail}
                </td>
                <td className="p-3.5">
                  {selectedCandidate.regressionSuite === 'PASS' ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      PASSED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                      FAILED
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verdict Banner */}
        <div className={`p-5 border-t ${
          selectedCandidate.verdict === 'CROWNED'
            ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
            : 'bg-red-950/20 border-red-500/40 text-red-200'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {selectedCandidate.verdict === 'CROWNED' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="font-bold text-sm font-mono">
                  VERDICT: {selectedCandidate.verdict === 'CROWNED' ? 'CROWNED CHAMPION FIX' : 'BAND-AID REJECTED BY INVARIANTS'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedCandidate.verdictReason}
              </p>
            </div>

            <div className="bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 shrink-0 font-mono text-xs">
              <span className="text-slate-400">Financial Risk: </span>
              <strong className={selectedCandidate.verdict === 'CROWNED' ? 'text-emerald-400' : 'text-red-400'}>
                {selectedCandidate.financialRisk}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Explainer: Why AI Band-Aids Kill Companies */}
      <div className="bg-gradient-to-r from-red-950/30 via-slate-900/60 to-slate-900/40 border border-red-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-3 text-red-400 font-mono font-bold text-sm">
          <TrendingDown className="w-4 h-4" />
          <span>{`The "AI Band-Aid Trap": Why LLMs Without Invariants Break Businesses`}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {`When asked to fix `}<code className="text-red-300">{`TypeError: Cannot read properties of undefined (reading 'amount')`}</code>{`, 95% of LLMs apply an optional chaining band-aid: `}<code className="text-amber-300">res.fee?.amount ?? 0</code>.
          {` While this stops the server from crashing (200 OK), it silently stops charging processing fees. Over a 24-hour flash sale with 40,000 transactions, this band-aid quietly loses `}<strong>$12,400+ in uncollected fees</strong>{` without a single error log being triggered.`}
        </p>
        <p className="text-xs text-slate-400 font-mono">
          {`MAYDAY's Cross-Examination Matrix solves this forever by enforcing that reproduction tests must assert `}<strong>business outcomes</strong>{`, not just "doesn't throw".`}
        </p>
      </div>
    </main>
  );
}
