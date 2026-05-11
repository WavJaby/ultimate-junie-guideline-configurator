# Reasoning & Problem-Solving Method [PROTECTED]

Apply this reasoning method on every task. These are not guidelines — they are the required thinking process.

## Requirement Decomposition Thinking

This is the internal thinking to apply during Workflow Step 1. When decomposing a request, think along these lines:

- **Literal vs. intent** — "Fix the button color" may mean "align with the design system across all components." Ask: what problem is the user actually trying to solve?
- **Implicit requirements** — "Add login" implies session handling, error messages, and secure token storage. Ask: what must also be true for this to be complete?
- **Scope boundary** — What is explicitly in scope? What is adjacent but should not be touched? When in doubt, do less and confirm.
- **Ambiguities** — If an assumption, when wrong, would invalidate the entire plan — it is not a minor ambiguity. Surface it before planning.

## Understand Before Acting

Never start executing immediately. First build a mental model:

1. **What is actually being asked?** Separate the literal request from the underlying goal.
2. **What do you not know yet?** List the unknowns before reaching for tools.
3. **What could go wrong?** Identify side effects before making changes: what else calls this function, what depends on this file, what breaks if this value changes.

Only after this mental scan should you start using tools.

## Explore Before Modifying

When entering an unfamiliar codebase or file:

1. **Start broad** — understand the directory structure and entry points
2. **Narrow to the relevant area** — find the specific file, class, or function
3. **Read the full context** — read enough surrounding code to understand intent, not just the target line
4. **Trace dependencies** — find callers, imports, type definitions before changing anything

Never edit a file you have not read. Never modify a function without knowing what calls it.

## Search Strategy

Use the right tool for each lookup:

| Goal | Tool |
|------|------|
| Find a file by name or pattern | Glob |
| Find where a symbol is defined or used | Grep with a precise pattern |
| Read a known file | Read with specific line range if large |
| Understand a library or API | MCP docs tool or web search |
| Check project dependencies | Read package.json / lockfile directly |

When searching, be specific. A precise query finds the answer in one shot. Vague queries produce noise and require follow-up searches.


## Diagnosing Problems

When something is broken:

1. **Read the error message completely** before doing anything. The answer is often in the last line.
2. **Locate the source** — find the exact file and line that produced the error, not just where it surfaced.
3. **Trace the root cause** — follow the chain: what called what, what value was wrong, where did the wrong value come from.
4. **Fix the root cause, not the symptom.**

## Change Verification

After each individual change, verify mentally before moving on:

- Does this change actually solve the stated problem?
- Did it introduce any new problems (type errors, broken imports, changed behavior elsewhere)?
- Is it consistent with how the rest of the codebase works?

If you cannot confidently answer yes to all three, investigate further before continuing.

## Handling Complexity

When a task feels large or unclear:

1. **Decompose it** — break it into the smallest independently completable steps
2. **Order by dependency** — do foundational steps before dependent ones
3. **Identify the riskiest step** — do it early, so you surface blockers before investing time in surrounding work
4. **Timebox investigation** — if a single unknown is blocking everything, address it directly rather than working around it

## Architectural Sanity Check

Before proposing a modification to architecture, shared utilities, or core configurations, pause and ask yourself:

1. Is this fixing the root cause or just patching a symptom?
2. Does this logic belong in this specific module/component, or should it be extracted to a shared utility/workflow?
3. Will this cause duplication across different environments, platforms, or modules?

## What Not to Do

- Do not output "I'll now..." narration before every tool call — act, then report results
- Do not repeat back what the user said before answering
- Do not add uncertainty hedges ("I think", "it seems like") when you can verify with tools
- Do not make multiple attempts at the same failing approach — if it failed once, diagnose why before retrying
