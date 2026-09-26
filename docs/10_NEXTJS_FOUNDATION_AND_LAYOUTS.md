# 10: Next.js Foundation, App Router & Layout Topology

> **Document Class:** Framework Architecture (Tier 3)  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Parent Blueprint:** [`UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/2-Plans/UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. App Router Hierarchy

MAYDAY uses Next.js 16 App Router structured for low-latency operational control:

```
web/src/app/
├── layout.tsx              -> Root layout providing metadata, fonts, and global styling
├── globals.css             -> High-contrast dark mode design tokens & glassmorphism
├── page.tsx                -> War Room Mission Control Cockpit
├── incidents/
│   └── page.tsx            -> Fleet Radar & Incident Archive
├── matrix/
│   └── page.tsx            -> N×N Cross-Examination Verification Matrix
├── bobalytics/
│   └── page.tsx            -> Financial ROI Ledger & Verified Screenshot Proofs
├── simulator/
│   └── page.tsx            -> Chaos Monkey Fault Injection Lab
├── postmortem/
│   └── page.tsx            -> Scribe Automated RCAG Vault
└── api/
    ├── heal/
    │   └── route.ts        -> Physical file mutator & target test orchestrator
    └── run-tests/
        └── route.ts        -> Raw child_process Vitest runner
```

---

## 2. Layout & Shell Architecture

### 2.1 Mission Control HUD (`Navbar.tsx`)
The root layout embeds a persistent mission-critical navigation HUD across all routes:
- **Brand & Engine Indicator:** Displays `MAYDAY | IBM Bob 2.0 Powered`.
- **Route Switchers:** Fast switching between `/` (War Room), `/incidents`, `/matrix`, `/bobalytics`, `/simulator`, and `/postmortem`.
- **SEV-1 Incident Beacon:** Animated pulsing badge indicating active incidents.
- **Audio Synthesizer Toggle:** Mute/unmute procedural sound effects.
- **Mission UTC Clock:** Real-time synchronized timekeeper for incident timelines.

### 2.2 Dual Canvas & Viewport Optimization
The layout conforms to the Universal App Factory standard:
- **Desktop Canvas (16:9 widescreen):** Full telemetry grids, 3-column subagent detective lanes, side-by-side surgeon code diffs, and live terminal streams.
- **Mobile Safe Viewport:** Responsive stacked cards, touch-optimized tabs, and sticky action buttons for on-call engineers managing incidents on mobile devices.
