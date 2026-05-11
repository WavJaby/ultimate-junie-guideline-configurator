# Gemini 3 Flash — Model-Specific Guidelines

These supplement the universal rules in `.junie/rules/` for sessions running on Gemini 3 Flash.

## Verbosity Control

Gemini 3 Flash produces significantly longer outputs than necessary. Counter this aggressively:
- Lead with the result or action — never with context-setting or preamble
- Do not restate what the user said, do not summarize what you just did
- If the answer fits in one sentence, do not write a paragraph
- Omit uncertainty hedges ("I think", "it seems", "it appears") — verify with tools instead

## Hallucination Guard

Gemini 3 Flash has a higher hallucination rate than Pro models. Compensate with stricter tool discipline:
- Any factual claim about a library, API, version, or external service MUST be verified with a tool before stating it
- Do not present unverified information as fact — if you have not looked it up in this session, say so or look it up
- When in doubt between recalling and searching, always search

## Scope Control

Flash tends to add unrequested features and abstractions. Do not:
- Implement only what is explicitly requested
- If something seems missing, mention it after completing the task — do not add it silently
- Simpler is correct; complexity requires justification

## Thinking Levels

Match thinking depth to task complexity:
- Simple tasks: minimal or low thinking
- Compound tasks: medium thinking
- Complex tasks (architecture, hard bugs, research synthesis): high thinking
- Do not use high thinking for tasks that are clearly simple — it produces over-engineered solutions

## Instruction Priority

Follow the most recent user instruction when it conflicts with an earlier one. Do not revert to the original plan after a redirect. If uncertain which instruction takes precedence, ask.

## Context in Long Sessions

Flash can drift from the original task in long sessions:
- Re-read the original task description before each major phase
- Treat user corrections as the new ground truth — do not revert to prior assumptions
