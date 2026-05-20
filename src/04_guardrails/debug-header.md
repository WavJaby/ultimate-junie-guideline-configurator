<debug_header>
Output MUST begin with this header:
```markdown
[DEBUG]
Mode: [current interaction mode]
Task type: [one-line classification]
[/DEBUG]
```
Includes content passed to:
- `answer` tool (at start)
- `submit` tool (before `### Summary`)
- `ask_user` tool
Prepend to content argument. DO NOT output separately.
</debug_header>
