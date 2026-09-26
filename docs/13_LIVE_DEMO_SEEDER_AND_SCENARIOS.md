# 13: Live Demo Seeder & Multi-Incident Scenarios

> **Document Class:** Zone 3 Production, Hardening & Showcase  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Zero-Setup Demo Guarantee

Judges and evaluators testing hackathon projects must be able to experience the full power of the application immediately without spending 2 hours configuring cloud credentials, API tokens, or databases.

MAYDAY achieves this by embedding a **Live Multi-Incident Testbed** directly inside the workspace:
1. Two fully functional TypeScript microservices located in `targets/shopfront`.
2. Instant 1-click fault injection and recovery.
3. 100% deterministic local execution.

---

## 2. Interactive Demo Script for Hackathon Evaluators

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HACKATHON LIVE DEMO RUNBOOK (90 SECONDS)             │
├──────┬───────────────────────┬─────────────────────────────────────────┤
│ STEP │ ACTION                │ OBSERVED RESULT                         │
├──────┼───────────────────────┼─────────────────────────────────────────┤
│ 1    │ Open http://localhost:3000 │ War Room loads with MTTR clock at 00:00 │
│ 2    │ Click "💣 Break Code on Disk" │ SEV-1 red badge pulses, Klaxon sounds,   │
│      │                       │ Vitest fails with TypeError in adapter. │
│ 3    │ Click "Launch Triage" │ 3 subagents race; R0 -> R1 -> R2 rungs  │
│      │                       │ advance; fake band-aid is FALSIFIED.    │
│ 4    │ Watch Auto-Heal       │ Patch written to disk, Vitest passes,   │
│      │                       │ Green chime sounds, MTTR stops at ~38s. │
│ 5    │ Switch to Incident B  │ Targets switch to inventory concurrency;│
│      │                       │ Mutex queue prevents overselling.       │
│ 6    │ Open /postmortem      │ Complete 5-Whys RCAG ready to export.   │
└──────┴───────────────────────┴─────────────────────────────────────────┘
```
