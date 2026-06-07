import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'

/**
 * Reveal wrapper. Fades + translates children into view the first
 * time they enter the viewport. Uses transform + opacity only.
 *
 * Props:
 *  - y:    Y translate distance in px (default 24)
 *  - x:    X translate distance in px (default 0)
 *  - blur: optional initial blur in px (default 0)
 *  - delay: seconds (default 0)
 *  - duration: seconds (default 0.7)
 *  - once: stay visible after first reveal (default true)
 *  - as: tag name (default 'div')
 */
export default function Reveal({
  children,
  y = 24,
  x = 0,
  blur = 0,
  delay = 0,
  duration = 0.7,
  once = true,
  as: As = 'div',
  className = '',
  ...rest
}) {
  const [ref, inView] = useInView({ once, threshold: 0.15 })
  const MotionAs = motion[As] || motion.div

  return (
    <MotionAs
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? `blur(${blur}px)` : 'blur(0px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, x, filter: blur ? `blur(${blur}px)` : 'blur(0px)' }
      }
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionAs>
  )
}
