export type IncidentSeverity = 'SEV-1' | 'SEV-2' | 'SEV-3';
export type IncidentStatus = 'AWAITING_DISPATCH' | 'TRIAGING' | 'REPRODUCING' | 'CROSS_EXAMINING' | 'SELF_HEALING' | 'RESOLVED' | 'ESCALATED';

export interface Hypothesis {
  agent: string;
  name: string;
  avatar: string;
  theory: string;
  status: 'INVESTIGATING' | 'VERIFIED' | 'FALSIFIED';
  rungs: {
    r0: boolean;
    r1: boolean;
    r2: boolean;
    r3: boolean;
  };
  evidence: string;
  falsifiedReason?: string;
}

export interface IncidentEvent {
  t: number; // millisecond offset
  type: string;
  payload: Record<string, any>;
}

export interface MatrixRow {
  name: string;
  repro: string;
  crash: string;
  suite: string;
  verdict: string;
  isWinner: boolean;
  details?: string;
}

export interface IncidentData {
  id: string;
  severity: IncidentSeverity;
  title: string;
  target: string;
  alertSnippet: string;
  winner: string;
  detectives: Hypothesis[];
  matrix: {
    reproCol: string;
    rows: MatrixRow[];
  };
  diff: {
    file: string;
    context: string;
    removed: string;
    added: string;
    after: string;
  };
  tests: {
    name: string;
    detail: string;
  }[];
  postmortem: {
    title: string;
    prNumber: number;
    prUrl: string;
    ttrc: string;
    ttvf: string;
    humanBaseline: string;
    improvement: string;
    rootCause: string;
    rejectionReason: string;
  };
}
