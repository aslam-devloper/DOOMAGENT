import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Magnetic button. The element's center is pulled toward the cursor
 * while the cursor is inside its bounding box (with a deadzone in
 * the center to avoid jitter on small buttons). Pure transform.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  deadzone = 0.25,
  className = '',
  as: As = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const sx = useSpring(tx, { stiffness: 280, damping: 22, mass: 0.3 })
  const sy = useSpring(ty, { stiffness: 280, damping: 22, mass: 0.3 })

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const max = Math.max(r.width, r.height) / 2
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < max * deadzone) {
      tx.set(0); ty.set(0); return
    }
    tx.set(dx * strength)
    ty.set(dy * strength)
  }
  function onLeave() {
    tx.set(0); ty.set(0)
  }

  const Component = motion[As] || motion.div

  return (
    <Component
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, willChange: 'transform', display: 'inline-block' }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}
