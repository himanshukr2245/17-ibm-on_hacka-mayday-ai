'use client';

import React from 'react';
import Link from 'next/link';
import { Radio, ArrowRight, Flame, Clock } from 'lucide-react';
import { POSTMORTEMS } from '../../data/postmortems';

const LETTER_MAP: Record<string, string> = {
  'INC-2041': 'A',
  'INC-2042': 'B',
  'INC-2043': 'C',
  'INC-2044': 'D',
};

export default function IncidentsPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto w-full space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-5 h-5 text-blue-400 animate-pulse" />
            <h1 className="text-xl font-bold font-mono text-white">
              INCIDENT FLEET ARCHIVE
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-world enterprise production incidents audited and resolved by IBM Bob 2.0 autonomous squad.
          </p>
        </div>

        <Link
          href="/war-room"
          prefetch={false}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-indigo-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 hover:scale-[1.02] transition"
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>Launch Live War Room</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Incident Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POSTMORTEMS.map((inc) => {
          const letter = LETTER_MAP[inc.id] || 'A';
          return (
            <div
              key={inc.id}
              className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                        inc.severity === 'SEV-1'
                          ? 'bg-red-500/20 text-red-300 border-red-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {inc.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Scenario {letter}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <Clock className="w-3 h-3" />
                    <span>MTTR {inc.mttr}</span>
                  </div>
                </div>

                <h2 className="font-bold text-sm text-white mb-1.5 leading-snug">
                  {inc.title}
                </h2>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {inc.service} • Baseline: {inc.humanBaseline}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 font-mono text-xs">
                <Link
                  href={`/incidents/${inc.id}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <span>Dossier & 5-Whys</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                <Link
                  href={`/war-room?incident=${letter}&autopilot=true`}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Flame className="w-3 h-3 text-red-400" />
                  <span>Simulate in War Room</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
