# IBM AI Hackathon — Team SITA

## MAYDAY: Autonomous AI Incident Commander Powered by IBM Bob 2.0
### Official Leader Pitch Script, Live Demo Runbook & Complete Judge Viva Q&A Guide

> **Project Name:** MAYDAY  
> **Team Name:** Team SITA  
> **Team Members:** Himanshu Kumar & Priyansu Modi  
> **Hackathon:** IBM AI Hackathon (Bob 2.0 Multi-Agent Track)  
> **Live App URL:** `http://localhost:3000` (Local Host) / Cloudflare Edge  

---

# ⏱️ Quick Summary of Demo Time Options

| Pitch Format | Total Duration | When to Use | Key Focus Screens |
| :--- | :--- | :--- | :--- |
| **⚡ Rapid Table Pitch** | **60 Seconds** | Quick judge walk-bys or preliminary screening rounds | War Room (`/war-room`) 60s Tour |
| **🌟 The Leader's Main Pitch** | **2 Minutes (120s)** | **RECOMMENDED:** Standard presentation round | Overview (`/`) → War Room (`/war-room`) → Studio (`/studio`) |
| **🏆 Deep Technical Defense** | **3.5 Minutes (210s)** | Finalist stage, panel jury, or deep code audit | Overview → War Room → Matrix (`/matrix`) → Studio Live Qwen → Bobalytics |

---

# 🎤 Part 1: The Spoken Pitch Speeches

> **Leader's Note on Tone:** Speak with calm authority, urgency, and high energy. You are showing how modern engineering teams eliminate the most painful part of software development: 3:00 AM production outages.

---

### 🌟 1. The 2-Minute Main Presentation Speech (RECOMMENDED FOR JUDGES)
**Target Stopwatch Duration:** `1 minute 55 seconds`

> *"Respected Judges and Evaluators, Good day!*
>
> *I am **Himanshu Kumar**, presenting along with **Priyansu Modi** from **Team SITA**. Our project is **MAYDAY: The Autonomous AI Incident Commander**, powered by the **IBM Bob 2.0 Multi-Agent Framework**.*
>
> *(Point to screen or set the stage)*  
> *Imagine you run an enterprise e-commerce platform. It is **3:00 AM**. A bad code deployment causes payment checkouts to crash. Customers are leaving, and your company is bleeding **$14.50 every single second**.*
>
> *Today, companies handle this the painful way: an automated pager wakes up a sleepy engineer at 3 AM. They spend **45 minutes** searching logs, arguing in Slack, and often pushing a hasty "band-aid" fix that quietly costs the company thousands in lost fees.*
>
> *We built **MAYDAY** to replace that panic entirely.*
>
> *(Switch to War Room `/war-room` and click "⚡ 60-Second Guided Auto-Pilot Tour")*  
> *Instead of waking a human, MAYDAY intercepts the monitoring alert autonomously in under one second.*
>
> *Inside **IBM Bob 2.0**, MAYDAY deploys **3 competing AI detective subagents** in parallel:*
> - *Detective 1 checks recent Git blame changes and SDK upgrades.*
> - *Detective 2 checks missing object fields and schema drift.*
> - *Detective 3 checks concurrency locks and race conditions.*
>
> *Unlike raw ChatGPT or naive LLMs that guess, MAYDAY uses a **Scientific Invariant Proof Ladder**:*
> 1. *It writes a real reproduction test to mathematically prove the failure.*
> 2. *It runs a **Cross-Examination Matrix** that catches and rejects dangerous fake band-aids.*
> 3. *It synthesizes the verified **Crown Fix**, writes it directly to disk, and runs the real Vitest regression suite.*
>
> *Look at the screen: **All tests pass green, and MTTR is frozen at 38 seconds.** Zero humans paged. Zero financial leakage.*
>
> *(Switch to `/studio?tab=custom-trace`)*  
> *And judges, MAYDAY is not a static demo. In our Diagnostic Studio, we have connected **Live Qwen AI via Groq LPU**. Here is a real crash from a National Hackathon healthcare app (`sehat-setu`). Watch Qwen diagnose the missing optional chaining and generate the reproduction test in 300 milliseconds. You can paste ANY error from your own projects right now!*
>
> *Zero sleepy engineers. Zero fake band-aids. 100% verified code.*
>
> *Thank you, and we are now ready for your questions!"*

---

### ⚡ 2. The 60-Second Elevator Pitch (For Quick Table Visits)
**Target Stopwatch Duration:** `58 seconds`

> *"Judges, when an enterprise application crashes at 3 AM, every second of downtime costs thousands of dollars, and human engineers take 45 minutes to wake up, diagnose, and fix the code.*
>
> *Our team built **MAYDAY** — an autonomous AI incident commander powered by the **IBM Bob 2.0 multi-agent architecture**.*
>
> *When an alert fires from Sentry or Datadog, MAYDAY deploys 3 specialized detective subagents in parallel to investigate the root cause. It writes an automated reproduction test, rejects naive LLM band-aids using a formal Invariant Matrix, physically patches the code on disk, and verifies it with live Vitest suites in **under 38 seconds**.*
>
> *It reduces human engineering costs from **$900 per outage down to $0.38**, and has **Live Qwen AI** integrated to triage arbitrary errors on the spot.*
>
> *Let us show you the live 38-second autopilot right now!"*

---

### 🏆 3. The 3.5-Minute Comprehensive Technical Jury Pitch
**Target Stopwatch Duration:** `3 minutes 20 seconds`

> *"Respected Judges, Evaluators, and Engineers,*
>
> *In production systems, the most expensive metric in enterprise software is **MTTR: Mean Time to Resolution**. When an outage strikes a payment gateway or microservice, companies bleed between $9,000 and $300,000 an hour.*
>
> *Current AI coding assistants fail in production emergencies for two critical reasons:*
> 1. *They are **siloed pair-programmers** that require a human sitting at the keyboard giving prompts.*
> 2. *They propose **naive band-aids** — like wrapping code in `try/catch` and returning `0` or `null` — which passes superficial tests but silently breaks financial accounting.*
>
> *To solve this, Team SITA engineered **MAYDAY**, a zero-touch, autonomous incident response platform built on top of **IBM Bob 2.0**.*
>
> *(Walk through the 3 Core Pillars)*
>
> *1. **The Invariant-Driven Reasoning Engine:**  
> MAYDAY does not guess. It ascends a 4-rung proof ladder: Rung 0 (Hypothesis Formulation), Rung 1 (Suspect Locus Identification), Rung 2 (Automated Failing Repro Test Creation), and Rung 3 (Invariant Fix Verification).*
>
> *2. **Adversarial Multi-Agent Triage:**  
> Using IBM Bob 2.0, we dispatch three parallel detectives: Recon-1 (Recent Changes), Recon-2 (Null-Safety & Invariants), and Recon-3 (Concurrency & State Locks). They compete against each other, and our Cross-Examination Matrix rigorously falsifies decoys.*
>
> *3. **Dual Execution Engine & Live AI:**  
> When running locally, MAYDAY executes physical file mutations on real hard drives in `targets/shopfront` and runs Node.js `child_process` Vitest tests. Furthermore, we integrated **Groq LPU running Qwen 3.8/2.5** to triage arbitrary stack traces from any external language or project in sub-300ms latency.*
>
> *From economic audits on our `/bobalytics` ledger, MAYDAY reduces human SRE costs by 99.9%, transforming a 45-minute crisis into a 38-second automated pull request.*
>
> *Let us walk you through the live operational cockpit."*

---

# 🖥️ Part 2: Step-by-Step Live Demo Runbook

Follow this exact click-by-click sequence during your live presentation.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE WINNING 2-MINUTE DEMO ROUTE                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Home Page (/)                  → Set the 3:00 AM Crisis Context    │
│ 2. War Room (/war-room)           → Run 60-Second Auto-Pilot Tour     │
│ 3. Studio (/studio?tab=custom)    → Live Qwen AI on Sehat Setu Crash   │
│ 4. Matrix (/matrix)               → Show Why Fake Band-Aids Fail       │
│ 5. Bobalytics (/bobalytics)       → Show $900 vs $0.38 Token Audit     │
└────────────────────────────────────────────────────────────────────────┘
```

### Step 1: Open the Overview Command Center (`/`)
* **URL:** `http://localhost:3000/`
* **What to Show:**
  1. Point to the glowing red **Crisis Status Ribbon** at the top (`SEV-1 ACTIVE: PayLink Contract Drift`).
  2. Point to the **4-Step Incident Lifecycle** cards (Alert Ingestion → Detectives Racing → Decoy Falsification → Disk Healed).
  3. Click the bright red button: **"Open War Room Cockpit"**.

### Step 2: The War Room Cockpit (`/war-room`)
* **URL:** `http://localhost:3000/war-room`
* **What to Click:**
  1. Click **"⚡ 60-Second Guided Auto-Pilot Tour"** (or press <kbd>T</kbd> on your keyboard).
  2. Watch the procedure unfold automatically:
     - **0:05:** Alarm sounds. Live MTTR stopwatch starts counting. Revenue bleed ticks down (`-$14.50/s`).
     - **0:15:** The 3 detective cards (Recon-1, Recon-2, Recon-3) start streaming hypotheses in parallel.
     - **0:25:** Recon-3's concurrency theory is **FALSIFIED** with a red stamp.
     - **0:35:** Recon-1 pinpoints PayLink SDK bump from v2.4 to v3.0 (`data.feeCents`).
     - **0:45:** The Cross-Examination Matrix proves the Crown Fix passes all invariants.
     - **0:55:** Vitest suite passes green, the victory chime plays, and the MTTR stopwatch freezes at **38 seconds**!

### Step 3: The Diagnostic Studio & Live Qwen AI (`/studio?tab=custom-trace`)
* **URL:** `http://localhost:3000/studio?tab=custom-trace`
* **What to Click:**
  1. In the **Quick Presets** row, click **"🏥 Sehat-Setu (SIH ABHA Crash)"**.
  2. Explain to judges: *"This is an actual bug from a Smart India Hackathon healthcare app where users signing up without an ABHA ID crashed the entire app."*
  3. Click **"⚡ Run MAYDAY Forensic Analysis"**.
  4. Show the purple badge: **`✨ Live Qwen AI • qwen/qwen3.8-27b (~1200ms)`**.
  5. Show how Qwen identified the exact line (`src/lib/firebase.ts:51`), formulated the 3 subagent theories, and produced the defensive optional chaining patch with a 1-click **"Copy Fix"** button!

### Step 4: The Hall of Shame vs Crown Fix in Matrix (`/matrix`)
* **URL:** `http://localhost:3000/matrix`
* **What to Show:**
  1. Point to the **Hall of Shame** card:
     ```typescript
     // The Naive AI Band-Aid (What ChatGPT gives you):
     const fee = gatewayRaw.fee?.amount ?? 0;
     ```
  2. Explain: *"This band-aid passes basic tests, but setting fee to 0 caused $12,400 in uncollected gateway fees by morning. MAYDAY's mathematical invariant checker caught and rejected it."*

### Step 5: The Economic Audit in Bobalytics (`/bobalytics`)
* **URL:** `http://localhost:3000/bobalytics`
* **What to Show:**
  1. Point to the big metric cards:
     - **Human Engineering Cost:** **$900.00** (3 SREs × 2.5 hours).
     - **MAYDAY Autonomous Cost:** **$0.38** (~0.38 Bobcoins).
  2. Drag the **Monthly Incident Volume** slider to show annual enterprise savings ($100,000+ per year).
  3. Click any authentic IBM Bob 2.0 session receipt screenshot to open the full-resolution lightbox viewer.

---

# 🧠 Part 3: Deep Technical Explanations (In Plain English)

_Use these simple analogies when judges ask technical questions:_

### 1. What is IBM Bob 2.0 and why is it used?
> **Answer:** "IBM Bob 2.0 is an advanced agentic orchestration system. Traditional LLMs are single-turn chat tools. Bob 2.0 allows us to spawn multiple specialized subagents (Recon-1 for Git history, Recon-2 for type-safety, Recon-3 for concurrency, and Scribe for postmortems) that work asynchronously, debate each other, and falsify incorrect theories before any code is modified."

### 2. What is the "Scientific Proof Ladder" (R0 to R3)?
> **Answer:** "In safety-critical aviation or medical systems, you cannot guess. We built a 4-rung proof ladder:
> - **R0 (Hypothesis):** The detectives generate candidate theories.
> - **R1 (Locus):** Pinpointing the exact file and line number.
> - **R2 (Failing Repro Test):** Writing a test that *fails* on the broken code to prove the bug exists.
> - **R3 (Invariant Verification):** Applying the patch and proving the test now passes without violating business invariants."

### 3. How does MAYDAY protect against hallucinations?
> **Answer:** "MAYDAY does not trust LLM outputs blindly. Every candidate patch must pass our **Cross-Examination Matrix** and survive physical test execution in a sandboxed Node.js environment. If a patch fails the reproduction test or causes compilation errors, it is discarded immediately."

---

# ❓ Part 4: Complete Judge Viva & Tough Defense Q&A

Here are the 12 most probable questions judges will ask, with winning, field-tested answers:

---

### Q1: "Is this app actually editing files, or is it just a UI animation?"
**Answer:**  
*"It is physically editing real files on disk. If you look at our `targets/shopfront` folder, line 31 of `adapter.ts` is physically rewritten by Node.js file system APIs. In our Studio page, you can click 'Break Code on Disk', open the file in VS Code to see it broken, click 'Run Vitest' to see the terminal fail, and then click 'Auto-Heal' to see it restored. When accessed remotely by external visitors, it runs in simulated sandbox mode to protect the host machine."*

---

### Q2: "What prevents MAYDAY from breaking production even worse with a bad patch?"
**Answer:**  
*"Our Invariant-First Architecture. Unlike an autonomous bot that directly pushes to `main`, MAYDAY:
1. First synthesizes a reproduction test to prove the bug.
2. Applies the fix in a sandbox environment and executes the full regression suite.
3. Packages the verified patch into a **GitHub Pull Request** with full 5-Whys postmortem documentation.
A human engineer or CI/CD gate can review the verified diff and hit merge with 100% confidence."*

---

### Q3: "What model is powering the Live AI, and how fast is it?"
**Answer:**  
*"We use **Qwen 3.8/2.5 Coder** running on **Groq LPU (Language Processing Units)**. Groq provides inference speeds of over 300 tokens per second, allowing our multi-agent diagnostic prompt to return complete root cause analysis, reproduction tests, and code diffs in **under 1.2 seconds**."*

---

### Q4: "How does a real company connect their app to MAYDAY without rewriting their code?"
**Answer:**  
*"Zero code rewriting is required. A company connects in 3 standard ways:
1. **Webhook Ingress:** In Sentry or Datadog, they paste our `/api/heal` webhook URL.
2. **Web Studio:** An on-call developer pastes an error log into our Diagnostic Studio.
3. **Bob CLI:** Engineers debug locally using `bob run --mode mayday-triage`."*

---

### Q5: "What happens if the internet goes down during an incident?"
**Answer:**  
*"MAYDAY is built with **zero-fail offline resilience**. In our `/api/ai-triage` backend, if the external Groq API is unreachable or times out, our engine automatically falls back to an instant deterministic AST heuristic in under 5 milliseconds. The app never hangs, freezes, or throws unhandled 500 errors in front of users."*

---

### Q6: "How did you calculate the $900 vs $0.38 cost in Bobalytics?"
**Answer:**  
*"That is based on standard enterprise SRE metrics. A typical SEV-1 incident requires an incident commander and two senior engineers on a 45-minute bridge call ($120/hr loaded engineering rate × 2.5 hours total = $900). With IBM Bob 2.0 and Groq, the entire multi-agent triage consumes approximately 43,800 prompt tokens, costing roughly $0.38 in compute."*

---

### Q7: "Why didn't you just use ChatGPT or Claude directly?"
**Answer:**  
*"Standard chat models lack agentic coordination and invariant verification. When we tested raw ChatGPT on this PayLink outage, it proposed `fee = res.fee?.amount ?? 0`. That naive band-aid silenced the crash, but it caused the business to lose all processing fees on millions of dollars of transactions! MAYDAY's adversarial detectives and Invariant Matrix specifically exist to catch and reject those dangerous band-aids."*

---

### Q8: "Can one user see another user's incident data or code?"
**Answer:**  
*"No. MAYDAY utilizes a **Local-First, Zero-Shared-State architecture**. All incident logs, state machines, and session histories are stored inside the user's private browser IndexedDB storage. External users never access each other's data, and remote web visitors cannot access the host machine's private filesystem."*

---

### Q9: "What scenarios does MAYDAY support out of the box?"
**Answer:**  
*"We support 4 diverse enterprise production scenarios:
- **INC-2041:** Third-party SDK contract drift (PayLink v3.0).
- **INC-2042:** High-concurrency flash sale race conditions with inventory overselling.
- **INC-2043:** Memory leaks from uncleaned EventEmitter listeners causing OOMKill crashes.
- **INC-2044:** Honest escalation for downstream external bank gateway outages that cannot be fixed by code."*

---

### Q10: "How do you generate the postmortem so quickly?"
**Answer:**  
*"Our Scribe subagent receives the structured execution telemetry from the three detectives, extracts the root cause and timestamps, and formats an industry-standard **5-Whys Root Cause Analysis** document. You can download the markdown file directly with one click on our `/postmortem` page."*

---

### Q11: "What frontend and backend technologies did you use?"
**Answer:**  
*"We built the entire application using:
- **Next.js 16 (App Router) + React 19** with TypeScript 5.
- **Tailwind CSS v4** with a custom Cyber-Slate token system.
- **Procedural Web Audio API** for zero-dependency synthetic acoustics.
- **Vitest 1.6** for local machine test execution.
- **Groq LPU (Qwen 3.8)** for live sub-second AI triage.
- **IBM Bob 2.0** multi-agent orchestration architecture."*

---

### Q12: "What is your next step / future roadmap for MAYDAY?"
**Answer:**  
*"Our roadmap has three phases:
1. **GitHub App Marketplace integration:** Automatic one-click PR generation on production alert.
2. **Canary deployment rollouts:** Integrating with Kubernetes and ArgoCD to automatically deploy the verified fix to 5% of traffic before full rollout.
3. **Multi-cloud self-healing:** Extending support to AWS CloudWatch and Google Cloud Trace."*

---

# 🚨 Part 5: Emergency Troubleshooting & Shortcuts

* **Restart Dev Server:** If the server is stopped, run `npm --prefix web run dev`.
* **Direct Studio Live AI Link:** `http://localhost:3000/studio?tab=custom-trace`
* **Direct War Room Auto-Pilot Link:** `http://localhost:3000/war-room?incident=A&autopilot=true`
* **Toggle Sound:** Press the speaker icon in the top-right navbar.
* **Keyboard Presentation Hotkeys (in War Room):**
  - <kbd>Space</kbd>: Launch Triage / Pause
  - <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> / <kbd>4</kbd>: Switch between Scenarios A, B, C, D
  - <kbd>T</kbd>: Trigger 60-Second Auto-Pilot Tour
  - <kbd>R</kbd>: Reset All Targets
