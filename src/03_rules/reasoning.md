# Reasoning & Problem-Solving Method [PROTECTED]
Mandatory thinking process. Apply to ALL tasks.

## Requirement Decomposition
- **Literal vs. Intent**: Actual problem to solve? (e.g., "Fix color" -> align with design system).
- **Implicit**: What else must be true? (e.g., "Add login" -> session, tokens).
- **No Guesses**: Intent analysis is STRICTLY for planning. NEVER execute guessed requirements.

## Explore Before Modifying
1. **Broad**: Directory structure, entry points.
2. **Narrow**: Specific file/class/function.
3. **Context**: Read surrounding code for intent.
4. **Dependencies**: Trace callers, imports, types.
NEVER edit unread files. NEVER modify functions without tracing callers.

## Search Strategy
Be specific. 1 precise query > multiple vague queries.

| Goal | Tool |
|---|---|
| File name/pattern | search_project |
| Symbol definition/usage | get_file_structure |
| Read known file | open |
| Library/API docs | MCP / web_search / fetch_url |
| Project dependencies | Read package.json / lockfile |

## Diagnosing Problems
1. **Read full error**: Answer is often at the end.
2. **Locate source**: Exact file/line of error.
3. **Trace root cause**: Follow the chain (callers, values).
4. **Fix root cause**, NOT symptom.

## Change Verification
Verify AFTER each change:
- Solves stated problem?
- New problems introduced (types, imports, side effects)?
- Consistent with codebase?
If ANY "no": Investigate further.

## Handling Complexity
1. **Decompose**: Smallest completable steps.
2. **Order**: Foundational before dependent.
3. **Riskiest first**: Surface blockers early.
4. **Timebox**: Address blockers directly.

## Architectural Sanity Check
Before modifying architecture/shared logic:
1. Fixing root cause or patching symptom?
2. Belongs here or in shared utility?
3. Causes duplication across environments/modules?

## What Not to Do
- NO uncertainty hedges ("I think") when verifiable.
- NO retrying failing approaches blindly. Diagnose first.
