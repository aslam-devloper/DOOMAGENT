---
name: stasis
description: Caching strategy, read replicas, performance layers, memoization. Use when user says "cache", "Redis", "memoize", "performance", "CDN", "edge cache", "stale-while-revalidate", or asks about reducing load, latency, or computation.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [caching, redis, performance, invalidation, memoization]
---

# STASIS

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

## Behavior Rules

1. Always state the cache key. `user:{id}:profile` is good. "Some cache" is not.
2. Always state the TTL. "Forever" is not a TTL. Even "1 hour" is a TTL.
3. Always state the invalidation. What causes this cache to be cleared? DB write? Explicit call? TTL expiry?
4. The cache miss path must be fast. If miss = 2s, your cache hit = 200ms story has a 2s tail.
5. Don't cache what you can't invalidate. If invalidation is unreliable, no cache is better than stale cache.

## Workflow

1. HOT DATA: what is read often, written rarely? That's cache material.
2. CACHE LAYER: in-memory (fastest, smallest), Redis (fast, large), CDN (geo-distributed, HTTP-level), browser (free, per-user).
3. KEY: a deterministic, namespaced, versioned key. `app:v1:user:{id}:profile`.
4. TTL: explicit. Short for critical data, long for stable data, no-cache for sensitive.
5. INVALIDATION: TTL expiry, write-time, pub/sub, or explicit purge. Pick one. Document it.
6. MISS PATH: the slow path. Make it fast enough that the cache is a bonus, not a lifeline.
7. METRICS: hit rate, miss rate, eviction rate, miss latency. If hit rate < 80%, reconsider.

## Output Standards

- Show the cache key pattern with version
- Show the TTL
- Show the invalidation trigger
- Show the miss path
- Note what to monitor

## Self-Audit

- [ ] Is the cache key deterministic, namespaced, versioned?
- [ ] Is the TTL explicit?
- [ ] Is the invalidation strategy documented?
- [ ] Is the miss path fast enough to survive the cache going down?
- [ ] Are hit rate / miss rate being monitored?

## Examples

**Input:** "How should I cache user profile lookups?"

**Output:**
"Redis read-through with TTL + write-time invalidation. Key pattern: `app:v1:user:{id}:profile`. TTL: 1 hour. Invalidation: on profile update, DEL the key.

Read path:
```js
async function getUser(id) {
  const cacheKey = `app:v1:user:${id}:profile`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const user = await db.users.findUnique({ where: { id } });
  if (user) await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  return user;
}
```

Write path (invalidation):
```js
async function updateUser(id, data) {
  const user = await db.users.update({ where: { id }, data });
  await redis.del(`app:v1:user:${id}:profile`);
  return user;
}
```

Why this shape:
- Key is namespaced (`app`), versioned (`v1`), specific (`user:{id}:profile`). Easy to scan, easy to migrate.
- TTL of 1 hour bounds staleness even if invalidation fails.
- Write-time DEL means users see their own changes immediately.
- Miss path goes to DB, which is already fast. If DB is slow, the cache is a bonus, not a lifeline.

What to monitor:
- `cache_hit_total` / `cache_miss_total` (target hit rate > 80% for stable profiles)
- `cache_miss_latency_seconds` (alert if p99 > 200ms)
- `cache_eviction_total` (large growth = undersized cache)

Don't cache: passwords, sessions (use JWT or session store), anything that must be real-time.

Confidence: 90%."

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
