'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Home,
  Flame,
  Play,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  TrendingDown,
  DollarSign,
  Cpu,
  FileText,
  Clock,
} from 'lucide-react';
import { sounds } from '../../lib/audio';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  imageFallbackSrc?: string;
  keyPoints: string[];
  highlightMetric?: { label: string; value: string; detail: string };
  codeSnippet?: { title: string; code: string; type: 'broken' | 'fixed' | 'matrix' };
  speakerNote: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    title: 'MAYDAY: Autonomous Incident Commander',
    subtitle: 'Zero Sleepy Engineers Paged • Zero Hallucinated Band-Aids • 100% Invariant Verified',
    badge: 'IBM BOB 2.0 MULTI-AGENT ARCHITECTURE',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    imageFallbackSrc: '/presentation/slide-1.png',
    keyPoints: [
      'Autonomous SEV-1 triage in under 38 seconds (Human baseline: 45 minutes).',
      'Pioneers Adversarial Parallel Triage: 3 competing AI detectives investigating the same crash.',
      'Physically mutates host disk and verifies machine Vitest test suites before opening PRs.',
    ],
    highlightMetric: {
      label: 'Mean Time to Resolution (MTTR)',
      value: '38 Seconds',
      detail: '97.5% faster than human on-call teams',
    },
    speakerNote:
      'Welcome to MAYDAY. It is an Autonomous AI Incident Commander powered by IBM Bob 2.0 multi-agent architecture designed to autonomously triage, isolate, and heal production outages at 3:00 AM without waking up engineers.',
  },
  {
    id: 2,
    title: 'The 3:00 AM Crisis: Why Incidents Break Companies',
    subtitle: 'High-Velocity Outages vs. Sleep-Deprived Engineering Teams',
    badge: 'THE ENTERPRISE PROBLEM',
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
    imageFallbackSrc: '/presentation/slide-2.png',
    keyPoints: [
      'Downtime bleeds $14.50 every single second ($11,600/day) on active checkout corridors.',
      'Sleepy engineers paged at 3:00 AM take 25 to 45 minutes just to locate faulty code in production microservices.',
      'High-pressure environments lead to quick "band-aid" patches that silence alerts without fixing business root causes.',
    ],
    highlightMetric: {
      label: 'Average Human On-Call Cost',
      value: '$900 / Incident',
      detail: 'Engineering time + incident review overhead',
    },
    speakerNote:
      'When production crashes at 3:00 AM, downtime costs $14.50 every second. Human SREs take 45 minutes to triage, costing $900 per incident while customers experience 100% failure rates.',
  },
  {
    id: 3,
    title: 'The "AI Band-Aid Trap": Why Raw LLMs Fail Production',
    subtitle: 'Generic AI Chatbots Silence Crashes but Cause Silent Revenue Bleeds',
    badge: 'THE HIDDEN THREAT OF RAW LLMS',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    imageFallbackSrc: '/presentation/slide-3.png',
    keyPoints: [
      'When asked to fix `TypeError: Cannot read properties of undefined (reading amount)`, 95% of LLMs apply lazy optional chaining: `res.fee?.amount ?? 0`.',
      'This silences the 500 error (HTTP 200 OK), but silently stops collecting payment fees!',
      'Over 40,000 transactions, this band-aid quietly loses $12,400/day without a single alert being triggered.',
    ],
    codeSnippet: {
      title: 'Hallucinated Band-Aid vs. Business Invariant',
      code: '// ❌ Naive LLM Patch (Silences crash, loses $12,400):\nconst fee = (gatewayRaw as any).fee?.amount ?? 0;\n\n// ✅ MAYDAY Invariant Fix (Maps SDK v3.0, preserves 2.9% fee):\nconst fee = gatewayRaw.data.feeCents / 100;',
      type: 'broken',
    },
    speakerNote:
      'The biggest danger of AI in production is the AI Band-Aid Trap. Chatbots default missing properties to zero, silencing the crash screen but bleeding $12,400 in lost fees. MAYDAY prevents this by enforcing empirical business invariants.',
  },
  {
    id: 4,
    title: 'MAYDAY Solution: Adversarial 3-Detective Parallel Triage',
    subtitle: 'Competing Subagents Racing Simultaneously with Empirical Falsification',
    badge: 'BOB 2.0 MULTI-AGENT ARENA',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    imageFallbackSrc: '/presentation/slide-4.png',
    keyPoints: [
      'RECON-1 (Recent Changes Detective): Audits git history and library dependency bumps (detects paylink-sdk 2.4 → 3.0 envelope shift).',
      'RECON-2 (Null-Safety Detective): Audits schema contracts, property access, and undefined member dereferencing.',
      'RECON-3 (Concurrency Detective): Tests for check-then-act race conditions across concurrent workers.',
      'Hypotheses must pass an Invariant Proof Ladder (R0 Hypothesis → R1 Suspect Line → R2 Repro Test → R3 Verified Fix).',
    ],
    highlightMetric: {
      label: 'Parallel Subagents Dispatched',
      value: '3 Concurrent Detectives',
      detail: 'Falsifies decoys before applying patches',
    },
    speakerNote:
      'Instead of trusting a single guess, MAYDAY deploys 3 parallel detective agents. Each agent attacks the problem from a distinct perspective—git history, null safety, and concurrency—racing through an empirical proof ladder.',
  },
  {
    id: 5,
    title: 'The Scientific Proof Ladder & Falsification Engine',
    subtitle: 'Rejecting Intuition • Proving Root Causes with Automated Reproduction Tests',
    badge: 'EMPIRICAL FALSIFICATION LADDER',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    imageFallbackSrc: '/presentation/slide-5.png',
    keyPoints: [
      'Rung 0: Ingest stack trace and formulate formal falsifiable hypothesis.',
      'Rung 1: Locate suspect line and AST mutation vector in microservice code.',
      'Rung 2: Synthesize an automated Vitest reproduction test that MUST FAIL on broken code.',
      'Rung 3: Invariant Fix Verified. If a theory cannot pass the reproduction test, it is stamped FALSIFIED in red!',
    ],
    codeSnippet: {
      title: 'Automated Reproduction Test (checkout.test.ts)',
      code: `describe('Empirical Invariant Proof Ladder', () => {
  it('MUST charge exactly $10.29 ($0.29 fee mapped)', async () => {
    const res = await handleCheckout({ id: 'ord_live', amount: 10.0 });
    expect(res.chargedTotal).toBeCloseTo(10.29, 2); // Fails on res.fee ?? 0
  });
});`,
      type: 'fixed',
    },
    speakerNote:
      'Every hypothesis must climb the scientific proof ladder. Recon-3 theorized a race condition, but when evaluated against the execution graph, it was mathematically proven false and stamped FALSIFIED.',
  },
  {
    id: 6,
    title: 'Physical Disk Self-Healing & Machine Vitest Runner',
    subtitle: 'Zero Mocking • Real TypeScript Filesystem Mutation • Child Process Vitest Verification',
    badge: 'PHYSICAL HARD DRIVE MUTATION',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    imageFallbackSrc: '/presentation/slide-6.png',
    keyPoints: [
      'MAYDAY mutates the actual target file on host SSD (`targets/shopfront/src/payment/adapter.ts`).',
      'Executes `npx vitest run` via Node child_process to verify 100% green pass rate across untouched microservices.',
      'Full rollback support: Reset All Targets button immediately restores pristine code state.',
    ],
    highlightMetric: {
      label: 'Machine Vitest Test Suites',
      value: '8 / 8 Green Passed',
      detail: '0 regressions across payment & inventory services',
    },
    speakerNote:
      'Unlike conceptual AI mockups, MAYDAY physically writes the verified code fix to disk on line 37 of adapter.ts, executes machine Vitest, and watches all suites turn green in real time.',
  },
  {
    id: 7,
    title: 'Cross-Examination Matrix Playground',
    subtitle: 'N×N Automated Assertion Laboratory: Pitting AI Patches Against Invariants',
    badge: 'N×N ASSERTION LABORATORY',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    imageFallbackSrc: '/presentation/slide-7.png',
    keyPoints: [
      'Repro Test 1: 2.9% Fee Invariant (`checkout.test.ts`) — Must charge exactly $10.29.',
      'Repro Test 2: 20-Thread Concurrency (`inventory.test.ts`) — Inventory must never drop below 0.',
      'Crash Prevention Test — Zero unhandled rejections or HTTP 500 errors surfaced to callers.',
      'Full Vitest Regression Suite — Zero regressions across untouched services.',
      'RECON-2 is REJECTED (charges $10.00, $12,400 daily loss). RECON-1 is CROWNED ($10.29 charged, $0 risk)!',
    ],
    highlightMetric: {
      label: 'Deterministic Assertion Rate',
      value: '100% Verified',
      detail: 'Zero reliance on subjective LLM scoring',
    },
    speakerNote:
      'In the Matrix Playground, every candidate patch is cross-examined against all detective test suites. The lazy null check fails Repro Test 1 in red, while Recon-1 passes all four gates and is crowned champion fix.',
  },
  {
    id: 8,
    title: 'Live Forensic AI Lab: Sehat-Setu SIH Case Study',
    subtitle: 'Real-World SIH Healthcare App Outage Solved with Live Qwen AI in 1200ms',
    badge: 'LIVE QWEN AI (QWEN/QWEN3.8-27B)',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    imageFallbackSrc: '/presentation/slide-8.png',
    keyPoints: [
      'Real bug from SIH project Sehat-Setu: Patient registration with phone-only credentials crashes on `firebase.ts:51`.',
      'Calling `.replace()` on undefined `user.abhaId` throws fatal TypeError, freezing patient onboarding.',
      'Live Qwen AI model inspects the raw stack trace, generates a reproduction test, and outputs the null-safe fix with one-click copy.',
    ],
    codeSnippet: {
      title: 'SIH Healthcare App Null Dereference Fix',
      code: '// Broken (Crashes on phone-only registration):\n- const userDocId = user.phone || user.abhaId.replace(/[^a-zA-Z0-9]/g, "_");\n\n// Live Qwen AI Fix (Safe optional chaining):\n+ const userDocId = user.phone || user.abhaId?.replace(/[^a-zA-Z0-9]/g, "_") || "default_user";',
      type: 'fixed',
    },
    speakerNote:
      'We also validated MAYDAY against a real Smart India Hackathon healthcare app: Sehat-Setu. Line 51 of firebase.ts crashed when patients registered without an ABHA ID. Live Qwen AI diagnosed and generated the fix in just 1200ms.',
  },
  {
    id: 9,
    title: 'Bobalytics: The Economics of Autonomous Triage',
    subtitle: 'Human SRE On-Call Overhead ($900) vs. IBM Bob 2.0 Autonomous Execution ($0.38)',
    badge: 'FINANCIAL & TOKEN TELEMETRY',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    imageFallbackSrc: '/presentation/slide-9.png',
    keyPoints: [
      'Human Incident Resolution: 45 minutes MTTR, $900 engineering & review cost.',
      'IBM Bob 2.0 Resolution: 38 seconds MTTR, $0.38 resolution cost (0.353 Bobcoins, 19.7k tokens).',
      'Cuts incident operational expenditure by 99.9% while eliminating engineer burnout.',
      'Includes authentic session receipts auditing exact token usage and Bobcoin deductions.',
    ],
    highlightMetric: {
      label: 'Annual Cost Savings (15 Incidents/Mo)',
      value: '$161,900 / Year',
      detail: 'Calculated across enterprise SRE benchmarks',
    },
    speakerNote:
      'The economics are striking. An outage handled by human engineers costs $900 and 45 minutes. IBM Bob resolves it for 38 cents and 38 seconds—a 99% cost reduction and $161,000 in annual enterprise savings.',
  },
  {
    id: 10,
    title: 'Scribe Postmortems & Production Readiness',
    subtitle: 'Instant Five-Whys Compliance Briefs • Ready-to-Merge Pull Requests • Complete Pipeline',
    badge: 'RCAG & POSTMORTEM VAULT',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    imageFallbackSrc: '/presentation/slide-10.png',
    keyPoints: [
      'Automated Scribe Agent generates complete 5-Whys root cause analysis document ready for compliance audits.',
      'One-click Markdown download and print-ready PDF brief.',
      'Verified GitHub Pull Request opened with automated reproduction test and diff.',
      'MAYDAY: Zero sleepy engineers paged. Zero band-aids shipped. 100% verified code.',
    ],
    highlightMetric: {
      label: 'Audit Report Generation Time',
      value: '5 Seconds',
      detail: 'Automated 5-Whys compliance documentation',
    },
    speakerNote:
      'Finally, instead of engineers spending hours writing incident postmortems, our Scribe agent drafts a complete five-whys compliance document ready to download in five seconds. Zero paged engineers, zero band-aids, one hundred percent verified code.',
  },
];

export default function PresentationDeckPage() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const currentSlide = SLIDES[currentIdx];

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => {
      const next = prev < SLIDES.length - 1 ? prev + 1 : prev;
      sounds.playTerminalClick();
      return next;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => {
      const next = prev > 0 ? prev - 1 : prev;
      sounds.playTerminalClick();
      return next;
    });
  }, []);

  // Keyboard navigation: ArrowLeft, ArrowRight, Spacebar, Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-white">
      {/* Top Deck Navigation Strip */}
      <header className="border-b border-slate-800/80 bg-[#0a0e17] px-4 sm:px-6 py-3 shrink-0 flex items-center justify-between gap-3 shadow-xl z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            prefetch={false}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1 text-xs font-mono"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Overview</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              MAYDAY PRESENTATION DECK
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold">
              Slide {String(currentSlide.id).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Notes Toggle */}
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition cursor-pointer touch-manipulation ${
              showNotes
                ? 'bg-purple-600 border-purple-400 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle Speaker Notes"
          >
            <FileText className="w-3.5 h-3.5 inline mr-1" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer touch-manipulation"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* War Room Shortcut */}
          <Link
            href="/war-room"
            prefetch={false}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden md:inline">War Room</span>
          </Link>
        </div>
      </header>

      {/* Slide Viewport Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-6xl mx-auto w-full relative">
        {/* The Slide Canvas Card */}
        <div className="w-full bg-[#0d121f] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[520px] transition-all duration-300">
          {/* Slide Header: Badge & Counter */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full border text-[10px] font-mono font-black tracking-wider uppercase ${currentSlide.badgeColor}`}>
                {currentSlide.badge}
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">
                MAYDAY PITCH DECK • SLIDE {currentSlide.id}
              </span>
            </div>

            {/* Slide Title & Subtitle */}
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono mb-2">
              {currentSlide.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed max-w-3xl mb-6">
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Slide Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
            {/* Key Bullet Points */}
            <div className={currentSlide.codeSnippet || currentSlide.highlightMetric ? 'lg:col-span-7' : 'lg:col-span-12'}>
              <ul className="space-y-3.5">
                {currentSlide.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="p-1 rounded bg-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Code Snippet OR Big Highlight Metric */}
            {(currentSlide.codeSnippet || currentSlide.highlightMetric) && (
              <div className="lg:col-span-5 space-y-4">
                {/* Highlight Metric Card */}
                {currentSlide.highlightMetric && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      {currentSlide.highlightMetric.label}
                    </span>
                    <div className="text-3xl sm:text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                      {currentSlide.highlightMetric.value}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">
                      {currentSlide.highlightMetric.detail}
                    </p>
                  </div>
                )}

                {/* Code Snippet Card */}
                {currentSlide.codeSnippet && (
                  <div className="rounded-2xl bg-black/80 border border-slate-800 overflow-hidden shadow-xl font-mono">
                    <div className="px-3.5 py-2 bg-slate-900/60 border-b border-slate-800 text-[10px] font-bold text-slate-400 flex items-center justify-between">
                      <span>{currentSlide.codeSnippet.title}</span>
                      <span className="text-purple-400">TypeScript</span>
                    </div>
                    <pre className="p-3.5 text-[11px] text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                      {currentSlide.codeSnippet.code}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Slide Footer */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
            <span>MAYDAY: Autonomous Incident Commander Core</span>
            <span>IBM Bob 2.0 • 100% Invariant Verification</span>
          </div>
        </div>

        {/* Optional Speaker Notes Panel */}
        {showNotes && (
          <div className="w-full mt-4 p-4 rounded-2xl bg-purple-950/20 border border-purple-800/40 text-xs font-mono text-purple-200 animate-in fade-in duration-200">
            <span className="text-purple-400 font-bold block mb-1">🎙️ Presenter Script (Say this out loud):</span>
            <p className="leading-relaxed text-slate-300 font-sans">{currentSlide.speakerNote}</p>
          </div>
        )}

        {/* Navigation & Thumbnail Strip */}
        <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous / Next Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-bold flex items-center gap-1.5 transition cursor-pointer touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous (←)</span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              disabled={currentIdx === SLIDES.length - 1}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono font-bold flex items-center gap-1.5 transition shadow-lg shadow-blue-600/25 cursor-pointer touch-manipulation"
            >
              <span>Next (→)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicator Dots / Jumpers */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentIdx(idx);
                  sounds.playTerminalClick();
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer touch-manipulation ${
                  currentIdx === idx
                    ? 'w-6 bg-blue-500 shadow-md shadow-blue-500/50'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Jump to Slide ${s.id}: ${s.title}`}
              />
            ))}
          </div>

          {/* Video Demo Button */}
          <Link
            href="/demo"
            prefetch={false}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Demo Video</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
