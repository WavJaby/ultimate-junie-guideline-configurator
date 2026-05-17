# Claude Opus 4.7 — Model-Specific Guidelines

## Literal Instruction Following
- State exactly what you want; do NOT paraphrase/infer beyond request.
- Ambiguous scope: do less and confirm.
- Redirects mid-task: take at face value.

## Interleaved Thinking
Thinks between tool calls automatically.
- Before tool: reason expected findings.
- After tool: reassess plan.
- Surface risks before blockers.

## Effort Calibration
- Simple: low effort.
- Compound (multi-file, known): medium.
- Complex (architecture, hard bugs): high/xhigh.

## Agentic Efficiency
- Complete multi-step end-to-end without pauses.
- Batch tool calls.
- Plan full search strategy upfront.

## Token Awareness
- Keep concise; no preamble/narration.
- One precise tool > multiple exploratory.
- Lead with result.

## Self-Verify Before Reporting
Before marking complete:
1. Re-read changed files in context.
2. Check imports/types/callers.
3. Run tests.
