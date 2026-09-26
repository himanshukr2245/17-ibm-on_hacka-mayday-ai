# 🏛️ 01_PRODUCT_FOUNDATION.md — Problem, Vision & Unfair Advantage
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 1 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. The Core Problem Statement in Plain English

When a modern web service goes down in production:
1. **The Human Bottleneck**: An engineer is paged at 3:00 AM. In a sleep-deprived state, they grep through thousands of log lines across microservices, guessing what changed.
2. **The LLM Hallucination Trap**: If an engineer asks a standard AI chatbot to fix an error like `TypeError: Cannot read properties of undefined (reading 'amount')`, the AI will almost always suggest a **lazy band-aid** like `res.fee?.amount ?? 0`.
   - **Why this is catastrophic**: The server stops crashing, but it silently charges customers **$0.00 fee**, quietly losing thousands of dollars in revenue without throwing an error!
3. **The Verification Gap**: Existing AI developer tools provide "code suggestions" based on confidence percentages, which are subjective vibes. They do not **prove** their fixes with reproducible tests before touching production.

---

## 2. The Solution: MAYDAY

MAYDAY is an **Autonomous Incident Commander** built on top of **IBM Bob 2.0**.
When an outage strikes:
1. **Multi-Agent Hypothesis Racing**: MAYDAY spawns **3 competing specialist subagents in parallel**:
   - *RECON-1 (Recent Change Detective)*: Audits git blame, recent dependency bumps, and deployment deltas.
   - *RECON-2 (Logic & Null-Safety Detective)*: Audits boundary checks, undefined access, and error handlers.
   - *RECON-3 (Concurrency Detective)*: Audits async gaps, check-then-act windows, and thread race conditions.
2. **The Scientific Proof Ladder**: No theory is believed without proof. Each agent must climb the ladder:
   - **R0**: State the hypothesis.
   - **R1**: Locate the exact culprit file and line number.
   - **R2**: Author a **failing reproduction test** asserting business outcomes (e.g. *"Order must charge $10.29"*).
   - **R3**: Prove the patch passes the repro test AND the full regression suite.
   - Any agent whose theory is disproven by facts is stamped **FALSIFIED**.
3. **The Cross-Examination Matrix**: Every proposed fix is attacked by every other agent's tests. Lazy band-aids that silence crashes while breaking business invariants are immediately exposed and rejected.
4. **Autonomous Self-Healing**: The crowned fix is verified in Vitest, committed to Git, and opened as a verified Pull Request with an auto-generated 5-Whys postmortem.

---

## 3. Unfair Advantage & IBM Bob 2.0 Superpowers

| IBM Bob 2.0 Capability | How MAYDAY Uses It |
|---|---|
| **Document Understanding** | Ingests messy, unstructured PagerDuty alerts, stack traces, and Slack chat messages into structured signals. |
| **Full Repository Context** | Traverses Express routes into payment adapters and git commit history to find culprit commits. |
| **Parallel Subagents** | Runs 3 competing detective lanes simultaneously inside isolated git worktrees. |
| **Agent Mode Self-Healing** | The Surgeon agent writes the patch, runs tests via terminal CLI, reads error output, and retries. |
| **Bobalytics** | Provides empirical, first-party accounting of tokens consumed and Bobcoins spent. |
