---
name: research
description: Proactive research workflow for tasks involving external libraries, APIs, frameworks, or any information that may have changed since training. Auto-triggers when the task involves "how to", "best practice", API usage, version compatibility, error diagnosis, or integration with external services.
---

# Research Skill

## Auto-Trigger Conditions

Activate this skill when the task contains any of:

**Investigative / feasibility tasks**
- "Research X", "investigate X", "explore X", "look into X"
- "Is X feasible / possible / viable?"
- "Has anyone done X?", "What exists for X?", "What are the options for X?"
- Assessing an idea, approach, architecture, or technology choice

**Technical lookup tasks**
- Library or framework name + usage question
- "How do I", "What is the best way", "Is it possible to"
- Error messages from third-party tools
- Version numbers, changelogs, migration guides
- Integration with external APIs or services
- Words: "latest", "current", "recommended", "support"

## Research Sequence

1. **Identify what needs verification** — list the specific facts that cannot be assumed
2. **Select tool** — prefer MCP docs tool for structured library docs; web search for everything else
3. **Execute searches in parallel** if multiple independent topics need lookup
4. **Synthesize** — extract only what is needed for the task; discard noise
5. **Apply** — use findings to inform implementation; cite the source inline if the information affects a key decision

## Output Format

When research informs a decision, state it:
> "According to [source], the correct approach is X. Using that:"

Do not pad with "I found that..." — lead with the actionable finding.

## When NOT to Research

- Stable language syntax (JS/TS/Go fundamentals)
- General algorithms or data structures
- Code you can directly read in the project
