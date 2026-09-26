# 🎨 06_DESIGN_SYSTEM.md — Design Tokens & Typography
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 2 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. Color Palette Tokens

```
--color-bg-base:        #07090e  (Deep Obsidian Void)
--color-bg-surface:     #0d121d  (Cyber-Slate Glass Surface)
--color-bg-card:        #111827  (Dark Indigo Container)
--color-border-subtle:  #1e293b  (Slate 800)
--color-border-active:  #334155  (Slate 700)

--color-alert-crimson:  #ef4444  (SEV-1 Critical Alarm)
--color-alert-amber:    #f59e0b  (SEV-2 / Warning In Progress)
--color-invariant-green:#10b981  (Verified Passing Test / Safe)
--color-quantum-blue:   #3b82f6  (IBM Bob 2.0 AI Accent)
```

---

## 2. Typography Hierarchy

* **Display & Monospace**: `JetBrains Mono`, `Geist Mono`, monospace — for all timestamps, commit SHAs, terminal logs, and assertion scores.
* **UI & Body**: `Inter`, `Geist Sans`, system-ui — for clear readability, high contrast, and accessible WCAG AA scores.
* **Scale**:
  * Heading 1: `text-xl` font-black tracking-wide font-mono
  * Sub-heading: `text-sm` font-bold text-white
  * Body: `text-xs` text-slate-300 leading-relaxed
  * Micro-metadata: `text-[10px]` or `text-[11px]` font-mono uppercase tracking-wider
