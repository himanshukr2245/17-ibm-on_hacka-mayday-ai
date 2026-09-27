'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Radio, ArrowRight, Flame } from 'lucide-react';

export default function IncidentsPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the unified War Room where the entire 4-incident fleet lives
    router.replace('/war-room');
  }, [router]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-4">
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
        <Radio className="w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold font-mono text-white">
          Incident Fleet Consolidation
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The Incident Fleet Archive has been integrated directly into the <strong className="text-slate-200">War Room Command Center</strong>. You can switch dynamically across all 4 production scenarios (INC-2041 through INC-2044) right inside the live cockpit.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/war-room"
          prefetch={false}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-red-600/30 transition hover:scale-[1.02]"
        >
          <Flame className="w-4 h-4" />
          <span>Enter Live War Room Fleet</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
