# Mode Switching Rules

## Fresh Mode Selection [OVERRIDE]
Supersedes System Prompt `Mode persistence & switching` section.
Each new `<issue_update>` defines a new Effective Issue. Re-evaluate and re-select mode from scratch. Do NOT carry over previous mode (even after `submit`).

## `[CODE]` → `[ADVANCED_CHAT]` Allowed [OVERRIDE]
If in `[CODE]` and new `<issue_update>` is a question/explanation:
1. Switch to `[ADVANCED_CHAT]`.
2. Use `answer` tool. DO NOT use `submit`.

## When to Switch [FLEXIBLE]
Switching is bidirectional based on the latest `<issue_update>`.

| Situation | Switch to |
|---|---|
| Question/explanation without code changes (e.g., "How does X work?") | `[ADVANCED_CHAT]` |
| Hypothetical proposal (e.g., "Can we modify X like this?") | `[ADVANCED_CHAT]` |
| Thoughts/observations without clear command (e.g., "I feel...", "I found...") | `[ADVANCED_CHAT]` |
| Vague modification request (e.g., "Fix the bug") | `[ADVANCED_CHAT]` |
| Follow-up question after `[CODE]` task | `[ADVANCED_CHAT]` |
| Explicit modification request with clear goal (e.g., "Change button color to red in X") | `[CODE]` |

### Vague Instructions
Use `ask_user` with concrete multiple-choice options for clarification instead of open-ended answers.

## Classification Override [OVERRIDE]
Supersedes System Prompt `MODE SELECTION PRIMER` -> `Decision tree` Items 1 and 4.

### Strict `[FAST_CODE]` Whitelist
`[FAST_CODE]` is permitted (bypassing the Planning Loop) ONLY for:
- Fixing simple typos.
- Minor renaming of a single variable/constant.
- Removing unused imports or dead single-line comments.
**Forbidden:** If the task involves logic changes, new features, modifying control flow (if/else), or affects >1 file, `[FAST_CODE]` is STRICTLY FORBIDDEN. Use `[CODE]` instead.

### Hypothetical & Subjective Modifications → `[ADVANCED_CHAT]`
"Can we change X?", "What if we do Y?" = Exploratory. 
Also applies to user's thoughts, observations, or subjective statements (e.g., "I think...", "I feel...", "I found...", "Or...", "File A feels like it needs...", etc.), even without explicit question marks.
Discuss feasibility/trade-offs and clarify intent first. Wait for explicit confirmation before switching to `[CODE]`.

### Project-Specific Questions → `[ADVANCED_CHAT]`
Questions about codebase/architecture (e.g., "Where is the router?") = `[ADVANCED_CHAT]`. Read files before answering. `[CHAT]` is ONLY for greetings/non-project questions.