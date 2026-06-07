import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const lines = [
  { text: '21 skills that' },
  { text: 'make any AI', accent: true },
  { text: 'think like an' },
  { text: 'engineer.' },
  { text: 'Free. Open source.', subtle: true },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2])

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-bg-text" style={{ y: bgY, opacity: bgOpacity }} aria-hidden>
        21/21
      </motion.div>
      <motion.div className="wrap" style={{ y, opacity, position: 'relative', zIndex: 1 }}>
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          v1.0 · 21 skills · Apache 2.0 · one premium tier
        </motion.div>
        <h1>
          {lines.map((line, i) => (
            <span className="line" key={i}>
              <motion.span
                style={{ display: 'inline-block' }}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.9,
                  delay: 1.2 + i * 0.1,
                  ease: [0.2, 0.7, 0.1, 1],
                }}
                className={line.accent ? 'accent' : line.subtle ? '' : ''}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        >
          A library of cognitive skills for opencode, Claude Code, Cursor, and any AI that reads a system prompt.
          Drop the folder in. The model learns to debug like <b style={{ color: 'var(--phosphor)' }}>METIS</b>, architect like <b style={{ color: 'var(--phosphor)' }}>ATLAS</b>, trade off like <b style={{ color: 'var(--phosphor)' }}>PHRONESIS</b>, ship like <b style={{ color: 'var(--phosphor)' }}>CHRONOS</b>. One premium tier — <b style={{ color: 'var(--amber)' }}>OMNISCIENCE</b> — the Full Auditor that contains all 20 skills as lenses.
        </motion.p>
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="https://github.com/aslam-devloper/DOOMAGENT" className="btn" data-cursor>
            Get the library <span className="arrow">→</span>
          </a>
          <a href="#library" className="btn ghost" data-cursor>
            See all 21 skills
          </a>
          <a href="#premium" className="btn amber" data-premium-cta data-cursor>
            Upgrade to OMNISCIENCE <span className="arrow">→</span>
          </a>
        </motion.div>
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span><span className="pulse"></span><b>21</b> skills</span>
          <span><b>Apache 2.0</b> license</span>
          <span><b>0</b> dependencies</span>
          <span><b>1</b> premium tier</span>
          <span><b>1</b> person · 1 keyboard</span>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
      >
        <span>scroll</span>
        <span className="line"></span>
      </motion.div>
    </section>
  )
}
