import { useEffect, useRef, useState } from 'react'

/**
 * Track the global mouse position with a smoothed, laggy value.
 * Returns raw (instant) and smoothed (eased) coordinates plus a normalized
 * -1..1 vector relative to the viewport center.
 *
 * The smoothed value is updated via rAF for buttery motion.
 */
export default function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 })
  const target = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    function onMove(e) {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    function tick() {
      const k = 0.14
      smooth.current.x += (target.current.x - smooth.current.x) * k
      smooth.current.y += (target.current.y - smooth.current.y) * k
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      const cx = w / 2
      const cy = h / 2
      setPos({
        x: target.current.x,
        y: target.current.y,
        nx: (target.current.x - cx) / cx,
        ny: (target.current.y - cy) / cy,
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return pos
}
