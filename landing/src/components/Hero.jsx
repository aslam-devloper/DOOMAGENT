import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MeshGradient from './MeshGradient'
import FloatingChips from './FloatingChips'
import Tilt from './Tilt'
import Magnetic from './Magnetic'
import Reveal from './Reveal'
import { skills } from '../data/skills.jsx'

const heroChips = skills
  .filter(s => s.flag === 'free')
  .slice(0, 14)
  .map(s => ({ name: s.name, accent: s.flag === 'opt-in' }))

const titleLines = [
  { text: '21 skills' },
  { text: 'that make any' },
  { text: 'AI think', accent: true },
  { text: 'like an' },
  { text: 'engineer.' },
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
                v1.0 · 21 skills · Apache 2.0 · works on any agent
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
              A library of cognitive skills for <b>any AI agent</b> — Claude Code, Cursor, Cline, Aider, opencode, LangChain, anything that reads a system prompt. Drop the folder in. The model learns to debug like <b style={{ color: 'var(--phosphor)' }}>METIS</b>, architect like <b style={{ color: 'var(--phosphor)' }}>ATLAS</b>, trade off like <b style={{ color: 'var(--phosphor)' }}>PHRONESIS</b>, ship like <b style={{ color: 'var(--phosphor)' }}>CHRONOS</b>. One premium tier — <b style={{ color: 'var(--amber)' }}>OMNISCIENCE</b> — the Full Auditor that contains all 20 as lenses.
            </Reveal>

            <Reveal as="div" delay={0.8} y={20} duration={0.6} className="hero-v2-ctas">
              <Magnetic strength={0.25} as="div">
                <a href="https://github.com/aslam-devloper/DOOMAGENT" className="btn" data-cursor>
                  Get the library <span className="arrow">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2} as="div">
                <a href="#library" className="btn ghost" data-cursor>
                  See all 21 skills
                </a>
              </Magnetic>
              <Magnetic strength={0.25} as="div">
                <a href="#premium" className="btn amber" data-premium-cta data-cursor>
                  Upgrade to OMNISCIENCE <span className="arrow">→</span>
                </a>
              </Magnetic>
            </Reveal>

            <Reveal as="div" delay={1.0} y={20} duration={0.6} className="hero-v2-meta">
              <span><span className="pulse"></span><b>21</b> skills</span>
              <span><b>Apache 2.0</b> license</span>
              <span><b>0</b> dependencies</span>
              <span><b>1</b> premium tier</span>
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
                  <span>~/agents/skills/</span>
                  <span className="ttl">doomagent · preview</span>
                </div>
                <div className="hero-terminal-body">
                  <span className="l"><span className="com"># load the library — works on any agent</span></span>
                  <span className="l"><span className="k">$</span> cp -r DOOMAGENT/skills/* <span className="s">~/agents/skills/</span></span>
                  <span className="l">&nbsp;</span>
                  <span className="l"><span className="com"># pick a skill — or load OMNISCIENCE for all 20</span></span>
                  <span className="l"><span className="k">→</span> skill: <span className="v">METIS</span>  <span className="com">// deep debugging</span></span>
                  <span className="l"><span className="k">→</span> skill: <span className="v">ATLAS</span>  <span className="com">// system architecture</span></span>
                  <span className="l"><span className="k">→</span> skill: <span className="v">AEGIS</span>  <span className="com">// security & threat model</span></span>
                  <span className="l"><span className="k">→</span> skill: <span className="v">PHRONESIS</span>  <span className="com">// trade-off analysis</span></span>
                  <span className="l">&nbsp;</span>
                  <span className="l"><span className="com"># ask anything</span></span>
                  <span className="l"><span className="p">user:</span> <span className="s">"My app crashes randomly. Help?"</span></span>
                  <span className="l"><span className="p">model:</span> <span className="c">"Randomly</span> is not a cause. Two questions before I touch any code…<span className="cursor-blink"></span></span>
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
