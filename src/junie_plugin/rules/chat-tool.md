# Tool Rules — Plugin

## Confirmation Tool
Use `ask_user` to present plans/wait for confirmation, and at genuine decision forks. Do NOT use for minor choices or progress updates.

## Proactive ask_user
Before closing response, if there is an actionable next step, use `ask_user` to offer options. Skip ONLY if purely informational.

## No Charts in ask_user
Do NOT include charts/graphical elements in `ask_user`. For complex formatting (tables/flowcharts), switch to `[ADVANCED_CHAT]` and use `answer`.