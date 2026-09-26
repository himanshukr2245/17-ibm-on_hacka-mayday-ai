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
  Zap,
  FileText,
  GitPullRequest,
  Clock,
  Flame,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Radio,
  DollarSign,
  Activity,
  Compass,
  Volume2,
  VolumeX,
  ShieldCheck,
  Eye,
  Code2,
  HardDrive,
  Wrench,
  FlaskConical,
  Coins,
  Bug,
  Send,
  HelpCircle,
} from 'lucide-react';
import { sounds } from '../lib/audio';

export default function LandingCommandPortal() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mini-Simulator State (3-second Hero Interception)
  const [simStep, setSimStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Hall of Shame Code Toggle
  const [diffMode, setDiffMode] = useState<'naive' | 'mayday'>('mayday');

  // Integration Tabs
  const [integrationTab, setIntegrationTab] = useState<'webhook' | 'studio' | 'bob-cli'>('webhook');
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
    setSimStep(0);
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
      {/* Top Incident Siren Ticker */}
      <div className="bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white font-mono text-[11px] font-black tracking-widest uppercase px-4 py-1.5 flex items-center justify-between shadow-xl shadow-red-900/30 border-b border-red-500/40">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span>
            🚨 PRODUCTION OUTAGE AT 3:00 AM • AUTONOMOUS INCIDENT COMMANDER ACTIVE • ZERO TIRED HUMANS WOKEN UP
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[10px] tracking-normal">
          <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">
            ENGINE: IBM Bob 2.0 Multi-Agent Squad
          </span>
          <span className="bg-black/30 px-2 py-0.5 rounded border border-white/20">
            PROOFS: Real Vitest on Host Disk
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🚀 SECTION 1: HERO COMMAND & 3-SECOND INTERACTIVE CRISIS SIMULATOR        */}
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
                href="/studio"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Wrench className="w-4 h-4 text-emerald-200" />
                <span>⚡ Open Live Diagnostic Studio (Real)</span>
              </Link>

              <Link
                href="/war-room"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-red-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
              >
                <Flame className="w-4 h-4 fill-current text-amber-200" />
                <span>🎮 Launch Incident War Room (Golden Demo)</span>
              </Link>
            </div>
          </div>

          {/* Interactive 3-Second Crisis Interception Widget */}
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
                  See how MAYDAY intercepts a production crash and verifies a fix in 3 seconds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runMiniSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Simulating…' : '▶️ Simulate 3:00 AM Alert'}</span>
                </button>

                <button
                  onClick={resetMiniSimulation}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                  title="Reset Preview"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4-Step Interactive Mini Progression */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  simStep >= 1
                    ? 'bg-red-950/30 border-red-500/60 shadow-lg shadow-red-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-red-400">1. ALERT INGESTION</span>
                  <span className="text-[10px] font-mono text-slate-400">{simStep >= 1 ? '12ms' : 'Ready'}</span>
                </div>
                <div className="text-xs font-mono font-bold text-white">Sentry Webhook</div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  TypeError in payment adapter captured. Checkout failure: 100%.
                </p>
              </div>

              {/* Step 2 */}
              <div
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  simStep >= 2
                    ? 'bg-blue-950/30 border-blue-500/60 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-400">2. BOB DETECTIVES</span>
                  <span className="text-[10px] font-mono text-slate-400">{simStep >= 2 ? '3 Parallel' : 'Waiting'}</span>
                </div>
                <div className="text-xs font-mono font-bold text-white">RECON Swarm</div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  RECON-1 identifies PayLink SDK v3 envelope drift in recent commit.
                </p>
              </div>

              {/* Step 3 */}
              <div
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  simStep >= 3
                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-amber-400">3. PROOF LADDER</span>
                  <span className="text-[10px] font-mono text-slate-400">{simStep >= 3 ? 'Vitest' : 'Waiting'}</span>
                </div>
                <div className="text-xs font-mono font-bold text-white">Repro Test Verified</div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  Test failed on broken code; turns green with 2.9% fee invariant intact.
                </p>
              </div>

              {/* Step 4 */}
              <div
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  simStep >= 4
                    ? 'bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/40 border-slate-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">4. MERGE-READY PR</span>
                  <span className="text-[10px] font-mono text-slate-400">{simStep >= 4 ? 'PR #104' : 'Waiting'}</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-400">Bleed Halted ($0 Loss)</div>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                  Verified GitHub PR generated with full mathematical postmortem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⚖️ SECTION 2: THE 3:00 AM REALITY (BEFORE VS. AFTER STORYBOARD)           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            THE 3:00 AM PRODUCTION REALITY
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Why Sleepy Humans &amp; Naive AI Fail at Outage Triage
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            When production checkouts crash in the middle of the night, every second costs money. Compare how an outage is handled today versus with MAYDAY.
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
      {/* ⚠️ SECTION 3: THE HALL OF SHAME (WHY NAIVE AI DESTROYS COMPANIES)         */}
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
                onClick={() => { setDiffMode('naive'); if (soundEnabled) sounds.playTerminalClick(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  diffMode === 'naive'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ❌ Naive AI LLM &ldquo;Fix&rdquo;
              </button>
              <button
                onClick={() => { setDiffMode('mayday'); if (soundEnabled) sounds.playTerminalClick(); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
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
      {/* 🔌 SECTION 4: THE 3 REAL WAYS DEVELOPERS USE MAYDAY                       */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-16 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            ZERO COMPLEXITY INTEGRATION
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            How a Company Actually Uses MAYDAY in Production
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            No massive rewrites or manual file uploads. MAYDAY plugs directly into your existing infrastructure in three clean ways.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          {[
            { id: 'webhook', label: '1. Production Webhook (Zero Touch)', icon: Radio },
            { id: 'studio', label: '2. Interactive Web Studio (/studio)', icon: Wrench },
            { id: 'bob-cli', label: '3. Inside IBM Bob IDE (CLI)', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = integrationTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setIntegrationTab(tab.id as any); if (soundEnabled) sounds.playTerminalClick(); }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
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
        <div className="max-w-4xl mx-auto bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
          {integrationTab === 'webhook' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" />
                    Zero-Touch Webhook Alert Ingestion
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Point your Sentry, Datadog, or IBM Instana webhook to MAYDAY. When an error strikes, MAYDAY begins triage immediately.
                  </p>
                </div>
                <button
                  onClick={copyCurlCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition"
                >
                  {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCurl ? 'Copied Curl!' : 'Copy Curl'}</span>
                </button>
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

          {integrationTab === 'studio' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-blue-400" />
                  Interactive Browser Studio (`/studio`)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paste any error log or stack trace from your own apps, trigger physical mutations on disk in <code className="text-blue-300">targets/shopfront</code>, and run live Vitest tests.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-white">Full-Featured Diagnostic Workbench</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Physical host execution • Live Node child_process test runner • Custom trace parser
                  </div>
                </div>
                <Link
                  href="/studio"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition"
                >
                  <span>Launch Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {integrationTab === 'bob-cli' && (
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  Native IBM Bob IDE Desktop Agent
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Developers working inside IBM Bob IDE can invoke MAYDAY directly from the terminal or prompt using custom modes.
                </p>
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
      {/* 🧭 SECTION 5: COMMAND HUB NAVIGATOR (6 DEDICATED WORKSPACES)              */}
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
      {/* 🛡️ SECTION 6: THE EMPIRICAL HONESTY GUARANTEE                              */}
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
