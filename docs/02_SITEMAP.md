# 🗺️ 02_SITEMAP.md — Complete Route Hierarchy & Navigation Topology
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 1 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. Master Route Directory

```
web/src/app/
├── (Root Command)
│   ├── page.tsx                 -> Live SEV-1 War Room & Triage Arena (MTTR clock, 3-lane subagent race)
│   ├── layout.tsx               -> Master HUD Layout (Mission Control Navbar, AudioProvider, Theme)
│   ├── globals.css              -> Cyber-Slate Theme Tokens, Glassmorphism, Neon Glows
│   └── not-found.tsx            -> Calm fallback screen
│
├── incidents/ (Fleet Radar & Historic Catalog)
│   └── page.tsx                 -> Incident Catalog (INC-2041, INC-2042, INC-2043, INC-2044)
│
├── matrix/ (Interactive Cross-Examination Laboratory)
│   └── page.tsx                 -> N×N Assertion Matrix Playground (Test any patch against invariant tests)
│
├── bobalytics/ (IBM Bob 2.0 Financial & Token Audit)
│   └── page.tsx                 -> Enterprise ROI Calculator & High-Res Zoomable Evidence Lightbox
│
├── simulator/ (Chaos Monkey Incident Injector)
│   └── page.tsx                 -> Fault Injection Sandbox (Inject Contract Drift, Concurrency, Outages)
│
├── postmortem/ (Automated Scribe & RCAG Vault)
│   └── page.tsx                 -> 5-Whys Causal Tree, PR Review, 1-Click Markdown & PDF Exporter
│
└── api/ (Real Local-First Backend Endpoints)
    ├── run-tests/route.ts       -> Executes `npx vitest run` directly on the local machine via child_process
    ├── triage/route.ts          -> Ingests stack traces and returns structured hypothesis breakdown
    └── heal/route.ts            -> Toggles/applies verified patches and validates invariants
```

---

## 2. Global Navigation Topology

All routes share the persistent **Mission Control HUD Navbar** (`src/components/common/Navbar.tsx`) featuring:
1. **Brand Identity**: MAYDAY WAR ROOM | IBM Bob 2.0 Powered.
2. **Subsystem Links**: 6 dedicated hubs (`War Room`, `Incidents`, `Matrix`, `Bobalytics`, `Chaos Simulator`, `Postmortems`).
3. **Status Beacon**: Blinking `SEV-1 ACTIVE` emergency indicator.
4. **Acoustic Synthesizer Toggle**: Unmute/Mute Web Audio procedural sounds.
5. **Universal UTC Clock**: High-precision operational timestamp.
