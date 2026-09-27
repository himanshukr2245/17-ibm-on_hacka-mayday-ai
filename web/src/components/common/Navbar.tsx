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
  Volume2, 
  VolumeX, 
  Flame, 
  Menu, 
  X, 
  Wrench, 
  Home,
  Clock,
  Sparkles,
  Activity,
  Radio,
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
    { href: '/war-room', label: 'War Room', icon: Flame, badge: 'SEV-1' },
    { href: '/studio', label: 'Studio & Lab', icon: Wrench },
    { href: '/matrix', label: 'Matrix', icon: Layers },
    { href: '/bobalytics', label: 'Bobalytics', icon: Coins },
    { href: '/postmortem', label: 'Postmortems', icon: FileText },
  ];

  const healthConfig = systemHealth === 'HEALTHY'
    ? {
        label: 'ALL SYSTEMS GO',
        badgeCls: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        dotCls: 'bg-emerald-400 shadow-emerald-500/50',
      }
    : systemHealth === 'SEV-1'
    ? {
        label: 'SEV-1 ACTIVE',
        badgeCls: 'bg-red-500/15 border-red-500/40 text-red-400',
        dotCls: 'bg-red-500 animate-ping shadow-red-500/50',
      }
    : {
        label: 'TELEMETRY LIVE',
        badgeCls: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        dotCls: 'bg-blue-400',
      };

  return (
    <header
      ref={mobileNavRef}
      className="relative sticky top-0 z-50 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl transition-all duration-300"
    >
      {/* Precision Top Glow Beam */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/50 via-rose-500/40 to-transparent pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* ========================================================================= */}
        {/* 1. BRAND & COCKPIT IDENTITY (LEFT)                                        */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            prefetch={false}
            onClick={() => sounds.playTerminalClick()}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Holographic Radar Shield */}
            <div className="relative flex items-center justify-center">
              <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-blue-600 opacity-25 group-hover:opacity-75 blur-sm transition-all duration-300" />
              <div className="relative p-2 rounded-xl bg-gradient-to-b from-[#181119] via-[#0f121d] to-[#090b12] border border-red-500/30 group-hover:border-red-400/60 transition shadow-inner">
                <ShieldAlert className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* Typography & Sub-Badge */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-white text-base tracking-wider flex items-center gap-1.5 group-hover:text-blue-300 transition-colors">
                  MAYDAY
                </span>
                <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm shadow-red-950/50">
                  WAR ROOM
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <span className="text-blue-400 font-semibold flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-400" /> IBM Bob 2.0
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-emerald-400/90 hidden sm:flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Self-Healing SRE
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 2. CENTER DOCK: FLOATING HIGH-TECH NAVIGATION ISLAND                     */}
        {/* ========================================================================= */}
        <nav className="hidden lg:flex items-center bg-[#0d121f]/90 p-1 rounded-full border border-slate-800/80 shadow-2xl backdrop-blur-xl ring-1 ring-white/[0.04]">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={() => {
                  sounds.playTerminalClick();
                  setMobileOpen(false);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>

                {/* Optional SEV-1 Badge Indicator on War Room */}
                {item.badge && !isActive && (
                  <span className="px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 text-[9px] font-bold border border-red-500/30 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-red-400 animate-ping" />
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* 3. RIGHT HUD CONTROLS: TELEMETRY & ACOUSTICS (RIGHT)                      */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Real-time System Status Beacon */}
          <div
            className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold flex items-center gap-2 shadow-sm transition-all duration-300 ${healthConfig.badgeCls}`}
          >
            <div className="relative flex items-center justify-center">
              <span className={`w-2 h-2 rounded-full ${healthConfig.dotCls}`} />
            </div>
            <span className="hidden sm:inline tracking-wider">{healthConfig.label}</span>
          </div>

          {/* IBM Instana Telemetry Chip */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-900/60 bg-blue-950/20 font-mono text-[11px] text-blue-300 shadow-inner">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Instana Hook</span>
          </div>

          {/* Live UTC Monospace Clock */}
          <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-slate-300 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-xl shadow-inner">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{time || '00:00:00 UTC'}</span>
          </div>

          {/* Acoustic Audio Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={isMuted ? 'Unmute Acoustics' : 'Mute Acoustics'}
            className={`p-2 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 shadow-md shadow-emerald-950/30'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE DROPDOWN DOCK                                                    */}
      {/* ========================================================================= */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800/90 bg-[#07090e]/98 backdrop-blur-2xl p-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => {
                    setMobileOpen(false);
                    sounds.playTerminalClick();
                  }}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center gap-2.5 transition ${
                    isActive
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-cyan-400" /> {time}
            </span>
            <span className="text-blue-400 font-bold">IBM Bob 2.0 Engine</span>
          </div>
        </div>
      )}
    </header>
  );
}
