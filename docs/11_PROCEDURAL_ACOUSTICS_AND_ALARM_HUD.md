# 11: Procedural Acoustics & Alarm Synthesizer Engine

> **Document Class:** Zone 2 Bespoke Domain Engine  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Engine File:** `web/src/lib/audio.ts`  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Zero-Asset Audio Synthesis Philosophy

Production incident tools must function under extreme air-gapped or network-degraded conditions. Traditional audio implementations rely on downloading `.mp3` or `.wav` assets over the network, introducing:
1. High asset weight (>2MB of binary audio files).
2. Audio failure when the network is partitioned during a severe outage.
3. Uncontrollable audio latency.

MAYDAY solves this with **Procedural Audio Synthesis** utilizing the browser's native Web Audio API (`AudioContext`). Every acoustic signal is generated via real-time mathematical oscillators directly in memory.

---

## 2. Acoustic Frequency & Waveform Specifications

```typescript
// From web/src/lib/audio.ts
export const SOUND_REGISTRY = {
  // SEV-1 Outage Klaxon: Harsh, urgent pulsing square wave
  playKlaxon: () => {
    // 880 Hz (A5) alternating with 440 Hz (A4) square wave
    // Frequency oscillation: 4 Hz vibrato pattern
    // Peak volume: 0.15 gain with exponential decay over 800ms
  },

  // Ingestion Radar Ping: High-Q crystalline sine harmonic
  playRadarPing: () => {
    // 1760 Hz (A6) pure sine wave
    // High-pass filter Q = 12
    // Exponential decay over 300ms
  },

  // Test Failure / Falsification Buzz: Harsh dissonant sawtooth
  playTestFailure: () => {
    // 220 Hz (A3) sawtooth wave with dissonant tritone harmonic (311 Hz)
    // Instant attack, linear decay over 250ms
  },

  // Crown Fix Verified Chime: Uplifting C-Major Arpeggio
  playGreenChime: () => {
    // Arpeggiated sequence: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
    // Note spacing: 80ms interval
    // Warm low-pass filtered sine envelope with rich 800ms release
  },

  // Tactile Terminal Click: Micro-transient click
  playTerminalClick: () => {
    // 1200 Hz transient sine pulse, duration: 30ms
  }
};
```

---

## 3. Ergonomic Mute & Persistent Memory

The mission control HUD (`Navbar.tsx`) includes a 1-click audio toggle button:
- When toggled, state is persisted in `localStorage.getItem('mayday_audio_enabled')`.
- All audio calls check the mute state before executing oscillator nodes, ensuring complete respect for the operator's workspace environment.
