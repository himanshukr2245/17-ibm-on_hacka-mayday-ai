'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllLocalIncidents } from '../../db/local';
import {
  Radio,
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  Cpu,
  ExternalLink
} from 'lucide-react';
import { sounds } from '../../lib/audio';

// Maps each incident to its War Room selector param
const INCIDENT_WAR_ROOM: Record<string, string> = {
  'INC-2041': '/?incident=A',
  'INC-2042': '/?incident=B',
  'INC-2043': '/?incident=C',
  'INC-2044': '/?incident=D',
};

interface IncidentItem {
  id: string;
  severity: 'SEV-1' | 'SEV-2' | 'SEV-3';
  title: string;
  service: string;
  category: string;
  status: 'RESOLVED' | 'ACTIVE' | 'ESCALATED';
  mttr: string;
  costBobcoins: string;
  winner: string;
  summary: string;
}

const INCIDENTS: IncidentItem[] = [
  {
    id: 'INC-2041',
    severity: 'SEV-1',
    title: "TypeError: Cannot read properties of undefined (reading 'amount')",
    service: 'shopfront-api / payment-adapter',
    category: 'API Contract Drift',
    status: 'RESOLVED',
    mttr: '42s (vs 28m human)',
    costBobcoins: '0.353 Bobcoins',
    winner: 'RECON-1 (Contract Adapter)',
    summary: 'PayLink SDK v3.0 changed fee envelope from fee.amount to data.feeCents. IBM Bob 2.0 mapped the v3 shape and preserved the 2.9% fee invariant.'
  },
  {
    id: 'INC-2042',
    severity: 'SEV-1',
    title: 'Intermittent 500: Insufficient Stock & Negative Warehouse Balance',
    service: 'shopfront-api / inventory-service',
    category: 'Concurrency Race Condition',
    status: 'RESOLVED',
    mttr: '38s (vs 45m human)',
    costBobcoins: '0.412 Bobcoins',
    winner: 'RECON-3 (Async Mutex Queue)',
    summary: 'Check-then-act race across async I/O delay during flash sales. Bob 2.0 implemented a per-SKU promise queue mutex, guaranteeing zero overselling.'
  },
  {
    id: 'INC-2043',
    severity: 'SEV-2',
    title: 'Node.js Event Emitter MaxListenersExceeded & Memory Creep',
    service: 'shopfront-api / notifications',
    category: 'Resource / Listener Leak',
    status: 'RESOLVED',
    mttr: '51s (vs 35m human)',
    costBobcoins: '0.380 Bobcoins',
    winner: 'RECON-2 (Lifecycle Bound)',
    summary: 'Event bus listener registered inside createOrder without disposal. Replaced with single startup registration and once() semantics.'
  },
  {
    id: 'INC-2044',
    severity: 'SEV-1',
    title: '504 Gateway Timeout: Upstream Payment Provider Total Outage',
    service: 'external / visa-gateway',
    category: 'External Dependency Outage',
    status: 'ESCALATED',
    mttr: '14s (Escalated to On-Call)',
    costBobcoins: '0.120 Bobcoins',
    winner: 'ESCALATE (Human Paged)',
    summary: 'External cloud provider network collapse. MAYDAY correctly falsified internal code theories and paged on-call rather than hallucinating a fake fix.'
  }
];

export default function IncidentsPage() {
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    getAllLocalIncidents()
      .then((saved) => {
        setResolvedIds(new Set(saved.map((i) => i.id)));
      })
      .catch(() => {});
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-5 h-5 text-blue-400 animate-pulse" />
            <h1 className="text-xl font-black text-white tracking-wide font-mono">
              INCIDENT FLEET RADAR & ARCHIVE
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time catalog of production incidents triaged, cross-examined, and self-healed by MAYDAY + IBM Bob 2.0.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2 flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-400">Total Outages: <strong className="text-white">4</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">3 Auto-Healed</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">1 Escalated</span>
          </div>
          <Link
            href="/"
            onClick={() => sounds.playKlaxon()}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Open Active War Room</span>
          </Link>
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {INCIDENTS.map((inc) => (
          <div
            key={inc.id}
            className="bg-[#0d121d] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                    inc.severity === 'SEV-1' 
                      ? 'bg-red-500/20 text-red-400 border-red-500/40' 
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}>
                    {inc.id} [{inc.severity}]
                  </span>
                  {resolvedIds.has(inc.id) && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                      LIVE RUN
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-mono">{inc.category}</span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                  inc.status === 'RESOLVED'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                }`}>
                  {inc.status === 'RESOLVED' ? '✓ SELF-HEALED' : '⚠ HONEST ESCALATION'}
                </span>
              </div>

              {/* Title & Service */}
              <h2 className="text-sm font-bold text-white mb-1.5 leading-snug">
                {inc.title}
              </h2>
              <div className="text-[11px] font-mono text-slate-400 mb-3">
                Service: <span className="text-slate-300">{inc.service}</span>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mb-4 leading-relaxed">
                {inc.summary}
              </p>
            </div>

            {/* Metrics & Action Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <div className="space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>MTTR: <strong className="text-white">{inc.mttr}</strong></span>
                </div>
                <div className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-blue-400" />
                  <span>Cost: <strong className="text-blue-300">{inc.costBobcoins}</strong></span>
                </div>
              </div>

              <Link
                href={INCIDENT_WAR_ROOM[inc.id] || '/'}
                onClick={() => sounds.playRadarPing()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold transition flex items-center gap-1.5"
              >
                <span>View Triage</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
