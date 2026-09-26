# Phase 03: Chaos Monkey Simulator & Fleet Radar Live Wiring

> **Status:** Planned  
> **Target Subsystem:** `web/src/app/simulator/page.tsx` & `web/src/app/incidents/page.tsx`  
> **Engine Class:** Fault Injection & Enterprise Fleet Observability  

---

## 1. Objectives & Scope
1. Transform `/simulator` from a visual log stream into a 100% real Chaos Engineering tool:
   - When the user selects "PayLink SDK v3.0 Contract Drift" and clicks "INJECT SEV-1 FAILURE", the backend physically alters `targets/shopfront/src/payment/adapter.ts`, triggers real Vitest, and logs the real terminal error trace.
   - When the user selects "50-Thread Flash Sale Concurrency Burst" and clicks "INJECT SEV-1 FAILURE", the backend alters `targets/shopfront/src/inventory/service.ts`, runs the concurrent 20-thread vitest test, and logs the negative stock collapse.
   - When the user clicks "AUTO-HEAL VIA MAYDAY", it triggers the real repair, runs the test suite, and displays the real green terminal verification.
2. In `/incidents`:
   - Connect live health status checks for all microservices in the fleet.
   - Add real navigation triggers to jump into the War Room with the selected incident loaded.

---

## 2. File Topology
- `web/src/app/simulator/page.tsx` (Real chaos injection & vitest streaming)
- `web/src/app/incidents/page.tsx` (Fleet telemetry & incident radar)

---

## 3. Verification Protocol
1. Navigate to `/simulator`.
2. Select Scenario 1 (Contract Drift) $\to$ Click "Inject Failure" $\to$ Observe actual disk mutation, test runner error trace, and Klaxon sound.
3. Click "Self-Heal" $\to$ Observe real disk patch, green test passing trace, and chime sound.
4. Select Scenario 2 (Concurrency Race) $\to$ Click "Inject Failure" $\to$ Observe negative inventory assertion failure.
5. Click "Self-Heal" $\to$ Observe mutex queue restored and 100% test pass.
