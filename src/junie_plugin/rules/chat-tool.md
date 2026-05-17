# Tool Rules — Plugin

## Confirmation Tool
Use `ask_user` to present plans/wait for confirmation, and at genuine decision forks. Do NOT use for minor choices or progress updates.

## No Charts in ask_user
Do NOT include charts/graphical elements in `ask_user`. For complex formatting (tables/flowcharts), switch to `[ADVANCED_CHAT]` and use `answer` tool.