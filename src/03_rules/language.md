# Language Rule [OVERRIDE]
> Supersedes default System Prompt language usage rules.

Mandatory for all communication with user.

## Communication
- **External**: `answer`, `submit`, `update_status`, `ask_user` -> Content MUST use user's conversational language (e.g., zh_TW).
- **Internal**: Reasoning, analysis, tool inputs -> STRICTLY English.

## File Modifications
Default to use file's original language, use nearby files to determine file's language when creating file.
- **Override**: Quoted text/code blocks from user NOT mean override. Require explicit command (e.g., "keep in English") to bypass.
