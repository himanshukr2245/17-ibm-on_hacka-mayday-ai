# 🗺️ 00_ROADMAP.md — Master Delivery Roadmap & Verification Gates
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 1 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. Master Chronological Delivery Matrix

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   MAYDAY 2.0 DELIVERY MATRIX                                     │
├───────┬──────────────────────────────────────────┬────────────┬──────────────────────────────────┤
│ PHASE │ MILESTONE & SUBSYSTEM                    │ TIME BUDGET│ PRIMARY DELIVERABLE              │
├───────┼──────────────────────────────────────────┼────────────┼──────────────────────────────────┤
│ T1    │ Tier 1: Product Foundation Specifications │ 2 Hours    │ Docs 00–04 (Roadmap, Foundation, │
│       │                                          │            │ Sitemap, Flows, Architecture)    │
├───────┼──────────────────────────────────────────┼────────────┼──────────────────────────────────┤
│ T2    │ Tier 2: Visuals & Design System          │ 2 Hours    │ Docs 05–07 (Wireframes, Tokens,  │
│       │                                          │            │ Glassmorphism, Micro-motions)    │
├───────┼──────────────────────────────────────────┼────────────┼──────────────────────────────────┤
│ T3    │ Tier 3: Technical Architecture & APIs    │ 3 Hours    │ Docs 08–10 + Real Next.js API    │
│       │                                          │            │ Endpoints (/api/run-tests, heal) │
├───────┼──────────────────────────────────────────┼────────────┼──────────────────────────────────┤
│ T4    │ Tier 4: Core Subsystem Engines           │ 4 Hours    │ Docs 11–20 + Live Vitest runner, │
│       │                                          │            │ Matrix Laboratory, Bobalytics    │
├───────┼──────────────────────────────────────────┼────────────┼──────────────────────────────────┤
│ T5    │ Tier 5: Security, Ergonomics & QA Gates  │ 2 Hours    │ Docs 21–26 + Custom CI Linters,  │
│       │                                          │            │ Local-First Outbox, Invariants   │
├───────┼──────────────────────────────────────────┼────────────┼──────────────────────────────────┤
│ T6    │ Tier 6: Production, Telemetry & Defense  │ 2 Hours    │ Docs 27–30 + Final Verification, │
│       │                                          │            │ Real Benchmarks, Jury Runbook    │
└───────┴──────────────────────────────────────────┴────────────┴──────────────────────────────────┘
```

---

## 2. Rigid Verification Gates

| Gate | Checkpoint | Verification Command | Acceptance Criteria |
|---|---|---|---|
| **G0** | Specification Ledger | `ls docs/*.md` | All 30 specification documents present, non-empty, and cross-referenced. |
| **G1** | Real Backend Test Execution | `curl -X POST http://localhost:3000/api/run-tests` | Returns live Vitest stdout from disk with exit code 0. |
| **G2** | Multi-Route Parity | `npm run build` | All 6 routes compile cleanly with zero TypeScript errors or broken links. |
| **G3** | Deterministic Invariant Suite | `npm test` | Both Incident A and Incident B test suites pass on pristine fixed code. |
| **G4** | Authentic Bob Evidence | `ls bob_sessions/*.png` | 4 verified PNG screenshots exist with accurate token and Bobcoin receipts. |

---

## 3. Scope Freeze & Cut Lines

* **P0 (Must Never Cut)**:
  - Working Next.js multi-route dashboard (`/`, `/incidents`, `/matrix`, `/bobalytics`, `/simulator`, `/postmortem`).
  - Real `/api/run-tests` endpoint executing live Vitest on the machine.
  - Interactive Cross-Examination Matrix with live evaluation.
  - Verified IBM Bob session receipts in `bob_sessions/`.
* **P1 (High Priority)**:
  - Web Audio procedural acoustics (Klaxon alarm, green chime, radar ping).
  - 1-Click Markdown / PDF postmortem exporter.
  - Chaos Monkey fault injector with simulated PagerDuty dispatch.
* **P2 (Stretch)**:
  - Full GitHub PR bot automation via GitHub API token.
