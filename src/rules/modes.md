# Mode Switching Rules

## Each issue_update triggers fresh mode selection [OVERRIDE]

The system default "choose mode once and memorize" applies within a single task execution. When a new `<issue_update>` arrives, it defines a new Effective Issue — re-evaluate and re-select the mode from scratch. Do not carry over the previous mode.

This applies after `submit` as well: the next `<issue_update>` always starts a fresh mode evaluation.

## `[CODE]` → `[ADVANCED_CHAT]` is allowed [OVERRIDE]

The system default forbids switching from `[CODE]` to `[ADVANCED_CHAT]`. This restriction is lifted.

When in `[CODE]` mode and a new `<issue_update>` is a question or request for explanation (not a code action):
1. Switch to `[ADVANCED_CHAT]`
2. Answer using the `answer` tool — do NOT use `submit`

## When to switch modes [FLEXIBLE]

| Situation | Switch to |
|-----------|-----------|
| User asks a question, explanation, or analysis without requesting code changes | `[ADVANCED_CHAT]` |
| User asks if something can/should be modified (hypothetical proposal) | `[ADVANCED_CHAT]` |
| User **explicitly specifies** what to modify, where to modify it, and the goal is clear | `[CODE]` |
| User asks to modify code but the target or goal is vague/unclear | `[ADVANCED_CHAT]` |
| Follow-up question after a `[CODE]` task | `[ADVANCED_CHAT]` |

### Clarification for Vague Instructions

When you receive a vague instruction to modify code and you need clarification, and the options can be presented simply and concretely (e.g., as multiple-choice questions), use the `ask_user` tool directly to provide the options for the user to choose from, rather than just giving an open-ended answer.

## Direction

Switching is bidirectional. Each new `<issue_update>` defines what mode is appropriate — not what was used in the previous turn.

## Mode Classification Override [PROTECTED|OVERRIDE]

Supersedes Decision Tree Items 1 and 4 in the system prompt.

### New Features and Behaviors → `[CODE]`

Any `<issue_update>` that adds new functionality, behavior, constraint, validation, or configurable value is **never** "truly trivial" regardless of message length. Always classify as `[CODE]`. Never `[FAST_CODE]`.

### Hypothetical Modifications → `[ADVANCED_CHAT]`

Questions like "Can we modify it like this?", "Should we change X?", or "What if we do Y?" are exploratory inquiries, not implementation commands. Always classify these as `[ADVANCED_CHAT]`. Discuss feasibility, trade-offs, and intent with the user first. Do not switch to `[CODE]` until the user explicitly confirms they want the change implemented.

### Project-Specific Questions → `[ADVANCED_CHAT]`

Any question about specific project code, existing behavior, implementation details, or architecture — even if short — classifies as `[ADVANCED_CHAT]`, not `[CHAT]`. Read the relevant project files before answering. `[CHAT]` is reserved for greetings and questions with no project relevance.
