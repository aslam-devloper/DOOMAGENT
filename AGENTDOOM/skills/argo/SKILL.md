---
name: argo
description: Multi-agent orchestration, agent roles, handoffs, agent workflows. Use when user says "multi-agent", "agent handoff", "orchestrate agents", "LangChain agents", "CrewAI", "AutoGen", "agent workflow", or asks about coordinating multiple AI agents. The fix is the chart, not the agents. For single-agent, no orchestration needed. For multi-domain, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [multi-agent, orchestration, workflows, langchain, crewai]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# ARGO

> *ARGO is the orchestration lens. One concern: define roles, define handoffs, name the captain. The fix is the chart, not the agents.*

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

## When NOT to Use This

- **Single-agent task** — no orchestration needed. Use the appropriate domain skill.
- **Choosing the agent framework** — that's a PHRONESIS decision (REST, framework, model choice), not ARGO.
- **Prompt engineering for one agent** — ARGO is between agents, not within one.
- **Memory / state management across sessions** — use MNEMOSYNE. ARGO defines the handoff shape; MNEMOSYNE defines what survives.
- **Production observability of the system** — use VIGIL for the metrics, alerts, and traces.
- **Multi-domain design (agents + product + cost)** — load OMNISCIENCE.

## Kill Signal

Stop and restart when:
- **Roles are not exclusive.** Two agents owning the same domain is a coordination failure waiting to surface. Redraw the boundary.
- **Handoffs are free-form text.** A free-form handoff is a bug. JSON schema or typed interface. Always. Stop and define it.
- **There is no captain.** Every multi-agent system needs a coordinator — either an explicit coordinator agent or a state machine in code. If neither exists, the system will fail at the worst possible moment. Add one.
- **The stop condition is missing.** If the captain doesn't know when to stop, the system runs forever. Define the exit criterion. Now.
- **Failure modes are undefined.** "What does this agent do when it can't find the answer?" must be in the contract. If it's not, the system fails open (continues with garbage) or fails dead (halts on first error). Pick.
- **Observability is missing.** If the captain can't see what each agent did, the system is a black box. Add structured logs at every handoff.
- **Scope drifts from "design the orchestration" to "design the agents".** ARGO is the chart. Agent internals are a different problem.

## Behavior Rules

1. Each agent has a single responsibility. If an agent does "research and writes and reviews", it's not a role, it's a job title.
2. The handoff format is explicit. JSON schema, defined fields, required vs optional. Free-form text handoffs are bugs waiting to happen.
3. The captain is not optional. Either a designated coordinator agent or an explicit loop in the orchestrator code.
4. Failure modes are part of the contract. "What does this agent do when it can't find the answer?" The answer is in the contract.
5. Observability is built in. Every agent emits structured logs of inputs, outputs, and decisions. The captain reads them.

## Mini-protocol

1. Define roles — one job each.
2. Plan the handoffs — explicit, typed.
3. One source of truth. One timeout. One stop condition.

## Workflow

1. GOAL: what's the top-level outcome? The journey.
2. ROLES: 2-5 agents, each with one job. Don't over-decompose. (Research, Write, Review = 3 is good. 10 is chaos.)
3. HANDOFFS: the contract between consecutive agents. Format, fields, validation.
4. CAPTAIN: who orchestrates? Either an explicit coordinator agent or a state machine in code.
5. FAILURE MODES: what happens when an agent fails? Retry, escalate, abort. Each handoff defines this.
6. OBSERVABILITY: structured logs at every handoff. Inputs, outputs, decisions, duration.
7. STOP CONDITION: how does the system know it's done? The captain's exit criterion.

## Output Format

```
GOAL
<the top-level outcome the orchestration produces>

CHART (text diagram)
[Input] → [Agent A] → [Agent B] → [Agent C] → [Output]
              ↑____________retry/abort______________|

ROLES
1. <Agent A>: input=<X>, output=<Y>, failure=<Z>
2. <Agent B>: input=<Y>, output=<W>, failure=<V>
3. <Agent C>: input=<W>, output=<final>, failure=<retry B>

HANDOFF CONTRACTS
<JSON schema or typed interface for each handoff>

CAPTAIN'S LOOP
<state machine or coordinator code>

FAILURE MODES (per handoff)
- A→B: <what fails> → <retry / escalate / abort>
- B→C: <what fails> → <retry / escalate / abort>
- timeout: <N seconds> → <abort>

STOP CONDITION
<the exit criterion — "reviewer approves", "max iterations", etc.>

OBSERVABILITY
<what gets logged at each handoff — agent, input hash, output hash, duration, decision>

CONFIDENCE: <X%> — <the agent behavior assumption that, if wrong, drops this the most>
FLIP VARIABLE: <if the agent failure rate changes, the design flips>
```

## Self-Audit

- [ ] Does each agent have a single responsibility?
- [ ] Are handoffs explicit contracts (schema, not freeform)?
- [ ] Is there a captain (explicit coordinator)?
- [ ] Are failure modes defined per handoff?
- [ ] Is there a stop condition (the captain knows when to stop)?
- [ ] Is observability built in?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **mnemosyne** — state across the agent team
- **atlas** — map the system before splitting it
- **nous** — frame the workflow before orchestrating it
- **aegis** — trust model between agents (does A trust B's output?)
- **vigil** — observe every handoff
- **omniscience** — when orchestration bleeds into system architecture

## Quick Reference

| Signal | Action |
|---|---|
| "Design a multi-agent system" | ARGO — chart first, agents second |
| "Choose the agent framework" | PHRONESIS (LangChain vs CrewAI vs AutoGen) |
| "This agent keeps failing" | METIS (root cause) + ARGO (failure mode in contract) |
| "State across agents" | MNEMOSYNE |
| "Why is my agent loop infinite?" | ARGO (stop condition missing) |
| "Production observability" | VIGIL |
| "Multi-domain system design" | OMNISCIENCE |

## Examples

**Input:** "Design a multi-agent system to research a topic and write a blog post."

**Output:**
```
GOAL
Produce a factually grounded blog post on a user-supplied topic, in 800-1200 words, with cited sources.

CHART
[User Request] → [Captain] → [Researcher] → [Writer] → [Reviewer] → [Output]
                       ↑___________________retry/abort___________________|

ROLES
1. Researcher: input=topic+scope, output={facts, sources, quotes, key_questions}, failure=no facts → escalate to captain
2. Writer: input={facts, sources, key_questions}, output={draft, word_count, sources_cited}, failure=word count miss → return to researcher
3. Reviewer: input={draft, sources}, output={approved, issues, suggested_fixes}, failure=factual issue → return to writer

HANDOFF CONTRACTS
Researcher output (JSON schema):
{
  "type": "object",
  "properties": {
    "facts": { "type": "array", "items": { "type": "string" } },
    "sources": { "type": "array", "items": { "type": "object", "properties": { "url": { "type": "string" }, "title": { "type": "string" } } } },
    "key_questions": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["facts", "sources", "key_questions"]
}

CAPTAIN'S LOOP (pseudocode)
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

FAILURE MODES
- Researcher returns empty facts → escalate to captain, ask user for narrower topic
- Writer can't hit word count → return to researcher with "need more depth on X"
- Reviewer flags factual error → return to writer with the issue
- 3 iterations exceeded → return best draft + reviewer issues, log the failure

STOP CONDITION
Reviewer approves, or 3 iterations exceeded.

OBSERVABILITY
Every handoff logs: {"agent": "<name>", "input_hash": "...", "output_hash": "...", "duration_ms": N, "decision": "<approved|retry|abort>"}.

CONFIDENCE: 90% — assumes agents are reliable enough that 3 iterations is usually enough.
FLIP VARIABLE: If reviewer approval rate drops below 50% per iteration, the design flips — need better initial research or a more capable writer.
```

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
- Two agents owning the same domain
- "Just add another agent" to fix a coordination problem
- Orchestrating what should be a single prompt
