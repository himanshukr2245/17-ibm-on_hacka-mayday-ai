# Phase 02: War Room Interactive Controls & Real Hardware Telemetry

> **Status:** Active Execution  
> **Target Subsystem:** `web/src/app/page.tsx` & Mission Control UI  
> **Engine Class:** Real-Time Incident Orchestration & Live Console  

---

## 1. Objectives & Scope
1. Eliminate any perception of fake timer animations by binding the main War Room UI directly to the real `/api/heal` and `/api/run-tests` endpoints.
2. Add a persistent **Hardware & Disk Telemetry Bar** to the War Room displaying:
   - Live target file paths on disk.
   - Real-time disk patch status (`HEALTHY_PATCHED` vs `SEV1_BROKEN`).
   - Direct 1-click controls: **Break Code (Inject Bug)**, **Auto-Heal (Apply IBM Bob 2.0 Patch)**, and **Execute Vitest Now**.
3. Wire the prominent "Launch Triage Squad" button so that when clicked:
   - It triggers real test execution or fault verification.
   - Advances the Scientific Proof Ladder in sync with real test results.
   - Emits real procedural Web Audio sounds (Klaxon alarm, radar ping, test failure buzz, green chime).
4. Synchronize the Surgeon Diff view with the exact disk state for both Incident A and Incident B.
5. In the "Vitest Suite Stream" tab, display the real terminal output captured from `targets/shopfront`.

---

## 2. File Topology
- `web/src/app/page.tsx` (War Room interactive state, live console, API integration)
- `web/src/lib/audio.ts` (Procedural Web Audio API sound generator)
- `web/src/components/common/Navbar.tsx` (Persistent Mission Control HUD)

---

## 3. Verification Protocol
1. Open `http://localhost:3000`.
2. Click "Break Code" $\to$ Disk status switches to `SEV1_BROKEN`, red badge displays, test failure sound plays, Vitest console shows failing test.
3. Click "Auto-Heal" $\to$ Disk status switches to `HEALTHY_PATCHED`, green badge displays, green chime plays, Vitest console shows passing test.
4. Switch to Incident B $\to$ Verify Incident B target `targets/shopfront/src/inventory/service.ts` updates and controls testbed.
