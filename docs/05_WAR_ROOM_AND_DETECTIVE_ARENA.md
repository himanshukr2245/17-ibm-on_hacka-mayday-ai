# 05: War Room Cockpit & The 3-Lane Detective Arena

> **Document Class:** Zone 2 Bespoke Domain Engine  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Subsystem:** Live War Room & Subagent Arena (`/`)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Operational Arena Architecture

The War Room Cockpit (`/`) is the central nerve center of MAYDAY. When an incident is ingested, three parallel detective lanes race side-by-side:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [MAYDAY]  [MTTR Clock 00:38.22]  [Incident A / Incident B]  [Triage]   │
├────────────────────────────────────────────────────────────────────────┤
│ [ALERT STRIP] INC-2041 [SEV-1] TypeError: Cannot read 'amount'        │
├────────────────────────────────────────────────────────────────────────┤
│ [HARDWARE TELEMETRY] Target: adapter.ts | State: HEALTHY | [Run Tests] │
├──────────────────────────┬──────────────────────────┬──────────────────┤
│ 🕵️ RECON-1              │ 🛡️ RECON-2              │ ⚡ RECON-3        │
│ "SDK v3 Contract Drift"  │ "Null Check Band-aid"    │ "Concurrency"    │
│ Rungs: [R0][R1][R2][R3]  │ Rungs: [R0][R1]          │ Rungs: [R0]      │
│ [CROWN FIX]              │ [FALSIFIED]              │ [FALSIFIED]      │
├──────────────────────────┴──────────────────────────┴──────────────────┤
│ TABS: [Matrix]  [Surgeon Diff]  [Vitest Stream]  [Auto-Postmortem]     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 3 Specialized Subagent Detectives

### 2.1 RECON-1: Recent Changes Detective (Avatar: 🕵️)
- **Investigation Vector:** Scans git commit logs (`git log -n 5`) and package manifest changes (`package.json`).
- **Incident A Performance:** Detected commit `e9a18f4` bumping `paylink-sdk` 2.4 $\to$ 3.0. Identified that the SDK response envelope changed from `fee.amount` to `data.feeCents`. Crowned with verified fix.

### 2.2 RECON-2: Null-Safety & Logic Detective (Avatar: 🛡️)
- **Investigation Vector:** Analyzes stack traces for uncaught exceptions, undefined property reads, and missing type guards.
- **Incident A Performance:** Proposed band-aid fix `(gatewayRaw as any).fee?.amount ?? 0`. Falsified in Cross-Examination Matrix because it charges $0 processing fee, violating revenue invariants.

### 2.3 RECON-3: Concurrency & Race Detective (Avatar: ⚡)
- **Investigation Vector:** Traces asynchronous execution lifecycles, Promise interleaving, and database check-then-act latencies.
- **Incident B Performance:** Discovered 10ms async delay between reading inventory and decrementing it. Implemented atomic per-SKU promise queue mutex, passing all 20 concurrent threads.

---

## 3. Real Machine Hardware Telemetry Deck

The War Room directly communicates with the local host filesystem and Vitest runner:
- **`💣 Break Code on Disk`**: Sends `POST /api/heal { action: 'break' }`, writing buggy code to disk and executing Vitest live to confirm failure.
- **`🩹 Auto-Heal (Bob 2.0 Fix)`**: Sends `POST /api/heal { action: 'fix' }`, writing the validated patch to disk and executing Vitest live to confirm 100% pass.
- **`Run Machine Vitest`**: Direct child_process execution of `npx vitest run`, capturing millisecond duration and ANSI terminal stream.
