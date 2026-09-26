# Phase 01: Core Runtime, Child Process Execution & Multi-Incident APIs

> **Status:** Implemented & Verified  
> **Target Subsystem:** `web/src/app/api/` & `targets/shopfront`  
> **Engine Class:** Runtime Execution & File Mutation  

---

## 1. Objectives & Scope
1. Establish a 100% real, local-first execution bridge between the Next.js frontend and the local machine running in `targets/shopfront`.
2. Support deterministic file mutation (break/fix) for both:
   - **Incident A (INC-2041):** `targets/shopfront/src/payment/adapter.ts` (PayLink SDK v3.0 Contract Drift).
   - **Incident B (INC-2042):** `targets/shopfront/src/inventory/service.ts` (Check-then-act Concurrency Race Condition).
3. Connect Node.js `child_process.exec` to execute real `npx vitest run` and stream terminal stdout/stderr back to the client.
4. Provide a `GET /api/heal` status endpoint that inspects files on disk and returns live `HEALTHY_PATCHED` vs `SEV1_BROKEN` states.

---

## 2. File Topology
- `web/src/app/api/heal/route.ts` (Upgraded to multi-target disk mutator & vitest runner)
- `web/src/app/api/run-tests/route.ts` (Vitest child_process runner with timing metrics)
- `targets/shopfront/src/payment/adapter.ts` (Payment contract target)
- `targets/shopfront/src/inventory/service.ts` (Inventory concurrency target)
- `targets/shopfront/test/checkout.test.ts` (Incident A verification suite)
- `targets/shopfront/test/inventory.test.ts` (Incident B verification suite)

---

## 3. Verification Protocol
- Run `node -e "fetch('http://localhost:3000/api/heal').then(r => r.json()).then(console.log)"` $\to$ must return status of both incidents.
- Break Incident A $\to$ Vitest returns `testsPassed: false`.
- Fix Incident A $\to$ Vitest returns `testsPassed: true`.
- Break Incident B $\to$ Vitest returns `testsPassed: false` (negative stock).
- Fix Incident B $\to$ Vitest returns `testsPassed: true` (mutex serialization).
