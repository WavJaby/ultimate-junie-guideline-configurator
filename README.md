# Ultimate Junie Config

Ultimate Junie Config is a centralized configuration and build system designed specifically for the Junie plugin and Junie ACP Agent.

## Problem Statement

The original system prompt for the Junie plugin is too barebones, making the plugin extremely difficult to use out of the box. While it offers powerful capabilities and high customizability, it lacks proper organization.

By default, Junie operates under rigid system constraints: it generates execution plans invisibly, restricts fluid context switching between coding and architectural discussions, and defaults to applying localized patches rather than structural improvements. 

Ultimate Junie Config exists to safely **override these default behaviors**, making the agent significantly more transparent, cautious, and proactive. However, manually maintaining and injecting these complex override rules, skills, and model tunings across multiple projects and execution environments (e.g., IDE plugins, standalone ACPs) leads to severe configuration fragmentation. Ultimate Junie Config solves this by serving as a centralized compiler and single source of truth for agent behavior.

## Enhancing Junie's Capabilities

- **Transparent Planning & Execution**: Overrides the default hidden-plan protocol, forcing Junie to present a detailed execution plan and wait for explicit developer approval before modifying any files.
- **Mandatory Research & Scoping**: Eliminates the "blind execution" anti-pattern. Forces Junie to pause, perform contextual research, and explicitly clarify ambiguities or scope boundaries before writing any code, preventing scope drift and misaligned expectations.
- **Fluid Mode Switching**: Lifts default state-machine restrictions, enabling Junie to seamlessly transition between strict code execution (`[CODE]`) and exploratory technical discussions (`[ADVANCED_CHAT]`).
- **Proactive Refactoring**: Supersedes the default "minimal changes" directive, empowering the agent to prioritize DRY principles and propose systematic refactoring over naive code patching.
- **Targeted Modular Skills**: Decouples analytical skills (e.g., research, planning) and platform-specific rules into independent modules, automatically merging them based on the target architecture to optimize agent performance.

## Key Features
1. **Multi-Target Build System (`build-agents.ts`)**:
   - Supports `-target plugin` and `-target acp` parameters to automatically generate optimized `.junie/AGENTS.md` structures for different architectures.
   - Supports multi-project injection: Use the `-project` parameter to update agent configuration files across multiple project paths simultaneously.
2. **Automated Processing and Merging**:
   - Automatically strips YAML frontmatter and merges Markdown files to produce a clean final configuration.
   - Includes a `-debug` mode to append additional troubleshooting configurations during the testing phase.

---

## Source Layout
* `src/base.md`                          shared base
* `src/debug.md`                         shared debug
* `src/rules/*.md`                       shared rules
* `src/models/<model>.md`                shared model tuning
* `src/skills/`                          shared skills (e.g. research)
* `src/junie_plugin/rules/`              plugin tool rules
* `src/junie_plugin/skills/`             plugin-only skills (e.g. planning, ACP have builtin planning skill)
* `src/junie_acp/rules/`                 ACP tool rules

## Default Output
* **plugin**: `plugin/.junie/AGENTS.md`  (everything inlined)
* **acp**: 
  - `acp/.junie/AGENTS.md`     (base + tool_rules + model)
  - `acp/.aiassistant/rules/`  (shared rules + ACP)
  - `acp/.agents/skills/`      (shared skills only)
