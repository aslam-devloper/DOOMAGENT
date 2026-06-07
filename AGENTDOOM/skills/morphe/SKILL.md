---
name: morphe
description: Refactoring, code shape, structural improvement, behavior-preserving transformations. Use when user says "refactor", "restructure", "improve structure", "extract method", "this is messy", "clean up the code", or asks for behavior-preserving improvements. Behavior is invariant. For adding features, branch first. For multi-domain, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [refactoring, code-shape, behavior-preserving, restructuring]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# MORPHE

> *MORPHE is the shape lens. One concern: improve structure without changing behavior. Tests gate the work. One transformation at a time.*

## Philosophy

Shape is correctness. Code that reads like prose is code that survives. Refactoring is not "tidying up" — it's making the structure match the intent so the next change is easy.

Three laws:
1. Behavior is invariant. If the tests passed before, they pass after. If there are no tests, write them first.
2. Small steps, always. Each refactor is one mechanical transformation. If you can't describe the step in one sentence, you're not refactoring, you're rewriting.
3. The smell has a name. "Extract method", "replace conditional with polymorphism", "introduce parameter object". Naming the pattern is half the work.

## When This Activates

- "Refactor this"
- "This is messy"
- "Extract a method"
- "Reduce nesting"
- "Rename for clarity"
- "Split this class"
- "Behavior-preserving change"
- "Make this testable"

## When NOT to Use This

- **No tests exist** — write characterization tests first. Refactoring without tests is not refactoring, it's gambling.
- **Behavior change is wanted** — that's a feature, branch first. Refactor on a separate branch.
- **Code quality in style only** (idiomatic, naming, format) — use TECHNE for craftsmanship. MORPHE is structural shape (extract method, move responsibility, replace conditional).
- **Performance refactor** — use KRATOS. MORPHE preserves behavior; KRATOS preserves behavior while making it faster. Different lens.
- **Architecture-level refactor** (splitting services, changing data flow) — use ATLAS. MORPHE is in-codebase structural improvement.
- **Multi-domain tasks (refactor + perf + tests + ship)** — load OMNISCIENCE.

## Kill Signal

Stop and restart when:
- **No tests exist for the code being refactored.** Stop. Write characterization tests first. Refactoring untested code is gambling; the "behavior preservation" cannot be verified.
- **The "refactor" changes behavior.** That's a feature, not a refactor. Branch. Implement. Test. Merge. Do not mix.
- **Multiple transformations in one commit.** Each transformation is one mechanical change. If you can't describe the commit in one sentence ("extract method", "rename for intent"), split it.
- **The code gets longer and not clearer.** Revert. A refactor that doesn't improve readability is a rewrite. Reject.
- **You're adding features "while you're in there".** Stop. Refactor on its own branch. Features on their own. Mix = merge hell.
- **Scope drifts from "shape" to "rewrite".** MORPHE is incremental, mechanical, behavior-preserving. "Rewrite this whole module" is not MORPHE; it's TECHNE + a new design.
- **The smell is named but the fix is not.** "This is messy" is not actionable. Name the smell (long method, feature envy, data clump). Name the fix (extract method, move method, extract class). Then apply.

## Behavior Rules

1. Tests before refactor. If there are no tests, write characterization tests that capture current behavior. Then refactor.
2. One transformation at a time. Run tests between each. Commit between each.
3. Name the smell, name the fix. "Long method" → "Extract method". "Switch statement" → "Replace conditional with polymorphism".
4. Don't add features during a refactor. Behavior is invariant. If you want to add a feature, branch.
5. The code should be SHORTER or CLEARER after, not just different. If it's longer and not clearer, revert.

## Mini-protocol

1. Map the current shape. Find the seams.
2. Extract the change. Make it behavior-preserving.
3. Run the full test suite. Commit small.

## Workflow

1. TEST: ensure tests exist and pass. If not, write characterization tests first.
2. IDENTIFY: name the smell. (Long method, duplicate code, large class, long parameter list, feature envy, etc.)
3. CHOOSE: name the fix. (Extract method, extract class, rename, move method, etc.)
4. APPLY: the transformation. One mechanical change.
5. VERIFY: tests still pass.
6. COMMIT: small commit, clear message.
7. REPEAT: until the code reads like the spec.

## Common Smells and Fixes

| Smell | Fix |
|---|---|
| Long method (>20 lines) | Extract method |
| Duplicate code | Extract method (3rd occurrence = pattern) |
| Long parameter list (>3) | Introduce parameter object |
| Switch on type | Replace conditional with polymorphism |
| Feature envy (method uses other class more than its own) | Move method |
| Data clump (same fields together everywhere) | Extract class |
| Primitive obsession (using strings/numbers for domain concepts) | Replace with value object |
| Comments explaining what code does | Rename or extract method |
| Dead code | Delete it (VCS remembers) |

## Output Format

```
SMELL
<name from the catalog — long method, feature envy, data clump, ...>

FIX
<name from the catalog — extract method, move method, extract class, ...>

BEFORE
<the current code, with the smell visible>

AFTER
<the refactored code, with the smell gone>

TESTS
<the characterization tests that lock in behavior — added first if not present>

COMMIT MESSAGE
<refactor: <fix name> from <module/function name>>

VERIFICATION
<test suite run — passed / failed>

CONFIDENCE: <X%> — <the behavior assumption that, if wrong, drops this the most>
FLIP VARIABLE: <if the behavior was actually wrong and the "smell" was load-bearing, the refactor is wrong>
```

## Self-Audit

- [ ] Do tests exist and pass before starting?
- [ ] Am I doing one transformation, or multiple?
- [ ] Is the result shorter or clearer, or just different?
- [ ] Did I commit between transformations?
- [ ] Did I avoid adding features during the refactor?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **techne** — make the new shape idiomatic
- **stigma** — behavior tests are the safety net
- **atlas** — structural refactor needs an architectural map
- **kratos** — performance refactor (different lens, same discipline)
- **omniscience** — when refactor bleeds into design or ship-readiness

## Quick Reference

| Signal | Action |
|---|---|
| "Refactor this" | MORPHE — tests first, one transformation, commit |
| "This is messy" | MORPHE — name the smell, name the fix, apply |
| "Make it more idiomatic" | TECHNE |
| "It's slow, refactor for perf" | KRATOS |
| "Rewrite this module" | ATLAS (design) → MORPHE (incremental) |
| "Add tests so I can refactor" | STIGMA first, then MORPHE |
| "Refactor + add a feature" | Branch, MORPHE one branch, feature another |

## Examples

**Input:** "This function is 80 lines and does 4 things."

**Output:**
```
SMELL
Long method (80 lines, 4 responsibilities)

FIX
Extract method (×4)

BEFORE
function processOrder(order) {
  // 20 lines: validate order
  // 20 lines: charge payment
  // 20 lines: send confirmation
  // 20 lines: update inventory
}

AFTER
function processOrder(order) {
  validateOrder(order);
  const payment = chargePayment(order);
  sendConfirmation(order, payment);
  updateInventory(order, payment);
}

TESTS
- Characterization tests added first (one per responsibility)
- All pass before refactor; all pass after

COMMIT MESSAGES
- refactor: extract validateOrder from processOrder
- refactor: extract chargePayment from processOrder
- refactor: extract sendConfirmation from processOrder
- refactor: extract updateInventory from processOrder

VERIFICATION
Test suite: passed (4 commits, behavior identical)

CONFIDENCE: 95% — assuming the 4 sections are independent and the existing tests cover the integration.
FLIP VARIABLE: If validateOrder needs to share state with chargePayment (e.g., a normalized total), the 4-way split is wrong and you need a different boundary.
```

## Anti-Patterns

- Refactoring without tests
- "Refactoring" that adds features
- Multi-step refactors in one commit
- Renaming without grep
- "I would write it differently" without a specific smell
- Refactoring during a feature branch (mixes concerns)
- Refactoring that makes the code longer and not clearer
- Deleting tests because "they were testing the old way"
- Refactoring in a hurry (refactoring is a thinking activity)
- "Refactor" as a vague word for "rewrite"
