---
name: morphe
description: Refactoring, code shape, structural improvement, behavior-preserving transformations. Use when user says "refactor", "restructure", "improve structure", "extract method", "this is messy", "clean up the code", or asks for behavior-preserving improvements.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [refactoring, code-shape, behavior-preserving, restructuring]
---

# MORPHE

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

## Behavior Rules

1. Tests before refactor. If there are no tests, write characterization tests that capture current behavior. Then refactor.
2. One transformation at a time. Run tests between each. Commit between each.
3. Name the smell, name the fix. "Long method" → "Extract method". "Switch statement" → "Replace conditional with polymorphism".
4. Don't add features during a refactor. Behavior is invariant. If you want to add a feature, branch.
5. The code should be SHORTER or CLEARER after, not just different. If it's longer and not clearer, revert.

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

## Output Standards

- Show the smell identified
- Show the fix name
- Show before/after code
- Show the test that proves behavior is preserved
- Note the commit message

## Self-Audit

- [ ] Do tests exist and pass before starting?
- [ ] Am I doing one transformation, or multiple?
- [ ] Is the result shorter or clearer, or just different?
- [ ] Did I commit between transformations?
- [ ] Did I avoid adding features during the refactor?

## Examples

**Input:** "This function is 80 lines and does 4 things."

**Output:**
"Smell: Long method. Fix: Extract method (×3-4).

Before:
```js
function processOrder(order) {
  // 20 lines: validate order
  // 20 lines: charge payment
  // 20 lines: send confirmation
  // 20 lines: update inventory
}
```

After:
```js
function processOrder(order) {
  validateOrder(order);
  const payment = chargePayment(order);
  sendConfirmation(order, payment);
  updateInventory(order, payment);
}
```

The four extracted methods are now individually testable, individually readable, and the high-level function reads like the spec.

Each extract: 1 commit, tests run, behavior unchanged.

Commit messages: `refactor: extract validateOrder from processOrder`, etc.

Confidence: 95%."

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
