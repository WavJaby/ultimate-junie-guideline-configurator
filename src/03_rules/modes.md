# Mode Switching Rules [PROTECTED]

## Delayed MODE SELECTION [OVERRIDE]
> Supersedes System Prompt `MODE SELECTION PRIMER`: "At the very beginning of the first step, choose the interaction mode once...".
- **Initial State**: Mode is explicitly `[UNSELECTED]` at the very beginning and after `<issue_update>`.
- **Selection Timing**: DO NOT evaluate or choose a mode until you reach **Phase E: Mode Selection** in the workflow.

## Fresh MODE SELECTION [OVERRIDE]
> Supersedes System Prompt `MODE SELECTION PRIMER`: "no mode re-evaluation on each step".

Each `<issue_update>` can be a new Effective Issue or just a follow-up. Re-evaluate and re-select mode from scratch. DO NOT carry over previous mode (even after `submit`).

## `[CODE]` → `[ADVANCED_CHAT]` Allowed [OVERRIDE]
If in `[CODE]` and new `<issue_update>` is a question/explanation:
1. Switch to `[ADVANCED_CHAT]`.
2. Use `answer` tool. DO NOT use `submit`.

## Classification Rule [OVERRIDE]
> Supersedes System Prompt `MODE SELECTION PRIMER`: `Decision tree` Items 1 and 4.

### Strict `[FAST_CODE]` Whitelist
`[FAST_CODE]` is permitted (bypassing the Planning Loop) ONLY for:
- Fixing simple typos.
- Minor renaming of a single variable/constant.
- Removing unused imports or dead single-line comments.
**Forbidden:** `[FAST_CODE]` is STRICTLY FORBIDDEN for logic changes, new features, control flow modifications, >1 file edits, or guessing intent. Use `[ADVANCED_CHAT]` (for planning/clarification) instead.

### Intent vs Command (`[CODE]` vs `[ADVANCED_CHAT]`)
Switching depends on BOTH user phrasing AND the outcome of Phase A/B/C/D.

| Trigger / User Input | Phase A/B/C/D Outcome | Switch To | Action |
|---|---|---|---|
| **Imperative Command** | Clear & Unambiguous | `[CODE]` | Trigger Planning Skill in Part 2. |
| **Imperative Command** | Ambiguous / Unresolved | `[ADVANCED_CHAT]` | Sync info, clarify missing context. |
| **Subjective Desire** | Any | `[ADVANCED_CHAT]` | Clarify intent. Wait for command. |
| **Hypothetical / Q&A**| Any | `[ADVANCED_CHAT]` | Discuss or answer. Wait for command. |

- **Bad**: Treating "I want to move X" as an explicit command -> `[CODE]`.
- **Good**: Treating "I want to move X" as intent, analyzing feasibility, and waiting for "Do it" -> `[ADVANCED_CHAT]`.

### Execution Gate [PROTECTED]
- **Vague Requirements:** If Phase A/B/C/D cannot determine the exact scope or targets, default to `[ADVANCED_CHAT]` regardless of phrasing.
- **Implicit Intent:** If user expresses a goal but does NOT use an imperative verb, default to `[ADVANCED_CHAT]`. Wait for confirmation ("Yes", "Do it") before switching to `[CODE]`.
