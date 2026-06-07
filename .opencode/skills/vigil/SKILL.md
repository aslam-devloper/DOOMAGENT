---
name: vigil
description: Observability, monitoring, logging, alerting, metrics, tracing. Use when user says "monitor", "log", "alert", "observability", "metrics", "tracing", "SLO", "error tracking", "Sentry", "Datadog", or any request to make a system visible.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [observability, monitoring, logging, alerting, metrics, tracing]
---

# VIGIL

## Philosophy

If you can't see it, you can't fix it. If you can't alert on it, you can't prevent it. The dashboard is the system, not the deployment. Logs are a liability unless they're structured.

Three laws:
1. Alert on symptoms, not causes. "p99 latency > 500ms" is a symptom. "CPU > 80%" is a cause. Alert on what the user feels.
2. Structured logs only. `console.log("user logged in")` is useless. `logger.info("user.login", {userId, duration, ip})` is searchable.
3. Three pillars: logs, metrics, traces. Pick the right one for the question. Logs for events. Metrics for aggregates. Traces for causality.

## When This Activates

- "Set up monitoring"
- "Add logging"
- "Alerting strategy"
- "SLO / SLA"
- "Error tracking (Sentry, etc.)"
- "Distributed tracing"
- "Health check"
- "Why is X slow in production"

## Behavior Rules

1. Every request has a correlation ID. Generated at the edge, propagated through every service and log line.
2. Logs are structured JSON, not strings. `logger.info("event", {key: value})` not `console.log("event happened")`.
3. Never log PII, secrets, or credentials. Audit your log lines for these. Tokenize if you must log the fact.
4. Metrics have units. `request_duration_seconds`, not `request_duration`. `request_size_bytes`, not `request_size`.
5. Alerts have runbooks. "p99 > 500ms" is useless without "here's what to do." Link the runbook in the alert.

## Workflow

1. SIGNALS: what 3-5 things do you need to know? (latency, error rate, throughput, saturation, business KPIs)
2. INSTRUMENT: which pillar? Logs for events, metrics for aggregates, traces for causality.
3. STRUCTURE: JSON logs, metric naming conventions, trace span structure.
4. DASHBOARD: one page per service, with the SLO at the top.
5. ALERT: symptom-based, with runbook, with routing (who gets paged at 3am).
6. REVIEW: weekly. What alerts fired? Were they actionable? What was missing?

## Output Standards

- Show the structured log format with example
- Show the metric naming with units
- Show the alert rule with runbook link
- Show the dashboard layout (one page per service)
- Note the correlation ID propagation

## Self-Audit

- [ ] Are logs structured, not strings?
- [ ] Are metrics named with units?
- [ ] Are alerts on symptoms, not causes?
- [ ] Does every alert have a runbook?
- [ ] Is there a correlation ID for cross-service traces?
- [ ] Are PII / secrets excluded from logs?

## Examples

**Input:** "What should I log in my Express API?"

**Output:**
"Structured JSON. Every request. Every error. Every business event. With a correlation ID.

Logger setup (using pino):
```js
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: { level: (label) => ({ level: label }) },
  timestamp: pino.stdTimeFunctions.isoTime,
});
```

Request middleware (correlation ID + access log):
```js
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || crypto.randomUUID();
  res.setHeader('x-request-id', req.id);
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const duration_ms = Number(process.hrtime.bigint() - start) / 1e6;
    logger.info({
      event: 'http.request',
      requestId: req.id,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration_ms,
      userId: req.user?.id, // if authenticated
    });
  });
  next();
});
```

What to log:
- Every HTTP request (method, path, status, duration, requestId)
- Every error (with stack, requestId, userId, input shape — NOT input values)
- Every business event (signup, purchase, password-reset)
- Every external API call (target, duration, status)

What NEVER to log:
- Passwords, tokens, API keys, secrets
- Credit card numbers, SSN, PII (full name + DOB, address, phone)
- Session cookies
- Request/response bodies that might contain the above

Confidence: 95% on the pattern. Specific fields depend on your domain."

## Anti-Patterns

- `console.log` in production
- Unstructured logs ("something happened, user did thing")
- Logging PII or secrets
- Alerts on every log line (alert fatigue kills observability)
- Metrics without units (`duration` vs `duration_seconds`)
- Dashboards with 50 graphs (the user will ignore them)
- "We'll add monitoring in v2"
- No correlation ID (can't trace a request across services)
- Logging the entire request body (PII, secrets, performance)
