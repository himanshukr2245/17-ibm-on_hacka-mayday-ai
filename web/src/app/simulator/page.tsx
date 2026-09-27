'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FlaskConical, ArrowRight, Wrench } from 'lucide-react';

export default function SimulatorPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the unified Chaos Lab in Live Studio
    router.replace('/studio?tab=chaos');
  }, [router]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-4">
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
        <FlaskConical className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold font-mono text-white">
          Chaos Engineering Unification
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Chaos Monkey Fault Injection Lab has been merged directly into the <strong className="text-slate-200">Live Diagnostic Studio</strong> to provide a single, unified developer workbench for physical disk mutation, live Vitest execution, and autonomous self-healing.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/studio?tab=chaos"
          prefetch={false}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-rose-600/30 transition hover:scale-[1.02]"
        >
          <Wrench className="w-4 h-4" />
          <span>Enter Live Studio &amp; Chaos Lab</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
