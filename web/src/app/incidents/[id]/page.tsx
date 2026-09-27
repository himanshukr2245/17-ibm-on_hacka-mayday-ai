import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileText,
  Flame,
  ArrowLeft,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  GitPullRequest,
  ExternalLink,
} from 'lucide-react';
import { POSTMORTEMS } from '../../../data/postmortems';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [
    { id: 'INC-2041' },
    { id: 'INC-2042' },
    { id: 'INC-2043' },
    { id: 'INC-2044' },
  ];
}

const INCIDENT_LETTER_MAP: Record<string, 'A' | 'B' | 'C' | 'D'> = {
  'INC-2041': 'A',
  'INC-2042': 'B',
  'INC-2043': 'C',
  'INC-2044': 'D',
};

export default async function IncidentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const postmortem = POSTMORTEMS.find(
    (p) => p.id.toUpperCase() === id.toUpperCase()
  );

  if (!postmortem) {
    notFound();
  }

  const incidentLetter = INCIDENT_LETTER_MAP[postmortem.id] || 'A';

  return (
    <main className="p-6 max-w-6xl mx-auto w-full space-y-8 font-sans">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <Link
          href="/war-room"
          prefetch={false}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to War Room Fleet</span>
        </Link>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Incident Dossier:</span>
          <span className="text-blue-400 font-bold">{postmortem.id}</span>
        </div>
      </div>

      {/* Incident Header Dossier Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-2 font-mono">
              <span
                className={`text-[10px] font-black px-2.5 py-0.5 rounded border ${
                  postmortem.severity === 'SEV-1'
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {postmortem.severity}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {postmortem.service}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {postmortem.timestamp}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-mono leading-tight">
              {postmortem.title}
            </h1>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/war-room?incident=${incidentLetter}&autopilot=true`}
              prefetch={false}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-red-600/30 transition hover:scale-[1.02]"
            >
              <Flame className="w-4 h-4 text-amber-300 fill-current" />
              <span>Launch Live War Room Simulation</span>
            </Link>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Autonomous MTTR</span>
            </div>
            <div className="text-lg font-black text-emerald-400">{postmortem.mttr}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Human On-Call Baseline</div>
            <div className="text-lg font-black text-slate-300">{postmortem.humanBaseline}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>Verified PR</span>
            </div>
            <div className="text-sm font-bold text-blue-300 flex items-center gap-1">
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>#{postmortem.prNumber}</span>
              <a
                href={postmortem.prUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white ml-1"
                title="View Commit Verification"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Status</div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>RESOLVED</span>
            </div>
          </div>
        </div>

        {/* 5-Whys Deep Dive */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Root Cause Causal Chain (5-Whys)</span>
          </h2>
          <div className="space-y-2 font-mono text-xs">
            {postmortem.fiveWhys.map((w, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-1">
                  <div className="text-slate-300 font-semibold">{w.why}</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed font-sans">{w.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Markdown Record */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Autonomous Postmortem Record</span>
          </h2>
          <pre className="p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {postmortem.markdownContent}
          </pre>
        </div>
      </div>
    </main>
  );
}
