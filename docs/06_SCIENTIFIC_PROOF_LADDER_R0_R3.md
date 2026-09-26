# 06: The Scientific Proof Ladder (R0–R3 Formal Method)

> **Document Class:** Zone 2 Bespoke Domain Engine  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Why LLMs Need an Empirical Proof Ladder

Conventional LLM coding tools jump straight from seeing an error message to generating a code edit. In 30%+ of production incidents, this results in:
1. **Hallucinated Causes:** Fixing code that wasn't actually broken.
2. **Silent Invariant Violations:** Swallowing errors with `?.` or `catch {}`.
3. **Unverified Regressions:** Pushing fixes without running a single automated test.

MAYDAY introduces the **Scientific Proof Ladder (R0–R3)**, a formal state machine that prohibits any code modification until the bug is reproduced by an automated test.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE SCIENTIFIC PROOF LADDER                          │
├──────┬─────────────────────────────┬───────────────────────────────────┤
│ RUNG │ FORMAL DESIGNATION          │ MANDATORY VERIFICATION GATE       │
├──────┼─────────────────────────────┼───────────────────────────────────┤
│ R0   │ Hypothesis Formulated       │ Grounded in git log or stacktrace │
│ R1   │ Suspect Line Located        │ AST / file line mapping verified  │
│ R2   │ Failing Repro Test Created  │ Test reproduces bug in isolation  │
│ R3   │ Invariant Fix Verified      │ 100% tests pass without side-effects│
└──────┴─────────────────────────────┴───────────────────────────────────┘
```

---

## 2. Step-by-Step Empirical Execution

### Rung R0: Falsifiable Hypothesis Formulation
- Subagents parse the stacktrace, commit history, and runtime logs.
- They generate a formal, testable thesis.
- *Incident A:* "Upstream PayLink SDK v3.0 changed response envelope from `fee.amount` to `data.feeCents`."
- *Incident B:* "10ms asynchronous I/O delay in `reserveStock` creates an uncoordinated check-then-act race."

### Rung R1: Suspect Line Isolation
- Subagents map the failure to a precise file path and line number.
- *Incident A:* `targets/shopfront/src/payment/adapter.ts:32`
- *Incident B:* `targets/shopfront/src/inventory/service.ts:39-48`

### Rung R2: Failing Reproduction Test Generation
- **Crucial Rule:** The agent cannot touch the production code until it writes a test that fails when run against the current codebase.
- *Incident A Repro:* [`test/checkout.test.ts`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/4-Projects/17-ibm-on_hacka-mayday-ai/targets/shopfront/test/checkout.test.ts) asserts checkout fee calculation for $10.00 is exactly $0.29.
- *Incident B Repro:* [`test/inventory.test.ts`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/4-Projects/17-ibm-on_hacka-mayday-ai/targets/shopfront/test/inventory.test.ts) fires 20 parallel threads against a 10-item pool.

### Rung R3: Invariant Fix Verification
- The agent applies a minimal code patch.
- It executes `npx vitest run`.
- **Passing Criterion:** The reproduction test passes AND all existing regression tests pass. If either fails, the rung is not cleared and the patch is falsified.
