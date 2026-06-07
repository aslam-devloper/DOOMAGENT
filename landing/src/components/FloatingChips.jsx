import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * A field of skill-name chips that float in 3D space with subtle
 * parallax and continuous motion. Pure transform — chips are absolutely
 * positioned and animated independently.
 *
 * Props:
 *  - chips: array of { name, accent? } strings
 *  - density: how many to render (default: chips.length)
 *  - depth: max translateZ range (default 120)
 */
export default function FloatingChips({ chips, depth = 120, className = '' }) {
  const items = useMemo(() => {
    if (!chips || !chips.length) return []
    return chips.map((c, i) => {
      const r = hash(`${c.name}-${i}`)
      const x = (r % 100) / 100
      const y = ((r >> 8) % 100) / 100
      const dur = 8 + ((r >> 4) % 7)
      const delay = ((r >> 12) % 6) * 0.5
      const size = ((r >> 6) % 3) + 1 // 1..3
      const tz = ((r >> 3) % depth) - depth / 2
      const dx = ((r >> 5) % 40) - 20
      const dy = ((r >> 9) % 30) - 15
      return { c, x, y, dur, delay, size, tz, dx, dy }
    })
  }, [chips, depth])

  return (
    <div className={`floating-chips ${className}`} aria-hidden>
      {items.map((it, i) => (
        <motion.div
          key={i}
          className={`fc fc-s${it.size} ${it.c.accent ? 'fc-accent' : ''}`}
          style={{
            left: `${it.x * 100}%`,
            top: `${it.y * 100}%`,
            z: it.tz,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.25, 0.55, 0.25],
            x: [0, it.dx, 0],
            y: [0, it.dy, 0],
            scale: [0.95, 1.05, 0.95],
            rotateZ: [(it.dx / 6), -(it.dy / 6), (it.dx / 6)],
          }}
          transition={{
            duration: it.dur,
            delay: it.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          data-cursor
        >
          <span>{it.c.name}</span>
        </motion.div>
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
