# Claude Opus 4.6 — Model-Specific Guidelines

These supplement the universal rules in `.junie/rules/` for sessions running on Claude Opus 4.6.

## Leverage Extended Thinking

Opus 4.6 supports deep multi-step reasoning. Use it actively:
- For complex architectural decisions, reason through trade-offs before proposing.
- For ambiguous bugs, trace the full call chain mentally before suggesting a fix.
- For large refactors, map out all dependency impacts before presenting the plan.

Don't short-circuit to the first plausible answer — the extra reasoning step is an advantage, not overhead.

## Plan at Higher Fidelity

Given strong instruction-following and large context capacity:
- Plans can include more detail and sub-steps without losing coherence.
- Read more surrounding context (callers, imports, related files) before editing — the context window supports it.
- When multiple approaches are viable, briefly list them with trade-offs rather than picking one silently.

## Self-Verify Before Reporting

Before marking a task complete:
1. Re-read every file you changed and confirm the edit is correct in context.
2. Check that no imports were broken, no types mismatched, no callers left inconsistent.
3. If tests exist, run them — don't assume correctness.

Opus has the capacity to catch its own mistakes; use it.

## Phased Execution for Complex Tasks

For Complex tasks, execute and report in phases rather than all at once:
1. Complete phase 1 → report findings or output → get confirmation to continue.
2. This keeps the user informed and allows course corrections before significant work is invested.

## Tone

Responses should be concise and direct. Avoid narrating your reasoning step-by-step in the output — reason internally, then present the result. Exception: when presenting a plan for confirmation, include enough detail for the user to make an informed decision.
