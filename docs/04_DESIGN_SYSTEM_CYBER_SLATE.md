# 04: Design System "Cyber-Slate" & Ergonomic HUD Tokens

> **Document Class:** Zone 1 Core Platform Foundation  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Theme Designation:** `Cyber-Slate Operational HUD`  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Visual Philosophy: High-Contrast Emergency HUD

Emergency response software cannot afford generic, washed-out palettes. Engineers responding at 3:00 AM in dark rooms require high-contrast, low-fatigue, glassmorphic interfaces where critical state changes are instantly recognizable.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CYBER-SLATE COLOR PALETTE                       │
├───────────────┬──────────────────────────┬─────────────────────────────┤
│ TOKEN         │ VALUE                    │ OPERATIONAL PURPOSE         │
├───────────────┼──────────────────────────┼─────────────────────────────┤
│ `bg-void`     │ `#07090e`                │ Deep space black backdrop   │
│ `bg-card`     │ `#0d121d`                │ Elevated glassmorphic slate │
│ `border-subtle│ `rgb(30, 41, 59, 0.8)`   │ 1px structural frame lines  │
│ `sev1-alert`  │ `rgb(239, 68, 68)`       │ SEV-1 Outage, Klaxon Pulse  │
│ `pass-green`  │ `rgb(16, 185, 129)`      │ Verified Crown Fix, 100% OK │
│ `triage-amber`│ `rgb(245, 158, 11)`      │ In-Flight Repro Test Run    │
│ `subagent-blue│ `rgb(59, 130, 246)`      │ IBM Bob 2.0 Detective Lane  │
└───────────────┴──────────────────────────┴─────────────────────────────┘
```

---

## 2. Micro-Motions & Ergonomic Standards

1. **Pulsating Alert Glow:** Active SEV-1 indicators use a hardware-accelerated 2-second breathing pulse (`animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`).
2. **Deterministic Falsification Stamp:** When a detective hypothesis is disproven, a prominent red `FALSIFIED` stamp animates onto the card, providing immediate visual finality.
3. **Monospace Terminal Discipline:** All code diffs, logs, and stacktraces use system monospace fonts (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas`) with 11px compact sizing and generous line-height (`1.6`).
4. **48px Minimum Touch Target:** Action buttons meet or exceed the 48px touch boundary for mobile on-call engineers.
