import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { showcases } from '../data/skills.jsx'
import Reveal from './Reveal'

export default function Showcase() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Subtle Y parallax on the section's meta block
  const headY = useTransform(scrollYProgress, [0, 1], [40, -40])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    function onScroll() {
      const max = el.scrollWidth - el.clientWidth
      const p = max > 0 ? el.scrollLeft / max : 0
      setProgress(p)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  function nudge(dir) {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.show-v2-card')
    const w = card ? card.getBoundingClientRect().width + 28 : 800
    el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <section ref={ref} id="showcase">
      <div className="wrap">
        <motion.div style={{ y: headY }}>
          <Reveal>
            <div className="eyebrow-sm">// 03 — see it work</div>
            <h2>Same prompt. <span className="ink">Different model.</span></h2>
            <p className="lead">
              The library doesn't change the AI. It changes how the AI uses what it knows. Here's the same question, with and without a skill loaded.
            </p>
          </Reveal>
        </motion.div>
      </div>

      <div className="show-v2">
        <div className="show-v2-rail" ref={trackRef}>
          {showcases.map((s, i) => (
            <motion.div
              key={s.name}
              className="show-v2-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              data-cursor
            >
              <div className="meta">
                <div className="glyph">{s.glyph}</div>
                <div className="name">{s.name}</div>
                <div className="tag">{s.tagline}</div>
                <div className="intro">{s.intro}</div>
              </div>
              <div className="panels">
                <div className="show-v2-panel before">
                  <span className="tag">BEFORE</span>
                  <div className="q">{s.q}</div>
                  <div className="a">{s.before}</div>
                </div>
                <div className="show-v2-panel after">
                  <span className="tag">AFTER · {s.name}</span>
                  <div className="q">{s.q}</div>
                  <div className="a">{s.after}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="show-v2-progress">
          <div className="bar" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="show-v2-hint">
          <button
            type="button"
            onClick={() => nudge(-1)}
            style={{ background: 'transparent', border: 0, color: 'inherit', font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', padding: 0, cursor: 'none' }}
            data-cursor
          >
            ← PREV
          </button>
          <span>{Math.round(progress * 100 + 1)} / {showcases.length}</span>
          <button
            type="button"
            onClick={() => nudge(1)}
            style={{ background: 'transparent', border: 0, color: 'inherit', font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', padding: 0, cursor: 'none' }}
            data-cursor
          >
            NEXT →
          </button>
        </div>
      </div>
    </section>
  )
}
