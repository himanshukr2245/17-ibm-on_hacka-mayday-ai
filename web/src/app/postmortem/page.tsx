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
    id: 'INC-2043',
    title: 'INC-2043: Unbounded EventEmitter Listener Leak in Order Service',
    service: 'order-service / shopfront-api',
    severity: 'SEV-2',
    timestamp: '2026-09-27 11:20:44 UTC',
    mttr: '28 Seconds',
    humanBaseline: '35 Minutes',
    prNumber: 106,
    prUrl: 'https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai/commit/9e44f12',
    fiveWhys: [
      { why: 'Why did the Node.js process OOMKill after 400+ orders?', answer: 'The EventEmitter heap grew unbounded: 501 listeners accumulated on the "inventory:low" event, exhausting process memory at 1.4 GB.' },
      { why: 'Why did 500 orders create 500 listeners?', answer: 'eventBus.on("inventory:low", handleLowStockAlert) was called inside createOrder() on every incoming HTTP request, and the listener was never removed or deregistered.' },
      { why: 'Why was the listener registered inside createOrder()?', answer: 'Commit 8f3c21a added inventory alert functionality inside the per-request handler function instead of at application startup, coupling listener lifecycle to request lifecycle.' },
      { why: 'Why did setMaxListeners not prevent this?', answer: 'The decoy agent RECON-3 proposed raising the listener limit. The Cross-Examination Matrix rejected this — it only silences the warning while the heap continues to grow and OOMKill still occurs at production traffic.' },
      { why: 'Why did staging not catch this regression?', answer: 'Staging load tests used only 5 synthetic orders, which is far below the 11-listener warning threshold. A minimum 500-order stress test was not part of the CI pipeline.' },
    ],
    markdownContent: `# INC-2043 Postmortem: Unbounded EventEmitter Listener Leak\n**Date**: 2026-09-27 11:20:44 UTC\n**Service**: order-service / shopfront-api\n**Severity**: SEV-2\n**Author**: IBM Bob 2.0 Scribe Autonomous Agent\n**Status**: RESOLVED (Verified PR #106 Merged)\n\n---\n\n## 1. Executive Summary\nAfter a traffic spike to 500+ concurrent orders, Node.js heap was exhausted at 1.4 GB, causing OOMKilled pod restarts. MAYDAY traced the unbounded EventEmitter growth to a per-request listener registration, replaced it with a singleton startup pattern, and verified the fix in 28 seconds.\n\n## 2. Invariant Preserved\n- Listener count remains bounded to 1 regardless of order volume.\n- Memory footprint stable at 42 MB under 500 synthetic orders.\n\n## 3. Prevention Roadmap\n- Converted per-request listener to single application-boot registration.\n- Added deterministic 500-order stress test to CI pipeline.`
  },
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
  },
  {
    id: 'INC-2044',
    title: 'INC-2044: Honest Escalation — External Acquiring Bank Outage',
    service: 'external / gateway.visa.com',
    severity: 'SEV-1',
    timestamp: '2026-09-27 14:55:03 UTC',
    mttr: '14 Seconds (Escalated)',
    humanBaseline: '45 Minutes (Wasted on Internal Servers)',
    prNumber: 0,
    prUrl: 'https://status.visa.com',
    fiveWhys: [
      { why: 'Why were all payment gateway requests returning HTTP 504?', answer: "The acquiring bank's BGP route partition caused TCP timeouts at hop 14 from our datacenter to gateway.visa.com." },
      { why: 'Why did RECON-1 (Recent Changes) find nothing?', answer: 'Zero code commits existed in the repository for 72 hours. All three internal detectives had no code changes to blame.' },
      { why: 'Why did RECON-2 (Null-Safety) find nothing?', answer: 'Internal JSON serialization was 100% RFC-7159 compliant. The payload schema was verified against a local stub. Timeout was strictly outbound.' },
      { why: 'Why did RECON-3 (Concurrency) find nothing?', answer: 'Local socket pool showed 12 / 1000 connections used. Host networking was fully healthy. The failure was external.' },
      { why: 'Why is this an essential postmortem?', answer: "MAYDAY's Honesty Guarantee prevented 45 minutes of wasted internal debugging. Most AI systems hallucinate internal code fixes for external outages. MAYDAY escalated correctly in 14 seconds." }
    ],
    markdownContent: `# INC-2044 Postmortem: Honest Escalation — External Bank Outage
**Date**: 2026-09-27 14:55:03 UTC  
**Service**: external / gateway.visa.com  
**Severity**: SEV-1 (Critical)  
**Author**: IBM Bob 2.0 Scribe Autonomous Agent  
**Status**: ESCALATED TO HUMAN ON-CALL (Correct — No Internal Fix Possible)

---

## 1. Executive Summary
All three MAYDAY detectives independently falsified internal code theories within 14 seconds. Rather than hallucinating a code patch for an external provider outage, MAYDAY dispatched a PagerDuty escalation to the human SRE on-call with a non-urgent circuit breaker recommendation.

## 2. Why This Matters
95% of LLMs, when asked to fix a 504 Gateway Timeout, generate internal retry logic, timeout adjustments, or null-safety patches. These changes are shipped to production, wasting engineering hours and introducing unnecessary complexity — all while the external provider is simply down.

## 3. Honesty Guarantee
MAYDAY explicitly committed zero code changes. No hallucinated patches. No fake fixes. Human on-call was paged with a clear, evidence-backed escalation report: external BGP route unreachable, internal code untouched, circuit breaker recommended.

## 4. Prevention Roadmap
- Circuit breaker pattern added to external payment gateway calls.
- Status page monitoring (api.visa.com) integrated into incident correlation engine.`
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

          <div className="relative space-y-0 font-mono text-xs">
            {/* Vertical connector line */}
            <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent pointer-events-none" />
            {activePostmortem.fiveWhys.map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-3 mb-3"
              >
                <span className="relative z-10 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-500/30 text-[11px]">
                  W{idx + 1}
                </span>
                <div className="bg-slate-900/50 rounded-xl p-3.5 border border-slate-800/80 flex-1">
                  <div className="font-semibold text-slate-200 mb-1">{item.why}</div>
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
