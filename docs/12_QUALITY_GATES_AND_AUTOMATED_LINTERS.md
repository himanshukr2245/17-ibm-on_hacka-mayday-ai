# 12: Automated CI Quality Gates & Custom Linters

> **Document Class:** Zone 3 Production, Hardening & Showcase  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Zero-Regression CI Verification Suite

Following the Universal AI App Factory Protocol, MAYDAY implements rigorous automated quality gates to prevent broken builds, hallucinated imports, or unverified claims.

```json
// In package.json
"scripts": {
  "check:all": "npm run check:types && npm run check:build && npm run check:targets",
  "check:types": "tsc --noEmit",
  "check:build": "next build --webpack",
  "check:targets": "vitest run --dir targets/shopfront"
}
```

---

## 2. The 4 Essential Quality Gates

### 2.1 Gate 1: Strict TypeScript Typechecking (`check:types`)
- Enforces strict TypeScript across all routes, API handlers, and subagent state machines.
- Prohibits untyped `any` leaks in API responses or test output parsers.
- Must exit with code 0 (`tsc --noEmit`).

### 2.2 Gate 2: Production Webpack Compilation (`check:build`)
- Compiles all 7 App Router routes with Webpack 5 (`next build --webpack`).
- Guarantees 0 compilation errors across Windows MSVC, macOS, and Linux runners.
- Audits total client bundle weight (all routes remain under 200KB).

### 2.3 Gate 3: Target Microservice Invariant Suite (`check:targets`)
- Runs both `test/checkout.test.ts` (Incident A) and `test/inventory.test.ts` (Incident B).
- Both test suites must pass 100% (2 passed) in under 1.5 seconds before any code is committed.

### 2.4 Gate 4: Honesty & Claim Auditor
- Audits UI copy and README files to guarantee that all performance claims (e.g. 98% MTTR reduction, 19.7k tokens) are backed by physical PNG receipts in `web/public/bob_sessions/`.
