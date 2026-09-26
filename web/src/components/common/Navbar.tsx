'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  Cpu, 
  Layers, 
  Coins, 
  Terminal, 
  FileText, 
  FlaskConical, 
  Volume2, 
  VolumeX, 
  Flame,
  Radio
} from 'lucide-react';
import { sounds } from '../../lib/audio';

export default function Navbar() {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playRadarPing();
    }
  };

  const navLinks = [
    { href: '/', label: 'War Room', icon: Flame },
    { href: '/incidents', label: 'Incidents', icon: Radio },
    { href: '/matrix', label: 'Matrix', icon: Layers },
    { href: '/bobalytics', label: 'Bobalytics', icon: Coins },
    { href: '/simulator', label: 'Chaos Simulator', icon: FlaskConical },
    { href: '/postmortem', label: 'Postmortems', icon: FileText },
  ];

  return (
    <header className="border-b border-slate-800/80 bg-[#0a0e17]/95 backdrop-blur-md sticky top-0 z-50 px-6 py-2.5 flex items-center justify-between shadow-2xl">
      {/* Brand & Identity */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 group-hover:bg-red-500/20 transition shadow-lg shadow-red-500/10">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-base flex items-center gap-1.5 font-mono">
                MAYDAY <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-red-500/20 text-red-400 border border-red-500/30">WAR ROOM</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden xl:inline">| Autonomous Incident Commander</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <span className="text-blue-400 font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3" /> IBM Bob 2.0 Powered
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/90 shadow-inner">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => sounds.playTerminalClick()}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right HUD Controls */}
      <div className="flex items-center gap-3">
        {/* Active Incident Beacon */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>SEV-1 ACTIVE</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Unmute Acoustics' : 'Mute Acoustics'}
          className={`p-2 rounded-lg border transition ${
            isMuted
              ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Live UTC Clock */}
        <div className="hidden sm:block font-mono text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-2.5 py-1.5 rounded-lg">
          {time || '00:00:00 UTC'}
        </div>
      </div>
    </header>
  );
}
