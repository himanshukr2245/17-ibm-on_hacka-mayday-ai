'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Volume2,
  VolumeX,
  ArrowLeft,
  HardDrive,
  Cpu,
  Flame,
  Radio,
  FileCode,
} from 'lucide-react';
import LiveCustomStudio from '../../components/studio/LiveCustomStudio';
import { callHealAPI } from '../../lib/demoMode';
import { sounds } from '../../lib/audio';

export default function StudioPage() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [diskStatus, setDiskStatus] = useState<{
    incidentA?: { status: string; file: string; isFixed: boolean };
    incidentB?: { status: string; file: string; isFixed: boolean };
  }>({});

  const checkLiveDiskStatus = async () => {
    try {
      const data = await callHealAPI('status', 'incident-a');
      if (data.success && data.currentStatus) {
        setDiskStatus(data.currentStatus);
      }
    } catch (e) {
      console.error('Failed to query disk status', e);
    }
  };

  useEffect(() => {
    checkLiveDiskStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white pb-16">
      {/* Studio Top Control Strip */}
      <header className="border-b border-slate-800/80 bg-[#0a0e17] px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-1 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Link>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Wrench className="w-4 h-4" />
              </span>
              <div>
                <h1 className="text-sm font-bold text-white font-mono tracking-wide">
                  MAYDAY LIVE DIAGNOSTIC STUDIO
                </h1>
                <p className="text-[11px] text-slate-400 font-mono">
                  Physical Disk Mutation • Live Vitest Terminal • Custom Stack Trace Ingestion
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Link to War Room */}
            <Link
              href="/war-room"
              className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Open War Room Cockpit</span>
            </Link>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) sounds.playTerminalClick();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-6 flex-1">
        <LiveCustomStudio
          soundEnabled={soundEnabled}
          diskStatus={diskStatus}
          onDiskStatusChange={checkLiveDiskStatus}
        />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-[#07090e] px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">MAYDAY Live Diagnostic Studio</span>
          <span>•</span>
          <span>Physical Filesystem &amp; Vitest Execution Engine</span>
        </div>
        <div className="font-mono text-[11px] text-emerald-400">
          ● Ready for Custom Ingestion &amp; Webhook Triggers
        </div>
      </footer>
    </div>
  );
}
