'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Radio,
  Cpu,
  Layers,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function HowItWorksBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all">
      {/* Clickable Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition border-b border-slate-800/80"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>HOW MAYDAY SOLVES THE 3 AM CRISIS</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                Mental Model &amp; Architecture
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Confused about what this app does? Click to see how a real company connects MAYDAY and resolves outages in under 2 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
          <span>{isOpen ? 'Hide Architecture Guide' : 'Explain Architecture (60s Read)'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Content Area */}
      {isOpen && (
        <div className="p-6 space-y-6 animate-in fade-in duration-300">
          {/* Plain English Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
              <div className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                <span>TODAY WITHOUT MAYDAY (70+ Minutes of Pain)</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
                <li>• <strong>03:00 AM:</strong> Sentry alert fires. 100% of customer checkouts fail.</li>
                <li>• <strong>03:15 AM:</strong> PagerDuty wakes up a sleepy engineer.</li>
                <li>• <strong>03:45 AM:</strong> Sleepy engineer guesses root cause from 50,000 Datadog logs.</li>
                <li>• <strong>04:00 AM:</strong> Engineer writes a naive patch (e.g. <code className="text-red-300">fee?.amount ?? 0</code>) which stops crashes but secretly zeroes out transaction fees, leaking revenue!</li>
                <li>• <strong>04:10 AM:</strong> Untested patch deployed to production. Total downtime: 70 min.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>WITH MAYDAY (38 Seconds to Verified Fix)</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
                <li>• <strong>03:00 AM:</strong> Alert webhook received by MAYDAY. Zero humans woken up.</li>
                <li>• <strong>03:00:05 AM:</strong> 3 IBM Bob AI detective agents deploy in parallel to investigate.</li>
                <li>• <strong>03:00:20 AM:</strong> Reproduction test created; confirms bug by FAILING on disk.</li>
                <li>• <strong>03:00:35 AM:</strong> Candidate patches cross-examined; naive band-aids rejected.</li>
                <li>• <strong>03:00:38 AM:</strong> Verified patch applied, Vitest suite turns green, PR ready to merge.</li>
              </ul>
            </div>
          </div>

          {/* 4-Step Technical Workflow */}
          <div>
            <div className="text-xs font-mono uppercase font-bold text-slate-300 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>The 4-Step Self-Healing Circuit:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-mono font-bold text-xs">
                  1
                </div>
                <div className="font-mono text-xs font-bold text-white">Ingest Alert</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Production Sentry, Datadog, or Instana webhook posts crash telemetry to <code className="text-blue-300">/api/heal</code>. Zero manual file uploads required.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                  2
                </div>
                <div className="font-mono text-xs font-bold text-white">Parallel Bob Detectives</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  IBM Bob 2.0 spawns 3 competing agents: Recent Commits Detective, Null-Safety Detective, and Concurrency Detective. Eliminates cognitive tunnel vision.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                  3
                </div>
                <div className="font-mono text-xs font-bold text-white">Scientific Proof Ladder</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  MAYDAY synthesizes a reproduction test that MUST FAIL first. Then cross-examines patches to ensure zero revenue leakage before applying.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                  4
                </div>
                <div className="font-mono text-xs font-bold text-white">Verified PR &amp; Rollback</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Real Vitest suite runs in Node.js on disk. When 100% green, MAYDAY generates a verified GitHub PR with full forensic proof logs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
