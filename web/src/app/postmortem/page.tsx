'use client';

import React, { useState } from 'react';
import {
  FileText,
  GitPullRequest,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Printer,
  Sparkles
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { POSTMORTEMS } from '../../data/postmortems';

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

  const handleDownloadMarkdown = () => {
    sounds.playGreenChime();
    const blob = new Blob([activePostmortem.markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePostmortem.id.toLowerCase()}-postmortem.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadMarkdown}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition cursor-pointer"
            title="Download full postmortem as a markdown file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
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
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
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
            <span className="hidden sm:inline">{p.id}: {p.title.split(':')[1]?.trim() || p.title}</span>
            <span className="sm:hidden">{p.id}</span>
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
