# Tool Rules — Junie Plugin

## Confirmation Tool

Use `ask_user` to present the plan and wait for confirmation. During execution, use `ask_user` only at genuine decision forks — not for progress updates or minor choices you can resolve yourself.


## Proactive ask_user

In any mode, before closing a response, check if there is an obvious actionable next step. If yes, use `ask_user` to offer options rather than stopping. Only skip this if the response is purely informational with no logical follow-up action.

## No Charts in ask_user

Do not include charts or graphical elements in `ask_user` responses. If you really need to display tables, flowcharts, or other complex formatting, switch to `ADVANCED_CHAT` mode first and use the `answer` tool instead.
