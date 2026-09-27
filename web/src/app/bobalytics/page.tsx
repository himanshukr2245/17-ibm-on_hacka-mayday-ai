'use client';

import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  ZoomIn,
  X,
  FileCheck,
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { HUMAN_COST_PER_INCIDENT, BOB_COST_PER_INCIDENT, calcAnnualSavings } from '../../lib/telemetry';

interface Receipt {
  id: string;
  title: string;
  incident: string;
  tokens: string;
  coins: string;
  description: string;
  imageSrc: string;
}

const RECEIPTS: Receipt[] = [
  {
    id: 'receipt-1',
    title: 'Incident A: Ingestion & Autonomous Triage',
    incident: 'INC-2041 (PayLink SDK Contract Drift)',
    tokens: '19.7k / 270.0k tokens',
    coins: '0.353 Bobcoins',
    description: 'IBM Bob 2.0 ingested the raw stack trace, diagnosed the SDK v3.0 feeCents contract drift, patched adapter.ts, and verified all 3 checkout invariants.',
    imageSrc: '/bob_sessions/teamsita_task01_incident_a_triage.png'
  },
  {
    id: 'receipt-2',
    title: 'Incident A: Session Consumption Details',
    incident: 'INC-2041 (Token & Cost Audit)',
    tokens: '19,742 total tokens',
    coins: '0.353 Bobcoins',
    description: 'Detailed consumption modal from IBM Bob IDE showing granular token attribution and exact coin deductions for Task 1.',
    imageSrc: '/bob_sessions/teamsita_task01_consumption_details.png'
  },
  {
    id: 'receipt-3',
    title: 'Incident B: Concurrency Race Condition Fix',
    incident: 'INC-2042 (Flash Sale Negative Stock)',
    tokens: '24.1k / 270.0k tokens',
    coins: '0.412 Bobcoins',
    description: 'IBM Bob 2.0 diagnosed the check-then-act async delay in reserveStock(), engineered an async per-SKU promise queue mutex, and passed all 20 concurrent thread invariants.',
    imageSrc: '/bob_sessions/teamsita_task02_incident_b_concurrency.png'
  },
  {
    id: 'receipt-4',
    title: 'Incident B: Session Consumption Details',
    incident: 'INC-2042 (Token & Cost Audit)',
    tokens: '24,180 total tokens',
    coins: '0.412 Bobcoins',
    description: 'Detailed token usage audit verifying sub-half coin resolution cost on complex concurrency debugging.',
    imageSrc: '/bob_sessions/teamsita_task02_consumption_details.png'
  }
];

export default function BobalyticsPage() {
  const [activeReceipt, setActiveReceipt] = useState<Receipt | null>(null);
  const [incidentVolume, setIncidentVolume] = useState<number>(15);

  // ESC key closes the lightbox
  React.useEffect(() => {
    if (!activeReceipt) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveReceipt(null); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [activeReceipt]);

  const totalHumanCost = incidentVolume * HUMAN_COST_PER_INCIDENT;
  const totalBobCost = incidentVolume * BOB_COST_PER_INCIDENT;
  const annualSavings = calcAnnualSavings(incidentVolume);

  return (
    <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Coins className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black text-white tracking-wide font-mono">
              BOBALYTICS & TOKEN FINANCIAL COCKPIT
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-world economic audit comparing IBM Bob 2.0 autonomous incident triage against human engineering on-call overhead.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-xs flex items-center gap-2">
            <span className="text-slate-400">Total Budget:</span>
            <span className="text-white font-bold">40.000 Bobcoins</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>39.235 Coins Remaining (98.1%)</span>
          </div>
        </div>
      </div>

      {/* Top Bento Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Human On-Call Baseline</div>
          <div className="text-xl font-bold text-slate-300">$900.00</div>
          <p className="text-[11px] text-slate-500 mt-1">3 SREs × 2.5 hrs @ $120/hr</p>
        </div>

        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">MAYDAY + IBM Bob 2.0</div>
          <div className="text-xl font-bold text-emerald-400">$0.38</div>
          <p className="text-[11px] text-emerald-500/80 mt-1">0.38 Bobcoins avg / run</p>
        </div>

        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Cost Reduction</div>
          <div className="text-xl font-bold text-blue-400">99.96%</div>
          <p className="text-[11px] text-blue-500/80 mt-1">Direct enterprise OpEx savings</p>
        </div>

        <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">MTTR Acceleration</div>
          <div className="text-xl font-bold text-amber-400">97.5% Faster</div>
          <p className="text-[11px] text-amber-500/80 mt-1">40s vs 28m human baseline</p>
        </div>
      </div>

      {/* Interactive Enterprise ROI Calculator */}
      <div className="bg-[#0d121d] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="font-bold text-sm text-white font-mono">
              Enterprise Outage ROI Calculator
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-400">
            Selected Scale: <strong className="text-white">{incidentVolume} incidents / month</strong>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400 flex justify-between font-mono">
            <span>Monthly Production Incidents (SEV-1 / SEV-2):</span>
            <span className="text-blue-400 font-bold">{incidentVolume}</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={incidentVolume}
            onChange={(e) => setIncidentVolume(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs pt-2">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 mb-1">Human On-Call Cost (Monthly)</div>
            <div className="text-base font-bold text-red-400">${totalHumanCost.toLocaleString()}</div>
          </div>
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
            <div className="text-slate-400 mb-1">MAYDAY Bob 2.0 Cost (Monthly)</div>
            <div className="text-base font-bold text-emerald-400">${totalBobCost.toFixed(2)}</div>
          </div>
          <div className="bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/40">
            <div className="text-emerald-300 font-semibold mb-1">Annual Enterprise Savings</div>
            <div className="text-lg font-black text-emerald-400">${annualSavings.toLocaleString()} / year ⚡</div>
          </div>
        </div>
      </div>

      {/* Verified Evidence Pack (Screenshots Gallery) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-400" />
            <h2 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono">
              Official IBM Bob 2.0 Evidence Pack (Verified Session Receipts)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Location: <code className="text-slate-300">bob_sessions/*.png</code>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {RECEIPTS.map((r) => (
            <div
              key={r.id}
              className="bg-[#0d121d] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between shadow-xl group"
            >
              <div>
                {/* Image Preview with Hover Zoom */}
                <div 
                  onClick={() => { setActiveReceipt(r); sounds.playRadarPing(); }}
                  className="relative h-56 bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800 flex items-center justify-center"
                >
                  <img
                    src={r.imageSrc}
                    alt={r.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white font-mono text-xs font-semibold backdrop-blur-xs">
                    <ZoomIn className="w-4 h-4" />
                    <span>Click to Inspect High-Res Receipt</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono">
                    <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {r.incident}
                    </span>
                    <span className="text-[11px] font-bold text-amber-400">
                      {r.coins}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2">{r.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{r.description}</p>
                </div>
              </div>

              <div className="p-4 pt-0 font-mono text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 mt-2">
                <span>Tokens: <strong className="text-slate-200">{r.tokens}</strong></span>
                <button
                  onClick={() => { setActiveReceipt(r); sounds.playRadarPing(); }}
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for High-Res Evidence Inspection */}
      {activeReceipt && (
        <div 
          onClick={() => setActiveReceipt(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0d121d] border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 font-mono">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{activeReceipt.title}</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{activeReceipt.tokens} • {activeReceipt.coins}</p>
              </div>
              <button
                onClick={() => setActiveReceipt(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="flex-1 overflow-auto p-4 bg-black flex items-center justify-center">
              <img
                src={activeReceipt.imageSrc}
                alt={activeReceipt.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border border-slate-800"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/60 text-xs text-slate-300 flex items-center justify-between font-mono">
              <span>Verified Authentic IBM Bob 2.0 Execution Proof</span>
              <a
                href={activeReceipt.imageSrc}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1.5"
              >
                <span>Open Raw PNG</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
