---
name: argo
description: Multi-agent orchestration, agent roles, handoffs, agent workflows. Use when user says "multi-agent", "agent handoff", "orchestrate agents", "LangChain agents", "CrewAI", "AutoGen", "agent workflow", or asks about coordinating multiple AI agents.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [multi-agent, orchestration, workflows, langchain, crewai]
---

# ARGO

## Philosophy

Each agent has a job. The ship has a captain. The journey has a chart. Multi-agent systems fail when the agents have vague roles, fuzzy handoffs, and unclear success criteria. The fix is the chart, not the agents.

Three laws:
1. Roles are contracts. Each agent has a defined input, a defined output, a defined failure mode. Vague roles produce vague work.
2. Handoffs are the API. The contract between two agents is the most important code in the system. Define the format, the validation, the retry policy.
3. One captain. Multi-agent systems need a coordinator. The captain's job is the chart (what's the goal, what's the order, when to stop). Without a captain, agents talk past each other.

## When This Activates

- "Design a multi-agent system"
- "Set up agent handoffs"
- "LangChain / CrewAI / AutoGen"
- "Research agent + writer agent"
- "How do agents collaborate"
- "Agent workflow"
- "n8n AI agents"

## Behavior Rules

1. Each agent has a single responsibility. If an agent does "research and writes and reviews", it's not a role, it's a job title.
2. The handoff format is explicit. JSON schema, defined fields, required vs optional. Free-form text handoffs are bugs waiting to happen.
3. The captain is not optional. Either a designated coordinator agent or an explicit loop in the orchestrator code.
4. Failure modes are part of the contract. "What does this agent do when it can't find the answer?" The answer is in the contract.
5. Observability is built in. Every agent emits structured logs of inputs, outputs, and decisions. The captain reads them.

## Workflow

1. GOAL: what's the top-level outcome? The journey.
2. ROLES: 2-5 agents, each with one job. Don't over-decompose. (Research, Write, Review = 3 is good. 10 is chaos.)
3. HANDOFFS: the contract between consecutive agents. Format, fields, validation.
4. CAPTAIN: who orchestrates? Either an explicit coordinator agent or a state machine in code.
5. FAILURE MODES: what happens when an agent fails? Retry, escalate, abort. Each handoff defines this.
6. OBSERVABILITY: structured logs at every handoff. Inputs, outputs, decisions, duration.
7. STOP CONDITION: how does the system know it's done? The captain's exit criterion.

## Output Standards

- Show the agent diagram (roles + handoffs)
- Show the handoff contract (JSON schema or interface)
- Show the captain's loop / state machine
- Note the failure modes per handoff
- Note the stop condition

## Self-Audit

- [ ] Does each agent have a single responsibility?
- [ ] Are handoffs explicit contracts (schema, not freeform)?
- [ ] Is there a captain (explicit coordinator)?
- [ ] Are failure modes defined per handoff?
- [ ] Is there a stop condition (the captain knows when to stop)?
- [ ] Is observability built in?

## Examples

**Input:** "Design a multi-agent system to research a topic and write a blog post."

**Output:**
"Three agents + a captain.

```
[User Request] → [Captain] → [Researcher] → [Writer] → [Reviewer] → [Output]
                       ↑___________________retry/abort___________________|
```

Roles:
- **Researcher**: input = topic + scope. Output = {facts, sources, quotes, key_questions}. Failure: no facts found → escalate to captain.
- **Writer**: input = {facts, sources, key_questions}. Output = {draft, word_count, sources_cited}. Failure: cannot hit word count → return to researcher for more.
- **Reviewer**: input = {draft, sources}. Output = {approved, issues, suggested_fixes}. Failure: factual issue → return to writer.

Captain's loop:
```python
state = {"topic": user_input, "iterations": 0, "max_iterations": 3}

while state["iterations"] < state["max_iterations"]:
    research = researcher.run({"topic": state["topic"], "scope": state.get("scope")})
    draft = writer.run({"facts": research["facts"], "sources": research["sources"]})
    review = reviewer.run({"draft": draft, "sources": research["sources"]})
    if review["approved"]:
        return draft
    state["iterations"] += 1
    state["scope"] = review["issues"]  # narrow the scope

raise MaxIterationsExceeded("Could not converge in 3 iterations")
```

Handoff contracts (JSON schemas) — Researcher output:
```json
{
  "type": "object",
  "properties": {
    "facts": {"type": "array", "items": {"type": "string"}},
    "sources": {"type": "array", "items": {"type": "object", "properties": {"url": {"type": "string"}, "title": {"type": "string"}}}},
    "key_questions": {"type": "array", "items": {"type": "string"}}
  },
  "required": ["facts", "sources", "key_questions"]
}
```

Stop condition: reviewer approves, or 3 iterations exceeded (return best draft + reviewer issues).

Observability: every handoff logs `{"agent": "researcher", "input": {...}, "output": {...}, "duration_ms": 1234}`. Captain reads the log to debug stuck workflows.

Confidence: 90%."

## Anti-Patterns

- Vague agent roles ("the doer", "the thinker")
- Free-form text handoffs
- No captain (agents talk past each other)
- 10+ agents for a 3-step task
- No stop condition (infinite loops)
- No failure mode definition
- "The LLM will figure it out" (it won't, in a multi-agent setting)
- Sharing memory across all agents (context bloat, conflicting state)
- No observability (you can't debug what you can't see)
