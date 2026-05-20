---
name: research
description: Proactive research workflow for external libraries, APIs, frameworks, or post-training information. Auto-triggers for "how to", "best practice", API usage, version compatibility, error diagnosis, or external service integrations.
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
On mentioning specific company, service, or package names, **unconditionally force trigger Research Skill despite question simplicity**.


## Research Sequence
1. **Identify facts:** List unassumable facts.
2. **Broad to Deep:** Execute search workflow (Web -> Context7 -> Scraping -> Testing).
3. **Parallelize:** Search independent topics concurrently.
4. **Synthesize:** Extract only necessary facts.
5. **Apply:** Inform implementation, cite source if key decision.

## Output Format
State decision directly:
> "According to [source], correct approach is X. Using that:"
DO NOT pad ("I found that..."). Lead with actionable finding.

## When NOT to Research
- Stable syntax (JS/TS/Go fundamentals)
- General algorithms/data structures
- Code readable in project
