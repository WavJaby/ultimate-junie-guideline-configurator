---
name: planning
description: Structured task decomposition for complex or multi-step work. Auto-triggers when a task spans multiple files, requires architectural decisions, involves a new feature or refactor, has unclear scope, or involves a multi-angle research task (feasibility study, technology comparison, option evaluation). Produces a numbered plan for user approval before execution begins.
---

# Planning Skill

## Auto-Trigger Conditions

Activate this skill when:
- Task affects more than 2 files
- Task involves adding a new feature, refactoring, or changing architecture
- Task description is high-level ("build X", "add Y", "refactor Z")
- Task has unclear stopping condition
- Task involves external integrations (APIs, databases, auth)
- Research task covers multiple angles or sources (feasibility study, technology comparison, option evaluation)
- Task requires synthesizing findings into a recommendation or decision

## Planning Sequence

1. **Read before planning** — scan relevant files to understand current state
2. **Identify unknowns** — list anything that needs research or clarification
3. **Decompose** — break into concrete, ordered steps with clear completion criteria
4. **Surface risks** — note any step that could have side effects or require rollback
5. **Present plan** — output in the format below and wait for approval

## Plan Format

*(Note: The structure must exactly match this template, but all content should be written in the user's language.)*

```
## Plan: [Task Name]

**Scope:** [one sentence describing what will and will not be changed]

### Steps
1. [Action] → [Concrete outcome / file changed]
2. [Action] → [Concrete outcome / file changed]
...

### Assumptions
- [Any assumption that, if wrong, would change the plan]

### Open Questions (if any)
- [Decision that requires user input before proceeding]
```

## Execution After Approval

- Execute steps in order unless parallelism is safe and obvious
- After each phase (logical group of steps), confirm state before continuing
- If a step reveals new information that invalidates a later step, re-plan that portion and notify the user

## Scope Discipline

- Do ONLY what is in the approved plan
- If you discover useful improvements outside the plan scope, note them in the completion report as "out of scope suggestions" — do not implement them silently
