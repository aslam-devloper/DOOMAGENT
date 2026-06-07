import { useMemo } from 'react'

/**
 * Floating chips — perf version.
 *
 * Static positions, single CSS keyframe per chip. No JS animation,
 * no rAF, no per-frame writes. The browser composes them on the GPU.
 * Count is reduced to 8 (from 14) to keep the visual field clean
 * and the GPU layer count low.
 */
export default function FloatingChips({ chips, className = '' }) {
  const items = useMemo(() => {
    if (!chips || !chips.length) return []
    return chips.slice(0, 8).map((c, i) => {
      const r = hash(`${c.name}-${i}`)
      const x = (r % 100) / 100
      const y = ((r >> 8) % 100) / 100
      const dur = 12 + ((r >> 4) % 6) // 12-18s — slow
      const delay = ((r >> 12) % 6) * 0.7
      const size = ((r >> 6) % 3) + 1
      const dx = ((r >> 5) % 30) - 15
      const dy = ((r >> 9) % 24) - 12
      return { c, x, y, dur, delay, size, dx, dy }
    })
  }, [chips])

  return (
    <div className={`floating-chips ${className}`} aria-hidden>
      {items.map((it, i) => (
        <div
          key={i}
          className={`fc fc-s${it.size} ${it.c.accent ? 'fc-accent' : ''}`}
          style={{
            left: `${it.x * 100}%`,
            top: `${it.y * 100}%`,
            '--fc-dur': `${it.dur}s`,
            '--fc-delay': `${-it.delay}s`,
            '--fc-dx': `${it.dx}px`,
            '--fc-dy': `${it.dy}px`,
          }}
          data-cursor
        >
          <span>{it.c.name}</span>
        </div>
      ))}
    </div>
  )
}

function hash(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = (h * 16777619) >>> 0
  }
  return h
}
