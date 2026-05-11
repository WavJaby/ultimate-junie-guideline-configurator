# Tool Usage Rules

These are mandatory rules. Using tools is not optional when the trigger conditions are met.

## Thinking Is Not Research [PROTECTED]

Using extended thinking or reasoning harder is NOT a substitute for using tools. If a question requires current, external, or verifiable information, thinking longer about training data still produces unverified training data. Use a tool.

## Web Search Is Not Enough [PROTECTED]

Web search returns summaries and snippets. It is **not** a substitute for authoritative source data when precision matters. Recognize when to go deeper:

| Web search is sufficient | Must use precise source instead |
|--------------------------|----------------------------------|
| "Does library X support Y?" (yes/no) | Exact method signature, parameter names, return type |
| General ecosystem overview | Correct usage for a specific version |
| Community opinions, tradeoffs | Configuration options and their defaults |
| News, release announcements | Error codes and their meanings |

If you would need to write code that calls a specific API, you need the precise source — not a search snippet.

## Mandatory Tool Triggers [PROTECTED]

The following situations require tool use. No exceptions — do not answer from training knowledge alone.

| Situation | Required Tool |
|-----------|--------------|
| Library/framework API usage, method signatures, config options — for third-party libraries | **Context7 first**, fall back to web search only if not in Context7 |
| Version-specific behavior or compatibility | Context7 or package registry — not training knowledge |
| Basic built-in language syntax (e.g. `Array.push`, `for` loop) with no version specificity | Training knowledge acceptable — no tool required |
| External service API (endpoints, auth, request format) | Web search → official docs page (fetch the actual docs, not just the snippet) |
| Any task phrased as "research", "investigate", "explore", "assess feasibility" | Web search |
| Idea/approach validation — what exists, tradeoffs, state of the art | Web search |
| File content referenced in a task | File read tool |
| Error message from a dependency you don't immediately recognize | Web search |
| "Latest", "current", "recommended", "best practice" for external tools | Web search |

When in doubt, verify with a tool rather than guessing.

## Tool Selection Order [FLEXIBLE]

Apply in order — stop at the first tool that can answer precisely:

1. **Context7** — any question about a specific library's API or behavior
2. **File read** — any question about the current codebase; read before modifying
3. **Web search + fetch** — time-sensitive info, non-library external services, community knowledge; if a snippet isn't enough, fetch the linked page
4. **Chrome DevTools MCP** — anything requiring live browser state or UI verification
5. **Training knowledge** — only for stable, version-independent concepts (algorithms, language syntax)

## Batching [FLEXIBLE]

- Read all files needed for a task before writing any of them
- Prefer one precise query over multiple vague ones
- Fetch docs from multiple sources in parallel when needed

## MCP Usage [PROTECTED]

If a connected MCP server provides relevant capability, use it without waiting for the user to suggest it.

### Deciding Which Tool to Use [FLEXIBLE]

Apply the first row that matches. Do not skip to a later row.

| Condition | Tool |
|-----------|------|
| Question about a specific library's API, method, config, or version behavior | Context7; fall back to web search only if not in Context7 |
| Question about the current codebase | File read |
| URL is localhost or a dev server | Chrome DevTools (web fetch cannot reach it) |
| URL leads to a SPA, JS-rendered, or interactive page | Chrome DevTools (fetch returns empty shell) |
| URL leads to a static, server-rendered page | Web fetch |
| No URL yet — need to find one | Web search, then re-apply this table |
| Stable concept unrelated to any specific version or external system | Training knowledge |

**Key rule:** If the page requires JavaScript to render, or you need runtime state (console logs, network requests, computed styles, interactive elements), use Chrome DevTools — web fetch will not give you what you need.

### Available MCPs [FLEXIBLE]

**Context7** (`resolve-library-id`, `get-library-docs`)
- Any library API, method signature, config option, or version-specific behavior
- Set max tokens to 5000 (narrow topics: 2000)
- Always prefer over training knowledge for third-party libraries

**Chrome DevTools MCP** (`navigate_page`, `take_screenshot`, `evaluate_script`, `get_console_message`, `list_network_requests`, etc.)
- localhost / dev server URLs
- JS-rendered pages (SPA, React, Vue, Angular, Docusaurus, Swagger UI)
- Console errors, network traffic, computed CSS, interactive state
- Self-Verification for UI tasks — do not describe what it should look like, open and verify directly
- Lighthouse audits
