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

### Part 1: The Overview Tab (`0:00 – 0:35`)
- [ ] Start on `http://localhost:3000/`.
- [ ] Hold static for 2 seconds on the hero title: **MAYDAY: Autonomous AI Incident Commander**.
- [ ] Move mouse cursor smoothly to the glowing red **🚨 3:00 AM INCIDENT OUTAGE** emergency ribbon.
- [ ] Scroll slightly down to the interactive crisis simulator showing the 3 parallel AI detectives (Recon-1, Recon-2, Recon-3).
- [ ] Show the Overview page cards explaining what the app is, who it is for, and how to use it.
- [ ] Move cursor to the top navigation bar and click the **"War Room"** tab at the 0:34 mark.

### Part 2: The War Room Tab (`0:35 – 01:40`)
- [ ] Land on `/war-room`.
- [ ] Point cursor to the live stopwatch and the red revenue loss ticker (`-$14.50/s`).
- [ ] Click the button: **"⚡ 60-Second Guided Auto-Pilot Tour"** (or press <kbd>T</kbd>).
- [ ] Watch the 3 detective cards (Recon-1, Recon-2, Recon-3) stream hypotheses in parallel.
- [ ] Watch the red **FALSIFIED** stamp appear over Recon-3's concurrency hypothesis.
- [ ] Show Recon-1 confirm PayLink SDK contract drift (`data.feeCents`).
- [ ] Watch the live Vitest progress indicator turn green.
- [ ] Hear the victory chime and see the MTTR stopwatch freeze at **38 seconds**!
- [ ] Move cursor to the top navigation bar and click the **"Studio & Lab"** tab at the 01:38 mark.

### Part 3: The Studio & Lab Tab (`01:40 – 02:25`)
- [ ] Land on `/studio`.
- [ ] Click the **"Custom Trace (Live AI)"** sub-tab button.
- [ ] Under Quick Presets, click **"🏥 Sehat-Setu (SIH ABHA Crash)"**.
- [ ] Show the error stack trace populate (`TypeError: Cannot read properties of undefined (reading 'replace') at firebase.ts:51`).
- [ ] Click the button: **"⚡ Run MAYDAY Forensic Analysis"**.
- [ ] When the results render, pause on the purple badge: **`✨ Live Qwen AI • qwen/qwen3.8-27b (~1200ms)`**.
- [ ] Show the synthesized Vitest reproduction test.
- [ ] Show the green diff with optional chaining and click **"Copy Fix"**.
- [ ] Move cursor to the top navigation bar and click the **"Matrix"** tab at the 02:23 mark.

### Part 4: The Matrix Tab (`02:25 – 03:00`)
- [ ] Land on `/matrix`.
- [ ] Click the second candidate card: **`RECON-2: Lazy Null Check (Band-Aid)`**.
- [ ] Hear the procedural failure buzzer. Point cursor to the red **FAILED** on Repro Test 1 (`$10.00 charged ($0 fee uncollected)`) and highlight the **$12,400 / day** financial risk badge.
- [ ] Click the first candidate card: **`RECON-1: Contract Schema Adapter`**.
- [ ] Hear the green victory chime. Point cursor to all 4 green **PASSED** assertion rows (`$10.29 charged`) and highlight the glowing green **VERDICT: CROWNED CHAMPION FIX** banner.
- [ ] Move cursor to the top navigation bar and click the **"Bobalytics"** tab at the 02:58 mark.

### Part 5: Bobalytics & Postmortems Tabs (`03:00 – 03:30`)
- [ ] Land on `/bobalytics`.
- [ ] Pause on the financial comparison: **$900 Human SRE cost vs $0.38 IBM Bob cost**.
- [ ] Drag the **Monthly Incidents** slider back and forth to show the enterprise ROI calculator in action.
- [ ] Click one authentic session receipt screenshot to open the lightbox modal, then press <kbd>Esc</kbd> to close.
- [ ] Move cursor to the top navigation bar and click **"Postmortems"**.
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
