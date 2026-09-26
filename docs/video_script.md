# 🎬 MAYDAY — 3-Minute Demo Video Walkthrough Script
### *Total Duration: 03:00 Minutes · High-Energy & Punchy*

---

### [00:00 – 00:25] ACT 1: The 3 AM Nightmare (The Hook)
* **Visual**: Camera on Himanshu or screen showing PagerDuty SEV-1 red alert popping up with the red Klaxon alarm pulsing on `http://localhost:3000`.
* **Voiceover**:
  > *"It's 3:14 AM. Checkout is throwing 500s across Europe and the US. Customers are abandoning carts, and every minute costs $6,000. Normally, an exhausted on-call engineer wakes up, greps 40,000 lines of logs, and spends 30 minutes guessing what broke. But today... Bob is already on it. Welcome to **MAYDAY** — the autonomous incident commander powered by IBM Bob 2.0."*

---

### [00:25 – 01:10] ACT 2: Parallel Triage & The Scientific Proof Ladder
* **Visual**: Click "Launch Triage Squad" on the War Room (`/`). Show the 3 subagent lanes racing in parallel:
  - RECON-1 (Recent Changes Detective)
  - RECON-2 (Null-Safety Detective)
  - RECON-3 (Concurrency Detective)
* **Voiceover**:
  > *"MAYDAY doesn't rely on a single LLM guess. It dispatches **three specialized IBM Bob 2.0 subagents in parallel**. Watch them climb our **Scientific Proof Ladder**:
  > - R0: They formulate a hypothesis.
  > - R1: They locate the suspect code line in git blame.
  > - R2: They must write a **failing reproduction test** in Vitest that proves the failure on untouched code.
  > Notice RECON-3: it investigated concurrency, saw serial execution, and was immediately stamped **FALSIFIED** with evidence attached. In MAYDAY, falsification is a success."*

---

### [01:10 – 01:50] ACT 3: The Cross-Examination Matrix
* **Visual**: Navigate to `/matrix`. Click on RECON-2 (Band-Aid) to show the red evaluation, then click RECON-1 (Contract Adapter) to show the green pass.
* **Voiceover**:
  > *"Here is why naive AI coding breaks production: RECON-2 proposed an optional chaining fix: `res.fee?.amount ?? 0`. It stops the crash, but it charges $0 processing fees! Over a weekend, that's $12,000 in lost revenue.
  > Our **Cross-Examination Matrix** prevents this. Every candidate patch is tested against every other detective's reproduction tests. Because our tests assert **business outcomes** — that a $10 cart must charge $10.29 — RECON-2's band-aid is instantly rejected! Only RECON-1's genuine contract adaptation passes."*

---

### [01:50 – 02:25] ACT 4: IBM Bob 2.0 Integration & Bobalytics
* **Visual**: Navigate to `/bobalytics`. Show the 99.96% cost reduction tile, the ROI calculator slider, and click on one of the verified screenshot receipts to open the lightbox.
* **Voiceover**:
  > *"Let's talk about the engine under the hood: **IBM Bob 2.0**.
  > Inside our **Bobalytics Cockpit**, you can inspect our verified task session summaries. For Incident A, Bob ingested the repo context, diagnosed PayLink SDK v3.0, wrote the invariant test, and verified the fix in **42 seconds**, consuming just **0.353 Bobcoins** — less than 35 cents! 
  > For Incident B, Bob designed an asynchronous per-SKU promise queue mutex, eliminating a flash-sale race condition in 38 seconds. That's a **97.5% reduction in MTTR** compared to a human on-call team."*

---

### [02:25 – 03:00] ACT 5: Automated Scribe & The Clean Resolution
* **Visual**: Navigate to `/postmortem`. Show the 5-Whys causal tree, click "Copy Markdown", and show the verified GitHub Pull Request #104.
* **Voiceover**:
  > *"Finally, Bob's Scribe agent automatically generates an executive 5-Whys postmortem, exports it to Markdown, and opens a verified, test-backed Pull Request on GitHub.
  > Production outages will always happen. But with **MAYDAY** and **IBM Bob 2.0**, by the time you wake up, production is already green, verified, and merged.
  > We are Team SITA. Thank you!"*
