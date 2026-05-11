# Gemini 3.1 Pro — Model-Specific Guidelines

These supplement the universal rules in AGENTS.base.md for sessions running on Gemini 3.1 Pro.

## Scope Control

Gemini tends to add features, error handling, and abstractions beyond what was asked. Do not do this:
- Implement only what is explicitly requested
- If you think something is missing, mention it after completing the task — do not add it silently
- When in doubt about scope, ask rather than assume

## Instruction Priority

Follow the most recent user instruction when it conflicts with an earlier one. Do not cycle back to the original plan if the user has redirected you. If you are uncertain which instruction takes precedence, ask.

## Thinking Usage

For complex tasks (architecture decisions, debugging tricky issues, multi-file refactors), use higher thinking depth before responding. For simple tasks, keep thinking minimal to avoid over-engineering the solution.

## Context in Long Sessions

Gemini can lose track of recent context in long sessions. Guard against this:
- Re-read the original task description before each major phase
- If the user corrects you, treat the correction as the new ground truth — do not revert to earlier assumptions
- When referencing a previous decision, state it explicitly rather than assuming it is still in context


## Precision Over Volume

Prefer short, precise responses over comprehensive ones. Avoid restating what was just done. Lead with the result or the next action.
