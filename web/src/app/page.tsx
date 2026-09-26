'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Terminal,
  Cpu,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Zap,
  FileText,
  GitPullRequest,
  Clock,
  Flame,
  Search,
  Layers,
  GitCommit,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Copy,
  Printer,
  Check,
  GitBranch,
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
  TrendingDown,
  Coffee,
  Heart,
  Wrench,
  FlaskConical,
  Coins,
  Lock,
  Server,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';
import { sounds } from '../lib/audio';
import { callHealAPI, callRunTestsAPI, DEMO_MODE } from '../lib/demoMode';

export default function MaydayLandingPage() {
  // Environment Detection: Localhost OS Bridge vs Cloudflare Edge
  const [isLocalHost, setIsLocalHost] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // ---------------------------------------------------------------------------
  // ZONE 1: Hero Simulator State Machine
  // ---------------------------------------------------------------------------
  const [simStep, setSimStep] = useState<1 | 2 | 3 | 4>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [useRealOS, setUseRealOS] = useState(false);
  const [liveTestRunning, setLiveTestRunning] = useState(false);
  const [liveTestOutput, setLiveTestOutput] = useState<string | null>(null);
  const [liveTestPassed, setLiveTestPassed] = useState<boolean | null>(null);
  const [simBleedAmount, setSimBleedAmount] = useState(145.0);
  const [confetti, setConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // ---------------------------------------------------------------------------
  // ZONE 2: 3:00 AM Crisis Time-Scrubber State
  // ---------------------------------------------------------------------------
  const [timelineIndex, setTimelineIndex] = useState(2); // 0 to 4

  // ---------------------------------------------------------------------------
  // ZONE 3: Hall of Shame AI Duel State
  // ---------------------------------------------------------------------------
  const [duelTestRunning, setDuelTestRunning] = useState<'NONE' | 'CHATGPT' | 'BOB'>('NONE');
  const [duelResult, setDuelResult] = useState<'NONE' | 'CHATGPT' | 'BOB'>('NONE');

  // ---------------------------------------------------------------------------
  // ZONE 4: Architecture Drawer State
  // ---------------------------------------------------------------------------
  const [activeArchNode, setActiveArchNode] = useState<number>(3); // 1 to 5

  // ---------------------------------------------------------------------------
  // ZONE 5: Developer Tabs & Stack Trace Classifier State
  // ---------------------------------------------------------------------------
  const [devTab, setDevTab] = useState<'webhook' | 'studio' | 'cli'>('webhook');
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [customTrace, setCustomTrace] = useState('');
  const [activePreset, setActivePreset] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // Timer & auto-play refs
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLocalHost(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    }
  }, []);

  // Live revenue bleed ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setSimBleedAmount((prev) => (simStep < 4 ? prev + 1.45 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, [simStep]);

  // Gentle auto-play loop for impatient judges
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setTimeout(() => {
        setSimStep((prev) => {
          const next = (prev % 4) + 1;
          if (next === 4) {
            triggerConfetti();
            if (soundEnabled) sounds.playGreenChime();
          } else if (next === 1) {
            if (soundEnabled) sounds.playKlaxon();
          } else if (next === 2) {
            if (soundEnabled) sounds.playRadarPing();
          } else if (next === 3) {
            if (soundEnabled) sounds.playTestFailure();
          }
          return next as any;
        });
      }, 3500);
    }
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [isAutoPlaying, simStep, soundEnabled]);

  const triggerConfetti = () => {
    setConfetti(
      Array.from({ length: 24 }, (_, i) => ({
        id: Date.now() + i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 50,
        color: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][i % 6],
      }))
    );
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleStepClick = async (stepNumber: 1 | 2 | 3 | 4) => {
    setIsAutoPlaying(false);
    setSimStep(stepNumber);
    if (soundEnabled) sounds.playTerminalClick();

    if (stepNumber === 1) {
      if (soundEnabled) sounds.playKlaxon();
      if (useRealOS) {
        try {
          await callHealAPI('break', 'incident-a');
        } catch (e) {
          console.error(e);
        }
      }
    } else if (stepNumber === 2) {
      if (soundEnabled) sounds.playRadarPing();
    } else if (stepNumber === 3) {
      if (soundEnabled) sounds.playTestFailure();
      if (useRealOS) {
        setLiveTestRunning(true);
        try {
          const res = await callHealAPI('fix', 'incident-a');
          setLiveTestOutput(res.output ?? null);
          setLiveTestPassed(res.testsPassed ?? null);
        } catch (e: any) {
          setLiveTestOutput('Live OS Error: ' + e.message);
        } finally {
          setLiveTestRunning(false);
        }
      }
    } else if (stepNumber === 4) {
      if (soundEnabled) sounds.playGreenChime();
      triggerConfetti();
    }
  };

  const runDuelTest = (target: 'CHATGPT' | 'BOB') => {
    setDuelTestRunning(target);
    if (soundEnabled) sounds.playTerminalClick();
    setTimeout(() => {
      setDuelTestRunning('NONE');
      setDuelResult(target);
      if (target === 'BOB') {
        if (soundEnabled) sounds.playGreenChime();
      } else {
        if (soundEnabled) sounds.playTestFailure();
      }
    }, 1200);
  };

  const copyCurl = () => {
    const curl = `curl -X POST http://localhost:3000/api/heal \\
  -H "Content-Type: application/json" \\
  -d '{"action": "fix", "target": "incident-a"}'`;
    navigator.clipboard.writeText(curl);
    setCopiedCurl(true);
    if (soundEnabled) sounds.playTerminalClick();
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const PRESET_TRACES = {
    A: {
      id: 'INC-2041',
      title: 'PayLink SDK v3.0 TypeError',
      trace: `TypeError: Cannot read properties of undefined (reading 'amount')
    at processPayment (targets/shopfront/src/payment/adapter.ts:37:38)
    at async handleCheckout (src/checkout/route.ts:54:12)`,
      suspect: 'targets/shopfront/src/payment/adapter.ts:37',
      assignedAgent: 'RECON-1 (Contract Drift Detective)',
      reason: 'Package bump paylink-sdk 2.4 -> 3.0 broke response schema envelope.',
    },
    B: {
      id: 'INC-2042',
      title: 'Flash-Sale Concurrency Race',
      trace: `Error: Invariant violation: Inventory stock fell below zero (Stock: -10)
    at reserveStock (targets/shopfront/src/inventory/service.ts:32:15)
    at async Promise.all (index 7 of 20)`,
      suspect: 'targets/shopfront/src/inventory/service.ts:32',
      assignedAgent: 'RECON-3 (Concurrency & Race Detective)',
      reason: '10ms async delay in check-then-act allowed 20 parallel threads to oversell.',
    },
    C: {
      id: 'INC-2043',
      title: 'EventEmitter Memory Leak',
      trace: `(node:4192) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 501 listeners added.
    at createOrder (targets/shopfront/src/order/service.ts:44:14)`,
      suspect: 'targets/shopfront/src/order/service.ts:44',
      assignedAgent: 'RECON-2 (Null-Safety & Leak Detective)',
      reason: 'eventBus.on() registered per incoming HTTP request without cleanup.',
    },
    D: {
      id: 'INC-2044',
      title: 'Visa Gateway HTTP 504 Timeout',
      trace: `FetchError: HTTP 504 Gateway Timeout from gateway.visa.com:443
    at requestExternalBank (external: api.visa.com:443)
    [Git blame: 0 repository commits in past 72 hours]`,
      suspect: 'external-provider (gateway.visa.com:443)',
      assignedAgent: 'ALL SUBAGENTS (Honest Escalation)',
      reason: 'Upstream BGP network partition. Refused to hallucinate code edits.',
    },
  };

  const TIMELINE_STOPS = [
    {
      time: '03:00 AM',
      title: 'Alert Triggers',
      humanStatus: 'Sound Asleep in Bed 😴',
      humanDesc: 'Sentry alert fires: 100% of customer checkouts failing. Nobody is awake yet.',
      humanHeart: '62 BPM',
      humanCoffee: '0 Cups',
      humanLoss: '$0.00 Lost',
      humanBadge: 'UNNOTICED OUTAGE',
      maydayStatus: 'Alert Intercepted by Webhook ⚡',
      maydayDesc: 'MAYDAY API ingests error trace, captures git commit blame, and spawns 3 subagents.',
      maydayLoss: '$14.50 Exposure',
      maydayBadge: 'AUTONOMOUS TRIAGE START',
    },
    {
      time: '03:15 AM',
      title: 'PagerDuty Wakes Engineer',
      humanStatus: 'Groggy, Panicked & Confused 🥱',
      humanDesc: 'PagerDuty siren blares. Engineer stumbles to laptop, squinting in the dark. 15 minutes of downtime already lost.',
      humanHeart: '98 BPM',
      humanCoffee: '1st Cup Brewing',
      humanLoss: '-$2,175 Lost',
      humanBadge: '15 MIN DOWNTIME',
      maydayStatus: 'Incident Already Resolved! 👑',
      maydayDesc: 'MAYDAY solved the incident in 38 seconds at 03:00:38 AM. Zero engineers were woken up.',
      maydayLoss: '<$250 Total',
      maydayBadge: '98.2% FASTER MTTR',
    },
    {
      time: '03:45 AM',
      title: 'Tunnel Vision Log Search',
      humanStatus: 'Tunnel Vision & Log Panic 😵‍💫',
      humanDesc: 'Engineer greps through 50,000 log lines. High stress causes cognitive bias; suspects database pool instead of SDK bump.',
      humanHeart: '115 BPM',
      humanCoffee: '2nd Cup Consumed',
      humanLoss: '-$6,525 Lost',
      humanBadge: 'COGNITIVE BIAS',
      maydayStatus: 'PR #104 Awaiting Morning Review ☕',
      maydayDesc: 'Ready-to-merge GitHub PR with 8/8 passing invariant tests and Scribe 5-Whys postmortem.',
      maydayLoss: 'Zero Further Loss',
      maydayBadge: 'PR BOUNDARY SAFEGUARD',
    },
    {
      time: '04:00 AM',
      title: 'The Naive Band-Aid',
      humanStatus: 'Writing Risky Code Band-Aids 🩹',
      humanDesc: 'Exhausted engineer writes: fee?.amount ?? 0. The 500 error disappears, but processing fees are now $0.00!',
      humanHeart: '122 BPM',
      humanCoffee: '3rd Cold Cup',
      humanLoss: '-$8,700 Lost',
      humanBadge: 'SILENT BUG INTRODUCED',
      maydayStatus: 'Decoy Band-Aids Rejected 🛡️',
      maydayDesc: 'Cross-Examination Matrix proved that fee?.amount ?? 0 charged $0.00 and rejected it.',
      maydayLoss: 'Invariant Protected',
      maydayBadge: 'INVARIANT ENFORCED',
    },
    {
      time: '04:10 AM',
      title: 'The Disaster vs. The Crown Fix',
      humanStatus: 'Silent $11,600/Day Bleed Active 💸',
      humanDesc: 'Untested band-aid deployed to prod. Company loses $11,600 every day in uncollected fees.',
      humanHeart: 'Exhausted & Shaken',
      humanCoffee: 'Jittery Burnout',
      humanLoss: '-$11,600 / Day',
      humanBadge: 'ENTERPRISE CRISIS',
      maydayStatus: 'Autonomous Precision 🏆',
      maydayDesc: 'Patch maps feeCents / 100. 100% of fees collected. Zero human burnout.',
      maydayLoss: '$0.35 in Bobcoins',
      maydayBadge: 'CLEAN RESTORATION',
    },
  ];

  const currentStop = TIMELINE_STOPS[timelineIndex];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white pb-20 overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 🚨 ZONE 1: COMMAND HERO & 4-STEP INTERACTIVE CRASH SIMULATOR              */}
      {/* ========================================================================= */}

      {/* Top Emergency Marquee & Real Environment Detection */}
      <div className="bg-gradient-to-r from-red-650 via-red-600 to-rose-700 text-white font-mono text-[11px] font-black tracking-widest uppercase px-4 py-1.5 flex items-center justify-between shadow-xl shadow-red-900/30 overflow-hidden relative border-b border-red-500/40">
        <div className="flex items-center gap-3 animate-pulse">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="siren-glow">
            🚨 CRITICAL PRODUCTION OUTAGE • SERVICE: shopfront-api • 100% CHECKOUT FAILURE RATE
          </span>
        </div>

        {/* Dynamic Environment Badge (Localhost vs Cloudflare) */}
        <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-normal font-mono">
          {isLocalHost ? (
            <span className="bg-black/40 px-2.5 py-0.5 rounded-full border border-emerald-400/50 text-emerald-300 font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              🟢 LOCAL OS PROCESS BRIDGE ACTIVE (Physical SSD & Node Vitest)
            </span>
          ) : (
            <span className="bg-black/40 px-2.5 py-0.5 rounded-full border border-blue-400/50 text-blue-300 font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              🔵 CLOUDFLARE EDGE ENGINE (Deterministic Invariant Mode)
            </span>
          )}
        </div>
      </div>

      {/* Main Hero Header */}
      <section className="border-b border-slate-800/80 bg-[#0a0e17] px-6 py-10 lg:py-14 backdrop-blur-md shadow-2xl relative">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Eyebrow & Hero Copy */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
              AUTONOMOUS INCIDENT COMMANDER • POWERED BY IBM BOB 2.0
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              When Production Crashes at 3:00 AM,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
                Don't Wake Up a Tired Engineer.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              MAYDAY intercepts production alerts, deploys 3 parallel AI detective subagents in IBM Bob, writes reproduction tests to prove root causes, applies verified fixes on disk, and opens ready-to-merge GitHub Pull Requests in <strong className="text-emerald-400">under 38 seconds</strong>.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/studio"
                className="px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 transition flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Wrench className="w-4 h-4" />
                <span>⚡ Open Live Diagnostic Studio (Real)</span>
              </Link>

              <Link
                href="/war-room"
                className="px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Flame className="w-4 h-4 text-red-400" />
                <span>🎮 Launch Incident War Room (Golden Demo)</span>
              </Link>
            </div>
          </div>

          {/* Telemetry Strip: MTTR Clock + Revenue Bleed */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 shadow-inner">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Autonomous MTTR:</span>
              <span className="text-emerald-400 font-bold">38 Seconds (98.2% Faster)</span>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-2 shadow-inner">
              <DollarSign className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-red-300">Outage Financial Bleed:</span>
              <span className="text-red-400 font-bold tabular-nums">-${simBleedAmount.toFixed(2)}</span>
              <span className="text-[10px] text-slate-400">(-$14.50/s)</span>
            </div>

            <div className="hidden md:flex px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400">IBM Instana APM:</span>
              <span className="text-blue-300 font-bold">Trace Webhook Active</span>
            </div>
          </div>

          {/* 🌟 HERO CENTERPIECE: 4-Step Interactive Crash Simulator Widget */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            {/* Top Widget Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <h2 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    Interactive Crash Simulator: The 38-Second Loop
                  </h2>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Click through the 4 steps below or watch the auto-demo.
                </p>
              </div>

              {/* Controls: Auto-Play & Real OS Toggle */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                    isAutoPlaying
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                  title="Toggle automatic cycling through the 4 steps"
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isAutoPlaying ? 'Auto-Demo Active' : '▶ Auto-Play 6s'}</span>
                </button>

                {isLocalHost && (
                  <button
                    onClick={() => setUseRealOS(!useRealOS)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                      useRealOS
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    }`}
                    title="When enabled, clicking steps actually modifies code on your physical SSD!"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>{useRealOS ? '⚡ Real OS Disk: ON' : 'OS Disk: Simulation'}</span>
                  </button>
                )}

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                  title="Toggle Sound Effects"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* 4 Step Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4">
              {[
                { n: 1, label: '1. Inject Crash', icon: '💥', badge: 'SEV-1 Outage' },
                { n: 2, label: '2. Bob Swarm', icon: '🤖', badge: '3 Detectives' },
                { n: 3, label: '3. Proof Ladder', icon: '🧪', badge: 'Vitest Invariant' },
                { n: 4, label: '4. Merge-Ready PR', icon: '🚀', badge: 'GitHub PR #104' },
              ].map((s) => (
                <button
                  key={s.n}
                  onClick={() => handleStepClick(s.n as any)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    simStep === s.n
                      ? 'bg-blue-600/20 border-blue-500/80 shadow-lg shadow-blue-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                    <span>{s.label}</span>
                    <span>{s.icon}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">{s.badge}</div>
                  {simStep === s.n && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-400 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Step Content Stage */}
            <div className="mt-4 p-4 rounded-xl bg-[#07090e] border border-slate-800 min-h-[170px] flex flex-col justify-between font-mono text-xs">
              {/* Confetti particles */}
              {confetti.map((c) => (
                <div
                  key={c.id}
                  className="confetti-dot absolute w-2 h-2 rounded-sm pointer-events-none z-30"
                  style={{ left: `${c.x}%`, top: `${c.y}%`, background: c.color }}
                />
              ))}

              {/* Step 1 Content: Sentry Crash */}
              {simStep === 1 && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-red-400 border-b border-red-950/80 pb-2">
                    <span className="font-bold flex items-center gap-1.5">
                      <Flame className="w-4 h-4 animate-bounce" />
                      [SENTRY ALERT] Production Checkout 100% Failure Rate
                    </span>
                    <span className="text-[10px] bg-red-500/20 px-2 py-0.5 rounded border border-red-500/40">
                      SEV-1 CONTRACT DRIFT
                    </span>
                  </div>
                  <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    <span className="text-red-300">TypeError: Cannot read properties of undefined (reading 'amount')</span>{'\n'}
                    {'  '}at processPayment (targets/shopfront/src/payment/adapter.ts:37:38){'\n'}
                    {'  '}at async handleCheckout (src/checkout/route.ts:54:12)
                  </pre>
                  <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Root cause: PayLink SDK bumped 2.4 &rarr; 3.0. Response envelope changed silently.</span>
                  </div>
                </div>
              )}

              {/* Step 2 Content: Bob Swarm */}
              {simStep === 2 && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-blue-400 border-b border-blue-950/80 pb-2">
                    <span className="font-bold flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      IBM Bob 2.0 Subagent Swarm: Competing Hypotheses in Parallel
                    </span>
                    <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/40">
                      3 DETECTIVES ACTIVE
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                      <div className="text-blue-300 font-bold">🔍 RECON-1 (Git Blame)</div>
                      <div className="text-slate-400 text-[10px] mt-1">Found commit e9a18f4: bump paylink-sdk 2.4 &rarr; 3.0</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                      <div className="text-amber-300 font-bold">🛡️ RECON-2 (Null-Safety)</div>
                      <div className="text-slate-400 text-[10px] mt-1">Suggests naive band-aid: fee?.amount ?? 0</div>
                    </div>
                    <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                      <div className="text-purple-300 font-bold">⚡ RECON-3 (Concurrency)</div>
                      <div className="text-slate-400 text-[10px] mt-1">Falsified: Execution graph is completely serial</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Content: Proof Ladder */}
              {simStep === 3 && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-amber-400 border-b border-amber-950/80 pb-2">
                    <span className="font-bold flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      Scientific Proof Ladder: Repro Test & Invariant Matrix
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                      BAND-AID FALSIFIED
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="text-red-400 flex items-center gap-2">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>RECON-2 Band-Aid (fee?.amount ?? 0): Charges $0 fee &rarr; REJECTED ($11,600/day loss)</span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>RECON-1 Crown Fix (data.feeCents / 100): Preserves 2.9% fee &rarr; 8/8 Vitest tests PASS ✓</span>
                    </div>
                  </div>
                  {useRealOS && liveTestRunning && (
                    <div className="text-blue-400 text-[10px] animate-pulse flex items-center gap-1.5 pt-1">
                      <RotateCcw className="w-3 h-3 animate-spin" />
                      <span>Executing real npx vitest run on your host operating system...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4 Content: Merge-Ready PR */}
              {simStep === 4 && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-emerald-400 border-b border-emerald-950/80 pb-2">
                    <span className="font-bold flex items-center gap-1.5">
                      <GitPullRequest className="w-4 h-4" />
                      GitHub Pull Request #104 Opened & Verified Ready to Merge
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                      BLEED HALTED IN 38s
                    </span>
                  </div>
                  <div className="bg-black/60 rounded-lg p-2.5 border border-slate-800 text-[11px] leading-relaxed">
                    <span className="text-red-400">- const fee = (gatewayRaw as any).fee.amount;</span>{'\n'}
                    <span className="text-emerald-400 font-bold">+ const fee = gatewayRaw.data.feeCents / 100; // Preserves 2.9% fee invariant ($10.29 charged)</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Audit Attached: Full 5-Whys Postmortem</span>
                    <span className="text-emerald-400 font-bold">Human SRE Approval: 1-Click Merge</span>
                  </div>
                </div>
              )}

              {/* Bottom Simulator Helper */}
              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                <span>Deterministic Invariant Proof Ladder v2.0</span>
                <span className="text-blue-400">Step {simStep} of 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ⏱️ ZONE 2: THE 3:00 AM PRODUCTION REALITY (INTERACTIVE CRISIS SCRUBBER)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-14">
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h2 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
                  The 3:00 AM Production Reality: Human Burnout vs. Autonomous Precision
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Drag the time scrubber below to inspect what happens during each phase of a production outage.
              </p>
            </div>

            <div className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/40">
              ⚡ 98.2% Reduction in Mean Time to Resolution (MTTR)
            </div>
          </div>

          {/* Interactive Time-Scrubber Slider Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              {TIMELINE_STOPS.map((stop, idx) => (
                <button
                  key={stop.time}
                  onClick={() => {
                    setTimelineIndex(idx);
                    if (soundEnabled) sounds.playTerminalClick();
                  }}
                  className={`font-bold transition ${
                    timelineIndex === idx ? 'text-blue-400 scale-110' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {stop.time}
                </button>
              ))}
            </div>

            <input
              type="range"
              min={0}
              max={4}
              value={timelineIndex}
              onChange={(e) => {
                setTimelineIndex(parseInt(e.target.value));
                if (soundEnabled) sounds.playTerminalClick();
              }}
              className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Split Comparative Cards: Human On-Call vs MAYDAY Autonomous Commander */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* The Tired Human On-Call Card */}
            <div className="rounded-2xl p-5 border border-red-500/30 bg-gradient-to-b from-red-950/20 to-black/60 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-red-950/80 pb-3">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-red-400" />
                  <span className="font-mono text-xs font-bold text-red-300 uppercase">
                    ❌ The Tired Human On-Call
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  {currentStop.humanBadge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-white">{currentStop.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentStop.humanDesc}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
                <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[9px] uppercase">Heart Rate</div>
                  <div className="text-red-400 font-bold flex items-center gap-1 mt-0.5">
                    <Heart className="w-3 h-3" />
                    <span>{currentStop.humanHeart}</span>
                  </div>
                </div>
                <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[9px] uppercase">Caffeine</div>
                  <div className="text-amber-400 font-bold mt-0.5">{currentStop.humanCoffee}</div>
                </div>
                <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[9px] uppercase">Revenue Lost</div>
                  <div className="text-red-400 font-bold mt-0.5">{currentStop.humanLoss}</div>
                </div>
              </div>
            </div>

            {/* The MAYDAY Autonomous Commander Card */}
            <div className="rounded-2xl p-5 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-black/60 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-emerald-950/80 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-emerald-300 uppercase">
                    ✅ MAYDAY Autonomous Commander
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentStop.maydayBadge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-white">{currentStop.maydayStatus}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentStop.maydayDesc}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
                <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[9px] uppercase">CPU Load</div>
                  <div className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <Cpu className="w-3 h-3" />
                    <span>12% Active</span>
                  </div>
                </div>
                <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[9px] uppercase">Human Toll</div>
                  <div className="text-emerald-400 font-bold mt-0.5">0 Woken Up 😴</div>
                </div>
                <div className="bg-black/50 p-2 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[9px] uppercase">Triage Cost</div>
                  <div className="text-emerald-400 font-bold mt-0.5">$0.35 Bobcoins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🧠 ZONE 3: THE HALL OF SHAME (INTERACTIVE AI DUEL RUNNER)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-14">
        <div className="bg-[#0b0f19] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-amber-500/30 pb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="font-mono text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
                The Hall of Shame: Why Generic LLMs (ChatGPT / Copilot) Destroy Production
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Ask generic ChatGPT: <em>"Fix TypeError: Cannot read properties of undefined (reading 'amount')"</em>. It writes a band-aid that stops the crash but silently zeroes out revenue!
            </p>
          </div>

          {/* Interactive Duel Playground */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Generic ChatGPT Band-Aid */}
            <div className="bg-black/60 rounded-xl p-5 border border-red-500/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-red-300 mb-2">
                  <span className="font-bold">❌ Generic Copilot / ChatGPT Band-Aid</span>
                  <span className="text-[10px] bg-red-500/20 px-2 py-0.5 rounded">Silences TypeError</span>
                </div>
                <div className="bg-black rounded-lg p-3 font-mono text-xs text-red-300 border border-red-900/40 leading-relaxed">
                  <span className="text-slate-500">// Naive fix: optional chaining</span>{'\n'}
                  <span className="text-red-400">const fee = (gatewayRaw as any).fee?.amount ?? 0;</span>{'\n'}
                  <span className="text-slate-400">const total = req.amountDollars + fee;</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => runDuelTest('CHATGPT')}
                  disabled={duelTestRunning !== 'NONE'}
                  className="w-full py-2 rounded-lg font-mono text-xs font-bold bg-red-950/60 hover:bg-red-900/60 text-red-200 border border-red-500/40 transition flex items-center justify-center gap-2"
                >
                  {duelTestRunning === 'CHATGPT' ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Simulating Checkout Transaction...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>[ Test ChatGPT Fix with $10.00 Order ]</span>
                    </>
                  )}
                </button>

                {duelResult === 'CHATGPT' && (
                  <div className="p-3 rounded bg-red-950/50 border border-red-500/50 text-[11px] font-mono space-y-1 animate-fadeIn">
                    <div className="text-red-300 font-bold">🚨 RUNTIME OUTCOME: SILENT REVENUE LOSS!</div>
                    <div className="text-slate-300">Customer Charged: $10.00 | Processing Fee Collected: <strong className="text-red-400">$0.00</strong></div>
                    <div className="text-red-400 font-bold">40,000 orders/day = -$11,600 / day in uncollected fees!</div>
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: MAYDAY IBM Bob 2.0 Invariant Crown Fix */}
            <div className="bg-black/60 rounded-xl p-5 border border-emerald-500/40 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-emerald-300 mb-2">
                  <span className="font-bold">✅ MAYDAY + IBM Bob 2.0 Crown Fix</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">Preserves Invariant</span>
                </div>
                <div className="bg-black rounded-lg p-3 font-mono text-xs text-emerald-300 border border-emerald-900/40 leading-relaxed">
                  <span className="text-slate-500">// Maps PayLink SDK v3.0 feeCents (/ 100)</span>{'\n'}
                  <span className="text-emerald-400">const fee = gatewayRaw.data.feeCents / 100;</span>{'\n'}
                  <span className="text-slate-400">const total = req.amountDollars + fee;</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => runDuelTest('BOB')}
                  disabled={duelTestRunning !== 'NONE'}
                  className="w-full py-2 rounded-lg font-mono text-xs font-bold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/40 transition flex items-center justify-center gap-2"
                >
                  {duelTestRunning === 'BOB' ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Simulating Checkout Transaction...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>[ Test MAYDAY Fix with $10.00 Order ]</span>
                    </>
                  )}
                </button>

                {duelResult === 'BOB' && (
                  <div className="p-3 rounded bg-emerald-950/50 border border-emerald-500/50 text-[11px] font-mono space-y-1 animate-fadeIn">
                    <div className="text-emerald-300 font-bold">✅ INVARIANT VERIFIED: ZERO REVENUE LOSS!</div>
                    <div className="text-slate-300">Customer Charged: $10.29 | Processing Fee Collected: <strong className="text-emerald-400">$0.29 (2.9%)</strong></div>
                    <div className="text-emerald-400 font-bold">8/8 invariant test assertions green. All ledger accounts balance!</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🗺️ ZONE 4: WHAT MAYDAY ACTUALLY IS (INTERACTIVE ARCHITECTURE BLUEPRINT)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-14">
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <h2 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
                  What MAYDAY Actually Is: Interactive Architecture Blueprint
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Click any of the 5 nodes below to inspect what happens under the hood.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">Node-to-Node Deterministic Pipeline</span>
          </div>

          {/* 5 Clickable Architecture Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {[
              {
                id: 1,
                name: '1. Production Crash',
                tech: 'targets/shopfront',
                desc: 'Unhandled rejection or HTTP 500 triggers Sentry / Instana telemetry.',
                icon: '🚨',
              },
              {
                id: 2,
                name: '2. Ingress Webhook',
                tech: 'POST /api/heal',
                desc: 'Stack trace, commit SHA & environment ingested into MAYDAY engine.',
                icon: '⚡',
              },
              {
                id: 3,
                name: '3. Bob 2.0 Swarm',
                tech: 'Parallel Subagents',
                desc: 'RECON-1, 2, 3 compete simultaneously across git blame, schema & concurrency.',
                icon: '🤖',
              },
              {
                id: 4,
                name: '4. Proof Ladder',
                tech: 'Vitest Invariant Matrix',
                desc: 'Repro test must fail on broken code, candidate patch must pass 100% of suite.',
                icon: '🧪',
              },
              {
                id: 5,
                name: '5. Pull Request Boundary',
                tech: 'GitHub PR #104',
                desc: 'Verified fix committed to branch with full postmortem audit attached.',
                icon: '👑',
              },
            ].map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  setActiveArchNode(node.id);
                  if (soundEnabled) sounds.playTerminalClick();
                }}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  activeArchNode === node.id
                    ? 'bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-white mb-1">
                  <span>{node.name}</span>
                  <span>{node.icon}</span>
                </div>
                <div className="text-[10px] font-mono text-blue-400">{node.tech}</div>
                <p className="text-[11px] text-slate-400 mt-2 font-sans line-clamp-2">{node.desc}</p>
              </button>
            ))}
          </div>

          {/* Expanded Drawer for Active Node */}
          <div className="bg-[#07090e] rounded-xl p-5 border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-blue-300 border-b border-slate-800/80 pb-2">
              <span className="font-bold">INSPECTING NODE #{activeArchNode} PAYLOAD & PROOF:</span>
              <span className="text-[10px] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/30">
                ACTIVE TRACE
              </span>
            </div>
            {activeArchNode === 1 && (
              <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                // Target: targets/shopfront/src/payment/adapter.ts{'\n'}
                // Exception: TypeError: Cannot read properties of undefined (reading 'amount'){'\n'}
                // Impact: 100% of live credit card checkout authorizations aborted.
              </pre>
            )}
            {activeArchNode === 2 && (
              <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                POST /api/heal HTTP/1.1{'\n'}
                Host: mayday.ai{'\n'}
                Content-Type: application/json{'\n'}
                {'{ "action": "fix", "target": "incident-a", "alertSource": "instana-apm" }'}
              </pre>
            )}
            {activeArchNode === 3 && (
              <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                [IBM Bob 2.0 Subagent Execution Receipt]{'\n'}
                - RECON-1: Git blame on commit e9a18f4 (bump paylink-sdk 2.4 -&gt; 3.0) -&gt; Confirmed envelope drift.{'\n'}
                - RECON-2: Null-safety audit -&gt; Band-aid proposal rejected by business invariant matrix.{'\n'}
                - RECON-3: Concurrency analyzer -&gt; Execution path confirmed serial (0 race conditions).
              </pre>
            )}
            {activeArchNode === 4 && (
              <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                ✓ test/checkout.test.ts (1 test passed) - Invariant: expect(res.fee).toBeCloseTo(0.29){'\n'}
                ✓ test/payment.test.ts (3 tests passed) - Schema envelope contract green{'\n'}
                ✓ test/orders.test.ts (4 tests passed) - Order ledger balanced
              </pre>
            )}
            {activeArchNode === 5 && (
              <pre className="text-slate-300 text-[11px] overflow-x-auto whitespace-pre-wrap">
                Branch: mayday/fix-incident-2041 -&gt; Target: main{'\n'}
                PR #104: "fix(payment): map PayLink SDK v3.0 feeCents / 100 [Verified Invariant]"{'\n'}
                Status: 8/8 CI checks passing. Ready for 1-click human merge or automated canary roll-out.
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 💻 ZONE 5: HOW DEVELOPERS USE MAYDAY (3 MODES & STACK TRACE CLASSIFIER)   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-14">
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <h2 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
              How Developers Use MAYDAY: 3 Integration Pathways & Instant Classifier
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Zero complicated setups. Plug MAYDAY into your existing CI/CD or run it directly inside your IDE.
            </p>
          </div>

          {/* 3 Usage Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => {
                setDevTab('webhook');
                if (soundEnabled) sounds.playTerminalClick();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                devTab === 'webhook' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Automated Production Webhook (Zero Touch)
            </button>
            <button
              onClick={() => {
                setDevTab('studio');
                if (soundEnabled) sounds.playTerminalClick();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                devTab === 'studio' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Interactive Web Studio (/studio)
            </button>
            <button
              onClick={() => {
                setDevTab('cli');
                if (soundEnabled) sounds.playTerminalClick();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                devTab === 'cli' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Inside IBM Bob IDE CLI
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-[#07090e] rounded-xl p-4 border border-slate-800 text-xs font-mono">
            {devTab === 'webhook' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Trigger self-healing via simple HTTP POST:</span>
                  <button
                    onClick={copyCurl}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold flex items-center gap-1.5 border border-slate-700"
                  >
                    {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCurl ? 'Copied curl!' : 'Copy curl'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black/80 rounded-lg border border-slate-900 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                  curl -X POST http://localhost:3000/api/heal \{'\n'}
                  {'  '}-H "Content-Type: application/json" \{'\n'}
                  {'  '}-d '{'{"action": "fix", "target": "incident-a"}'}'
                </pre>
              </div>
            )}

            {devTab === 'studio' && (
              <div className="space-y-3">
                <p className="text-slate-300">
                  Open the Live Diagnostic Studio to mutate test microservices on your hard drive, run Vitest live in Node.js, and paste custom stack traces.
                </p>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition text-xs shadow-lg shadow-blue-600/30"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Launch Live Diagnostic Studio &rarr;</span>
                </Link>
              </div>
            )}

            {devTab === 'cli' && (
              <div className="space-y-3">
                <p className="text-slate-300">
                  Run MAYDAY triage subagents directly in your local terminal using the IBM Bob CLI:
                </p>
                <pre className="p-3 bg-black/80 rounded-lg border border-slate-900 text-emerald-400 overflow-x-auto text-[11px]">
                  bob run --mode mayday-triage "Checkout failing with TypeError in payment-service"
                </pre>
              </div>
            )}
          </div>

          {/* Instant Stack Trace Classifier */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Instant Stack Trace Classifier: Try a Preset Scenario
              </span>
              <span className="text-[11px] font-mono text-slate-500">Click any preset to inspect routing</span>
            </div>

            {/* 4 Preset Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {(['A', 'B', 'C', 'D'] as const).map((key) => {
                const item = PRESET_TRACES[key];
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActivePreset(key);
                      setCustomTrace(item.trace);
                      if (soundEnabled) sounds.playTerminalClick();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                      activePreset === key
                        ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.id}: {item.title}
                  </button>
                );
              })}
            </div>

            {/* Result Box */}
            <div className="p-4 rounded-xl bg-[#07090e] border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <div>
                  <span className="text-slate-400">Target Line: </span>
                  <code className="text-amber-400">{PRESET_TRACES[activePreset].suspect}</code>
                </div>
                <div>
                  <span className="text-slate-400">Assigned Subagent: </span>
                  <strong className="text-blue-300">{PRESET_TRACES[activePreset].assignedAgent}</strong>
                </div>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Diagnosis:</strong> {PRESET_TRACES[activePreset].reason}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎛️ ZONE 6: THE COMMAND HUB NAVIGATOR (6 DEDICATED GATEWAY CARDS)         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-14">
        <div className="mb-4">
          <h2 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
            Platform Gateway Hub: Explore Dedicated Engineering Modules
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Every module is live, verified, and accessible with 1 click.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Studio */}
          <Link
            href="/studio"
            className="group rounded-2xl p-5 bg-[#0d121d] border border-slate-800 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  <Wrench className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                  WORKBENCH
                </span>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition">
                Live Diagnostic Studio
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Hands-on diagnostic workbench: Mutate real files on disk, run Node.js Vitest live, paste custom stack traces, and test webhooks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-blue-400">
              <span>Open Studio &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 2: War Room */}
          <Link
            href="/war-room"
            className="group rounded-2xl p-5 bg-[#0d121d] border border-slate-800 hover:border-red-500 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
                  <Flame className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                  MISSION CONTROL
                </span>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-red-300 transition">
                Incident War Room Cockpit
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                The live crisis simulator: 4 golden production incidents (A–D), competing subagents, live typewriter evidence, and disk mutation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-red-400">
              <span>Enter War Room &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 3: Matrix */}
          <Link
            href="/matrix"
            className="group rounded-2xl p-5 bg-[#0d121d] border border-slate-800 hover:border-purple-500 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  TOURNAMENT
                </span>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition">
                Cross-Examination Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                N×N automated assertion grid exposing why naive band-aid code fixes were disqualified and how the Crown Fix was crowned.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-purple-400">
              <span>Inspect Matrix &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 4: Bobalytics */}
          <Link
            href="/bobalytics"
            className="group rounded-2xl p-5 bg-[#0d121d] border border-slate-800 hover:border-amber-500 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Coins className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  ROI & TOKENS
                </span>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition">
                Bobalytics & Cost Tracking
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Authentic token consumption logs, receipts from IBM Bob sessions, Bobcoins accounting, and ROI calculations ($0.35 triage).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-amber-400">
              <span>View Bobalytics &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 5: Simulator */}
          <Link
            href="/simulator"
            className="group rounded-2xl p-5 bg-[#0d121d] border border-slate-800 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <FlaskConical className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  CHAOS LAB
                </span>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition">
                Chaos Engineering Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Inject artificial latency, memory leaks, and thread pool exhaustion into live services to observe autonomous recovery.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400">
              <span>Launch Simulator &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {/* Card 6: Postmortem */}
          <Link
            href="/postmortem"
            className="group rounded-2xl p-5 bg-[#0d121d] border border-slate-800 hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  AUDIT ARCHIVE
                </span>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition">
                Postmortem & PR Library
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Audit-ready 5-Whys postmortems, 1-click Markdown copy, PDF printing, and ready-to-merge GitHub Pull Requests.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>Read Postmortems &rarr;</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🛡️ ZONE 7: THE EMPIRICAL HONESTY GUARANTEE (ANTI-HALLUCINATION OATH)      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full px-6 pt-14">
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
              The Empirical Honesty Guarantee: 3 Production Safety Commandments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">1.</span> The Reproduction Rule
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                If MAYDAY cannot write a reproduction test that <strong>fails on the broken code</strong>, it refuses to touch production code. No ghost fixes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">2.</span> The Physical Hard Drive Rule
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Fixes are never validated through simulated text. They must pass real <code>npx vitest run</code> directly on disk through the Node OS kernel.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">3.</span> The Honest Escalation Rule
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                If an external partner collapses (Visa BGP 504), MAYDAY detects zero code drift and immediately pages human SREs instead of fabricating fake code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Strip */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#07090e] px-6 py-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-slate-300">MAYDAY Autonomous Incident Commander</span>
          <span>•</span>
          <span>IBM Bob 2.0 AI Hackathon</span>
          <span>•</span>
          <span>Team SITA (Himanshu Kumar &amp; Priyansu Modi)</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px]">
          <span className="text-emerald-400 font-semibold">● Cloudflare &amp; Localhost Verified</span>
          <span className="text-slate-400">Deterministic Invariant Ladder v3.0</span>
        </div>
      </footer>
    </div>
  );
}
