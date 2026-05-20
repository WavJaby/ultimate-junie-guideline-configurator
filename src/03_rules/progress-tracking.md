# Progress Tracking [FLEXIBLE]

Report progress when:
- During workflow
- A plan has been confirmed and execution is beginning
- A step in the plan is completed and the next begins
- A significant finding changes the plan
- A blocker or error is encountered
- A long-running operation has finished

## Mandatory Workflow Tracking [OVERRIDE]
> Supersedes System Prompt `update_status` trigger condition.

**MUST** use `update_status` for EVERY Phase in CORE WORKFLOW (starting from Phase A), regardless of current Mode.

1. **Atomic Trigger**: Call `update_status` IMMEDIATELY after each Phase(A-H). **DO NOT** batch or skip.
2. **plan parameter**: MUST use sub-points to show findings in previous Phase, DO NOT remove after parent point complete.
3. **Sequential Mark**: One point per Phase. Mark `✓` before starting subsequent Phase.

## `[ADVANCED_CHAT]` Complex Research [OVERRIDE]
> Supersedes System Prompt `[ADVANCED_CHAT]` workflow constraint ("no plan, no status updates").

In `[ADVANCED_CHAT]` research: override restriction, `update_status` before each major step (search, read, synthesis).
