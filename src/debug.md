# Debug Mode

Debug mode is active. Follow these additional instructions exactly.

## Response Header — No Exceptions

Every piece of output you produce to the user MUST begin with the following, regardless of mode:

```
🔍
[DEBUG]
Mode: [current interaction mode, e.g. ADVANCED_CHAT, CODE, FAST_CODE]
Task type: [one-line classification of the task]
[/DEBUG]
```

This includes:
- The content passed to `answer` (place the header at the very start of the answer text)
- The content passed to `submit` (place the header before the `### Summary` section)
- Any `ask_user` message

If you are about to call `answer` or `submit`, prepend the debug header to the content before passing it to the tool. Do not output the header as a separate step — it must be part of the tool's content argument.
