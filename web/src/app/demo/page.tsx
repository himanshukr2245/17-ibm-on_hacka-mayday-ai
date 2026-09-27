'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Play, Flame, Presentation } from 'lucide-react';

const TARGET_URL =
  process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ||
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with your final uploaded YouTube demo link

export default function DemoRedirectPage() {
  const [redirecting] = useState(true);

  useEffect(() => {
    // Instant client-side redirect
    const timer = setTimeout(() => {
      window.location.replace(TARGET_URL);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Precision Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Meta refresh tag for instant fallback redirect */}
      <meta httpEquiv="refresh" content={`1; url=${TARGET_URL}`} />

      <div className="max-w-lg w-full bg-[#0d121f]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 flex flex-col items-center text-center">
        {/* Glowing Radar Icon */}
        <div className="relative mb-5 group">
          <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 opacity-40 blur-md animate-pulse" />
          <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-[#1c121e] to-[#0e1424] border border-red-500/40 flex items-center justify-center shadow-inner">
            <Play className="h-9 w-9 text-red-400 fill-red-400 ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
            SEV-1 AUTONOMOUS HEALING
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-mono text-[10px] font-bold">
            IBM Bob 2.0 Multi-Agent Core
          </span>
        </div>

        {/* Title */}
        <h1 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight">
          MAYDAY Demo Video
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-2">
          {redirecting ? (
            <span className="flex items-center justify-center gap-2 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              Redirecting you to YouTube demo video…
            </span>
          ) : (
            'Click below to watch the 3:30 autonomous incident commander walkthrough.'
          )}
        </p>

        {/* Action Button: Direct YouTube Link */}
        <a
          href={TARGET_URL}
          className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 active:scale-[0.98] text-white font-mono font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-red-600/30 transition-all cursor-pointer"
        >
          <Play className="h-4 w-4 fill-current" />
          <span>Watch on YouTube Now</span>
          <ExternalLink className="h-4 w-4 opacity-75" />
        </a>

        {/* Auxiliary Links */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 w-full flex items-center justify-between text-xs font-mono text-slate-400">
          <Link
            href="/war-room"
            prefetch={false}
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>Open War Room</span>
          </Link>

          <Link
            href="/presentation"
            prefetch={false}
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition"
          >
            <Presentation className="w-3.5 h-3.5 text-blue-400" />
            <span>View Slides Deck</span>
          </Link>
        </div>

        <span className="text-[11px] text-slate-500 font-mono mt-3">
          Configure <code className="text-slate-400 font-bold">NEXT_PUBLIC_DEMO_VIDEO_URL</code> in .env.local
        </span>
      </div>
    </main>
  );
}
