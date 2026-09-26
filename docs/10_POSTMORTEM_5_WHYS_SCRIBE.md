# 10: Automated Postmortem & 5-Whys Scribe Vault

> **Document Class:** Zone 2 Bespoke Domain Engine  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Subsystem:** Postmortem Vault & RCAG Scribe (`/postmortem`)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Automated RCAG Scribe Philosophy

In traditional DevOps, writing a Root Cause Analysis and Governance (RCAG) postmortem takes hours or days after the incident is resolved. Engineers forget key details, timelines are inaccurate, and lessons learned are lost.

MAYDAY features an **Automated Scribe Agent** that captures the entire triage trajectory in real time and automatically compiles an enterprise-grade postmortem:
- Accurate timestamps for TTRC (Time to Root Cause) and TTVF (Time to Verified Fix).
- Formal 5-Whys causal chain.
- Exact pull request link with patch diff.
- Complete audit of why competing decoy hypotheses were disproven.

---

## 2. The 5-Whys Causal Tree (Incident A Example)

```
[Level 1: Symptom]
Why did customer checkout fail?
└── The payment adapter threw an unhandled TypeError: Cannot read properties of undefined (reading 'amount').

[Level 2: Intermediate Trigger]
Why was amount undefined?
└── adapter.ts:31 attempted to access gatewayRaw.fee.amount, but gatewayRaw.fee was undefined.

[Level 3: Upstream Dependency Bump]
Why was gatewayRaw.fee undefined?
└── Commit e9a18f4 upgraded paylink-sdk from v2.4 to v3.0, which changed the response envelope to data.feeCents.

[Level 4: Verification Gap]
Why didn't CI catch this before merge?
└── Unit tests mocked the legacy v2.4 schema; no contract verification test existed for SDK v3.0.

[Level 5: Root Cause & Preventative Governance]
Why was the mock outdated?
└── Upstream SDK schema drift was not enforced through automated end-to-end integration contracts.
    └── REMEDIATION: Added strict Vitest contract assertions and automated SDK schema linters.
```

---

## 3. 1-Click Operational Exports

The `/postmortem` route provides real export tools for engineering management:
1. **Copy Markdown:** Writes clean, GitHub-flavored Markdown directly to the user's clipboard for immediate pasting into Jira, Notion, or Slack.
2. **Print / Save as PDF:** Direct invocation of browser `window.print()` with print-optimized CSS that strips dark backgrounds and formats typography for executive delivery.
3. **Verified PR Link:** Direct link to GitHub pull request with git commit reference.
