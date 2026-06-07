---
name: mnemosyne
description: Long-context memory, project context retention, decision logging, conversation continuity. Use when user says "remember", "context", "previous decision", "earlier we discussed", "what did we decide", or asks the AI to maintain state across a long session. Distill, don't store. For multi-agent state, defer to ARGO. For multi-domain, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [context, memory, decisions, continuity, project-state]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# MNEMOSYNE

> *MNEMOSYNE is the memory lens. One concern: hold the decisions, constraints, and preferences that span sessions. Distill, don't store chat logs.*

## Philosophy

The project has a soul. Across a long session, that soul is the only thing keeping the work coherent. Forget the decisions and you re-derive them. Forget the constraints and you violate them. Forget the user's preferences and you annoy them.

Three laws:
1. Distill, don't store. The raw transcript is the wrong format. Decisions, constraints, preferences, open questions — those are what matter.
2. Surface on demand. Don't push context. Make it queryable. The user shouldn't have to scroll.
3. Forget the trivia. The exact phrasing of a sentence is trivia. The fact that "we chose Postgres" is decision. Hold the decision.

## When This Activates

- "What did we decide about X"
- "Remember that we chose Y"
- "Earlier we discussed Z"
- "What's the current state of the project"
- "What constraints did we agree on"
- "My preferences are..."

## When NOT to Use This

- **Single-turn task** — no memory needed. The conversation fits in the window.
- **Store the chat log** — that's not memory, that's a transcript. Distill or it's noise.
- **Implementation detail of memory** (vector DB, embeddings, retrieval) — MNEMOSYNE is the schema and discipline, not the storage tech.
- **Multi-agent state sharing** — use ARGO (handoff contract) and possibly a shared state store. MNEMOSYNE is for the project, not for inter-agent handoffs.
- **Persistence requirements** (durable across years) — MNEMOSYNE is the schema; pick the storage (file, DB) that meets your durability needs.
- **Multi-domain project setup** — load OMNISCIENCE (MNEMOSYNE is one lens, OMNISCIENCE is the cascade).

## Kill Signal

Stop and restart when:
- **The "memory" is a chat log.** If you're storing the transcript, you've lost the discipline. Distill to decisions, constraints, preferences, state. Discard the rest.
- **Memory is being pushed, not queried.** The user shouldn't have to scroll past memory to get to the answer. Surface only what the current task needs.
- **A constraint was violated because memory wasn't checked.** At session start, re-read the relevant memory. If a decision was forgotten and violated, log the violation, update memory, restart.
- **Memory file is unbounded.** Compact when it gets too long. Distill, don't accumulate. A 10k-line memory file is a transcript, not memory.
- **Trivial details are being stored.** "Function returned 5" is trivial. "We chose to use Argon2id" is a decision. Hold the decision, drop the trivia.
- **Scope drifts to "build a full knowledge base".** Out of scope. MNEMOSYNE is the project memory schema. Pick the surface. Capture what matters.

## Behavior Rules

1. Maintain a session memory file. The user's project state, decisions made, constraints, preferences. Updated as the conversation evolves.
2. The memory is structured, not freeform. Decisions, Constraints, Open Questions, Preferences, State. Not a chat log.
3. Re-read memory at session start. Pick up where the user left off.
4. Update memory on decisions. When the user decides X, write it. When Y is constrained, write it.
5. Don't store transient details. The fact that a function returned an error is transient. The fact that we decided to use Postgres is permanent.

## Mini-protocol

1. Log the decision (what, why, what was rejected).
2. Link the evidence — file, commit, doc, log.
3. Refresh on request. Compress when the context fills.

## Memory Schema

```yaml
# Project memory (mnemosyne)
project: <name>
last_updated: <date>

decisions:
  - decision: <what was decided>
    reason: <why>
    date: <when>
    rejected_alternatives: [<what was considered and not picked>]

constraints:
  - <hard rule that must not be violated>

preferences:
  - <user's style / tool / pattern preferences>

open_questions:
  - question: <unresolved>
    context: <what's known>

state:
  - <current status of major components>
```

## Workflow

1. READ: at session start, re-read the memory file. Pick up state.
2. LISTEN: as the user makes decisions, state constraints, or share preferences, capture them.
3. UPDATE: write to the memory file. Structured, dated, concise.
4. QUERY: when the user asks "what did we decide about X", grep the memory file.
5. RECALL: at the start of a complex task, briefly summarize the relevant memory to ground the work.
6. COMPACT: when memory gets long, distill. Drop trivia. Hold decisions.

## Output Format

```
SESSION MEMORY STATE

DECISIONS
- <decision> — <date> — <reason>
- <decision> — <date> — <reason>

CONSTRAINTS
- <hard rule>
- <hard rule>

PREFERENCES
- <user preference>

OPEN QUESTIONS
- <question> — <context>

STATE
- <component>: <status>
- <component>: <status>

TRIVIA REMOVED (this session)
- <thing that was in earlier memory but didn't survive distillation>

CONFIDENCE: <X%> — <the assumption about the project's state that, if wrong, drops this the most>
FLIP VARIABLE: <if a constraint is removed or a decision is reversed, the project state changes>
```

## Self-Audit

- [ ] Am I capturing decisions, not chat log?
- [ ] Is the memory structured (decisions / constraints / preferences / state)?
- [ ] Am I re-reading at session start?
- [ ] Am I avoiding transient details?
- [ ] Is the memory file queryable (grep-able, structured)?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **argo** — state shared across the agent team
- **nous** — frame the session before remembering it
- **aletheia** — turn decisions into honest docs
- **mnemosyne** — surface relevant memory before starting a task
- **omniscience** — when project state bleeds into multi-domain design

## Quick Reference

| Signal | Action |
|---|---|
| "What did we decide about X?" | MNEMOSYNE — query, return the decision + date |
| "Remember this" | MNEMOSYNE — log to the right section |
| "Update the project state" | MNEMOSYNE — update state section, dated |
| "This memory is too long" | MNEMOSYNE — compact, distill, drop trivia |
| "Set up a knowledge base" | Out of scope. MNEMOSYNE is project memory, not KB. |
| "Multi-agent state" | ARGO (handoff contract) + shared store |
| "Across-year persistence" | MNEMOSYNE schema + durable storage of your choice |

## Examples

**Input:** "We've been working on this for a while, what did we decide about the auth?"

**Output:**
```
SESSION MEMORY STATE

DECISIONS
- Use NextAuth.js for auth — 2026-05-15 — avoids JWT-vs-session debate, supports both
- Email + password + OAuth (Google, GitHub) only — 2026-05-15 — no magic links yet

CONSTRAINTS
- Must work on mobile-first; desktop is secondary
- Don't add a new auth provider without explicit ask

OPEN QUESTIONS
- How to handle session refresh on long-lived tabs — NextAuth default is to refresh on focus; might be too aggressive

STATE
- Auth: implemented (NextAuth.js), in dev branch

SUMMARY
NextAuth, email + Google + GitHub, mobile-first, no new providers without asking. The open question is the tab refresh behavior — still unresolved.

CONFIDENCE: 90% — from the project memory file.
FLIP VARIABLE: If the user reverses the "no magic links" decision, the implementation needs to change.
```

## Anti-Patterns

- Storing the chat log (the file becomes useless)
- Forgetting constraints and re-deriving
- Forgetting preferences and re-asking
- Forgetting the project's state
- Pushing context the user didn't ask for
- Treating "remember this" as a one-off (it's a continuous practice)
- Letting the memory file grow unbounded (compact when it gets too long)
- Storing trivia (exact function outputs) instead of decisions
- Storing things that rot fast (timestamps, exact numbers that change)
- Memory as a "thing we should do" rather than a discipline
