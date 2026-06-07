import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Scroll-driven Y parallax. Wraps children and translates them on Y
 * based on the element's scroll position. Pure transform.
 *
 * Props:
 *  - from: px start offset (default 0)
 *  - to:   px end offset (default -80)
 *  - target: optional ref to track (default: self)
 *  - as: tag name (default 'div')
 */
export default function Parallax({
  children,
  from = 0,
  to = -80,
  as: As = 'div',
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])
  const MotionAs = motion[As] || motion.div

  return (
    <MotionAs ref={ref} className={className} style={{ y }} {...rest}>
      {children}
    </MotionAs>
  )
}
