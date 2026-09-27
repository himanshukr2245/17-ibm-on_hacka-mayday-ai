'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, 
  Cpu, 
  Layers, 
  Coins, 
  FileText, 
  FlaskConical, 
  Volume2, 
  VolumeX, 
  Flame,
  Radio,
  Menu,
  X,
  RotateCcw,
  Wrench,
  Home,
} from 'lucide-react';
import { sounds } from '../../lib/audio';
import { callHealAPI, DEMO_MODE } from '../../lib/demoMode';

export default function Navbar() {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [time, setTime] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState<'HEALTHY' | 'SEV-1' | 'UNKNOWN'>('UNKNOWN');
  const mobileNavRef = useRef<HTMLElement>(null);

  // Click outside to close mobile menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Live UTC clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Poll disk health status every 15 seconds
  useEffect(() => {
    const poll = async () => {
      try {
        const data = await callHealAPI('status', 'incident-a');
        if (data.success && data.currentStatus) {
          const { incidentA, incidentB } = data.currentStatus;
          const bothFixed = (incidentA?.isFixed ?? true) && (incidentB?.isFixed ?? true);
          setSystemHealth(bothFixed ? 'HEALTHY' : 'SEV-1');
        } else {
          setSystemHealth('SEV-1');
        }
      } catch {
        setSystemHealth(DEMO_MODE ? 'SEV-1' : 'UNKNOWN');
      }
    };
    poll();
    const interval = setInterval(poll, 15_000);
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
    { href: '/', label: 'Overview', icon: Home },
    { href: '/war-room', label: 'War Room', icon: Flame },
    { href: '/studio', label: 'Studio & Chaos Lab', icon: Wrench },
    { href: '/matrix', label: 'Benchmark Matrix', icon: Layers },
    { href: '/bobalytics', label: 'Bobalytics', icon: Coins },
    { href: '/postmortem', label: 'Postmortems', icon: FileText },
  ];

  const healthBadge = systemHealth === 'HEALTHY'
    ? { label: 'ALL SYSTEMS GO', cls: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', dotCls: 'bg-emerald-400' }
    : systemHealth === 'SEV-1'
    ? { label: 'SEV-1 ACTIVE', cls: 'bg-red-500/10 border-red-500/30 text-red-400', dotCls: 'bg-red-500 animate-ping' }
    : { label: 'CONNECTING…', cls: 'bg-slate-700/20 border-slate-700/30 text-slate-400', dotCls: 'bg-slate-500' };

  return (
    <header ref={mobileNavRef} className="relative border-b border-slate-800/80 bg-[#0a0e17]/95 backdrop-blur-md sticky top-0 z-50 shadow-2xl">
      <div className="px-6 py-2.5 flex items-center justify-between">
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
                {DEMO_MODE && (
                  <span className="text-amber-400/70 text-[9px]">· Static Demo Mode</span>
                )}
              </div>
            </div>
          </Link>
        </div>

        {/* Main Navigation Tabs — desktop only */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800/90 shadow-inner">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={() => { sounds.playTerminalClick(); setMobileOpen(false); }}
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
          {/* Dynamic System Health Beacon */}
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${healthBadge.cls}`}>
            <span className={`w-2 h-2 rounded-full ${healthBadge.dotCls}`}></span>
            <span className="hidden sm:inline">{healthBadge.label}</span>
          </div>

          {/* IBM Instana Micro-Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-blue-900/50 bg-blue-500/5 font-mono text-[11px] text-blue-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>IBM Instana</span>
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

          {/* Live UTC Clock — hidden on mobile */}
          <div className="hidden sm:block font-mono text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-2.5 py-1.5 rounded-lg">
            {time || '00:00:00 UTC'}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a0e17]/98 z-40">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={() => { setMobileOpen(false); sounds.playTerminalClick(); }}
                className={`flex items-center gap-3 px-6 py-3.5 text-sm border-b border-slate-800/50 transition ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
