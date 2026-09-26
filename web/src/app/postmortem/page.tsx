'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  GitPullRequest, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Printer,
  Sparkles
} from 'lucide-react';
import { sounds } from '../../lib/audio';

const POSTMORTEMS = [
  {
    id: 'INC-2041',
    title: 'INC-2041: PayLink SDK v3.0 Silent Contract Drift',
    service: 'payment-service / shopfront-api',
    severity: 'SEV-1',
    timestamp: '2026-09-25 03:14:22 UTC',
    mttr: '42 Seconds',
    humanBaseline: '28 Minutes',
    prNumber: 104,
    prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/commit/a3548b9',
    fiveWhys: [
      { why: 'Why did customer checkouts fail with 500s?', answer: 'TypeError thrown at adapter.ts:31: cannot read properties of undefined (reading "amount").' },
      { why: 'Why was "amount" undefined?', answer: 'The object gatewayRaw.fee was undefined in the incoming PayLink gateway response.' },
      { why: 'Why was gatewayRaw.fee undefined?', answer: 'PayLink SDK v3.0 replaced the nested fee object with integer data.feeCents.' },
      { why: 'Why was the service still reading fee.amount?', answer: 'Commit e9a18f4 bumped the SDK version without updating caller contract shapes.' },
      { why: 'Why did existing CI tests not catch this prior to deploy?', answer: 'Mock test suites used stale v2.4 fixture mocks rather than schema-validated invariant contracts.' }
    ],
    markdownContent: `# INC-2041 Postmortem: PayLink SDK v3.0 Silent Contract Drift
**Date**: 2026-09-25 03:14:22 UTC  
**Service**: shopfront-api / payment-adapter  
**Severity**: SEV-1 (Critical)  
**Author**: IBM Bob 2.0 Scribe Autonomous Agent  
**Status**: RESOLVED (Verified PR #104 Merged)

---

## 1. Executive Summary
At 03:14 UTC, 100% of EU and US checkout attempts failed with an unhandled TypeError. MAYDAY autonomously dispatched 3 competing subagents, identified PayLink SDK v3.0 contract drift, rejected a zero-fee band-aid patch, and verified the fix in 42 seconds (97.5% faster than human baseline).

## 2. Invariant Preservation
- **Preserved**: 2.9% fee invariant ($10.29 charged on $10.00 cart).
- **Rejected Band-Aid**: res.fee?.amount ?? 0 was rejected for causing silent $12,400 daily fee loss.

## 3. Five Whys Causal Analysis
1. Checkouts failed due to TypeError in adapter.ts:31.
2. gatewayRaw.fee was undefined.
3. PayLink SDK v3.0 renamed fee.amount -> data.feeCents.
4. Dependency bump commit bumped SDK without updating contract adapter.
5. Unit tests relied on legacy mocks instead of runtime contract invariants.

## 4. Prevention Roadmap
- Added automated runtime schema validator for third-party SDK payloads.
- Added invariant test suite into pre-commit and PR validation pipelines.`
  },
  {
    id: 'INC-2042',
    title: 'INC-2042: Concurrency Race Condition in Flash-Sale Reservations',
    service: 'inventory-service / shopfront-api',
    severity: 'SEV-1',
    timestamp: '2026-09-26 09:42:10 UTC',
    mttr: '38 Seconds',
    humanBaseline: '45 Minutes',
    prNumber: 105,
    prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/commit/e315976',
    fiveWhys: [
      { why: 'Why did the warehouse report negative stock (-10)?', answer: '20 concurrent checkout requests all successfully reserved items when only 10 were available.' },
      { why: 'Why did all 20 requests succeed?', answer: 'Every request read currentStock = 10 during the asynchronous database I/O delay.' },
      { why: 'Why was there an async gap before decrementing?', answer: 'reserveStock() checked stock, yielded the event loop via await, and only decremented afterwards.' },
      { why: 'Why did this only surface during flash sales?', answer: 'Commit 4b91f02 replaced serial request execution with concurrent Promise.all() batching.' },
      { why: 'Why did retry loops make it worse?', answer: 'Decoy agent RECON-2 proposed exponential retries, which flooded stale requests back into the race window.' }
    ],
    markdownContent: `# INC-2042 Postmortem: Concurrency Race Condition in Flash-Sale Reservations
**Date**: 2026-09-26 09:42:10 UTC  
**Service**: inventory-service / shopfront-api  
**Severity**: SEV-1 (Critical)  
**Author**: IBM Bob 2.0 Scribe Autonomous Agent  
**Status**: RESOLVED (Verified PR #105 Merged)

---

## 1. Executive Summary
During a flash-sale traffic spike, warehouse stock for SKU-HOODIE-BLACK dipped to -10, overselling 10 physical units. MAYDAY's Concurrency Detective (RECON-3) modeled the check-then-act async delay and engineered an async per-SKU promise queue mutex, restoring strict zero-overselling invariants in 38 seconds.

## 2. Invariant Preservation
- **Preserved**: Warehouse inventory never negative (finalStock = 0).
- **Preserved**: Exactly 10 reservations succeeded; 10 rejected gracefully.

## 3. Prevention Roadmap
- Serialized warehouse reservation mutations via per-SKU promise queues.
- Integrated deterministic 50-thread concurrent stress test into CI pipeline.`
  }
];

export default function PostmortemPage() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const activePostmortem = POSTMORTEMS[selectedIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(activePostmortem.markdownContent);
    setCopied(true);
    sounds.playGreenChime();
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    sounds.playTerminalClick();
    window.print();
  };

  return (
    <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-black text-white tracking-wide font-mono">
              SCRIBE POSTMORTEM & RCAG VAULT
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Root Cause Analysis Generator (RCAG) autonomously authored by IBM Bob 2.0 Scribe Agent.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF Brief</span>
          </button>

          <a
            href={activePostmortem.prUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition"
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>View Verified PR</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Incident Switcher */}
      <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800 w-fit">
        {POSTMORTEMS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => { setSelectedIdx(idx); sounds.playTerminalClick(); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              selectedIdx === idx
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {p.id}: {p.title.split(':')[1]?.trim() || p.title}
          </button>
        ))}
      </div>

      {/* Postmortem Body */}
      <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Title & Metadata Strip */}
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
              {activePostmortem.severity}
            </span>
            <span className="font-mono text-xs text-slate-400">Target: {activePostmortem.service}</span>
            <span>•</span>
            <span className="font-mono text-xs text-slate-400">{activePostmortem.timestamp}</span>
          </div>
          <h2 className="text-lg font-black text-white">{activePostmortem.title}</h2>
        </div>

        {/* 4-Stat Benchmark Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 uppercase text-[10px]">Autonomic MTTR</div>
            <div className="text-base font-bold text-emerald-400 mt-1">{activePostmortem.mttr}</div>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 uppercase text-[10px]">Human MTTR Baseline</div>
            <div className="text-base font-bold text-slate-300 mt-1">{activePostmortem.humanBaseline}</div>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 uppercase text-[10px]">Resolution Method</div>
            <div className="text-base font-bold text-blue-400 mt-1">Cross-Examined Self-Healing</div>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 uppercase text-[10px]">Verified PR</div>
            <div className="text-base font-bold text-emerald-300 mt-1">#{activePostmortem.prNumber} Merged</div>
          </div>
        </div>

        {/* Five Whys Visual Hierarchy */}
        <div>
          <h3 className="font-mono text-xs uppercase font-bold text-slate-300 tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Automated 5-Whys Causal Tree</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {activePostmortem.fiveWhys.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/50 rounded-xl p-3.5 border border-slate-800/80 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30 text-[11px]">
                  W{idx + 1}
                </span>
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200">{item.why}</div>
                  <div className="text-slate-400 font-sans leading-relaxed">{item.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remediation & Prevention */}
        <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-5 space-y-2">
          <div className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Permanent Systemic Remediation</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            MAYDAY not only repaired the faulty source code, but also committed a permanent regression invariant test into the Vitest suite. Future pull requests that introduce breaking contract changes or non-atomic concurrency windows will fail automatically in CI before reaching production.
          </p>
        </div>
      </div>
    </main>
  );
}
