# 🚨 MAYDAY — Master Pitch Deck (7 Slides)
### *Production is down. Bob is already on it.*
**Team SITA** · Himanshu Kumar & Priyansu Modi · IBM Bob 2.0 Hackathon (lablab.ai)

---

## 📽️ Slide 1: The 3 AM Production Nightmare
### *Why On-Call SRE Teams Are Burning Out*

* **The Reality**: At 03:14 AM, customer checkouts suddenly collapse with 500 errors.
* **The Cost**: Every minute of downtime costs e-commerce enterprises **$5,600 to $9,000**.
* **The Human Bottleneck**: An exhausted on-call engineer wakes up, opens 14 terminal tabs, greps 40,000 lines of logs, and spends **28 to 45 minutes** guessing root causes.
* **The Thesis**: We don't need another notification bot. We need an **Autonomous Incident Commander** that isolates, reproduces, cross-examines, and repairs outages before the on-call engineer even brushes their teeth.

---

## ☠️ Slide 2: Why Naive AI Band-Aids Break Companies
### *The Danger of Shallow "Fixes" without Invariants*

* When asked to fix `TypeError: Cannot read properties of undefined (reading 'amount')`, 95% of LLMs apply an optional chaining band-aid:
  ```typescript
  // THE DEADLY BAND-AID:
  const fee = (gatewayRaw as any).fee?.amount ?? 0;
  ```
* **The Silent Catastrophe**: This silences the error (HTTP 200 OK), but silently drops the processing fee to **$0.00**. Over 24 hours of flash sale traffic, the company silently loses **$12,400+ in uncollected fees**.
* **MAYDAY's Core Principle**: **Reproduction tests must assert business outcomes, not just "doesn't throw".**

---

## 🏗️ Slide 3: System Architecture & The Scientific Proof Ladder
### *Competing Subagents in Parallel (Powered by IBM Bob 2.0)*

* **Triage**: Ingests raw PagerDuty alerts, messy chat logs, and repository context.
* **Parallel Hypothesis Racing**: Dispatches 3 specialist Bob subagents:
  * **RECON-1**: Recent Change Detective (Git history / dependency bumps)
  * **RECON-2**: Logic & Null-Safety Detective (Member access / bounds)
  * **RECON-3**: Concurrency Detective (Async gaps / thread contention)
* **The Scientific Proof Ladder**:
  * **R0**: Hypothesis Formulated
  * **R1**: Culprit Line Located
  * **R2**: Failing Reproduction Test Created
  * **R3**: Invariant Fix Verified

---

## ⚔️ Slide 4: The Deterministic Cross-Examination Matrix
### *How We Expose and Eliminate Band-Aids*

| Candidate Patch | Repro Test (2.9% Fee Invariant) | Crash Prevention | Full Vitest Suite | Verdict |
|---|---|---|---|---|
| **RECON-1 (Contract Adapter)** | ✅ **PASSED ($10.29 charged)** | ✅ **PASSED** | ✅ **8/8 PASSED** | 👑 **CROWNED FIX** |
| **RECON-2 (Lazy `?. ?? 0`)** | ❌ **FAILED ($0.00 charged)** | ✅ **PASSED** | ❌ **INVARIANT BROKEN** | 🚫 **REJECTED: SILENT DATA LOSS** |

* Every patch is attacked by every other detective's reproduction tests.
* **Deterministic**: 100% evaluated by Vitest test assertions, zero LLM vibes.

---

## 🤖 Slide 5: Deep IBM Bob 2.0 Integration
### *Where Bob Powers Every Layer*

1. **Document Understanding**: Triaging unstructured stack traces and human chat threads into `signal.json`.
2. **Full Repository Context**: Walking stack frames from Express routes into payment adapters and git blame.
3. **Competing Subagents & Orchestrator**: Running parallel detective lanes simultaneously.
4. **Agent Mode Self-Healing Loop**: The Surgeon applies patches, executes Vitest in terminal, reads errors, and retries.
5. **Scribe & PR Creation**: Autonomously authors 5-Whys postmortems and opens verified GitHub Pull Requests.
6. **Bobalytics Audit**: First-party token and coin tracking proving authentic execution.

---

## 📊 Slide 6: Hard Empirical Benchmarks
### *Measurable Enterprise Impact*

| Metric | Human SRE Baseline | MAYDAY + IBM Bob 2.0 | Improvement |
|---|---|---|---|
| **Incident A MTTR (SDK Drift)** | 28 Minutes | **42 Seconds** | **97.5% Faster** ⚡ |
| **Incident B MTTR (Concurrency)**| 45 Minutes | **38 Seconds** | **98.6% Faster** ⚡ |
| **Cost per Incident** | $300 – $900 (Wages) | **0.353 Bobcoins (~$0.35)**| **99.96% OpEx Savings** 💰 |
| **Silent Revenue Loss Rate** | High (Human fatigue) | **0.00% (Guarded by Matrix)** | **Zero Regressions** 🛡️ |

*Verified with authentic local Vitest runs and first-party IBM Bob session receipts.*

---

## 🚀 Slide 7: Team SITA & Live Demo
### *Building the Future of Resilient Software*

* **Team Members**:
  * **Himanshu Kumar** — Lead Architect (1st Year CSE Data Science)
  * **Priyansu Modi** — Co-Developer & QA Specialist
* **Live GitHub Repository**: `https://github.com/himanshukr2245/17-ibm-on_hacka-mayday-ai`
* **Verified Evidence Pack**: 4 Verified Receipts in `bob_sessions/`
* **Summary**: Production will always break. With **MAYDAY** and **IBM Bob 2.0**, by the time you wake up, it's already fixed, verified, and merged.
