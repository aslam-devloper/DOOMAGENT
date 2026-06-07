import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import useMouse from '../hooks/useMouse'

/**
 * Animated mesh gradient. A fixed background of three colored blobs
 * that drift in 3D space and respond to the cursor. Pure CSS +
 * transform — no canvas, no shader, no big bundle.
 */
export default function MeshGradient() {
  const mouse = useMouse()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.8 })
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.8 })

  const a1x = useTransform(smx, [-1, 1], [-30, 30])
  const a1y = useTransform(smy, [-1, 1], [-20, 20])
  const a2x = useTransform(smx, [-1, 1], [40, -40])
  const a2y = useTransform(smy, [-1, 1], [30, -30])
  const a3x = useTransform(smx, [-1, 1], [-25, 25])
  const a3y = useTransform(smy, [-1, 1], [-35, 35])

  useEffect(() => {
    mx.set(mouse.nx)
    my.set(mouse.ny)
  }, [mouse.nx, mouse.ny, mx, my])

  return (
    <div className="mesh" aria-hidden>
      <motion.div
        className="mesh-blob a1"
        style={{ x: a1x, y: a1y }}
      />
      <motion.div
        className="mesh-blob a2"
        style={{ x: a2x, y: a2y }}
      />
      <motion.div
        className="mesh-blob a3"
        style={{ x: a3x, y: a3y }}
      />
      <div className="mesh-grain" />
    </div>
  )
}
