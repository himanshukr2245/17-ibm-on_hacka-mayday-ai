# 12: Adaptive Intelligence Engine — IBM Bob 2.0 Subagent Architecture

> **Document Class:** Intelligence Engine Specification (Tier 4)  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Parent Blueprint:** [`UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/2-Plans/UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Multi-Agent Competing Parallelism

Rather than relying on a single monolithic prompt, MAYDAY harnesses IBM Bob 2.0 by dispatching **three specialized, competing detective subagents** concurrently:

```
               ┌─────────────────────────────────────┐
               │    MAYDAY Autonomous Dispatcher     │
               └──────────────────┬──────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │   RECON-1    │         │   RECON-2    │         │   RECON-3    │
  │ Recent Changes│         │ Logic & Null │         │ Concurrency  │
  │  Detective   │         │    Safety    │         │ & Race Mutex │
  └──────┬───────┘         └──────┬───────┘         └──────┬───────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  ▼
               ┌─────────────────────────────────────┐
               │   Cross-Examination Verification    │
               │        (Crown Fix Selection)        │
               └─────────────────────────────────────┘
```

### 1.1 Detective Specializations

1. **RECON-1: Recent Changes Detective**
   - *Domain Focus:* Git commit diffs, package dependency version bumps, contract changes, API envelope drift.
   - *Heuristic:* "Did an upstream change break assumptions in downstream consumers?"
   - *Outcome:* Solved Incident A (detected PayLink SDK 2.4 $\to$ 3.0 bump in commit `e9a18f4`).

2. **RECON-2: Logic & Null-Safety Detective**
   - *Domain Focus:* Uncaught exceptions, null pointers, missing defensive checks, schema violations.
   - *Heuristic:* "Is an object or property missing where code expects a value?"
   - *Outcome:* Proposed band-aid optional chaining `fee?.amount ?? 0` (falsified in Cross-Examination Matrix for losing revenue).

3. **RECON-3: Concurrency & Mutex Detective**
   - *Domain Focus:* Race conditions, check-then-act gaps, uncoordinated async promises, database deadlocks.
   - *Heuristic:* "Can two concurrent executions interleave across an asynchronous delay?"
   - *Outcome:* Solved Incident B (discovered 10ms async gap in `reserveStock` and introduced per-SKU promise queue mutex).

---

## 2. IBM Bob 2.0 Authentic Prompt Structure

Below is the verified prompt protocol fed to IBM Bob 2.0 during actual triage runs:

```markdown
You are MAYDAY Incident Commander Subagent [RECON-X].
Investigate SEV-1 incident [INC-XXXX].
Target Service: targets/shopfront

CONSTRAINTS:
1. Do not apply patches without climbing the Proof Ladder (R0 -> R1 -> R2 -> R3).
2. Write a minimal reproduction test before touching application code.
3. Every proposed patch must preserve core business invariants (e.g. fees, stock counts).
4. Run "npx vitest run" to verify your solution.
```
