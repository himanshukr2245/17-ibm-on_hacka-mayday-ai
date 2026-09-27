# 🚨 MAYDAY: Autonomous AI Incident Commander
## The Complete Plain-English Guide & Operating Manual

> **App Name:** MAYDAY  
> **Built For:** IBM AI Hackathon  
> **Created By:** Team SITA (Himanshu Kumar & Priyansu Modi)  
> **Powered By:** IBM Bob 2.0 Multi-Agent Framework  

---

## 1. What is MAYDAY? (In Simplest English)

Imagine you run an online shopping website like Amazon, Flipkart, or Shopify.

It is **3:00 AM** in the middle of the night. Suddenly, a tiny mistake in the code breaks the payment system. Every customer trying to buy something gets an error screen.
- Customers get upset and leave to buy from your competitor.
- Your company is losing money every single second (e.g. **$14.50 every second**).
- Automated alarms start ringing loudly in your company's monitoring system.

### How Companies Handle This Today (The Old, Painful Way):
1. An automated pager rings the phone of a sleepy software engineer at 3:00 AM.
2. The engineer wakes up, rubs their eyes, turns on their laptop, and logs into the company servers.
3. They spend **35 to 45 minutes** reading confusing error logs, searching through recent code changes, and arguing in a Slack chat room about what broke.
4. Because they are stressed and tired, someone often suggests a hasty, low-quality "band-aid" fix (like returning `0` for processing fees). Basic tests pass, but this "bad fix" quietly loses thousands of dollars for the business by tomorrow morning!

### How MAYDAY Solves This (The Autonomous AI Way):
**MAYDAY replaces the panic and the 45-minute delay.**

Instead of waking up a tired human at 3:00 AM:
1. The error alarm goes directly into **MAYDAY**.
2. MAYDAY immediately launches **3 competing AI detective agents** in parallel inside IBM Bob.
3. Each detective tests a different theory (e.g., Detective 1 checks recent Git code changes; Detective 2 checks missing object fields; Detective 3 checks race conditions).
4. MAYDAY writes a **reproduction test** to mathematically prove the bug.
5. It catches and rejects fake or lazy "band-aid" fixes using a **Cross-Examination Matrix**.
6. It writes the verified fix directly into the code, proves that 100% of tests pass, and opens a ready-to-merge GitHub Pull Request.
7. **Total time taken:** **Under 38 seconds.** Zero humans woken up. Zero financial loss.

---

## 2. How Does a Company Use MAYDAY with Their Own App?

Real companies do not want another complicated dashboard that requires constant babysitting. MAYDAY is built to fit into the company's real-world software pipeline in **3 simple ways**:

```
┌────────────────────────────────────────────────────────┐
│     CRITICAL OUTAGE IN COMPANY APP (e.g., Shopfront)    │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
      【 WAY 1: WEBHOOK 】       【 WAY 2: WEB STUDIO 】
       Zero-touch automated       Engineer pastes log / trace
       trigger from Sentry        into MAYDAY Web Studio
              │                           │
              └─────────────┬─────────────┘
                            ▼
              ┌───────────────────────────┐
              │ MAYDAY REASONING ENGINE   │
              │ (IBM Bob 2.0 Subagents)   │
              ├───────────────────────────┤
              │ • 3 Detectives Compete    │
              │ • Decoy Fixes Rejected    │
              │ • Code Patched on Disk    │
              │ • Test Suite Passes Green │
              └─────────────┬─────────────┘
                            ▼
      【 WAY 3: IBM BOB IDE / CLI & GITHUB PR 】
       Patch merged into main codebase in under 38 seconds
```

### Way 1: Zero-Touch Automated Webhook (How Companies Use It in Production)
- **Who uses it:** Site Reliability Engineers (SREs), DevOps teams, and CTOs.
- **How to connect it:** In the company's monitoring tool (like Sentry, Datadog, or IBM Instana), the team adds MAYDAY's Webhook URL:
  `https://your-mayday-app.com/api/heal`
- **What happens during an outage:** When an error occurs on the company's live servers, Sentry immediately sends an HTTP POST alert to MAYDAY. MAYDAY's background AI agents wake up, investigate the code, write the fix, run the company's test suite, and post a completed GitHub Pull Request with a full explanation directly into the company's Slack channel.

### Way 2: The Interactive Web Studio (How Developers Investigate Bugs Manually)
- **Who uses it:** On-call software engineers and QA testers.
- **How to use it:** The developer opens the MAYDAY website (`/studio`), pastes the error message or crash log into the box, and clicks **"Run Invariant Investigation"**.
- **What happens:** MAYDAY reads the error, finds the exact file name and line number, simulates the 3 detectives, displays the candidate fix side-by-side, and lets the developer break or fix the code on their machine with one click.

### Way 3: Inside IBM Bob 2.0 IDE / Terminal (Everyday Pair-Programming)
- **Who uses it:** Developers writing features and debugging code locally.
- **How to use it:** The developer opens their terminal in VS Code or IBM Bob IDE and types:
  ```bash
  bob run --mode mayday-triage "Checkout failing with TypeError in payment adapter"
  ```
- **What happens:** IBM Bob activates the MAYDAY persona, runs tests against the local workspace, and applies the verified fix directly to the file right in front of the developer's eyes.

---

## 3. How Does MAYDAY Interact with the Real Codebase?

In this project, we included a real enterprise e-commerce application in the folder:
`targets/shopfront/`

This is a real TypeScript / Node.js application containing:
1. **`src/payment/adapter.ts`:** The payment gateway adapter that calculates order totals and processing fees.
2. **`src/inventory/service.ts`:** The warehouse inventory reservation system that handles stock during flash sales.
3. **`test/checkout.test.ts` & `test/inventory.test.ts`:** Automated invariant tests written in Vitest.

### What happens when you click "Break Code" or "Fix Code":
- **When you click "Break Code on Disk":** MAYDAY physically edits line 31 of `targets/shopfront/src/payment/adapter.ts` on your hard drive, changing the schema so that checkout immediately crashes with a `TypeError`.
- **When you click "Run Vitest Live":** Node.js runs the real `vitest` test command on your computer, showing real failing test output in the terminal box.
- **When you click "Fix Code on Disk":** MAYDAY physically rewrites the file with the verified Crown Fix, and Vitest runs again and turns 100% green.
- **Privacy & Remote User Protection:** When remote visitors (like judges or friends) access your app on the web, MAYDAY automatically runs in high-fidelity browser simulation mode, meaning external users cannot touch or delete files on your private computer.

---

## 4. What Technologies Were Used to Build MAYDAY?

| Technology | Role | Why It Was Used |
| :--- | :--- | :--- |
| **Next.js 16 (App Router) + React 19** | Modern Web Framework | Provides ultra-fast page transitions, clean client/server component separation, and static export support. |
| **TypeScript 5** | Strict Programming Language | Guarantees complete type safety across the entire app with zero guesswork. |
| **Tailwind CSS v4** | UI Styling System | Custom "Cyber-Slate" design token system with rich dark mode, neon status glows, and fluid mobile-responsive layouts. |
| **Procedural Web Audio API** | Sound & Acoustics Engine | Generates 100% synthetic sound effects (radar clicks, klaxon sirens, victory chimes) mathematically in the browser without loading heavy audio files. |
| **IndexedDB (`idb`)** | Client-Side Database | Local-first browser database. All incident histories and user sessions stay strictly on the user's browser, preventing any data leakage between different users. |
| **Vitest 1.6** | Test Runner | Lightning-fast test runner that executes real empirical invariant tests directly on disk. |
| **IBM Bob 2.0 Multi-Agent Framework** | AI Reasoning Engine | Coordinates specialized AI detectives running in parallel: Recon-1 (Recent Git changes), Recon-2 (Missing object safety), Recon-3 (Concurrency locks), and Scribe (Postmortem author). |
| **Cloudflare Security & Rate Limiting** | Edge Security | Token-bucket rate limiting (20 requests/min), parameter whitelisting, and strict Content Security Policy (CSP) headers. |

---

## 5. Tour of Every Page: What Each Page Does & Why It Exists

MAYDAY contains **8 distinct pages**, each built for a specific purpose in the incident lifecycle:

---

### Page 1: Overview Command Center (`/`)
* **URL:** `http://localhost:3000/`
* **What is it?** The front door and executive briefing room.
* **Why does it exist?** When anyone visits the app for the first time, this page tells the complete story in seconds, shows the active crisis status, and explains how companies integrate MAYDAY.
* **What you can do here:**
  - **Live Crisis Ribbon:** Bright emergency alert banner at the top showing the current system state.
  - **Dual-Mode Switcher:** Toggle between "🎮 Golden Demo Mode" (smooth browser simulation) and "⚡ Real Host Disk Mode" (interacts directly with your local files).
  - **Interactive 4-Step Crisis Preview:** Click through the 4 core steps: Alert Ingestion → Detectives Racing → Decoy Falsification → Physical Disk Healed.
  - **3 Real-World Integration Tabs:** Switch between interactive guides for Webhooks, Web Studio, and Bob CLI with copyable code snippets.
  - **Hall of Shame vs. Crown Fix:** Side-by-side visual comparison explaining why naive AI band-aids cause financial disasters and how MAYDAY fixes them properly.
  - **Fast Navigation CTAs:** Jump directly into the live War Room or open the Diagnostic Studio.

---

### Page 2: War Room Command Center (`/war-room`)
* **URL:** `http://localhost:3000/war-room`
* **What is it?** The live 3:00 AM incident cockpit.
* **Why does it exist?** This is the flagship demonstration screen where judges and engineers watch IBM Bob 2.0 triage an active high-severity incident live.
* **What you can do here:**
  - **⚡ 60-Second Guided Auto-Pilot Tour:** 1-click button that automatically runs the entire end-to-end incident resolution story with sound effects and step-by-step narration.
  - **Live MTTR Clock & Revenue Bleed Ticker:** A live stopwatch counting resolution seconds alongside a red counter tracking revenue loss at -$14.50/second until frozen by the Crown Fix.
  - **Scenario Launchpad (A, B, C, D):** Switch between 4 different production scenarios:
    - **Scenario A (`INC-2041`):** PayLink SDK v3.0 contract drift.
    - **Scenario B (`INC-2042`):** Flash-sale concurrency race condition.
    - **Scenario C (`INC-2043`):** EventEmitter memory leak causing 1.4 GB server crash.
    - **Scenario D (`INC-2044`):** Honest escalation for external bank outage.
  - **3 Competing Detective Cards:** Watch Recon-1, Recon-2, and Recon-3 work simultaneously to test their theories in real time.
  - **Hardware Proof Lab:** Displays live file verification status directly on your local hard drive (`targets/shopfront/src/payment/adapter.ts`).
  - **One-Click Share Button:** Copies a direct link (`?incident=A&autopilot=true`) to send to judges or teammates.
  - **Keyboard Shortcuts:** Full presentation controls (Space = Launch/Pause, 1–4 = Switch Scenario, R = Reset, T = Tour).

---

### Page 3: Diagnostic Studio & Hardware Lab (`/studio`)
* **URL:** `http://localhost:3000/studio`
* **What is it?** The hands-on laboratory for developers.
* **Why does it exist?** Proves to skeptical engineers and judges that MAYDAY is not a fake simulation, but a real tool that physically edits code files and runs real tests.
* **What you can do here:**
  - **💣 Break Code on Disk:** One click physically changes line 31 of `adapter.ts` on your computer.
  - **🩹 Fix Code on Disk:** One click physically restores the verified Crown Fix on your computer.
  - **🧪 Run Vitest Live:** Runs the real Node.js test suite in the background and prints the live terminal log.
  - **Custom Stack Trace Analyzer:** Paste any error message or stack trace from any application; MAYDAY parses the file path, line number, and error type, generating a reproduction test on the spot.
  - **Webhook Simulator:** Sends a synthetic alert to the `/api/heal` endpoint and displays the raw JSON HTTP response.

---

### Page 4: Cross-Examination Matrix (`/matrix`)
* **URL:** `http://localhost:3000/matrix`
* **What is it?** The scientific comparison truth table.
* **Why does it exist?** Explains why standard AI models (like raw ChatGPT) fail at coding incidents by proposing dangerous "AI Band-Aids" that look okay at first glance but silently break businesses.
* **What you can do here:**
  - **Compare 3 Competing Theories:** Evaluates the Naive Fallback patch, the Retry Loop patch, and the MAYDAY Crown Fix.
  - **Scientific Proof Ladder:** Tests each fix against 4 strict engineering rules:
    1. Does it compile without syntax errors?
    2. Does it survive high-traffic burst load?
    3. Does it prevent silent financial loss?
    4. Does it pass the reproduction test?
  - **The Hall of Shame:** Shows exact code examples of bad AI fixes (like `res.fee?.amount ?? 0`) that passed basic tests but lost $12,400 in uncollected gateway fees.

---

### Page 5: Bobalytics & Financial Cockpit (`/bobalytics`)
* **URL:** `http://localhost:3000/bobalytics`
* **What is it?** The economic return-on-investment (ROI) audit.
* **Why does it exist?** Shows enterprise executives the exact financial savings of using IBM Bob 2.0 multi-agent triage compared to traditional human engineering teams.
* **What you can do here:**
  - **Cost Comparison Cards:**
    - Human Engineering Cost: **$900.00** per incident (3 engineers × 2.5 hours @ $120/hr).
    - MAYDAY + IBM Bob Cost: **$0.38** (~0.38 Bobcoins).
    - Time Savings: **97.5% faster MTTR** (38 seconds vs 45 minutes).
  - **Interactive Annual ROI Calculator:** Drag the monthly incident slider to calculate exact annual cost savings for small startups or large enterprises.
  - **Real Execution Receipts:** High-resolution screenshots of actual IBM Bob 2.0 session receipts showing exact prompt token counts (19,700 tokens for Task 1; 24,100 tokens for Task 2).
  - **Lightbox Modal:** Click any screenshot to inspect the full-resolution evidence; press <kbd>Esc</kbd> to close.

---

### Page 6: Autonomous Postmortems (`/postmortem`)
* **URL:** `http://localhost:3000/postmortem`
* **What is it?** Automated incident compliance reports and archive.
* **Why does it exist?** After an outage, engineers usually spend 3 to 4 painful hours writing postmortem documents. MAYDAY's Scribe agent generates a complete, professional report automatically in under 5 seconds.
* **What you can do here:**
  - **5-Whys Causal Analysis:** A structured step-by-step breakdown tracing the failure back to the true root cause.
  - **Verified PR Links:** Links to the exact Git commits and Pull Requests that resolved the incident.
  - **📥 Download Markdown (.md):** One-click button to download the signed postmortem document directly to your computer.
  - **Copy Markdown & Print Support:** Formatted for easy copy-pasting into Jira, Notion, Confluence, or GitHub.

---

### Page 7: Incident Fleet Archive (`/incidents`)
* **URL:** `http://localhost:3000/incidents`
* **What is it?** The catalog of all supported enterprise incident scenarios.
* **Why does it exist?** Gives engineers and judges a clean library of every scenario available in the system, with summary cards, severity badges, and quick links.
* **What you can do here:**
  - Browse scenarios INC-2041 through INC-2044.
  - Check severity levels, baseline human MTTR vs. MAYDAY MTTR, and affected systems.
  - Click **"Simulate in War Room"** to launch any scenario into the live triage cockpit immediately.
  - Click **"View Full Dossier"** to read the dedicated permalink report for that incident.

---

### Page 8: Deep-Dive Incident Dossiers (`/incidents/[id]`)
* **URLs:**
  - `/incidents/INC-2041` (PayLink Contract Drift)
  - `/incidents/INC-2042` (Async Mutex Race Condition)
  - `/incidents/INC-2043` (EventEmitter Memory Leak)
  - `/incidents/INC-2044` (Honest External Escalation)
* **What is it?** Dedicated permanent permalink pages for each specific incident scenario.
* **Why does it exist?** Allows judges or auditors to bookmark, read, or print the complete technical dossier of a specific incident without needing to run the interactive simulator.
* **What you can do here:**
  - Read the full 5-Whys root cause analysis for that outage.
  - Review technical details and affected dependencies.
  - Click the **"Launch in War Room"** button to jump directly into the live interactive resolution for that scenario.

---

## 6. Summary: The 2-Minute Demo Flow for Hackathon Judges

When presenting to judges or friends, use this simple sequence:

1. **Start on the Overview Page (`/`) (30 seconds):**
   *"Judges, imagine it's 3:00 AM. Production checkouts are failing, bleeding $14.50 every second. Instead of paging a sleepy engineer, MAYDAY intercepts the alert autonomously."*
2. **Jump to the War Room (`/war-room`) (45 seconds):**
   Click **"⚡ 60-Second Guided Auto-Pilot Tour"**.
   - Show the MTTR stopwatch and revenue bleed counter.
   - Point out the 3 detectives competing in parallel.
   - Show how the matrix rejects the fake $0 band-aid and proves the Crown Fix.
   - Show the green victory banner and the MTTR freezing at 38 seconds.
3. **Prove Real Disk Execution in Studio (`/studio`) (30 seconds):**
   - Click **"Break Code on Disk"** — show line 31 of `adapter.ts` change.
   - Click **"Run Vitest Live"** — show the real terminal output failing.
   - Click **"Fix Code on Disk"** — run Vitest again and show tests turning 100% green.
4. **Close with Bobalytics & Postmortem (`/bobalytics` & `/postmortem`) (15 seconds):**
   - Show how IBM Bob 2.0 reduced a $900 engineering cost to $0.38.
   - Show the 1-click Markdown postmortem downloaded in 5 seconds.
   - *"Zero sleepy humans paged. Zero band-aids shipped. 100% verified code."*
