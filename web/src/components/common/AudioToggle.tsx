'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export default function AudioToggle({
  soundEnabled,
  onToggle,
  className = '',
  size = 'md',
}: AudioToggleProps) {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      onClick={onToggle}
      title={soundEnabled ? 'Mute Web Audio SFX' : 'Unmute Web Audio SFX'}
      className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition cursor-pointer ${
        soundEnabled
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
          : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-800'
      } ${className}`}
    >
      {soundEnabled ? (
        <>
          <Volume2 className={`${iconSize} text-emerald-400`} />
          <span className="hidden sm:inline">SFX On</span>
        </>
      ) : (
        <>
          <VolumeX className={`${iconSize} text-slate-500`} />
          <span className="hidden sm:inline">Muted</span>
        </>
      )}
    </button>
  );
}
