# Screen Recording Checklist for MAYDAY 3:30 Demo Video

Use this checklist before and during screen recording to capture clean, high-definition footage that syncs seamlessly with your ElevenLabs voiceover track.

---

## 1. Environment & Viewport Setup

- [ ] **Resolution & Ratio**:
  - Record in **1920 × 1080 (Full HD, 16:9 Widescreen)** at **60 FPS** for buttery-smooth animations and telemetry streams.
  - Chrome Zoom: Set to exactly **100%** (`Ctrl + 0`).
- [ ] **Browser Cleanliness**:
  - Hide the Bookmarks bar (`Ctrl + Shift + B`).
  - Press `F11` (or use OBS window capture on Chrome) to hide the Windows taskbar and tabs if you want a dedicated cockpit recording.
  - Turn off all desktop notifications (Windows Focus Assist: On; close Telegram, WhatsApp, Discord, Slack).
- [ ] **Audio Setup**:
  - **Enable Desktop Audio Capture in OBS**: MAYDAY uses procedural Web Audio API to synthesize real-time klaxon sirens, radar clicks, and green victory chimes. Recording desktop audio allows you to capture these immersive effects live!
  - Keep master browser sound toggle enabled (the green speaker icon in the top-right navbar should be active).
- [ ] **Reset Baseline State**:
  - Before starting the recording, open `http://localhost:3000/studio` and click **"Reset All Targets"** (or press <kbd>R</kbd> in the War Room) to ensure your local files start in a clean state.

---

## 2. Step-by-Step Recording Sequence (Sync Guide)

### Part 1: The Overview Command Center (`0:00 – 0:35`)
- [ ] Start on `http://localhost:3000/`.
- [ ] Hold static for 2 seconds on the hero title: **MAYDAY: Autonomous AI Incident Commander**.
- [ ] Point the mouse cursor smoothly to the crimson **SEV-1 ACTIVE** ribbon.
- [ ] Scroll smoothly through the 4-step crisis lifecycle (Alert → Detectives → Falsification → Physical Disk Healed).
- [ ] Hover over **"Open War Room Cockpit"** and click it at the 0:34 mark.

### Part 2: The War Room Cockpit (`0:35 – 01:45`)
- [ ] Land on `/war-room`.
- [ ] Immediately click **"⚡ 60-Second Guided Auto-Pilot Tour"** (or press <kbd>T</kbd>).
- [ ] **0:40 – 01:05 (Crisis & Detectives Racing)**:
  - Keep the cursor steady near the center.
  - Let the camera show the live MTTR clock counting up and the red revenue bleed counter (`-$14.50/s`).
  - Watch the 3 detective cards (Recon-1, Recon-2, Recon-3) stream hypotheses in parallel.
- [ ] **01:05 – 01:30 (Falsification & AST Fix)**:
  - Watch the red **FALSIFIED** stamp appear over Recon-3's concurrency hypothesis.
  - Show Recon-1 confirm PayLink SDK contract drift (`data.feeCents`).
- [ ] **01:30 – 01:45 (Verification & Victory)**:
  - Watch the live Vitest progress indicator turn green.
  - Hear the victory chime and see the MTTR stopwatch freeze at **38 seconds**!
  - Move the cursor to the top navbar and click **"Matrix"**.

### Part 3: The Cross-Examination Matrix (`01:45 – 02:20`)
- [ ] Land on `/matrix`.
- [ ] Scroll down to the **Hall of Shame** comparison.
- [ ] Pause over the red naive band-aid (`gatewayRaw.fee?.amount ?? 0`).
- [ ] Highlight the text explaining why returning 0 passed basic unit tests but drained $12,400 in uncollected gateway fees.
- [ ] Show the green Crown Fix passing all 4 invariant gates (Syntax, Burst Load, Zero Financial Loss, Reproduction Test).
- [ ] Move cursor to the navbar and click **"Studio & Lab"**.

### Part 4: Live Qwen AI on Real-World Sehat-Setu Crash (`02:20 – 03:05`)
- [ ] Land on `/studio?tab=custom-trace` (or click the **"Custom Trace (Live AI)"** tab).
- [ ] Under Quick Presets, click **"🏥 Sehat-Setu (SIH ABHA Crash)"**.
- [ ] Show the error stack trace populate (`TypeError: Cannot read properties of undefined (reading 'replace') at firebase.ts:51`).
- [ ] Click the gradient button: **"⚡ Run MAYDAY Forensic Analysis"**.
- [ ] When the results render, pause on the purple badge: **`✨ Live Qwen AI • qwen/qwen3.8-27b (~1200ms)`**.
- [ ] Show the synthesized Vitest reproduction test.
- [ ] Show the green diff with optional chaining and click **"Copy Fix"**.
- [ ] Move cursor to the navbar and click **"Bobalytics"**.

### Part 5: Bobalytics, Postmortems & Closing (`03:05 – 03:30`)
- [ ] Land on `/bobalytics`.
- [ ] Pause on the financial comparison: **$900 Human SRE cost vs $0.38 IBM Bob cost**.
- [ ] Drag the **Monthly Incidents** slider back and forth to show the enterprise ROI calculator in action.
- [ ] Click one authentic session receipt screenshot to open the lightbox modal, then press <kbd>Esc</kbd> to close.
- [ ] Click **"Postmortems"** in the navbar.
- [ ] Show the automated 5-Whys compliance document. Click **"Download Markdown"**.
- [ ] Hold steady on the final screen or return to `/` for 3 seconds before stopping the recording.

---

## 3. Video Editing & Audio Sync Tips (CapCut / Premiere Pro / DaVinci)

1. **Import Audio First**:
   - Generate the ElevenLabs audio track using the script in `docs/plans/DEMO_VIDEO_SCRIPT_v1.0.md`.
   - Place the voiceover on **Audio Track 1**.
2. **Align Video Clips to Audio**:
   - Split your raw screen recording into the 5 sections.
   - Speed up or trim cursor movement slightly (between `0.95x` and `1.15x`) so button clicks occur *the exact second* the voiceover introduces them.
3. **Background Music Track**:
   - Use a sleek, subtle, modern tech / synthwave / ambient electronic background track.
   - Set the background music volume to **-24 dB to -28 dB** (with audio ducking enabled under the voiceover).
4. **Key Punch-In Zooms (10% to 15% scale)**:
   - At `01:10`: Punch in slightly on the red **FALSIFIED** stamp.
   - At `01:40`: Punch in on the MTTR stopwatch freezing at **38 seconds** with the green checkmark.
   - At `02:45`: Punch in on the **`✨ Live Qwen AI • qwen/qwen3.8-27b`** badge.
5. **Export Settings**:
   - Format: **MP4 (H.264)**.
   - Resolution: **1920 × 1080 (1080p)**.
   - Frame Rate: **60 FPS**.
   - Bitrate: **16 to 20 Mbps** (VBR 2-Pass).
