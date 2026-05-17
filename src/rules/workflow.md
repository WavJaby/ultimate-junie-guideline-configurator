# Workflow Rules

## Part 1: Universal Analysis (All Modes)
When receiving ANY `<issue_description>` or `<issue_update>`, ALWAYS execute these steps first to gather context, regardless of the chosen interaction mode:

### Phase A: Context Gathering (Read Codebase)
Read ALL relevant files. NEVER modify or answer about an unread file. (If returning from Phase E, read new targets).

### Phase B: Research Scan
Identify 3rd-party libraries, APIs, or services.
- **New Requirement (generic/complex logic):** MUST trigger Research Skill first to find existing libraries.
- **Found existing Library:** PAUSE planning. `ask_user` if we should install it. DO NOT reinvent the wheel.
- **Known dependency:** Look up via Context7 (fallback: web search) before proceeding.
- **Not found / None needed:** Proceed.
*NO training data for 3rd-party APIs.*

*(After Phase B, the final mode is decided based on Mode Classification Rules. If entering `[ADVANCED_CHAT]`, `[CHAT]`, or `[RUN_VERIFY]` without modifications, proceed to output. If modifications are required -> Enter Part 2.)*

## Part 2: Preparation and Planning Loop [OVERRIDE]
Supersedes `[CODE]` Step 1 (hidden plan). Complete before editing any code or configuration.
*(Note: If the task perfectly matches the strict `[FAST_CODE]` whitelist, you may skip Part 2 entirely and execute directly.)*

### The Modification Workflow Map
```mermaid
graph TD
    Start([Part 1 Finished: Mode = CODE / SETUP]) --> PhaseC
    subgraph PrepLoop [Preparation and Planning Loop]
        PhaseC{C: Clarity Gate}
        PhaseC -- Missing Info --> AskGate[ask_user: Resolve]
        AskGate -. Wait .-> PhaseA[Return to Part 1]
        PhaseC -- Clear --> PhaseD[D: Present Plan]
        PhaseD -- Rejected/Changes --> Revise[E: Revision Loop]
        Revise -. Gather new .-> PhaseA
    end
    PhaseD -- Approved --> PhaseF[F: Execution Handoff]
    PhaseF --> Exec([Execute Steps 2-7 Autonomously])
```

### Phase C: Clarity Gate
STOP and `ask_user` if:
- **Missing Requirements:** DO NOT assume values.
- **Multiple Approaches:** Present options.
- **Infeasibility:** Conflicts with codebase.

### Phase D: Plan Presentation (Mandatory Planning Skill)
**FORCE TRIGGER Planning Skill here, regardless of modification size.** Wait for explicit approval before execution.
- **Standard:** Use `ask_user` to present plan. Even for 1-line changes, present what will change.
- **Large/Complex (multi-phase/code blocks):** Switch to `[ADVANCED_CHAT]`, use `answer` tool, and explicitly ask for approval. If approved -> `[CODE]` Phase F. If changes -> Phase E.

### Phase E: Revision Loop
If user requests changes/adds constraints:
**NEVER** treat new requirements as implicit approval to proceed.
1. Identify missing context.
2. Loop back to Part 1 (Phase A/B) to read/research.
3. Update plan & return to Phase D.
4. Repeat until explicit approval.

### Phase F: Execution Handoff
**ONLY after explicit confirmation:** Use `update_status` to publish plan.
Execute `[CODE]` Steps 2–7 autonomously.

## Making Changes & Refactoring [OVERRIDE]
Supersedes `[CODE]` Step 4 (Implement minimal changes).
- **Prefer DRY:** Refactor duplicated logic to shared utility BEFORE adding more `if/else`.
- **One concern at a time:** Fix one problem completely before touching another.
- **Match conventions:** (Unless conventions duplicate heavily, then propose refactor).