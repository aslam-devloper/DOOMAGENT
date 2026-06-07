import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { showcases } from '../data/skills.jsx'

/**
 * Horizontal scroll on vertical scroll.
 * As the user scrolls vertically through this section, the track slides
 * horizontally. Progress is shown as a cyan bar at the bottom.
 */
export default function Showcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Use a spring for smoother mapping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.6,
  })

  // Section is 4x viewport tall to give scroll-room
  // We translate from 0% to -X% where X = (trackWidth - viewport) / trackWidth * 100
  const xPercent = useTransform(smoothProgress, [0, 1], ['0%', '-66%'])
  const progressBar = useTransform(smoothProgress, (v) => `${Math.min(100, v * 100)}%`)

  return (
    <section
      id="showcase"
      ref={sectionRef}
      style={{ height: '380vh' }} // gives scroll distance
    >
      <div className="wrap" style={{ paddingTop: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 03 — in action</div>
          <h2>Same model. <span className="ink">Different brain.</span></h2>
          <p className="lead">
            A 7B local model (Llama 3.1 8B, Ollama) answering the same question three times. Each time with a different skill loaded. The shape of the answer changes. The model didn't.
          </p>
        </motion.div>
      </div>

      <div
        className="showcase"
        style={{
          position: 'sticky',
          top: 80,
          paddingTop: 32,
          paddingBottom: 32,
        }}
      >
        <div className="wrap" style={{ overflow: 'hidden' }}>
          <motion.div
            ref={trackRef}
            className="showcase-track"
            style={{ x: xPercent }}
          >
            {showcases.map((s, i) => (
              <div className="showcase-card" key={s.name}>
                <div className="meta">
                  <div className="glyph">{s.glyph}</div>
                  <div className="name">{s.name}</div>
                  <div className="tag">{s.tagline}</div>
                  <p className="intro">{s.intro}</p>
                </div>
                <div className="panels">
                  <div className="panel before">
                    <div className="tag">Without</div>
                    <div className="q">{s.q}</div>
                    <div className="a">{s.before}</div>
                  </div>
                  <div className="panel after">
                    <div className="tag">With {s.name}</div>
                    <div className="q">{s.q}</div>
                    <div className="a">{s.after}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="wrap" style={{ marginTop: 24 }}>
          <div className="showcase-progress">
            <motion.div className="bar" style={{ width: progressBar }} />
          </div>
          <div className="showcase-hint">
            <span>// scroll to compare 3 skills</span>
            <span>METIS · ATLAS · PHRONESIS</span>
          </div>
        </div>
      </div>
    </section>
  )
}
