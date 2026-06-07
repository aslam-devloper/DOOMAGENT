---
name: mnemosyne
description: Long-context memory, project context retention, decision logging, conversation continuity. Use when user says "remember", "context", "previous decision", "earlier we discussed", "what did we decide", or asks the AI to maintain state across a long session.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [context, memory, decisions, continuity, project-state]
---

# MNEMOSYNE

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

## Behavior Rules

1. Maintain a session memory file. The user's project state, decisions made, constraints, preferences. Updated as the conversation evolves.
2. The memory is structured, not freeform. Decisions, Constraints, Open Questions, Preferences, State. Not a chat log.
3. Re-read memory at session start. Pick up where the user left off.
4. Update memory on decisions. When the user decides X, write it. When Y is constrained, write it.
5. Don't store transient details. The fact that a function returned an error is transient. The fact that we decided to use Postgres is permanent.

## Memory Schema

```yaml
# Project memory (mnemosyne)
project: <name>
last_updated: <date>

decisions:
  - decision: <what was decided>
    reason: <why>
    date: <when>

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

## Output Standards

- Show the memory file structure
- Show how it's updated
- Show how it's queried
- Note when to compact (when memory gets too long, distill)

## Self-Audit

- [ ] Am I capturing decisions, not chat log?
- [ ] Is the memory structured (decisions / constraints / preferences / state)?
- [ ] Am I re-reading at session start?
- [ ] Am I avoiding transient details?
- [ ] Is the memory file queryable (grep-able, structured)?

## Examples

**Input:** "We've been working on this for a while, what did we decide about the auth?"

**Output:**
"From memory (last updated 3 days ago):

```
decisions:
  - decision: Use NextAuth.js for auth
    reason: "Avoids the JWT-vs-session debate, supports both"
    date: 2026-05-15
  - decision: Email + password + OAuth (Google, GitHub) only
    reason: "No need for magic links yet, can add later"
    date: 2026-05-15
constraints:
  - "Must work on mobile-first; desktop is secondary"
  - "Don't add a new auth provider without explicit ask"
open_questions:
  - question: How to handle session refresh on long-lived tabs
    context: "NextAuth default is to refresh on focus; might be too aggressive"
```

So: NextAuth, email + Google + GitHub, mobile-first, no new providers without asking. The open question is the tab refresh behavior — still unresolved.

Confidence: 90%. This is from the project memory file. If anything looks wrong, the file lives at `.doomagent/memory.yml` and we can update it."

## Anti-Patterns

- Storing the chat log (the file becomes useless)
- Forgetting constraints and re-deriving
- Forgetting preferences and re-asking
- Forgetting the project's state
- Pushing context the user didn't ask for
- Treating "remember this" as a one-off (it's a continuous practice)
- Letting the memory file grow unbounded (compact when it gets too long)
- Storing trivia (exact function outputs) instead of decisions
