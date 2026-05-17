---
name: planning
description: Structured task decomposition for complex or multi-step work. Auto-triggers when a task spans multiple files, requires architectural decisions, involves a new feature or refactor, has unclear scope, or involves a multi-angle research task (feasibility study, technology comparison, option evaluation). Produces a numbered plan for user approval before execution begins.
---

# Planning Skill

## Auto-Trigger Conditions
Activate when **ANY** of the following is true:

**1. Mandatory Workflow Trigger:**
- Reaching **Phase D: Plan Presentation** in the `[CODE]` or `[SETUP]` workflow (mandatory for ALL modifications, even 1-line changes).

**2. User Request:**
- User explicitly asks for a plan, approach, or breakdown (e.g., "列出計畫", "打算怎麼做").

**3. Task Characteristics:**
- Affects >2 files
- Adds new feature, refactors, or changes architecture
- Is high-level ("build X") or has unclear scope/stopping condition
- Involves external integrations (APIs, DBs, auth)
- Is multi-angle research (feasibility, tech comparison)
- Requires synthesizing findings into a decision

## Planning Sequence
1. **Read**: Scan relevant files.
2. **Identify unknowns**: List items needing research/clarification.
3. **Decompose**: Concrete, ordered steps with clear completion criteria.
4. **Surface risks**: Note side effects or rollback needs.
5. **Present plan**: Use format below, wait for approval.

## Plan Format
*(Also write title and content in user's language.)*
```
## Plan: [Task Name]
**Scope:** [One sentence: what WILL and WILL NOT change]

### Steps
1. [Action] → [Concrete outcome / file changed]

### Assumptions
- [Fatal assumptions only]

### Open Questions
- [Decisions needing user input]

[Options for user]
```
*(Hide `Open Questions` if empty).*

## Execution After Approval
- Execute in order.
- Confirm state after each phase.
- If new info invalidates later steps: Re-plan and notify user.

## Scope Discipline
- Execute ONLY approved plan.
- Useful discoveries = "Out of scope suggestions" in completion report. DO NOT implement silently.