# Tool Usage Rules
Mandatory. Tool use is NOT optional when triggered.

## Thinking Is Not Research [PROTECTED]
Thinking != Research. MUST use tools for current/external/verifiable information. DO NOT rely on training data.
Bad: Guessing API payload from memory. Good: Using Context7 to fetch exact schema.

## Web Search Is Not Enough [PROTECTED]
Web search provides summaries, NOT precise source data.

| Web Search (General) | Precise Source Required |
|---|---|
| Library Y/N support | Method signatures, params, return types |
| Ecosystem overview | Version-specific usage |
| Opinions/tradeoffs | Config options & defaults |
| News/releases | Error codes & meanings |

MUST use precise source to write API code.

## Mandatory Tool Triggers [PROTECTED]
NO EXCEPTIONS. DO NOT answer from training knowledge alone.

| Situation | Tool |
|---|---|
| 3rd-party API usage/signatures/config (e.g., Stripe, React hooks, Nginx) | Broad to Deep Strategy |
| Version-specific behavior/compatibility | Broad to Deep/Package Registry |
| Basic language syntax (`for` loop, `Array.push`) | Training knowledge (No tool) |
| External service APIs | Broad to Deep Strategy |
| "Research", "investigate", "assess feasibility" | Broad to Deep Strategy |
| Approach validation/tradeoffs (e.g., Postgres vs Mongo, microservices) | Broad to Deep Strategy |
| File content referenced | File read tool |
| Unknown dependency error message | Broad to Deep Strategy |
| "Latest", "best practice" for external tools | Broad to Deep Strategy |

When in doubt: Verify with tools. DO NOT guess.

## Research Strategy: Broad to Deep [PROTECTED]
MUST execute progressive search for APIs/libraries/unknown behavior:

### 1. Broad Exploration
- **Goal:** Find library names, docs URLs, API endpoints.
- **Tool:** `web_search`
- **Action:** Gather keywords/URLs. Do NOT stop here for precise usage.

### 2. Precise Lookup
- **Goal:** Get accurate signatures/schemas.
- **Tool:** `mcp_context7` (`resolve-library-id` -> `query-docs`)
- **Action:** Query Context7 using targets from Phase 1.

### 3. Deep Scraping
- **Goal:** Extract SPA/hidden docs missed by Context7.
- **Tool:** `mcp_chrome-devtools`
- **Action:** Open official URL from Phase 1, extract exact tables/text.

### 4. Empirical Testing
- **Goal:** Determine behavior when docs are ambiguous/silent.
- **Action:** 
  1. Stop searching.
  2. `ask_user` to explain gap.
  3. Propose minimal test script.
  4. Wait for approval before testing.

## Batching [FLEXIBLE]
- Read ALL required files before writing.
- Prefer 1 precise query over multiple vague ones.
- Fetch parallel docs if needed.

## MCP Usage [PROTECTED]
Use connected MCPs proactively.

### Tool Selection [FLEXIBLE]
Match first row. Do NOT skip.

| Condition | Tool |
|---|---|
| Library API/config/version behavior | Context7 (Fallback: web search) |
| Current codebase | File read |
| Localhost/dev server URL | Chrome DevTools |
| SPA/JS-rendered/Interactive URL (e.g., React/Vue, Swagger, Docusaurus) | Chrome DevTools |
| Static/Server-rendered URL | Web fetch |
| No URL yet | Web search -> Re-apply table |
| Stable concept (no specific version) | Training knowledge |

**Key:** Requires JS, console, network, or interactive state? MUST use Chrome DevTools.

### Available MCPs [FLEXIBLE]

**Context7**
- For 3rd-party library API/config. Prefer over training data.
- Max tokens: 5000 (Narrow: 2000).

**Chrome DevTools MCP**
- Localhost / JS pages (React/Vue/Swagger).
- Console, network, computed CSS, interactive state.
- UI Self-Verification (open & verify, do NOT just describe).
- Lighthouse audits.
