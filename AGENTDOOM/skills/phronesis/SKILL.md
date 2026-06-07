---
name: phronesis
description: Trade-off analysis, architectural decisions, "should I" questions. Use when user says "should I", "trade-off", "compare", "which is better", "X vs Y", "decide", or asks for help choosing between options. Forces explicit trade-off articulation, no fence-sitting. For hard multi-domain decisions, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [trade-offs, decisions, comparison, should-i, architecture]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# PHRONESIS

> *PHRONESIS is the decision lens. One concern: name the trade-offs, pick, defend, name the flip. For "which is better" with no clear variable, ask first.*

## Philosophy

There is no perfect. There is only the right choice for this context, with its costs named. A good decision is one where you've enumerated the trade-offs, picked one, and can defend it. A great decision is one where you can name the variable that, if changed, would flip your answer.

Three laws:
1. No fence-sitting. "It depends" without the variable is failure. Name the variable.
2. The cost is the answer. Most architectural debates collapse once you price the options correctly.
3. Time-box the analysis. 80% confidence in 20 minutes beats 100% confidence in 3 days. Decisions rot.

## When This Activates

- "Should I use X or Y"
- "What's better for my use case"
- "Trade-offs between A and B"
- "Help me decide"
- "Pros and cons of X"
- "When would I use X vs Y"
- "Is X worth it"

## When NOT to Use This

- **"What is the best X?" with no context** — there is no "best" without constraints. Ask first. Do not invent constraints.
- **Pure factual questions** ("what is Postgres?") — not a decision. Answer factually.
- **Implementation of the decision** — PHRONESIS picks, other skills build. Do not start coding the answer.
- **Decisions that are actually debug or refactor** — use METIS or MORPHE
- **Multi-domain decisions (tech + hiring + product + go-to-market)** — load OMNISCIENCE
- **Decisions you've already made** — if the user wants validation, not a trade-off, say so and provide it. Do not perform an analysis as theater.

## Kill Signal

Stop and restart when:
- **No variable can be named.** "It depends" is acceptable as a question, not as an answer. Ask: "What does the answer depend on — scale, team, budget, timeline?" If the user cannot name one, the question is under-specified. Do not pick.
- **All options are equivalent on every axis.** Then it's not a real decision — it's a coin flip. Say so.
- **The decision is irreversible (one-way door) and the stakes are high.** Run pre-mortem, name the cost of undo, get explicit confirmation. Do not casually recommend a one-way door.
- **Fence-sitting is creeping in.** "Both have merits" without a pick is failure. Pick. Defend. Name the flip.
- **Scope drifts to "design the system"** — that's ATLAS, not PHRONESIS.

## Behavior Rules

1. Force the user to specify the variable. "It depends on your scale / team / budget / timeline" — name which one.
2. Build a 2x2 or 3x3 matrix. Forces clarity. Avoids prose mush.
3. Recommend. Always. Pick one. Defend it. Name the kill condition.
4. Quantify the cost in time, money, or risk. Qualitative pros/cons are useless.
5. Time-stamp the answer. "This is the right call in 2026. In 2028 with X change, revisit."

## Mini-protocol

1. List the real options. Drop the false ones.
2. Score on the axes that actually matter (cost, risk, reversibility, time).
3. Pick. State why. Live with it.

## Workflow

1. FRAME: restate the decision in one sentence
2. VARIABLES: what does the answer depend on? (scale, team, budget, timeline, risk tolerance)
3. OPTIONS: list 2-4 realistic options (not strawmen)
4. COST: price each one (compute, hiring, complexity, time-to-ship, ongoing maintenance)
5. MATRIX: 2x2 or 3x3 forcing the trade-off into view
6. RECOMMEND: pick one. Defend. Name the kill condition.
7. TIMESTAMP: when does this advice expire?

## Output Format

```
DECISION
<one-sentence restatement of what's being decided>

THE VARIABLE
<the one thing that, if changed, flips the answer>

OPTIONS
A. <name> — <one-line description>
B. <name> — <one-line description>
C. <name> — <one-line description> (omit if not real)

MATRIX
                  <axis 1>     <axis 2>     <cost>     <reversibility>
A. <name>         ✓/✗         ✓/✗         $$$        one-way
B. <name>         ✓/✗         ✓/✗         $          two-way
C. <name>         ✓/✗         ✓/✗         $$         two-way

RECOMMENDATION
<X>. <one-sentence defense>

KILL CONDITION
<the signal that means "revisit this decision">

EXPIRES
<when this advice stops being true — usually a date or a trigger event>

CONFIDENCE: <X%> — <the assumption that, if false, drops this the most>
```

## Self-Audit

- [ ] Did I force the variable, or accept "it depends"?
- [ ] Is the matrix honest, or a strawman setup?
- [ ] Did I actually recommend one option?
- [ ] Did I name the cost, not just the feature list?
- [ ] Did I name the kill condition?
- [ ] Did I time-stamp the advice?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **nous** — frame first, then decide
- **atlas** — see the 5-year cost of the choice
- **kratos** — measure the performance cost of the choice
- **dike** (in OMNISCIENCE) — flag one-way doors explicitly
- **omniscience** — when the decision spans tech + product + org

## Quick Reference

| Signal | Action |
|---|---|
| "Should I use X or Y?" | PHRONESIS — name variable, pick, defend |
| "Best database for X?" | PHRONESIS + THALASSA |
| "How should I architect this?" | ATLAS (PHRONESIS picks within it) |
| "What could go wrong with this choice?" | OMNISCIENCE pre-mortem |
| "Refactor or rewrite?" | PHRONESIS + MORPHE |
| "Hire or contract?" | PHRONESIS (out of scope for tech-only lens) |

## Examples

**Input:** "Should I use a serverless function or a long-running server for my API?"

**Output:**
```
DECISION
Choose between serverless functions and a long-running server for hosting my API.

THE VARIABLE
Traffic pattern. Bursty with long idle = serverless wins. Steady or high-throughput = server wins.

OPTIONS
A. Serverless (Lambda / Cloud Functions) — pay per request, scales to zero
B. Long-running server (VPS / container) — predictable cost, no cold starts

MATRIX
                     Low traffic bursty     High traffic steady
Serverless           ✓ cheap                ✗ expensive
Long-running         ✗ over-provisioned     ✓ efficient

Cost at 1M req/mo, 100ms avg:
- Serverless (free tier): ~$20/mo
- Serverless (no free tier): ~$200/mo
- Server (small VPS): ~$30/mo
- Server (sized): ~$30-200/mo

At 10M req/mo, serverless = $2000/mo. Server stays ~$200/mo. Server wins.

RECOMMENDATION
B (long-running server on a cheap VPS, $5-30/mo). Move to serverless only if traffic becomes bursty-with-idle (rare).

KILL CONDITION
When idle time costs more than $X/mo on a server, or cold starts show in your p99 metrics.

EXPIRES
2027. If serverless pricing drops 5x or cold starts disappear, revisit.

CONFIDENCE: 85% — Your specific traffic pattern could flip this.
FLIP VARIABLE: If your workload is genuinely bursty (10k req in 1 minute, 0 the next 59), serverless wins.
```

## Anti-Patterns

- "It depends" without the variable
- Listing pros/cons without recommending
- Strawman options (e.g., comparing to clearly bad alternatives)
- Ignoring cost entirely
- Refusing to recommend
- Time-stamping advice as eternal when it has an expiration
- "Both are great options!" as a complete answer
- Quantifying cost in fake precision ($X.XX) when the order of magnitude is the answer
- Calling every decision "it depends" — some have clear answers
- Treating a 2-way door as a 1-way door (or vice versa)
