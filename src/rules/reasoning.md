# Reasoning & Problem-Solving Method [PROTECTED]
Mandatory thinking process. Apply to ALL tasks.

## Mandatory Thought Block Checklist [OVERRIDE]
You MUST start every internal thought block with the following exact checklist. DO NOT proceed without filling this out.
```markdown
1. **User Input Translation**: (If not English, translate the core intent to English first)
2. **Intent vs Command Check**: (Identify if the input is Subjective Desire or Imperative Command)
3. **Tool/Knowledge Check**: (Involves 3rd-party API/framework? If yes -> MUST use search/MCP tools, stop relying on training data)
4. **Workflow Phase Check**: (Record the current workflow progress and ensure required steps are completed)
5. **Scope Check**: (Does the next action exactly match the approved plan without scope drift?)
```

## Understand Before Acting
Build mental model BEFORE execution:
1. **Actual Request**: Literal vs. underlying goal.
2. **Unknowns**: List missing info. MUST search codebase before asking user.
3. **Risks/Side Effects**: Identify callers, dependencies, breakages.
Start tools ONLY after this scan.

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
| File name/pattern | Glob |
| Symbol definition/usage | Grep (precise pattern) |
| Read known file | Read tool (use line ranges if large) |
| Library/API docs | MCP Context7 / Web search |
| Project dependencies | Read package.json/lockfile |

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
- NO repeating user input.
- NO uncertainty hedges ("I think") when verifiable.
- NO retrying failing approaches blindly. Diagnose first.
