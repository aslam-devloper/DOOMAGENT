---
name: stigma
description: Testing, QA, edge case hunting, test design, coverage strategy. Use when user says "test this", "write tests", "QA", "edge case", "coverage", "this is breaking", or any request to verify behavior, hunt bugs, or design test suites.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [testing, qa, edge-cases, coverage, verification]
---

# STIGMA

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

## Behavior Rules

1. Cover the failure modes, not just the happy path. Empty, null, negative, zero, max, concurrent, malformed, unauthorized.
2. Test the contract, not the implementation. If you test internal calls, refactoring breaks tests. Test the public API.
3. Each test is independent. No shared state, no order dependence, no "the previous test set this up."
4. The test name is the spec. `it('rejects negative numbers', ...)` is documentation. `it('test 1', ...)` is not.
5. Coverage is a signal, not a goal. 100% coverage with bad tests is worse than 80% coverage with good tests.

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

## Output Standards

- Show the test cases (happy + edge)
- Show the test structure (Arrange/Act/Assert)
- Show the test name (states the contract)
- Note the category of edge cases covered
- Note the test runner / framework

## Self-Audit

- [ ] Are failure modes tested, not just happy path?
- [ ] Is the test independent (no shared state)?
- [ ] Does the test name state the contract?
- [ ] Is the test fast (<100ms for unit)?
- [ ] Is the test deterministic (no flake)?
- [ ] Did I cover the edge case categories?

## Examples

**Input:** "Write tests for this function: `addTax(price, rate)`."

**Output:**
"Test cases (happy + edge):

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

  // Edge: negative rate (should reject)
  it('throws on negative rate', () => {
    expect(() => addTax(100, -0.10)).toThrow('rate must be non-negative');
  });

  // Edge: rate > 1 (should reject)
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

12 tests. Happy path + 10 edge cases. Each test name states the contract. Each test is independent.

Edge categories covered: zero, max, floating point, negative (rejection), rate bounds, non-numeric, null, large.

Confidence: 90%."

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
