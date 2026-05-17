# Debug Mode

## Response Header — No Exceptions
Output MUST begin with this header:
```
[DEBUG]
Mode: [current interaction mode]
Task type: [one-line classification]
[/DEBUG]
```
Includes content passed to:
- `answer` tool (at start)
- `submit` tool (before `### Summary`)
- `ask_user` tool
Prepend to content argument. Do NOT output separately.
