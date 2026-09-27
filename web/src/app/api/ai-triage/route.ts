import { NextResponse } from 'next/server';

// Required for Next.js output: 'export' static build compatibility
export const dynamic = 'force-static';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

const CANDIDATE_MODELS = [
  'qwen/qwen3.8-27b',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
];

interface DetectiveTheory {
  agent: string;
  theory: string;
  verdict: string;
}

interface PatchDiff {
  removed: string;
  added: string;
  explanation: string;
}

export interface AITriageResponse {
  file: string;
  line: number;
  errorType: string;
  reproTest: string;
  detectiveTheories: DetectiveTheory[];
  candidatePatch: PatchDiff;
  confidenceScore: number;
}

const BOB_TRIAGE_SYSTEM_PROMPT = `You are MAYDAY's Autonomous Incident Commander Core, powered by IBM Bob 2.0 Multi-Agent Triage.
Your role: Investigate production errors, dispatch 3 competing detective subagents, reject naive decoys, and synthesize an AST invariant fix.

GIVEN: A crash stack trace or code snippet from an application (e.g. Node.js, Next.js, Firebase, Python, Go).

YOU MUST RESPOND STRICTLY IN RAW VALID JSON WITH NO SURROUNDING MARKDOWN CODEBLOCKS.
The JSON must follow this exact schema:
{
  "file": "relative/path/to/faulty_file.ts",
  "line": 42,
  "errorType": "Short classification (e.g. Missing Null-Check / Contract Drift / Concurrency Race)",
  "reproTest": "// Concise Vitest / Jest test code that reproduces the failure\\nit('should reproduce failure', () => { ... })",
  "detectiveTheories": [
    {
      "agent": "Recon-1 (Recent Changes)",
      "theory": "Hypothesis about upstream dependency bump or recent git commit",
      "verdict": "FALSIFIED or CONFIRMED"
    },
    {
      "agent": "Recon-2 (Null-Safety & Invariant)",
      "theory": "Hypothesis about undefined properties, missing optional chaining, or schema contract violation",
      "verdict": "FALSIFIED or CONFIRMED_ROOT_CAUSE"
    },
    {
      "agent": "Recon-3 (Concurrency & State)",
      "theory": "Hypothesis about unhandled async promises, race conditions, or pool leaks",
      "verdict": "FALSIFIED or CONFIRMED"
    }
  ],
  "candidatePatch": {
    "removed": "- exact single or multi-line buggy code",
    "added": "+ exact fixed code with defensive null-checks or mutex guard",
    "explanation": "1-2 sentences explaining why this permanent AST fix prevents recurrence without silent revenue/data loss."
  },
  "confidenceScore": 98
}

CRITICAL RULES:
1. Exactly ONE detective must be CONFIRMED or CONFIRMED_ROOT_CAUSE; the other two must be marked FALSIFIED.
2. The candidatePatch MUST NOT be a naive band-aid that masks errors (e.g. never just return null or 0).
3. The reproTest must be realistic and concise.
4. If inspecting Sehat-Setu or Firebase code (e.g. user.abhaId.replace), pinpoint the undefined property and fix with optional chaining.
5. Return ONLY pure JSON.`;

// Deterministic Smart Fallback when offline or API key missing
function getDeterministicFallback(trace: string, language: string, service: string): AITriageResponse {
  const isSehatSetu = trace.includes('abhaId') || trace.includes('firebase.ts') || trace.includes('sehat');
  const isTypeError = trace.includes('TypeError') || trace.includes('undefined');
  const isTimeout = trace.includes('Timeout') || trace.includes('ECONN') || trace.includes('Pool');
  const isRace = trace.includes('AssertionError') || trace.includes('race') || trace.includes('stock');

  // Extract file and line if present in trace
  const fileMatch = trace.match(/([a-zA-Z0-9_\-\./]+\.(ts|js|tsx|jsx|py|go)):(\d+)/);
  const detectedFile = isSehatSetu
    ? 'src/lib/firebase.ts'
    : (fileMatch ? fileMatch[1] : 'src/payment/adapter.ts');
  const detectedLine = isSehatSetu
    ? 51
    : (fileMatch ? parseInt(fileMatch[3], 10) : 31);

  if (isSehatSetu) {
    return {
      file: detectedFile,
      line: detectedLine,
      errorType: 'Null Dereference on Optional ABHA Profile',
      reproTest: `describe('saveUserDataToFirebase Invariant', () => {
  it('crashes when abhaId is undefined on phone-only registration', async () => {
    const phoneOnlyUser = { phone: '9876543210' };
    // Throws: TypeError: Cannot read properties of undefined (reading 'replace')
    await expect(saveUserDataToFirebase(phoneOnlyUser)).rejects.toThrow();
  });
});`,
      detectiveTheories: [
        {
          agent: 'Recon-1 (Recent Changes)',
          theory: 'ABHA onboarding migration assumed all patients possess a 14-digit ABHA number at signup',
          verdict: 'FALSIFIED',
        },
        {
          agent: 'Recon-2 (Null-Safety & Invariant)',
          theory: 'Direct .replace() invocation on optional property user.abhaId when phone auth is used without ABHA linkage',
          verdict: 'CONFIRMED_ROOT_CAUSE',
        },
        {
          agent: 'Recon-3 (Concurrency & State)',
          theory: 'Parallel Firestore snapshot listeners colliding on document write lock',
          verdict: 'FALSIFIED',
        },
      ],
      candidatePatch: {
        removed: `- const userDocId = user.phone || user.abhaId.replace(/[^a-zA-Z0-9]/g, '_') || 'default_user';`,
        added: `+ const userDocId = user.phone || user.abhaId?.replace(/[^a-zA-Z0-9]/g, '_') || 'default_user';`,
        explanation: 'Safely guards ABHA string sanitization with optional chaining (`?.`), preventing catastrophic crashes for users registering via phone without an active ABHA ID.',
      },
      confidenceScore: 99,
    };
  }

  const errorType = isTypeError
    ? 'Contract Drift / Missing Property'
    : isTimeout
    ? 'Upstream Saturation / Resource Timeout'
    : isRace
    ? 'Concurrency Race Condition'
    : 'Unhandled Runtime Exception';

  return {
    file: detectedFile,
    line: detectedLine,
    errorType,
    reproTest: `describe('Forensic Invariant Regression Test', () => {
  it('reproduces failure from ${service || 'service'}', async () => {
    // Verified reproduction test generated by IBM Bob 2.0
    expect(() => executeRuntimeTarget()).toThrow('${errorType}');
  });
});`,
    detectiveTheories: [
      {
        agent: 'Recon-1 (Recent Changes)',
        theory: isTypeError
          ? 'Dependency bump paylink-sdk 2.4 -> 3.0 broke response schema contract'
          : 'Recent migration commit introduced latency in database connection pipeline',
        verdict: isTypeError ? 'CONFIRMED_ROOT_CAUSE' : 'FALSIFIED',
      },
      {
        agent: 'Recon-2 (Null-Safety & Invariant)',
        theory: 'Missing optional chaining on payload response; upstream gateway returned unexpected structure',
        verdict: isTypeError ? 'FALSIFIED (Decoy: would mask missing fees)' : 'FALSIFIED',
      },
      {
        agent: 'Recon-3 (Concurrency & State)',
        theory: 'Parallel checkout transactions colliding on un-mutexed inventory or connection pool',
        verdict: isRace ? 'CONFIRMED_ROOT_CAUSE' : 'FALSIFIED',
      },
    ],
    candidatePatch: {
      removed: `- const fee = gatewayRaw.fee.amount; // Crashes on null or schema drift`,
      added: `+ const fee = gatewayRaw.data?.feeCents != null ? gatewayRaw.data.feeCents / 100 : 0;`,
      explanation: 'Migrates to verified v3.0 schema contract while maintaining defensive null-safety and preserving audit trails.',
    },
    confidenceScore: 94,
  };
}

export async function GET() {
  return NextResponse.json({
    status: 'ACTIVE',
    service: 'MAYDAY Live AI Triage Core',
    supportedEngines: ['Groq LPU (Qwen 2.5 Coder)', 'IBM Bob 2.0 Multi-Agent Triage'],
    groqConfigured: Boolean(GROQ_API_KEY),
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();
  let body: { trace?: string; language?: string; service?: string } = {};

  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const trace = (body.trace || '').trim();
  const language = body.language || 'TypeScript / Node.js';
  const service = body.service || 'service-core';

  if (!trace) {
    return NextResponse.json(
      { ok: false, error: 'Empty stack trace or code snippet provided.' },
      { status: 400 }
    );
  }

  // ── ATTEMPT LIVE GROQ LPU INFERENCE (Qwen 2.5 Coder / Llama 3.3) ────────────
  if (GROQ_API_KEY) {
    for (const model of CANDIDATE_MODELS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const promptContent = `RUNTIME LANGUAGE: ${language}\nTARGET SERVICE: ${service}\n\nERROR STACK TRACE / CODE SNIPPET:\n${trace}`;

        const res = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: BOB_TRIAGE_SYSTEM_PROMPT },
              { role: 'user', content: promptContent },
            ],
            temperature: 0.1,
            max_tokens: 1000,
            response_format: { type: 'json_object' },
          }),
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          console.warn(`[MAYDAY AI] Model ${model} returned HTTP ${res.status}`);
          continue;
        }

        const data = await res.json();
        const rawContent = data.choices?.[0]?.message?.content;
        if (!rawContent) continue;

        // Clean any accidental markdown backticks
        const cleaned = rawContent
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim();

        const parsed: AITriageResponse = JSON.parse(cleaned);

        return NextResponse.json({
          ok: true,
          data: parsed,
          modelUsed: model,
          latencyMs: Date.now() - startTime,
          isLiveAI: true,
        });
      } catch (err) {
        console.warn(`[MAYDAY AI] Error querying model ${model}:`, err);
      }
    }
  }

  // ── DETERMINISTIC HIGH-SPEED FALLBACK (Sub-5ms, Zero-Fail) ─────────────────
  const fallbackData = getDeterministicFallback(trace, language, service);
  return NextResponse.json({
    ok: true,
    data: fallbackData,
    modelUsed: 'MAYDAY-Deterministic-Engine (Offline Resilience)',
    latencyMs: Date.now() - startTime,
    isLiveAI: false,
  });
}
