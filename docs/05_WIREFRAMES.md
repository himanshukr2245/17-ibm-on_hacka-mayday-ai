# 📐 05_WIREFRAMES.md — Spatial Wireframe Layouts
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 2 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. Dual-Viewport Spatial Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DESKTOP WAR ROOM (16:9 CANVAS)                  │
├────────────────────────────────────────────────────────────────────────┤
│ [Top HUD]: Logo | WarRoom | Incidents | Matrix | Bobalytics | Sim | PM │
├────────────────────────────────────────────────────────────────────────┤
│ [Active Incident Ribbon]: INC-2041 [SEV-1] | Live MTTR Clock: 00:42.10 │
├────────────────────────────────────────────────────────────────────────┤
│                     TRIAGE SQUAD: 3 PARALLEL LANES                     │
│ ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐    │
│ │ RECON-1 (Changes) │  │ RECON-2 (Logic)   │  │ RECON-3 (Race)    │    │
│ │ [Proof Ladder]    │  │ [Proof Ladder]    │  │ [FALSIFIED STAMP] │    │
│ └───────────────────┘  └───────────────────┘  └───────────────────┘    │
├────────────────────────────────────────────────────────────────────────┤
│ INTERACTIVE INSPECTOR TABS: Matrix | Diff | Live Vitest | Postmortem   │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ [Real Terminal Window: Live Vitest Runner & Self-Healing Controls] │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Mobile Responsive Viewport (390px – 480px)

* **Navbar**: Collapses to hamburger drawer with persistent SEV-1 active beacon and audio mute toggle.
* **Triage Squad**: Stacks into vertical scrollable cards with swipeable Proof Ladder progress.
* **Inspector Tabs**: Full-width tabs with touch-optimized 48px hit targets.
