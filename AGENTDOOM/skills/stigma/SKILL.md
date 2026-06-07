---
name: stigma
description: Testing, QA, edge case hunting, test design, coverage strategy. Use when user says "test this", "write tests", "QA", "edge case", "coverage", "this is breaking", or any request to verify behavior, hunt bugs, or design test suites. Test the failure, not the feature. For the bug itself, defer to METIS. For multi-domain, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [testing, qa, edge-cases, coverage, verification]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# STIGMA

> *STIGMA is the test lens. One concern: cover the failure modes, not just the happy path. The test name is the spec. The unhandled case is the bug.*

## Philosophy

Untested code is broken code. The corner case is where the bug lives. The happy path is where the user starts. Both matter, but only the corner case kills you in production.

Three laws:
1. Test the failure, not the feature. The feature works once. The failure mode is what defines whether the code is real.
2. Edge cases are the test suite. Empty input. Null. Negative. Zero. Maximum. Concurrent. The unhandled case is the bug.
3. The test is the spec. If the test doesn't say what the code should do, the test is wrong. Tests are executable documentation.

## When This Activates

- "Write tests for this"
- "What's the test coverage"
- "This is breaking in production"
- "Edge case"
- "QA this"
- "Set up testing"
- "Unit / integration / e2e"
- "Hunt the bug"

## When NOT to Use This

- **Debugging a known bug** — use METIS. STIGMA writes the test that catches the regression; METIS finds the cause.
- **Test framework choice** — that's PHRONESIS (Jest vs Vitest vs Pytest, etc.). STIGMA is the strategy, not the tool.
- **Performance testing** — use KRATOS (load tests, latency tests) + VIGIL (production metrics).
- **Visual regression / snapshot tests** — adjacent but specialized. Default: include in STIGMA if the team's tooling supports it; otherwise separate.
- **Code review of testability** — use TECHNE or MORPHE. STIGMA is the test design, not the code shape.
- **Multi-domain tasks (tests + perf + CI + ship)** — load OMNISCIENCE.

## Kill Signal

Stop and restart when:
- **The test is testing the implementation, not the contract.** Refactor the test. Test the public API. If you test internal calls, refactoring breaks tests for no reason.
- **The test name is `test1`, `test2`, `test_foo`.** Stop. The test name is the spec. "rejects negative numbers" is documentation. `test1` is not.
- **Tests share state or depend on order.** Stop. Each test must be independent. Shared state = flaky tests = tests that get ignored.
- **Happy path is covered but failure modes are not.** Stop. The happy path works once. The failure mode is the test. Add the edges.
- **The test doesn't assert.** A test without an assertion is not a test. It's a smoke check. Add the assertion.
- **Coverage is being chased as a goal.** 100% coverage with bad tests is worse than 80% coverage with good tests. Cover the high-risk paths.
- **Tests are flaky (timing-dependent, order-dependent, network-dependent).** Stop. Flaky tests get disabled, then deleted. Fix the flake.
- **Scope drifts to "set up the whole test infrastructure".** Out of scope for one STIGMA task. Pick the surface. Test that. Move on.

## Behavior Rules

1. Cover the failure modes, not just the happy path. Empty, null, negative, zero, max, concurrent, malformed, unauthorized.
2. Test the contract, not the implementation. If you test internal calls, refactoring breaks tests. Test the public API.
3. Each test is independent. No shared state, no order dependence, no "the previous test set this up."
4. The test name is the spec. `it('rejects negative numbers', ...)` is documentation. `it('test 1', ...)` is not.
5. Coverage is a signal, not a goal. 100% coverage with bad tests is worse than 80% coverage with good tests.

## Mini-protocol

1. List the behaviors that must hold. Pick the edges.
2. Write a failing test before the fix.
3. Run the full suite. Did anything else move?

## Workflow

1. SPEC: what should this code do? (Inputs, outputs, side effects, error cases.)
2. CASES: enumerate. Happy path, edge cases, failure modes. The unhandled case is the bug.
3. ARRANGE / ACT / ASSERT: the test structure. Arrange (setup), Act (call), Assert (verify).
4. NAME: the test name states the contract. "rejects negative numbers" beats "test_add".
5. RUN: tests should be fast (unit: <100ms each), deterministic (no flake), independent.
6. COVERAGE: target the high-risk paths, not arbitrary %.

## Edge Case Categories (always test these)

- **Empty**: empty string, empty array, empty object
- **Null/undefined**: explicit null, missing key
- **Negative/zero**: zero, negative, very small
- **Maximum**: very large, max int, max string length
- **Concurrent**: parallel calls, race conditions
- **Malformed**: bad JSON, wrong types, missing required fields
- **Unauthorized**: missing auth, wrong auth, expired auth
- **Network failure**: timeout, 5xx, malformed response
- **Time**: timezone, DST, leap year, leap second
- **Unicode**: emoji, RTL, combining characters

## Output Format

```
SPEC
- <what this code does — inputs, outputs, side effects, errors>

TEST CASES
- Happy: <the one path that should "just work">
- Edge: <empty, null, zero, max, negative, concurrent, malformed, unauthorized, time, unicode>
- Failure: <what the code does when it can't succeed>

TEST CODE
<the actual test — Arrange/Act/Assert, named, independent>

EDGE CATEGORIES COVERED
- <category 1>
- <category 2>
- <category 3>

NOT COVERED (intentionally)
- <category> — <reason: out of scope, low risk, integration test covers it>

TEST RUNNER
<framework + how to run + expected duration>

CONFIDENCE: <X%> — <the test assumption that, if wrong, drops this the most>
FLIP VARIABLE: <if the spec changes, these tests are the first to rot>
```

## Self-Audit

- [ ] Are failure modes tested, not just happy path?
- [ ] Is the test independent (no shared state)?
- [ ] Does the test name state the contract?
- [ ] Is the test fast (<100ms for unit)?
- [ ] Is the test deterministic (no flake)?
- [ ] Did I cover the edge case categories?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **metis** — the bug gives you the test
- **morphe** — the test suite is the refactor safety net
- **vigil** — synthetic tests in prod, not only in CI
- **techne** — testable code shape
- **omniscience** — when test strategy bleeds into ship-readiness

## Quick Reference

| Signal | Action |
|---|---|
| "Write tests for this" | STIGMA — spec, edges, Arrange/Act/Assert |
| "This is breaking in prod" | METIS (root cause) + STIGMA (regression test) |
| "Set up testing" | STIGMA (strategy) + PHRONESIS (framework choice) |
| "Refactor this code" | STIGMA first (tests as safety net) → MORPHE |
| "100% coverage goal" | STIGMA — coverage is a signal, not a goal |
| "Test is flaky" | STIGMA — fix the flake, or delete the test |
| "Multi-layer test strategy" | OMNISCIENCE |

## Examples

**Input:** "Write tests for this function: `addTax(price, rate)`."

**Output:**
```
SPEC
- Input: price (number, ≥ 0), rate (number, 0 ≤ rate ≤ 1)
- Output: number = price * (1 + rate)
- Errors: throws on negative price, negative rate, rate > 1, non-numeric inputs

TEST CASES
- Happy: 100 + 10% = 110
- Happy: 100 + 0% = 100 (tax-free)
- Edge: 0 + 10% = 0
- Edge: 100 + 100% = 200 (doubles)
- Edge: 0.01 + 10% (floating point precision)
- Edge: MAX_SAFE_INTEGER + 10% (overflow check)
- Failure: negative price → throws
- Failure: negative rate → throws
- Failure: rate > 1 → throws
- Failure: non-numeric price → throws
- Failure: null price → throws

TEST CODE
```js
describe('addTax', () => {
  // Happy path
  it('adds 10% tax to $100', () => {
    expect(addTax(100, 0.10)).toBe(110);
  });

  it('adds 0% tax for tax-free items', () => {
    expect(addTax(100, 0)).toBe(100);
  });

  // Edge: zero
  it('returns 0 for $0 price', () => {
    expect(addTax(0, 0.10)).toBe(0);
  });

  // Edge: zero rate
  it('returns price unchanged for 0% rate', () => {
    expect(addTax(100, 0)).toBe(100);
  });

  // Edge: 100% rate
  it('doubles price for 100% rate', () => {
    expect(addTax(100, 1.0)).toBe(200);
  });

  // Edge: floating point
  it('handles $0.01 + 10% tax without rounding errors', () => {
    expect(addTax(0.01, 0.10)).toBeCloseTo(0.011, 10);
  });

  // Edge: negative (should reject)
  it('throws on negative price', () => {
    expect(() => addTax(-100, 0.10)).toThrow('price must be non-negative');
  });

  it('throws on negative rate', () => {
    expect(() => addTax(100, -0.10)).toThrow('rate must be non-negative');
  });

  it('throws on rate > 1', () => {
    expect(() => addTax(100, 1.5)).toThrow('rate must be between 0 and 1');
  });

  // Edge: non-numeric
  it('throws on non-numeric price', () => {
    expect(() => addTax('100', 0.10)).toThrow('price must be a number');
  });

  // Edge: null
  it('throws on null price', () => {
    expect(() => addTax(null, 0.10)).toThrow();
  });

  // Edge: very large
  it('handles Number.MAX_SAFE_INTEGER without overflow', () => {
    expect(addTax(Number.MAX_SAFE_INTEGER, 0.10)).toBeGreaterThan(Number.MAX_SAFE_INTEGER);
  });
});
```

EDGE CATEGORIES COVERED
zero, max, floating point, negative (rejection), rate bounds, non-numeric, null, large

NOT COVERED
- Concurrent calls — pure function, no shared state, N/A
- Unicode — numeric input, N/A

CONFIDENCE: 90% — spec is well-defined and edges are covered.
FLIP VARIABLE: If the spec changes (e.g., rate is now in basis points), every assertion needs updating.
```

## Anti-Patterns

- Testing the implementation, not the contract
- Tests with shared state (one test sets up the next)
- `test1`, `test2`, `test3` as names
- Testing only the happy path
- Flaky tests (timing-dependent, order-dependent)
- Slow tests in the unit suite
- "100% coverage" with no assertion in the test
- Mocking the thing you're testing
- Test that doesn't assert
- "Just add a test" without specifying what behavior is being verified
- Coverage goals that override test quality
