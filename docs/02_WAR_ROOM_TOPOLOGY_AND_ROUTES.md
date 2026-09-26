# 02: War Room Topology, Route Architecture & Layouts

> **Document Class:** Zone 1 Core Platform Foundation  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Multi-Route Mission Control Architecture

MAYDAY is built using Next.js 16 App Router optimized for zero-latency operator control. The application is divided into six specialized operational rooms:

```
web/src/app/
├── layout.tsx                -> Root Layout (Mission Control HUD Navbar, Audio Context, Theme)
├── page.tsx                  -> Live SEV-1 War Room & Triage Arena (Route: /)
├── incidents/page.tsx        -> Fleet Health Radar & Historical Archive (Route: /incidents)
├── matrix/page.tsx           -> N×N Cross-Examination Verification Laboratory (Route: /matrix)
├── bobalytics/page.tsx       -> Financial ROI Ledger & Verified Screenshot Receipts (Route: /bobalytics)
├── simulator/page.tsx        -> Chaos Monkey Fault Injection Lab (Route: /simulator)
├── postmortem/page.tsx       -> Automated Scribe & 5-Whys RCAG Vault (Route: /postmortem)
└── api/
    ├── heal/route.ts         -> Physical file mutator & target Vitest runner
    └── run-tests/route.ts    -> Direct Node.js child_process test runner
```

---

## 2. Route Specification Matrix

| Route | Viewport Archetype | Core Interactive Elements | Target Microservice |
|---|---|---|---|
| **`/` (War Room)** | 16:9 Widescreen Cockpit | MTTR clock, 3-lane subagent race, live disk deck, surgeon diff, Vitest stream | `payment-service` & `inventory-service` |
| **`/incidents`** | Telemetry Grid | Fleet status radar, incident filter, time-to-heal audit | Monitored microservice fleet |
| **`/matrix`** | N×N Decision Matrix | Dynamic truth table, invariant checkers, band-aid rejection log | Logic & contract invariants |
| **`/bobalytics`** | Financial Executive HUD | ROI slider, token ledger, high-res zoomable IBM Bob 2.0 session receipts | Financial & Token Budget |
| **`/simulator`** | Chaos Laboratory | 1-Click SEV-1 injector, disk mutation triggers, live Vitest terminal | Target microservice disk files |
| **`/postmortem`** | Scribe Report Vault | 5-Whys causal tree, verified PR link, 1-click Markdown copy & PDF export | Scribe RCAG Engine |

---

## 3. Persistent Mission Control HUD (`Navbar.tsx`)

A single persistent navigation HUD anchors every page:
1. **Brand & Superpower Indicator:** `MAYDAY | IBM Bob 2.0 Powered` with pulsing connection indicator.
2. **Global Alarm Beacon:** Real-time indicator displaying `SEV-1 ACTIVE` with pulsating scarlet glow during active incidents.
3. **Procedural Audio Toggle:** Instant hardware mute/unmute control for Web Audio synthesized soundscapes.
4. **Mission Clock:** Millisecond-accurate UTC timekeeper synchronized across all incident timelines.
