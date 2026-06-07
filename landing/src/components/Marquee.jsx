import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion'
import { skills } from '../data/skills.jsx'

export default function Marquee() {
  const ref = useRef(null)
  const xRef = useRef(0)
  const [trackWidth, setTrackWidth] = useState(0)
  const trackRef = useRef(null)

  // Measure track width
  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        // The duplicated track is rendered; the half-width is one full cycle
        setTrackWidth(trackRef.current.scrollWidth / 2)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Scroll velocity drives speed
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smoothVel = useSpring(velocity, { damping: 50, stiffness: 200 })
  const x = useTransform(smoothVel, (v) => {
    if (trackWidth === 0) return '0px'
    const delta = -v * 0.04
    xRef.current += delta
    // wrap
    if (xRef.current < -trackWidth) xRef.current += trackWidth
    if (xRef.current > 0) xRef.current -= trackWidth
    return `${xRef.current}px`
  })

  const items = skills.map(s => s.name.toLowerCase())

  return (
    <div className="marquee" ref={ref}>
      <motion.div className="marquee-track" ref={trackRef} style={{ x }}>
        {[...items, ...items, ...items, ...items].map((name, i) => (
          <span key={i}>
            <span>// {name}</span>
            <span className="hi">{skills[i % skills.length].tags[0]}</span>
            <span className="dot">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
