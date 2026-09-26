# 09: Database & Local Storage Topology

> **Document Class:** Storage & Data Specification (Tier 3)  
> **System Name:** MAYDAY — Autonomous Incident Commander  
> **Parent Blueprint:** [`UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md`](file:///d:/VS%20Code%20Workspaces/7.%20Google%20ai.studio/2-Plans/UNIVERSAL_APP_CREATION_ENGINE_AND_EXECUTION_BLUEPRINT.md)  
> **Authors:** Himanshu Kumar & Team DELTA / Team SITA  

---

## 1. Storage Philosophy: Local-First Zero-Latency Outbox

MAYDAY is built for mission-critical reliability during major infrastructure outages. When cloud backends are partitioned or network connectivity degrades, the Incident Commander must never lock up or lose triage state.

We implement a **Local-First Architecture** utilizing browser IndexedDB via the lightweight `idb` wrapper, backed by a persistent file-system cache in the Node runtime.

---

## 2. IndexedDB Schema Specification

- **Database Name:** `mayday_incident_db`
- **Database Version:** `1`

### 2.1 Object Stores

```typescript
export interface MaydayDB {
  incidents: {
    key: string; // incidentId (e.g. 'INC-2041')
    value: {
      id: string;
      title: string;
      severity: 'SEV-1' | 'SEV-2' | 'SEV-3';
      targetService: string;
      status: 'AWAITING_DISPATCH' | 'TRIAGING' | 'VERIFIED' | 'RESOLVED';
      createdAt: string;
      resolvedAt?: string;
      ttrcSeconds?: number;
      ttvfSeconds?: number;
      winnerAgent?: string;
      diffSummary?: string;
    };
    indexes: { 'by-severity': string; 'by-status': string };
  };

  investigations: {
    key: string; // UUID
    value: {
      id: string;
      incidentId: string;
      step: number;
      hypotheses: Array<{
        agent: string;
        name: string;
        theory: string;
        rungs: { r0: boolean; r1: boolean; r2: boolean; r3: boolean };
        status: 'PENDING' | 'VERIFIED' | 'FALSIFIED';
        evidence: string;
      }>;
      timestamp: string;
    };
    indexes: { 'by-incident': string };
  };

  testRuns: {
    key: string; // UUID
    value: {
      id: string;
      incidentId: string;
      testFile: string;
      testsPassed: boolean;
      totalTests: number;
      passedTests: number;
      rawOutput: string;
      durationMs: number;
      timestamp: string;
    };
    indexes: { 'by-incident': string; 'by-timestamp': string };
  };

  postmortems: {
    key: string; // incidentId
    value: {
      incidentId: string;
      title: string;
      markdownContent: string;
      generatedAt: string;
      prUrl?: string;
      humanTimeSavedMinutes: number;
      bobcoinCost: number;
    };
  };
}
```

---

## 3. Data Flow & Mutation Pipeline

1. **Write Local First:** Any user action or automated triage event is written immediately to `idb` with zero network delay.
2. **Deterministic File Mutation:** API routes (`/api/heal`) alter the physical code files on the local filesystem and write the resulting Vitest output into the `testRuns` object store.
3. **Reactive UI Subscription:** UI components consume state through React hooks, ensuring that any reload or browser restart immediately recovers the latest triage session.
