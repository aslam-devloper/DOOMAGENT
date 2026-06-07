import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion'
import useMouse from '../hooks/useMouse'

/**
 * 3D mouse-tilt wrapper. Wraps children in a perspective container and
 * rotates the inner element toward the cursor, with a subtle scale lift
 * on hover. Pure transform — GPU-friendly, no layout work.
 *
 * Props:
 *  - maxTilt:   degrees (default 8)
 *  - scale:     hover scale (default 1.02)
 *  - glare:     add a radial light follower (default false)
 *  - disabled:  skip binding (default false)
 */
export default function Tilt({
  children,
  maxTilt = 8,
  scale = 1.02,
  glare = false,
  disabled = false,
  className = '',
  style = {},
  as: As = 'div',
  ...rest
}) {
  const mouse = useMouse()
  const ref = useRef(null)

  // Use motion values so updates bypass React render and write to the DOM
  // via Framer's optimized setter.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const s = useMotionValue(1)

  const rotY = useTransform(mx, [-1, 1], [-maxTilt, maxTilt])
  const rotX = useTransform(my, [-1, 1], [maxTilt, -maxTilt])

  const sx = useSpring(rotX, { stiffness: 220, damping: 22, mass: 0.4 })
  const sy = useSpring(rotY, { stiffness: 220, damping: 22, mass: 0.4 })
  const ss = useSpring(s, { stiffness: 260, damping: 24, mass: 0.3 })

  function onMove(e) {
    if (disabled) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    mx.set(px * 2 - 1)
    my.set(py * 2 - 1)
  }
  function onEnter() {
    if (!disabled) s.set(scale)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
    s.set(1)
  }

  const Component = motion[As] || motion.div

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ perspective: '1000px', display: 'block', willChange: 'transform' }}
      className={className}
    >
      <Component
        style={{
          ...style,
          rotateX: sx,
          rotateY: sy,
          scale: ss,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        {...rest}
      >
        {children}
      </Component>
    </div>
  )
}
