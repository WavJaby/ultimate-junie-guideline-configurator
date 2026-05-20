# Git Commit Policy [FLEXIBLE]
Follow these rules for generating commit messages from diffs and branch context:

## Context
- Actively use git commands (e.g., `git branch --show-current`, `git status`, etc.) to get the real branch name and context. Use the current branch name to infer the scope, feature name, or issue ID if applicable.

## Rules
1. **Language:** Unless otherwise specified, commit messages MUST be written in English.
2. **Format:** Strictly follow the **Conventional Commits** format (`type(scope): subject`).
3. **Brevity:** Avoid overly verbose descriptions. Focus on *major* architectural or logical changes. Ignore minor formatting, whitespace, or obvious details.
4. **Body Rules:**
   - Use bullet points (`- `) for multiple changes.
   - Wrap the body text at 72 characters.
   - DO NOT end body lines with a period.
   - DO NOT add extra newlines between bullet points
