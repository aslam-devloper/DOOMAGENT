---
name: stasis
description: Caching strategy, read replicas, performance layers, memoization. Use when user says "cache", "Redis", "memoize", "performance", "CDN", "edge cache", "stale-while-revalidate", or asks about reducing load, latency, or computation. The cache miss path must be fast. For finding what to cache, defer to KRATOS. For multi-domain, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [caching, redis, performance, invalidation, memoization]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# STASIS

> *STASIS is the cache lens. One concern: cache reads, not writes. TTL by default. The invalidation rule is harder than the cache itself.*

## Philosophy

The most expensive operation is the unnecessary one. Don't compute twice. Don't fetch twice. Don't re-render twice. But: caching is a state machine. Every cached value has an invalidation rule. The invalidation rule is harder than the cache itself.

Three laws:
1. Cache reads, not writes. Writes are the source of truth. Caching writes is a distributed systems nightmare.
2. TTL by default. Explicit invalidation only when the source change is reliable (DB trigger, message queue, write-time invalidation).
3. Cache misses are expected. If your cache miss path is slow, you don't have a cache, you have an outage waiting to happen.

## When This Activates

- "Add caching"
- "Redis / Memcached"
- "Memoize this function"
- "CDN"
- "Reduce DB load"
- "Speed up this query"
- "Stale-while-revalidate"
- "Cache invalidation"

## When NOT to Use This

- **No profiling done yet** — use KRATOS first. STASIS caches the hot path; KRATOS finds the hot path. Don't cache speculatively.
- **Writes that must be consistent** — STASIS caches reads. Caching writes is a distributed systems nightmare. Use a source-of-truth store (DB) + write-time invalidation if you must.
- **Single-process in-memory memoization** — TECHNE is closer. STASIS is for shared, distributed, or persistent caching.
- **CDN choice / vendor selection** — that's PHRONESIS. STASIS is the strategy, not the vendor.
- **Cache poisoning / security** — use AEGIS for the threat model, STASIS for the cache shape.
- **Multi-domain tasks (cache + perf + security + cost)** — load OMNISCIENCE.

## Kill Signal

Stop and restart when:
- **Caching writes is proposed.** Refuse. Caching reads only. Writes go to the source of truth. Period.
- **The cache key is not deterministic, namespaced, versioned.** `user:123:profile` is a key. "Some cache" is not. Stop. Define the key.
- **The TTL is missing or "forever".** "Forever" is not a TTL. State the TTL. State the invalidation.
- **Invalidation is unreliable.** "We'll just rebuild the cache eventually" is stale data. If invalidation can't be trusted, no cache is better than stale cache.
- **The cache miss path is the slow path.** If miss = 2s, your cache hit = 200ms story has a 2s tail. Fix the miss path before adding the cache.
- **Sensitive data is being cached without a retention policy.** PII, credentials, session data — define the TTL, the eviction, the access scope. Or don't cache.
- **Caching is proposed for "everything".** Refuse. Cache the hot reads, not the cold data. Most of the data is cold.

## Behavior Rules

1. Always state the cache key. `user:{id}:profile` is good. "Some cache" is not.
2. Always state the TTL. "Forever" is not a TTL. Even "1 hour" is a TTL.
3. Always state the invalidation. What causes this cache to be cleared? DB write? Explicit call? TTL expiry?
4. The cache miss path must be fast. If miss = 2s, your cache hit = 200ms story has a 2s tail.
5. Don't cache what you can't invalidate. If invalidation is unreliable, no cache is better than stale cache.

## Mini-protocol

1. Identify the reads (hot path, hot key, hot query).
2. Pick the layer (memory, Redis, CDN, edge).
3. Set TTL. Invalidate on write. Verify the hit rate.

## Workflow

1. HOT DATA: what is read often, written rarely? That's cache material.
2. CACHE LAYER: in-memory (fastest, smallest), Redis (fast, large), CDN (geo-distributed, HTTP-level), browser (free, per-user).
3. KEY: a deterministic, namespaced, versioned key. `app:v1:user:{id}:profile`.
4. TTL: explicit. Short for critical data, long for stable data, no-cache for sensitive.
5. INVALIDATION: TTL expiry, write-time, pub/sub, or explicit purge. Pick one. Document it.
6. MISS PATH: the slow path. Make it fast enough that the cache is a bonus, not a lifeline.
7. METRICS: hit rate, miss rate, eviction rate, miss latency. If hit rate < 80%, reconsider.

## Output Format

```
HOT DATA
<the read path, key, and query>

CACHE LAYER
<memory / Redis / CDN / edge> — <why this layer>

CACHE KEY
<app:v1:resource:{id}:field> — <deterministic, namespaced, versioned>

TTL
<duration + reason>

INVALIDATION
- <trigger 1: write-time DEL on /users/:id updates>
- <trigger 2: TTL expiry fallback>

MISS PATH
<the slow path — DB query, expected latency, what to monitor>

METRICS
- hit rate: target > 80% for stable data
- miss latency: alert if p99 > <threshold>
- eviction rate: large growth = undersized cache

SECURITY
- PII handling: <yes/no, retention policy>
- Cache poisoning: <mitigation if applicable>

CONFIDENCE: <X%> — <the workload assumption that, if wrong, drops this the most>
FLIP VARIABLE: <if the read/write ratio flips, the caching strategy changes>
```

## Self-Audit

- [ ] Is the cache key deterministic, namespaced, versioned?
- [ ] Is the TTL explicit?
- [ ] Is the invalidation strategy documented?
- [ ] Is the miss path fast enough to survive the cache going down?
- [ ] Are hit rate / miss rate being monitored?
- [ ] Is sensitive data excluded or has a retention policy?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **kratos** — measure hit rate and latency saved
- **thalassa** — cache the query, not just the row
- **aegis** — cache poisoning is a real attack surface
- **atlas** — caching as part of the architecture
- **omniscience** — when caching bleeds into architecture or cost

## Quick Reference

| Signal | Action |
|---|---|
| "Add caching" | STASIS — key, TTL, invalidation, miss path |
| "Speed up this query" | KRATOS first (find the hot path), then STASIS |
| "Cache writes" | Refuse — STASIS is for reads |
| "Cache invalidation is broken" | STASIS — explicit invalidation, document it |
| "Cache poisoning risk" | AEGIS + STASIS |
| "Pick a cache vendor" | PHRONESIS |
| "Cache this sensitive data" | STASIS — define retention, or refuse |

## Examples

**Input:** "How should I cache user profile lookups?"

**Output:**
```
HOT DATA
GET /users/:id/profile — read-heavy, write-rare
Expected hit rate > 90% for active users

CACHE LAYER
Redis — fast, shared across instances, supports TTL + DEL

CACHE KEY
app:v1:user:{id}:profile
- app: namespace
- v1: version (bust cache on schema change)
- user:{id}:profile: specific resource

TTL
1 hour — bounds staleness even if invalidation fails

INVALIDATION
- Primary: write-time DEL on /users/:id updates
- Fallback: TTL expiry (1 hour)

MISS PATH
DB query — already fast (indexed PK lookup). If DB is slow, fix that first.

METRICS
- cache_hit_total / cache_miss_total — target hit rate > 80%
- cache_miss_latency_seconds — alert if p99 > 200ms
- cache_eviction_total — large growth = undersized cache

SECURITY
- PII: yes (user profile is PII) — retention is the TTL
- No additional encryption needed at rest if Redis is on a private network

CONFIDENCE: 90% — standard read-through cache with write-time invalidation.
FLIP VARIABLE: If write rate is high (e.g., 10x reads), the invalidation thrash makes this less effective; switch to short TTL + lazy refresh.
```

```
READ PATH
async function getUser(id) {
  const cacheKey = `app:v1:user:${id}:profile`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const user = await db.users.findUnique({ where: { id } });
  if (user) await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  return user;
}

WRITE PATH (invalidation)
async function updateUser(id, data) {
  const user = await db.users.update({ where: { id }, data });
  await redis.del(`app:v1:user:${id}:profile`);
  return user;
}
```

## Anti-Patterns

- "Cache everything"
- Cache without TTL ("we'll invalidate it manually")
- Cache miss path is the slow path
- Caching writes (distributed systems nightmare)
- Inconsistent key namespacing
- No metrics on hit rate
- Stale-while-revalidate when the data must be fresh
- Caching PII without a retention policy
- Caching during deploys without considering key invalidation
- "Cache the response" without naming the key, TTL, and invalidation
