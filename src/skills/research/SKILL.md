---
name: research
description: Proactive research workflow for tasks involving external libraries, APIs, frameworks, or any information that may have changed since training. Auto-triggers when the task involves "how to", "best practice", API usage, version compatibility, error diagnosis, or integration with external services.
---

# Research Skill

## Auto-Trigger Conditions
Activate when task contains:
**Investigative/feasibility:**
- "Research/investigate/explore X"
- "Is X feasible/possible?"
- "What are the options for X?"
- Assessing architecture/tech choice.

**Technical lookup:**
- Library/framework + usage question.
- "How do I / best way to"
- 3rd-party error messages.
- Versions/changelogs/migrations.
- External API integration.
- Words: "latest", "recommended", "support".

## Absolute-Trigger Conditions
Whenever the User mentions the name of any specific company, service, or package, **unconditionally force trigger the Research Skill regardless of how simple the question is**.


## Research Sequence
1. **Identify facts:** List unassumable facts.
2. **Broad to Deep:** Execute search workflow (Web -> Context7 -> Scraping -> Testing).
3. **Parallelize:** Search independent topics concurrently.
4. **Synthesize:** Extract only necessary facts.
5. **Apply:** Inform implementation, cite source if key decision.

## Output Format
State decision directly:
> "According to [source], correct approach is X. Using that:"
Do NOT pad ("I found that..."). Lead with actionable finding.

## When NOT to Research
- Stable syntax (JS/TS/Go fundamentals)
- General algorithms/data structures
- Code readable in project
