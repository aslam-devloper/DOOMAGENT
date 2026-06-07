import { useRef } from 'react'
import { getMouse } from '../hooks/useMouse'

/**
 * Magnetic wrapper — perf version.
 *
 * Single rAF loop, writes transform directly. No springs.
 * Deadzone in the center to avoid jitter on small buttons.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  deadzone = 0.25,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const stateRef = useRef({ tx: 0, ty: 0, targetX: 0, targetY: 0, hovering: false })
  const rafRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth <= 700) return

    function onMove(e) {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const max = Math.max(r.width, r.height) / 2
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < max * deadzone) {
        stateRef.current.targetX = 0
        stateRef.current.targetY = 0
      } else {
        stateRef.current.targetX = dx * strength
        stateRef.current.targetY = dy * strength
      }
      stateRef.current.hovering = true
    }
    function onLeave() {
      stateRef.current.targetX = 0
      stateRef.current.targetY = 0
      stateRef.current.hovering = false
    }
    function loop() {
      const s = stateRef.current
      s.tx += (s.targetX - s.tx) * 0.18
      s.ty += (s.targetY - s.ty) * 0.18
      el.style.transform = `translate3d(${s.tx.toFixed(1)}px, ${s.ty.toFixed(1)}px, 0)`
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, deadzone])

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }} {...rest}>
      {children}
    </div>
  )
}
