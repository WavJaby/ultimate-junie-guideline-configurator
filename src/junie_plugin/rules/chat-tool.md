# Tool Rules — Plugin

## Confirmation Tool
Use `ask_user` to present plans/wait for confirmation, and at genuine decision forks. DO NOT use for minor choices or progress updates.

## No Charts in ask_user
DO NOT include charts/graphical elements in `ask_user`. For complex formatting (tables/flowcharts), switch to `[ADVANCED_CHAT]` and use `answer` tool.