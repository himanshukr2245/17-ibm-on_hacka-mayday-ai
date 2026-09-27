'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Terminal,
  Cpu,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  FileText,
  Flame,
  Layers,
  ArrowRight,
  Copy,
  Check,
  Radio,
  Activity,
  ShieldCheck,
  Wrench,
  FlaskConical,
  Coins,
  GitBranch,
  Lock,
  Users,
  Briefcase,
  UserCheck,
  Code2,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { sounds } from '../lib/audio';

export default function LandingCommandPortal() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Smriti-Inspired Dual Mode: Golden Demo (In-Memory) vs Real Host Mode (targets/shopfront on disk)
  const [activeMode, setActiveMode] = useState<'DEMO' | 'REAL'>('DEMO');

  // Mini-Simulator State (Hero Interception)
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSimulating, setIsSimulating] = useState(false);

  // Hall of Shame Code Toggle
  const [diffMode, setDiffMode] = useState<'naive' | 'mayday'>('mayday');

  // Architecture Blueprint Stage
  const [archStage, setArchStage] = useState<1 | 2 | 3 | 4 | 5>(3);

  // How Users Actually Use It (3 Modes)
  const [usageTab, setUsageTab] = useState<'webhook' | 'studio' | 'cli'>('webhook');
  const [copiedCurl, setCopiedCurl] = useState(false);

  const runMiniSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    if (soundEnabled) sounds.playRadarPing();

    setTimeout(() => {
      setSimStep(2);
      if (soundEnabled) sounds.playTerminalClick();
    }, 900);

    setTimeout(() => {
      setSimStep(3);
      if (soundEnabled) sounds.playTerminalClick();
    }, 1900);

    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
      if (soundEnabled) sounds.playGreenChime();
    }, 3000);
  };

  const resetMiniSimulation = () => {
    setSimStep(1);
    setIsSimulating(false);
    if (soundEnabled) sounds.playTerminalClick();
  };

  const copyCurlCode = () => {
    const code = `curl -X POST http://localhost:3000/api/heal \\\n  -H "Content-Type: application/json" \\\n  -d '{"action": "break", "target": "incident-a"}'`;
    navigator.clipboard.writeText(code);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white pb-20">
      {/* ========================================================================= */}
      {/* 🚨 TOP RIBBON: DUAL-MODE SWITCHER (DEMO VS REAL HOST DISK MODE)            */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white font-mono text-[11px] font-black tracking-widest uppercase px-4 py-2 flex flex-col sm:flex-row items-center justify-between shadow-xl shadow-red-900/30 border-b border-red-500/40 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span>
            🚨 PRODUCTION OUTAGE AT 3:00 AM • AUTONOMOUS INCIDENT COMMANDER ACTIVE • ZERO TIRED HUMANS WOKEN UP
          </span>
        </div>

        {/* Smriti-Style Mode Switcher Pill */}
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/20">
          <button
            type="button"
            onClick={() => {
              setActiveMode('DEMO');
              if (soundEnabled) sounds.playTerminalClick();
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'DEMO'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>🎮 Golden Demo Mode</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('REAL');
              if (soundEnabled) sounds.playRadarPing();
            }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'REAL'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Wrench className="w-3 h-3" />
            <span>⚡ Real Host Mode (Disk)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🚀 SECTION 1: HERO COMMAND & 15-SECOND CLARITY HOOK                       */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0d121f] via-[#090d16] to-[#07090e] px-6 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Headline Area */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>AUTONOMOUS AI INCIDENT COMMANDER • POWERED BY IBM BOB 2.0</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              When Production Crashes at 3:00 AM,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
                Don&apos;t Wake Up a Tired Engineer.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto">
              MAYDAY intercepts production alerts, deploys 3 parallel AI detective subagents in IBM Bob, writes reproduction tests to prove root causes, applies verified code fixes on disk, and opens ready-to-merge GitHub Pull Requests in <strong className="text-emerald-400">under 38 seconds</strong>.
            </p>

            {/* Main Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/war-room"
                prefetch={false}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-red-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Flame className="w-4 h-4 fill-current text-amber-200" />
                <span>🎮 Start 60-Second Guided Tour (Golden Demo)</span>
              </Link>

              <Link
                href="/studio"
                prefetch={false}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Wrench className="w-4 h-4 text-emerald-200" />
                <span>⚡ Open Live Diagnostic Studio (Real Disk)</span>
              </Link>
            </div>
          </div>

          {/* Interactive 4-Step Crisis Interception Widget */}
          <div className="max-w-4xl mx-auto bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-5 gap-3">
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span className="p-1 rounded bg-red-500/20 text-red-400">🚨</span>
                  <span>LIVE CRISIS INTERCEPTION SIMULATOR</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Interactive Preview
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Click any step or press simulate to see how MAYDAY intercepts a crash and verifies a fix in 3 seconds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={runMiniSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Simulating…' : '▶️ Simulate 3:00 AM Alert'}</span>
                </button>

                <button
                  type="button"
                  onClick={resetMiniSimulation}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Reset Preview"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4-Step Interactive Mini Progression */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Step 1 */}
              <button
                type="button"
                onClick={() => {
                  setSimStep(1);
                  if (soundEnabled) sounds.playRadarPing();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none ${
                  simStep >= 1
                    ? 'bg-red-950/30 border-red-500/60 shadow-lg shadow-red-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800'
                } ${simStep === 1 ? 'ring-2 ring-red-500/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-red-400">1. ALERT INGESTION</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {simStep >= 1 ? '12ms' : 'Click to inspect'}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                  <span>Sentry Webhook</span>
                  {simStep === 1 && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  TypeError in payment adapter captured. Checkout failure: 100%.
                </p>
              </button>

              {/* Step 2 */}
              <button
                type="button"
                onClick={() => {
                  setSimStep(2);
                  if (soundEnabled) sounds.playTerminalClick();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none ${
                  simStep >= 2
                    ? 'bg-blue-950/30 border-blue-500/60 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800'
                } ${simStep === 2 ? 'ring-2 ring-blue-500/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-400">2. BOB DETECTIVES</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {simStep >= 2 ? '3 Parallel' : 'Click to inspect'}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                  <span>RECON Swarm</span>
                  {simStep === 2 && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  RECON-1 identifies PayLink SDK v3 envelope drift in recent commit.
                </p>
              </button>

              {/* Step 3 */}
              <button
                type="button"
                onClick={() => {
                  setSimStep(3);
                  if (soundEnabled) sounds.playTerminalClick();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none ${
                  simStep >= 3
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800'
                } ${simStep === 3 ? 'ring-2 ring-amber-500/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400">3. PROOF LADDER</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {simStep >= 3 ? 'Vitest' : 'Click to inspect'}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                  <span>Repro Test Verified</span>
                  {simStep === 3 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  Test failed on broken code; turns green with 2.9% fee invariant intact.
                </p>
              </button>

              {/* Step 4 */}
              <button
                type="button"
                onClick={() => {
                  setSimStep(4);
                  if (soundEnabled) sounds.playGreenChime();
                }}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none ${
                  simStep >= 4
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800'
                } ${simStep === 4 ? 'ring-2 ring-emerald-500/50' : ''}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">4. MERGE-READY PR</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {simStep >= 4 ? 'PR #104' : 'Click to inspect'}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-between">
                  <span>Bleed Halted ($0 Loss)</span>
                  {simStep === 4 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  Verified GitHub PR generated with full mathematical postmortem.
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⚖️ SECTION 2: WHAT IS MAYDAY IN REAL LIFE? (THE MENTAL MODEL)              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            THE 3:00 AM PRODUCTION REALITY
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            What IS This App in Real Life?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            In modern tech companies (Uber, Shopify, Netflix, IBM), apps run on hundreds of cloud servers. When checkouts crash at 3 AM, compare how outages are handled today versus with MAYDAY.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Today without MAYDAY */}
          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
              <div className="text-sm font-mono font-bold text-red-400 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                <span>TODAY WITHOUT MAYDAY</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
                70+ Minutes Outage
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
                <span className="text-red-400 font-bold">03:00 AM:</span> Alert triggers in Datadog/Sentry. 100% checkout failure.
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
                <span className="text-red-400 font-bold">03:15 AM:</span> PagerDuty wakes up sleepy on-call engineer.
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
                <span className="text-red-400 font-bold">03:45 AM:</span> Engineer spends 30 minutes reading through 50,000 log lines with cognitive tunnel vision.
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
                <span className="text-red-400 font-bold">04:00 AM:</span> Panicked engineer writes naive band-aid (<code className="text-amber-300">fee?.amount ?? 0</code>). This stops the crash, but secretly zeroes out customer fees!
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-red-500/20">
                <span className="text-red-400 font-bold">04:10 AM:</span> Untested patch deployed to prod. Company silently loses <strong className="text-red-400">$11,600 / day</strong> until finance notices weeks later!
              </div>
            </div>
          </div>

          {/* Card 2: With MAYDAY */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>WITH MAYDAY AI</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                38 Seconds to Verified PR
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold">03:00:00 AM:</span> Crash webhook ingested by MAYDAY. Zero humans woken up.
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold">03:00:05 AM:</span> 3 IBM Bob detective subagents deploy in parallel (Recent Changes, Null-Safety, Concurrency).
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold">03:00:20 AM:</span> Reproduction test synthesized on disk; confirms defect by FAILING first.
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold">03:00:35 AM:</span> Cross-Examination Matrix rejects naive band-aids that leak revenue. Crown fix mapped to new PayLink v3 schema.
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold">03:00:38 AM:</span> Real Vitest suite passes 100% on disk. GitHub PR opened with full mathematical postmortem.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 👥 SECTION 3: FOR WHOM IS MAYDAY BUILT? (3 PERSONAS)                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>WHO IS MAYDAY FOR?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Built for Engineers Who Value Their Sleep
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Whether you&apos;re holding the on-call pager, managing cluster security, or running an engineering org, MAYDAY is designed for your role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Persona 1: On-Call Dev */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <UserCheck className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  SOFTWARE ENGINEER
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-emerald-300 transition">
                The On-Call Developer
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Your Pain Today:</strong> Getting paged at 3:00 AM out of deep sleep for SDK contract mismatches and syntax regressions.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 font-mono text-xs text-emerald-300/90 leading-snug">
                &ldquo;Sleep peacefully through the night. Wake up at 8:00 AM with a ready-to-merge GitHub PR and passing Vitest proofs in your inbox.&rdquo;
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
              Zero sleep interruptions • Ready diffs
            </div>
          </div>

          {/* Persona 2: SRE / Security Lead */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-blue-500/50 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                  SRE &amp; DEVOPS
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-blue-300 transition">
                The Principal SRE Lead
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Your Pain Today:</strong> Terrified of rogue AI modifying production containers without test verification or security audit trails.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-blue-500/20 font-mono text-xs text-blue-300/90 leading-snug">
                &ldquo;Strict Pull Request Boundary: MAYDAY never pushes to main. Fixes require a failing test first and must keep 100% of tests green.&rdquo;
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
              SOC2 audit receipts • PR Boundary
            </div>
          </div>

          {/* Persona 3: VP of Engineering */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-purple-500/50 transition-all duration-300 space-y-4 shadow-xl flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                  VP OF ENGINEERING
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-purple-300 transition">
                The Engineering Leader
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Your Pain Today:</strong> Outages bleed $14.50/second ($11,600/day on checkout failures); MTTR is over 1 hour.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-purple-500/20 font-mono text-xs text-purple-300/90 leading-snug">
                &ldquo;Drop MTTR from 70+ minutes down to 38 seconds. Autonomous triage costs ~$0.35 in IBM Bob tokens, delivering 3,300x ROI.&rdquo;
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
              3,300x ROI • Transparent Bobcoins
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🔌 SECTION 4: HOW DOES A REAL USER ACTUALLY USE MAYDAY?                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
            <Wrench className="w-3.5 h-3.5" />
            <span>HOW DO I USE THIS APP?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            How a Developer Actually Uses MAYDAY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            No massive rewrites or manual file uploads. MAYDAY plugs directly into your existing infrastructure in three clean ways.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          {[
            { id: 'webhook', label: '1. Production Webhook (Zero Touch)', icon: Radio },
            { id: 'studio', label: '2. Interactive Web Studio (/studio)', icon: Wrench },
            { id: 'cli', label: '3. Inside IBM Bob IDE (CLI)', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = usageTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setUsageTab(tab.id as any);
                  if (soundEnabled) sounds.playTerminalClick();
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {usageTab === 'webhook' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    Way 1: Automated Production Webhook (Zero Touch)
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    How enterprise companies run MAYDAY in production: Sentry or Datadog alerts ping MAYDAY automatically.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyCurlCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCurl ? 'Copied Curl!' : 'Copy Test Curl'}</span>
                </button>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-blue-400 font-bold">STEP 01</div>
                  <div className="font-mono text-xs font-bold text-white">Add Webhook URL</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Paste <code className="text-blue-300">/api/heal</code> into Sentry, Datadog, or IBM Instana webhook integrations.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-purple-400 font-bold">STEP 02</div>
                  <div className="font-mono text-xs font-bold text-white">Connect GitHub Repo</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Grant MAYDAY access to create branches like <code className="text-purple-300">mayday/fix-incident-*</code>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">STEP 03</div>
                  <div className="font-mono text-xs font-bold text-white">Wake Up to Green PR</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    When an outage strikes, MAYDAY triages in 38s and opens a ready-to-merge PR with passing Vitest proofs.
                  </p>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed">
{`# Test the live webhook endpoint from your local terminal:
curl -X POST http://localhost:3000/api/heal \\
  -H "Content-Type: application/json" \\
  -d '{
    "action": "break",
    "target": "incident-a",
    "event": "alert.triggered",
    "service": "shopfront-checkout"
  }'`}
              </pre>
            </div>
          )}

          {usageTab === 'studio' && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-400" />
                  Way 2: Interactive Web Studio (/studio)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  How anyone can test MAYDAY right now on their machine: Mutate physical files on disk and execute live Node.js Vitest.
                </p>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-blue-400 font-bold">STEP 01</div>
                  <div className="font-mono text-xs font-bold text-white">Open Diagnostic Studio</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Navigate to <Link href="/studio" prefetch={false} className="text-blue-400 underline">/studio</Link> in your browser.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-red-400 font-bold">STEP 02</div>
                  <div className="font-mono text-xs font-bold text-white">Inject Crash on Disk</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Click &ldquo;Inject Broken SDK&rdquo; to mutate <code className="text-amber-300">targets/shopfront</code> on your hard drive.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">STEP 03</div>
                  <div className="font-mono text-xs font-bold text-white">Run Vitest &amp; Fix</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Watch Node.js child processes execute Vitest, fail first, apply the Crown Fix, and turn green!
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-xs font-bold text-white">Ready to test on your hard drive?</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Physical host execution • Live Node 20 child_process test runner • Custom trace parser
                  </div>
                </div>
                <Link
                  href="/studio"
                  prefetch={false}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition hover:scale-[1.02] self-start sm:self-auto"
                >
                  <span>Launch Live Studio &rarr;</span>
                </Link>
              </div>
            </div>
          )}

          {usageTab === 'cli' && (
            <div className="space-y-5">
              <div className="border-b border-slate-800 pb-4">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  Way 3: Inside IBM Bob IDE Desktop (CLI Agent)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Developers working inside IBM Bob IDE can invoke MAYDAY directly from the terminal or prompt using custom modes.
                </p>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-purple-400 font-bold">STEP 01</div>
                  <div className="font-mono text-xs font-bold text-white">Open Bob Terminal</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Open your workspace in IBM Bob IDE.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-blue-400 font-bold">STEP 02</div>
                  <div className="font-mono text-xs font-bold text-white">Run Triage Command</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Execute <code className="text-purple-300">bob run --mode mayday-triage &ldquo;...&rdquo;</code>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">STEP 03</div>
                  <div className="font-mono text-xs font-bold text-white">Multi-Agent Autopatch</div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Bob investigates git history, runs Vitest, and patches code inside the editor in 38s.
                  </p>
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto leading-relaxed">
{`# Run MAYDAY Autonomous Triage inside IBM Bob IDE:
bob run --mode mayday-triage "Checkout failing with TypeError in payment-service"

# IBM Bob dispatches the 3-detective squad:
# 🕵️ RECON-1: Auditing Git blame SHA 7a12b3c
# 🛡️ RECON-2: Synthesizing Rung-1 reproduction test in test/checkout.test.ts
# ⚡ RECON-3: Checking connection pool concurrency
# ✅ Patch verified with Vitest in 38s.`}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🏛️ SECTION 5: WHAT MAYDAY ACTUALLY IS (INTERACTIVE ARCHITECTURE BLUEPRINT) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>ENTERPRISE SAFEGUARDS &amp; PULL REQUEST BOUNDARY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Where MAYDAY Sits in Your Production Stack
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            From the moment an alert fires to verified pull request creation: A closed-loop scientific triage pipeline with zero direct pushes to production <code className="text-indigo-300">main</code>.
          </p>
        </div>

        {/* 5-Stage Architectural Pipeline */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                stage: 1,
                name: '1. Crash Ingestion',
                sub: 'Sentry / Datadog / Instana',
                icon: ShieldAlert,
              },
              {
                stage: 2,
                name: '2. Bob 2.0 Swarm',
                sub: '3 Parallel Detectives',
                icon: Cpu,
              },
              {
                stage: 3,
                name: '3. Proof Ladder',
                sub: 'Repro Test on Disk',
                icon: Terminal,
              },
              {
                stage: 4,
                name: '4. Isolated Git Branch',
                sub: 'mayday/fix-incident-*',
                icon: GitBranch,
              },
              {
                stage: 5,
                name: '5. PR Safeguard',
                sub: 'Human-in-the-Loop',
                icon: Lock,
              },
            ].map((s) => {
              const Icon = s.icon;
              const isSelected = archStage === s.stage;
              return (
                <button
                  key={s.stage}
                  type="button"
                  onClick={() => {
                    setArchStage(s.stage as any);
                    if (soundEnabled) sounds.playTerminalClick();
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                      : 'bg-black/40 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                      <Icon className="w-4 h-4 text-slate-200" />
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      STAGE 0{s.stage}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-white truncate">{s.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{s.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Deep Dive */}
          <div className="p-6 rounded-xl bg-black/60 border border-slate-800 space-y-4">
            {archStage === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
                      <ShieldAlert className="w-4 h-4" />
                    </span>
                    <h4 className="font-mono text-sm font-bold text-white">
                      Stage 1: Production Webhook Ingestion &amp; AST Stack Parsing
                    </h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    Latency: &lt;15ms
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  When a production service crashes, APM agents (Datadog, Sentry, AWS CloudWatch, IBM Instana) transmit a webhook to MAYDAY’s <code className="text-red-300">/api/heal</code> endpoint. MAYDAY extracts the culprit service name, stack trace, error message, and recent deployment SHA without requiring any human presence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-slate-400">INPUT PAYLOAD:</div>
                    <div className="text-red-400">{`{ event: "alert.triggered", service: "shopfront", file: "src/payment/adapter.ts:31" }`}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="text-slate-400">IMMEDIATE ACTION:</div>
                    <div className="text-slate-300">Locks incident context, alerts local workspace, dispatches IBM Bob detective swarm.</div>
                  </div>
                </div>
              </div>
            )}

            {archStage === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <h4 className="font-mono text-sm font-bold text-white">
                      Stage 2: IBM Bob 2.0 Multi-Agent Swarm (3 Competing Detectives)
                    </h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Parallel Execution
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Humans suffer from confirmation bias when stressed at 3 AM. MAYDAY deploys 3 specialized IBM Bob 2.0 subagents in parallel to investigate competing root-cause hypotheses simultaneously:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-blue-400">🕵️ RECON-1: Recent Changes</div>
                    <p className="text-[11px] text-slate-400">
                      Performs Git blame across recent commits. Flags PayLink SDK v2 &rarr; v3 bump in commit <code>7a12b3c</code>.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-purple-400">🛡️ RECON-2: Null-Safety &amp; Contracts</div>
                    <p className="text-[11px] text-slate-400">
                      Evaluates response envelope drift: <code className="text-purple-300">fee.amount</code> was renamed to <code className="text-purple-300">data.feeCents</code>.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-emerald-400">⚡ RECON-3: Concurrency &amp; Locks</div>
                    <p className="text-[11px] text-slate-400">
                      Audits thread contention and connection pooling; confirms deadlock is not the primary root cause.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {archStage === 3 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                      <Terminal className="w-4 h-4" />
                    </span>
                    <h4 className="font-mono text-sm font-bold text-white">
                      Stage 3: The Scientific Proof Ladder (Empirical Verification on Disk)
                    </h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Host Vitest Runner
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  MAYDAY operates under a strict mathematical rule: <em>No code modification is ever permitted without an empirical reproduction test.</em>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 space-y-1">
                    <div className="font-bold text-red-400">RUNG 1: REPRODUCTION TEST FAILS FIRST</div>
                    <div className="text-slate-300">
                      Writes <code className="text-amber-300">test/checkout.test.ts</code> and executes Node Vitest. Confirms test FAILS on broken code, proving the bug is genuine.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                    <div className="font-bold text-emerald-400">RUNG 3: PATCH PASSES 100% SUITE</div>
                    <div className="text-slate-300">
                      Synthesizes candidate patch, verifies contract conversion (<code className="text-emerald-300">data.feeCents / 100</code>), and ensures 100% of the regression suite passes.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {archStage === 4 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                      <GitBranch className="w-4 h-4" />
                    </span>
                    <h4 className="font-mono text-sm font-bold text-white">
                      Stage 4: Isolated Git Branch &amp; Cryptographic Audit Trail
                    </h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Zero Risk to Main
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  MAYDAY isolates all mutations inside a dedicated Git branch (e.g. <code className="text-purple-300">mayday/fix-incident-2041</code>). It attaches the exact test execution output, token receipts, and hypothesis rejection matrices to the Git commit message for full SOC2 / ISO compliance.
                </p>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-slate-300">
                  <span className="text-purple-400 font-bold">$ git status:</span> On branch <span className="text-emerald-400 font-bold">mayday/fix-incident-2041</span>. Verified by Vitest child_process (2 passed, 0 failed). Ready for Pull Request creation.
                </div>
              </div>
            )}

            {archStage === 5 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <h4 className="font-mono text-sm font-bold text-white">
                      Stage 5: The Pull Request Boundary (Human-in-the-Loop Safeguard)
                    </h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Enterprise Security Invariant
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  <strong>The golden rule of enterprise SRE:</strong> Autonomous AI must never push unreviewed code directly to production clusters. MAYDAY opens a verified GitHub Pull Request (e.g. <strong>PR #104</strong>) with the complete diff, passing test proofs, and financial ROI calculations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Option A: 1-Click Human Merge</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      The on-call engineer wakes up at their leisure, reviews the green Vitest badges, and clicks &ldquo;Merge Pull Request&rdquo; in 5 seconds.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="font-mono text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Option B: Automated Canary Rollout</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      For high-urgency services, CI can deploy the branch to a 5% canary pool with automated instant rollback if error rate spikes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⚠️ SECTION 6: THE HALL OF SHAME (WHY NAIVE AI DESTROYS COMPANIES)         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>⚠️ THE HALL OF SHAME: NAIVE AI BAND-AIDS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Why Standard LLMs Silently Leak Thousands of Dollars
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                When you paste a TypeError into ChatGPT or Claude, it suggests lazy optional chaining. The crash stops, but business logic is silently corrupted. MAYDAY&apos;s Cross-Examination Matrix prevents this disaster.
              </p>
            </div>

            {/* Diff Selector Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => { setDiffMode('naive'); if (soundEnabled) sounds.playTerminalClick(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  diffMode === 'naive'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ❌ Naive AI LLM &ldquo;Fix&rdquo;
              </button>
              <button
                type="button"
                onClick={() => { setDiffMode('mayday'); if (soundEnabled) sounds.playTerminalClick(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  diffMode === 'mayday'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👑 MAYDAY Empirical Fix
              </button>
            </div>
          </div>

          {/* Code Diff Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <pre className="p-4 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed text-slate-300">
                {diffMode === 'naive' ? (
`// ❌ NAIVE AI PATCH (Proposed by standard ChatGPT / Copilot):
// Prompt: "Fix TypeError: Cannot read properties of undefined (reading 'amount')"

export async function processPayment(req: ChargeRequest) {
  const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);

- const fee = (gatewayRaw as any).fee.amount; // 🚨 Throws TypeError
+ const fee = gatewayRaw.fee?.amount ?? 0;   // ⚠️ LAZY BAND-AID!

  // 💥 HIDDEN FINANCIAL DISASTER:
  // gatewayRaw.fee is undefined because PayLink upgraded to SDK v3 (data.feeCents).
  // The ?? 0 sets fee = $0.00 on EVERY transaction!
  // At 40,000 checkouts/day: Leaks $11,600 / day silently!
  return { fee, total: req.amountDollars + fee };
}`
                ) : (
`// 👑 MAYDAY VERIFIED INVARIANT FIX (Enforced by IBM Bob 2.0 & Vitest):
// The Scientific Proof Ladder verifies that result.fee MUST equal 2.9% ($0.29).

export async function processPayment(req: ChargeRequest) {
  const gatewayRaw = await rawPaylinkGatewayCall(req.amountDollars);

- const fee = (gatewayRaw as any).fee.amount; // 🚨 Contract Drift
+ // ✅ MAYDAY CROWN FIX: Defensively read new PayLink v3.0 schema
+ // Convert integer cents to dollars to preserve the 2.9% fee invariant:
+ const fee = gatewayRaw.data.feeCents / 100;

  // 🛡️ REVENUE PRESERVED:
  // Invariant test 'expect(result.fee).toBeCloseTo(0.29)' PASSES 100%!
  return { fee, total: req.amountDollars + fee };
}`
                )}
              </pre>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  diffMode === 'naive'
                    ? 'bg-red-950/30 border-red-500/40 text-red-300'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <div className="font-mono text-xs font-bold uppercase flex items-center gap-1.5">
                  {diffMode === 'naive' ? <XCircle className="w-4 h-4 text-red-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span>{diffMode === 'naive' ? 'Verdict: DISQUALIFIED' : 'Verdict: VERIFIED CROWN FIX'}</span>
                </div>
                <p className="text-xs leading-relaxed font-sans text-slate-300">
                  {diffMode === 'naive'
                    ? 'The naive patch stops the 500 error, but violates the 2.9% fee calculation invariant. MAYDAY’s Cross-Examination Matrix rejects this patch automatically.'
                    : 'MAYDAY proves the contract change, translates PayLink v3 feeCents into dollars, and proves invariant compliance with Vitest before creating the PR.'}
                </p>
              </div>

              <div className="font-mono text-[11px] text-slate-400 p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div><strong>Target File:</strong> targets/shopfront/src/payment/adapter.ts</div>
                <div><strong>Test Invariant:</strong> test/checkout.test.ts:23</div>
                <div><strong>Daily Loss Prevented:</strong> $11,600 / day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧭 SECTION 7: CHOOSE YOUR DEDICATED WORKSPACE (6 GATEWAYS)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            THE MAYDAY PRODUCT SUITE
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Choose Your Dedicated Workspace
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every capability has a dedicated, distraction-free environment. Click any card to enter the workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Studio */}
          <Link
            href="/studio"
            prefetch={false}
            className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-emerald-500/60 hover:bg-[#0e1422] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Wrench className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  LIVE WORKBENCH
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-emerald-300 transition">
                Live Diagnostic Studio
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Directly inject bugs on disk in <code className="text-blue-300">targets/shopfront</code>, execute real Vitest runs in Node.js, and paste custom stack traces.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: War Room */}
          <Link
            href="/war-room"
            prefetch={false}
            className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-red-500/60 hover:bg-[#0e1422] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <Flame className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold border border-red-500/30">
                  4 SCENARIOS
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-red-300 transition">
                Incident War Room Cockpit
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experience 4 high-stakes production crises (INC-2041 to INC-2044) with 3 competing detectives, MTTR clocks, and audio SFX.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-red-400 font-bold">
              <span>Enter War Room</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: Matrix */}
          <Link
            href="/matrix"
            prefetch={false}
            className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-blue-500/60 hover:bg-[#0e1422] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                  PROOF ENGINE
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-blue-300 transition">
                Cross-Examination Matrix
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect forensic audit tables proving why decoy AI fixes were disqualified across all 4 production incidents.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-blue-400 font-bold">
              <span>View Matrix Proofs</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Bobalytics */}
          <Link
            href="/bobalytics"
            prefetch={false}
            className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-amber-500/60 hover:bg-[#0e1422] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Coins className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                  TOKEN AUDIT
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-amber-300 transition">
                Bobalytics &amp; ROI Accounting
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detailed token consumption logs, Bobcoins expenditures per agent, and mathematical ROI calculations.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
              <span>Inspect Bobalytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5: Simulator */}
          <Link
            href="/simulator"
            prefetch={false}
            className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-purple-500/60 hover:bg-[#0e1422] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <FlaskConical className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30">
                  CHAOS ENGINE
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-purple-300 transition">
                Chaos Engineering Simulator
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inject synthetic network latency, database connection exhaustion, and EventEmitter memory leaks on demand.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-purple-400 font-bold">
              <span>Launch Chaos Lab</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 6: Postmortem */}
          <Link
            href="/postmortem"
            prefetch={false}
            className="p-6 rounded-2xl bg-[#0b0f19] border border-slate-800 hover:border-indigo-500/60 hover:bg-[#0e1422] transition-all duration-300 flex flex-col justify-between group shadow-xl hover:scale-[1.02]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
                  PULL REQUESTS
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-mono group-hover:text-indigo-300 transition">
                Postmortem &amp; PR Library
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse executive incident postmortems, printable PDF reports, and real GitHub Pull Requests with full test proofs.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-bold">
              <span>Browse Postmortems</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🛡️ SECTION 8: THE EMPIRICAL HONESTY GUARANTEE                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg font-black text-white font-mono">
                THE MAYDAY EMPIRICAL HONESTY GUARANTEE
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                No Simulated Marketing Smoke &amp; Mirrors. Three Firm Engineering Invariants:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-1.5">
              <div className="font-mono text-xs font-bold text-emerald-400">1. Reproduction Test Invariant</div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                If the AI cannot write a reproduction test that FAILS on current code, it is forbidden from touching production files.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-1.5">
              <div className="font-mono text-xs font-bold text-blue-400">2. Physical Disk Execution</div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Code mutations are written to physical disk in <code className="text-blue-300">targets/shopfront</code> and executed via real Node 20 child processes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-1.5">
              <div className="font-mono text-xs font-bold text-purple-400">3. Honest Human Escalation</div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                For external infrastructure partitions (like Incident D: Visa outage), MAYDAY honestly escalates with status links instead of hallucinating code edits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Strip */}
      <footer className="mt-8 border-t border-slate-800/80 bg-[#07090e] px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">MAYDAY Autonomous Incident Commander</span>
          <span>•</span>
          <span>IBM Bob 2.0 AI Hackathon</span>
          <span>•</span>
          <span>Team SITA (Himanshu Kumar &amp; Priyansu Modi)</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="text-emerald-400 font-semibold">● 100% Deterministic Invariant Ladder</span>
          <span className="text-slate-400">Ready for Cloudflare Deployment</span>
        </div>
      </footer>
    </div>
  );
}
