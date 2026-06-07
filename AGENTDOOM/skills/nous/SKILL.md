---
name: nous
description: First-principles reasoning, problem framing, assumption stripping, fundamental thinking. Use when user says "why", "first principles", "fundamental", "from scratch", "what's actually true", "let's rethink this", or asks for reasoning that doesn't take the framing for granted. For trade-off decisions, defer to PHRONESIS. For multi-lens audits, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [first-principles, reasoning, problem-framing, assumptions, why]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# NOUS

> *NOUS is the framing lens. One concern: rewrite the question before answering it. If you can't restate the problem in your own words, you don't understand the task.*

## Philosophy

Refuse to solve the wrong problem. Frame first, solve second. Most "hard problems" are easy once you've stripped away the assumed framing. The hardest part of any reasoning is the question, not the answer.

Three laws:
1. The framing is suspect. The way the question is asked is usually wrong. Rewriting the question is half the work.
2. The assumptions are the answer. "Why is this hard?" → "Because you assumed X." → "Do we have to assume X?" → "No." → "Then it's not hard."
3. From facts, not analogy. "X is like Y, so we should do Z" is reasoning by analogy. Strip to facts. Build up.

## When This Activates

- "Why is this the way it is"
- "Let's rethink this from scratch"
- "First principles"
- "What's the fundamental constraint"
- "Why do we do it this way"
- "I'm stuck on this problem"
- "Is there a better way to think about this"

## When NOT to Use This

- **Concrete debug tasks** — use METIS. NOUS frames; METIS hunts the cause.
- **Pick a trade-off** — use PHRONESIS. NOUS restates the question; PHRONESIS picks.
- **Implement the reframed solution** — NOUS stops at the frame. Other skills build.
- **"Why" questions that are actually rhetorical** — answer them directly, do not reframe.
- **Tasks with a clear, well-defined problem statement** — no need to frame. Just solve.
- **Multi-domain problems** — load OMNISCIENCE (NOUS is the first step, not the whole audit).

## Kill Signal

Stop and restart when:
- **The restated question is identical to the original.** The framing was correct. NOUS has nothing to add. Stop. Hand off to the appropriate skill (PHRONESIS, METIS, ATLAS).
- **You cannot restate the question in your own words.** The task is under-specified. Ask exactly one clarifying question — the most load-bearing one. Do not proceed with a guess.
- **Every assumption is load-bearing.** If removing any assumption collapses the problem entirely, the assumptions are the problem. State this. Do not pretend to "strip" them.
- **The reframing produces a question the user did not ask.** Surface the reframe explicitly. Confirm before proceeding. A silent reframe is a wrong answer to a question that wasn't asked.
- **"First principles" is being used as a buzzword, not a method.** If the user wants philosophical air-time, not a real derivation, NOUS is the wrong tool. Decline or proceed with normal reasoning.

## Behavior Rules

1. Always restate the question. The way the user asked it is rarely the right question.
2. List the assumptions. The "of course" parts. The parts that go unquestioned. Those are the leverage.
3. Test each assumption. "If we removed this assumption, does the problem dissolve?"
4. Build from facts, not analogy. "X is like Y" is fine as a starting point. The answer is rarely "do what Y does."
5. Refuse the question if it's wrong. "Before answering, are you sure this is the question?"

## Mini-protocol

1. Strip the assumptions. List what you took for granted.
2. Find the real constraint. The physics, the budget, the deadline.
3. Rebuild the frame from the constraint, not the symptom.

## Workflow

1. RESTATE: rewrite the question. Often the rewritten version is the real question.
2. ASSUMPTIONS: list what's taken for granted. 3-7 items usually.
3. TEST: for each assumption, "what if this is false?" Does the problem change shape?
4. CORE: what's the actual constraint, once assumptions are stripped?
5. BUILD: from facts, what does the answer look like?
6. CHECK: does the answer address the restated question, or the original (often wrong) one?

## Output Format

```
RESTATED QUESTION
<the real question, in your own words, not the user's>

ASSUMPTIONS BEING MADE
1. <assumption> — if false, <what changes>
2. <assumption> — if false, <what changes>
3. <assumption> — if false, <what changes>
4. <assumption> — if false, <what changes>

THE REAL CONSTRAINT
<the load-bearing fact, after assumptions are stripped>

FIRST-PRINCIPLES DERIVATION
<built from facts, not analogy>

ANSWER
<addresses the RESTATED question, not the original>

ORIGINAL FRAMING: <why it was wrong>

CONFIDENCE: <X%> — <the assumption that, if false, drops this the most>
FLIP VARIABLE: <the assumption whose removal would change the answer>
```

## Self-Audit

- [ ] Did I restate the question?
- [ ] Did I list the assumptions explicitly?
- [ ] Did I test each assumption?
- [ ] Did I build from facts, not analogy?
- [ ] Did I check the answer addresses the real question, not the original?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **phronesis** — once framed, decide the trade-off
- **metis** — once framed, debug the real issue
- **atlas** — once framed, design the system that fits
- **omniscience** — NOUS is step 1; OMNISCIENCE runs the full cascade
- **kratos** — once framed, measure the performance reality

## Quick Reference

| Signal | Action |
|---|---|
| "Why is X hard?" | NOUS — strip assumptions, find real constraint |
| "Why is X broken?" | METIS (NOUS first, then cause) |
| "Should I use X or Y?" | PHRONESIS |
| "Rethink this from scratch" | NOUS |
| "I'm stuck" | NOUS (often stuck = wrong frame) |
| "Design the system" | ATLAS (NOUS first) |
| "What would an expert do?" | OMNISCIENCE |

## Examples

**Input:** "Why is it so hard to scale our Postgres database?"

**Output:**
```
RESTATED QUESTION
Why does our Postgres performance degrade as data volume grows, and is that an inherent property of Postgres or of our usage?

ASSUMPTIONS BEING MADE
1. The database is the bottleneck (could be app code, network, etc.) — if false, scaling Postgres does nothing
2. Postgres is the right DB for this workload — if false, the answer is a different DB
3. The data model is correct — if false, re-modeling solves it
4. The queries are correct — if false, query rewrite beats scale
5. The indexes are appropriate — if false, add the index (cheap fix)
6. The connection pool is sized correctly — if false, pool tuning is the answer
7. The hardware is appropriate — if false, vertical scaling is the first answer

THE REAL CONSTRAINT
The performance wall is almost always at the query level, not the database level. Postgres scales further than people think when queries are well-indexed and access patterns match the schema.

FIRST-PRINCIPLES DERIVATION
A database's job: persist data, retrieve data on demand. The cost of retrieval is O(rows examined × work per row). Indexes make examined-rows small. Bad queries make examined-rows large. Most "Postgres can't scale" is "we did a sequential scan on a 100M-row table."

ANSWER
Don't "scale Postgres." First, prove the database is the bottleneck. Then prove the query is the issue. Then add the index. Most "Postgres scaling problems" are actually "missing index" problems.

ORIGINAL FRAMING
The original asked why scaling is hard, assuming scaling is the right move. The first-principles answer: scaling is rarely the right move. Fix the query first.

CONFIDENCE: 90% — that the answer is one of (a) missing index, (b) N+1, (c) wrong data model — not "we need to shard."
FLIP VARIABLE: If the workload is fundamentally write-heavy and key-value (e.g., 100k writes/sec, no joins), Postgres is the wrong tool. Switch to DynamoDB or Cassandra.
```

## Anti-Patterns

- Accepting the question at face value
- "Because that's how it's done" as a reason
- Reasoning by analogy without testing
- Listing assumptions but not testing them
- Solving the wrong problem (efficiently)
- "First principles" as a buzzword with no actual derivation
- Confusing "from first principles" with "from my opinion"
- Stopping at "it's hard" without naming what makes it hard
- Reframing without telling the user the reframe happened
- Refusing to answer because "the question is wrong" — surface and confirm instead
