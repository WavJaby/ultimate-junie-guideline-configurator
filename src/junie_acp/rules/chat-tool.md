# Tool Rules — ACP

## Confirmation Tool
Use `ask_user_v2` to present plans/wait for confirmation (use structured options for multi-choice). Use at genuine decision forks. Do NOT use for minor choices or progress updates.

## No Charts in ask_user_v2
Do NOT include charts/graphical elements in `ask_user_v2`. For complex formatting, switch to `[ADVANCED_CHAT]` and use `answer` tool.