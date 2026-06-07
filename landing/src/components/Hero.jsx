import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MeshGradient from './MeshGradient'
import FloatingChips from './FloatingChips'
import Tilt from './Tilt'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import { skills, downloads, cascade } from '../data/skills.jsx'

const heroChips = skills
  .filter(s => s.flag === 'free')
  .slice(0, 14)
  .map(s => ({ name: s.name, accent: s.flag === 'opt-in' }))

const titleLines = [
  { text: 'OMNISCIENCE.' },
  { text: '9 steps.' },
  { text: '20 lenses.' },
  { text: '1 answer', accent: true },
  { text: "you'd ship." },
]

const easings = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const terminalOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section className="hero-v2" id="top" ref={ref}>
      <MeshGradient />
      <FloatingChips chips={heroChips} depth={140} />
      <motion.div className="wrap" style={{ y: bgY, opacity: bgOpacity, position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-v2-grid">
          <div className="hero-v2-left">
            <Reveal as="div" delay={0} duration={0.6}>
              <div className="hero-v2-eyebrow">
                <span className="pulse"></span>
                v3.0 · 20 free skills + OMNISCIENCE · Apache 2.0 · works on any agent
              </div>
            </Reveal>

            <h1>
              {titleLines.map((line, i) => (
                <span className="line" key={i}>
                  <motion.span
                    style={{ display: 'inline-block' }}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.95, delay: 0.1 + i * 0.09, ease: easings }}
                    className={line.accent ? 'accent' : ''}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <Reveal as="p" delay={0.6} y={20} duration={0.7} className="hero-v2-sub">
              The free library — 20 cognitive skills, Apache 2.0, no DRM, no telemetry —
              is the <b>proof of craft</b>. <b style={{ color: 'var(--amber)' }}>OMNISCIENCE</b> is the
              work itself: a 9-step cascade that loads the right lenses, runs an expert panel
              that argues with itself, and ships an answer an engineer would sign.
              <b style={{ color: 'var(--amber)' }}> OMNISCIENCE is free</b> — drop it into
              <b> any AI agent</b>, Claude Code, Cursor, Cline, Aider, opencode, LangChain.
            </Reveal>

            <Reveal as="div" delay={0.8} y={20} duration={0.6} className="hero-v2-ctas">
              <Magnetic strength={0.25} as="div">
                <a
                  href={downloads.omniscience}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn amber"
                  data-cursor
                  aria-label="Download OMNISCIENCE (free, via shortener link)"
                >
                  Download OMNISCIENCE <span className="arrow">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2} as="div">
                <a href="#cascade" className="btn ghost" data-cursor>
                  See the cascade
                </a>
              </Magnetic>
              <Magnetic strength={0.25} as="div">
                <a href={downloads.freeLibrary} download className="btn" data-cursor>
                  Get the free library
                </a>
              </Magnetic>
            </Reveal>

            <Reveal as="div" delay={1.0} y={20} duration={0.6} className="hero-v2-meta">
              <span><b>20</b> free skills · Apache 2.0</span>
              <span><b>1</b> master skill · OMNISCIENCE</span>
              <span><b>0</b> dependencies</span>
              <span><b>any</b> AI agent</span>
              <a
                href="https://www.instagram.com/aslam.unfiltered"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-ig"
                data-cursor
                aria-label="Follow @aslam.unfiltered on Instagram"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span>follow <b>@aslam.unfiltered</b></span>
              </a>
            </Reveal>
          </div>

          <motion.div style={{ y: terminalY, opacity: terminalOpacity }}>
            <Tilt maxTilt={6} scale={1.01} className="hero-terminal-wrap">
              <div className="hero-terminal">
                <div className="hero-terminal-bar">
                  <div className="dots"><span></span><span></span><span></span></div>
                  <span>~/agents/skills/omniscience/</span>
                  <span className="ttl">doomagent · OMNISCIENCE</span>
                </div>
                <div className="hero-terminal-body">
                  <span className="l"><span className="com"># load OMNISCIENCE — the master skill</span></span>
                  <span className="l"><span className="k">$</span> cp -r DOOMAGENT/skills/omniscience <span className="s">~/agents/skills/</span></span>
                  <span className="l">&nbsp;</span>
                  <span className="l"><span className="com"># it loads the 9-step cascade + all 20 lenses</span></span>
                  <span className="l"><span className="k">→</span> {cascade[0].n} {cascade[0].name.padEnd(10)}  <span className="com">// {cascade[0].d}</span></span>
                  <span className="l"><span className="k">→</span> {cascade[1].n} {cascade[1].name.padEnd(10)}  <span className="com">// {cascade[1].d}</span></span>
                  <span className="l"><span className="k">→</span> {cascade[4].n} {cascade[4].name.padEnd(10)}  <span className="com">// 20-lens audit · expert panel</span></span>
                  <span className="l">&nbsp;</span>
                  <span className="l"><span className="p">user:</span> <span className="s">"Should I split this into microservices?"</span></span>
                  <span className="l"><span className="p">model:</span> <span className="c">No. Not yet.</span> Three reasons, one flip variable, confidence 80%<span className="cursor-blink"></span></span>
                </div>
                <div className="hero-terminal-glow" />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </motion.div>

      <div className="hero-v2-hint">
        <span>scroll</span>
        <span className="ln"></span>
      </div>
    </section>
  )
}
