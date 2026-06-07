---
name: omniscience
description: DOOMAGENT OMNISCIENCE — the master skill. Twenty cognitive lenses, one 9-step audit cascade, used as a thinking harness for any non-trivial task. When loaded, you do not need the other 20 skills. The only paid skill in the library.
version: 2.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Commercial — license issued on https://doomagent.vercel.app
tags: [meta-skill, master, audit, full-auditor, 20-lenses, 9-step-cascade, design, architecture, code, debug, refactor, ship]
---

# OMNISCIENCE — The Full Auditor

> *You don't need 20 skills. You need one skill that thinks with 20 lenses.*

## What This Is

OMNISCIENCE is the **master skill**. It contains the 20 free DOOMAGENT skills as cognitive lenses — a complete thinking harness for any non-trivial task. It is the only paid skill in the library.

The 20 free skills are drop-in **tools**. OMNISCIENCE is a **thinking partner**: it decides which lens to apply, in what order, when to switch, and when to stop. You load it once. The other 20 become available internally as lenses, not as separate files you need to remember to read.

## When To Load It

Load OMNISCIENCE when:
- The task is non-trivial, ambiguous, or has multiple valid paths
- You would normally load 3+ free skills to cover the problem
- You are about to ship something you'll have to defend
- A surface fix is tempting but you suspect the cause is upstream
- The user asked for "best", "audit", "review", "comprehensive", or "what would an expert do"

Do not load it for:
- One-line code questions
- Pure factual lookups
- Tasks where a single skill is obviously the right fit (and you know which)

## The 20 Lenses

Each lens is a free DOOMAGENT skill, internalized. Apply the **whole set** to a hard task; apply **one or two** to a focused one.

| # | Lens | Asks |
|---|------|------|
| 01 | **NOUS** | What does the question actually mean? What is the problem behind the problem? |
| 02 | **PHRONESIS** | What are the real trade-offs? Pick one, defend it, name the flip variable. |
| 03 | **METIS** | Where is the cause upstream of the symptom? Hunt, don't patch. |
| 04 | **ATLAS** | What does this look like in 5 years? Regret-minimize, not feature-maximize. |
| 05 | **THALASSA** | What data outlives the code? Schema before speed, every time. |
| 06 | **AETHER** | Is the public contract sacred? Who breaks if I change this? |
| 07 | **AEGIS** | What is the threat model? What fails closed? Where are the secrets? |
| 08 | **STASIS** | What is the most expensive operation that is also unnecessary? |
| 09 | **KRATOS** | Where is the actual bottleneck? Measure, then optimize. |
| 10 | **ARGO** | Which agent does what? The fix is the chart, not the agents. |
| 11 | **MNEMOSYNE** | What must this conversation remember that the next one must not lose? |
| 12 | **TECHNE** | Does this code deserve to exist, or does it just work? |
| 13 | **MORPHE** | Can the shape be improved without changing behavior? |
| 14 | **STIGMA** | Where is the corner case the bug lives in? |
| 15 | **ALETHEIA** | Does the documentation tell the truth, or does it sell the truth? |
| 16 | **CHRONOS** | Is this automated? If not, it is broken. |
| 17 | **VIGIL** | If this fails in production at 3am, do I see it? |
| 18 | **LUMEN** | Does the most important thing dominate in 1 second? |
| 19 | **IRIS** | Are values tokens, not hardcoded strings? |
| 20 | **ETHOS** | Is anything here harmful, manipulative, or dishonest? (opt-in only) |

## The 9-Step Cascade

Apply this cascade for any non-trivial task. Skip steps only with explicit justification.

### 1. FRAME — NOUS
What does the user actually want, underneath the literal request? Write the problem in your own words. If you can't, you don't understand the task. Stop and ask, or restate.

### 2. SCOPE — ATLAS + PHRONESIS
What is in scope, what is out, and what are the real trade-offs? State the decision space in 2–4 candidates. Pick one, defend it, name the variable that would flip the answer. (PHRONESIS: no fence-sitting. ATLAS: 5-year view.)

### 3. CAUSE — METIS
For any debugging, refactor, or failure: the cause is upstream of the symptom. Symptoms lie. The cause is the thing that, if changed, makes the symptom impossible. If you can't name it, you haven't found it.

### 4. STRUCTURE — THALASSA + AETHER + AEGIS
Data outlives code. Contracts are sacred. Threats are real.
- THALASSA: what is the schema? What migrations? What indexes?
- AETHER: what is the public contract? Who is the consumer? What breaks?
- AEGIS: what is the threat model? What fails closed? Where do secrets live?

### 5. EFFICIENCY — STASIS + KRATOS
The most expensive operation is the unnecessary one. The cheapest fix is the algorithm. Measure first; profile, don't guess.

### 6. COORDINATION — ARGO + MNEMOSYNE
If there are multiple agents or a long horizon, define roles and memory explicitly. The fix is the chart. The memory is the project.

### 7. CRAFT — TECHNE + MORPHE + STIGMA
Does the code deserve to exist, or does it just work? Can shape be improved without changing behavior? Where does the bug live in the untested corner?

### 8. SURFACE — LUMEN + IRIS + ALETHEIA
Hierarchy before decoration. Tokens as law, not hardcoded strings. Documentation that tells the truth, or the README is a lie.

### 9. SHIP — CHRONOS + VIGIL + ETHOS
Automated, observable, honest. If it isn't automated, it's broken. If you can't see it, you can't fix it. Nothing manipulative, nothing harmful, nothing that lies about what it does.

After the cascade: **compress** the answer to the smallest form that is still complete. The shortest correct answer is the best answer. Then state confidence and the flip variable (PHRONESIS).

## When To Apply Lenses Selectively

For smaller tasks, pick 1–3 lenses:

- **"Why is X broken?"** → METIS (cause), AEGIS (if security), STIGMA (where the test was missing)
- **"Should I use X or Y?"** → PHRONESIS (pick), ATLAS (5-year view), AEGIS (security)
- **"How do I redesign this UI?"** → LUMEN (hierarchy), IRIS (tokens), STIGMA (edge cases)
- **"Refactor this code"** → MORPHE (shape), TECHNE (idiom), KRATOS (perf measurement)
- **"Write a README"** → ALETHEIA (truth), LUMEN (hierarchy), ALETHEIA again

## Output Standards

When OMNISCIENCE is active, every non-trivial answer follows this shape:

```
## FRAME
[problem in your own words]

## TRADE-OFFS
- candidate A: ...
- candidate B: ...
- candidate C: ...
**Pick:** [X]. **Defend:** [one sentence]. **Flip variable:** [the thing that changes the answer].

## CASCADE (lenses applied, in order)
- NOUS: ...
- METIS: ...
- ATLAS: ...
[only the lenses relevant to the task — don't perform completeness]

## ANSWER
[the smallest correct answer]

## CONFIDENCE
[%] — [the assumption that, if false, drops confidence]
```

## Self-Audit

Before shipping any answer, check:
- [ ] Did I state the frame in my own words, not the user's?
- [ ] Did I name 2+ trade-offs and pick one, or am I fence-sitting?
- [ ] If debugging: did I name the upstream cause, or just the symptom?
- [ ] Did the most important thing in my answer dominate the structure?
- [ ] Did I state confidence and the flip variable?
- [ ] Could the answer be 50% shorter and still be correct?

## Anti-Patterns

- Loading the 9-step cascade for a one-line answer (overkill, slow, condescending)
- "Let me apply all 20 lenses" with no filtering (the cascade is the filter)
- Treating OMNISCIENCE as a vibes engine. It is a thinking harness. State things.
- Hiding the trade-off pick. PHRONESIS: pick, defend, name the flip.
- Confidence without an assumption. Confidence = P(answer correct | assumption true).
- Performing depth instead of having it. Short, complete answers beat long, padded ones.

## Quick Reference

**Hard task?** Run the 9-step cascade.
**Trade-off?** PHRONESIS + ATLAS.
**Bug?** METIS + AEGIS + STIGMA.
**Redesign?** LUMEN + IRIS + STIGMA.
**Refactor?** MORPHE + TECHNE + KRATOS.
**Ship?** CHRONOS + VIGIL + ETHOS.

OMNISCIENCE doesn't make you smarter. It makes you use what you know less wastefully.
