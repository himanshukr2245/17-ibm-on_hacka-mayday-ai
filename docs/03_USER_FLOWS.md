# 👥 03_USER_FLOWS.md — Multi-Persona Step-by-Step Journeys
### *MAYDAY: Autonomous Incident Commander Powered by IBM Bob 2.0*
*Document Class: Tier 1 Specification · Author: Team SITA (Himanshu Kumar & Priyansu Modi)*

---

## 1. Persona 1: The On-Call SRE (Emergency Triage Flow)

```
[ PagerDuty Alert ] ──► [ Open MAYDAY War Room (/) ]
                             │
                             ▼
               [ Click "Launch Triage Squad" ]
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
       [ RECON-1 ]      [ RECON-2 ]      [ RECON-3 ]
      (Change Det.)    (Logic Det.)     (Race Det.)
            │                │                │
            ▼                ▼                ▼
     [ Commit Located ] [ Null Found ]  [ Falsified! ]
            │                │
            ▼                ▼
      [ Repro Test ]   [ Band-Aid ]
            │                │
            └────────► [ Cross-Exam Matrix ] ◄────────┘
                             │
                             ▼
                 [ RECON-2 Fails $0 Invariant ]
                 [ RECON-1 Crowned Winner ]
                             │
                             ▼
                   [ Surgeon Code Diff ]
                   [ Vitest Suite 100% Green ]
                             │
                             ▼
              [ Auto-Generated PR #104 Merged ]
```

---

## 2. Persona 2: The Hackathon Judge / Technical Architect

1. **Arrival**: Lands on `/` and observes active SEV-1 incident, MTTR timer, and the 3-subagent layout.
2. **Scientific Inspection (`/matrix`)**:
   - Navigates to `/matrix`.
   - Clicks on *RECON-2 (Lazy Null-Check)*: Hears the audio failure buzz, observes the table flash red, and sees why `res.fee?.amount ?? 0` charges $0 fee.
   - Clicks on *RECON-1 (Contract Adapter)*: Hears the green chime and sees the 2.9% invariant pass ($10.29 charged).
3. **Bob 2.0 Evidence Audit (`/bobalytics`)**:
   - Navigates to `/bobalytics`.
   - Interacts with the Enterprise ROI calculator.
   - Clicks on the screenshot receipts to open the high-res lightbox and verify genuine IBM Bob 2.0 execution in `bob_sessions/`.
4. **Chaos Testing (`/simulator`)**:
   - Injects a live fault to see MAYDAY's automated response in real-time.
5. **Reviewing Governance (`/postmortem`)**:
   - Copies the 5-Whys markdown report and views the verified GitHub PR.
