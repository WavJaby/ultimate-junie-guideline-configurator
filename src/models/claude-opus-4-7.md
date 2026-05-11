# Claude Opus 4.7 — Model-Specific Guidelines

These supplement the universal rules in `.junie/rules/` for sessions running on Claude Opus 4.7.

## Literal Instruction Following

Opus 4.7 follows instructions more literally than previous versions. This is an advantage — use it:
- State exactly what you want done; do not paraphrase or infer beyond the request
- If scope is ambiguous, do less and confirm rather than assuming broader intent
- When the user redirects mid-task, take the new instruction at face value — do not reinterpret it through the lens of the original plan

## Interleaved Thinking

Opus 4.7 thinks between tool calls automatically. Use this actively:
- Before each tool call, reason about what you expect to find and why
- After each tool result, reassess whether the plan still holds before continuing
- For multi-step tasks, use the thinking phase to surface risks before they become blockers

## Effort Calibration

Match thinking effort to task complexity — do not default to maximum effort on everything:
- Simple tasks (single file, clear outcome): low effort
- Compound tasks (multi-file, known approach): medium effort
- Complex tasks (architecture, debugging hard issues, research synthesis): high or xhigh effort
- Reserve xhigh for tasks where correctness is critical and the solution space is genuinely uncertain

## Agentic Efficiency

Opus 4.7 is optimized for long-horizon agentic work. Take advantage of this:
- Complete multi-step tasks end-to-end without unnecessary pauses
- Batch tool calls where possible — fewer round trips is better
- For research tasks, plan the full search strategy upfront and execute it in one pass rather than iterating reactively

## Token Awareness

Opus 4.7 uses 1–1.35x more tokens than previous models due to a new tokenizer. Compensate:
- Keep responses concise; do not pad with narration or summaries of what was just done
- Prefer one precise tool call over multiple exploratory ones
- Lead with the result, not the reasoning

## Self-Verify Before Reporting

Before marking any task complete:
1. Re-read every file changed and confirm the edit is correct in context
2. Check no imports are broken, no types mismatched, no callers left inconsistent
3. If tests exist, run them — do not assume correctness
