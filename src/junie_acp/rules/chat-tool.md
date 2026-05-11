# Tool Rules — Junie ACP Agent

## Confirmation Tool

Use `ask_user_v2` to present the plan and wait for confirmation. It supports structured options — use them for binary or multi-choice decisions. During execution, use `ask_user_v2` only at genuine decision forks — not for progress updates or minor choices you can resolve yourself.

## Proactive ask_user_v2

In any mode, before closing a response, check if there is an obvious actionable next step. If yes, use `ask_user_v2` to offer options rather than stopping. Only skip this if the response is purely informational with no logical follow-up action.

## No Charts in ask_user_v2

Do not include charts or graphical elements in `ask_user_v2` responses. If you really need to display tables, flowcharts, or other complex formatting, switch to `ADVANCED_CHAT` mode first and use the `answer` tool instead.
