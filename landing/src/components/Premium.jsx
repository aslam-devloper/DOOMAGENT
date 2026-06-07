import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Reveal from './Reveal'
import Tilt from './Tilt'
import Magnetic from './Magnetic'

// The 20 lenses OMNISCIENCE contains
const lenses = [
  { n: '01', name: 'NOUS', d: 'First-principles reasoning. Frame first, solve second.' },
  { n: '02', name: 'PHRONESIS', d: 'Trade-off analysis. No fence-sitting. Pick one, defend it.' },
  { n: '03', name: 'METIS', d: 'Deep debugging. Symptoms are liars — hunt the cause.' },
  { n: '04', name: 'ATLAS', d: 'System architecture. Regret-minimize, not feature-maximize.' },
  { n: '05', name: 'THALASSA', d: 'Database design. Schema before speed. Data outlives code.' },
  { n: '06', name: 'AETHER', d: 'API contracts. Breaking changes are violence against consumers.' },
  { n: '07', name: 'AEGIS', d: 'Security. Threat-model first. Fail closed. Secrets are toxic.' },
  { n: '08', name: 'STASIS', d: 'Caching strategy. The most expensive op is the unnecessary one.' },
  { n: '09', name: 'KRATOS', d: 'Performance. Measure first. Profile, don\'t guess.' },
  { n: '10', name: 'ARGO', d: 'Multi-agent orchestration. The fix is the chart.' },
  { n: '11', name: 'MNEMOSYNE', d: 'Long-context memory. Project state, decisions, continuity.' },
  { n: '12', name: 'TECHNE', d: 'Code craftsmanship. Idiomatic. Code that deserves to exist.' },
  { n: '13', name: 'MORPHE', d: 'Refactoring. Shape is correctness. Behavior-preserving.' },
  { n: '14', name: 'STIGMA', d: 'Testing, QA, edge cases. Untested is broken.' },
  { n: '15', name: 'ALETHEIA', d: 'Documentation that tells the truth.' },
  { n: '16', name: 'CHRONOS', d: 'DevOps, CI/CD, IaC. If it\'s not automated, it\'s broken.' },
  { n: '17', name: 'VIGIL', d: 'Observability. Logs, metrics, traces. If you can\'t see it…' },
  { n: '18', name: 'LUMEN', d: 'UI design. Hierarchy before decoration.' },
  { n: '19', name: 'IRIS', d: 'Design systems. Tokens as law. Variables as truth.' },
  { n: '20', name: 'ETHOS', d: 'Ethical guardrails. Opt-in only. Refuses, names the violation.' },
]

export default function Premium() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const headOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.4, 1, 1])

  return (
    <section id="premium" className="prem-v2" ref={ref}>
      <motion.div className="wrap" style={{ y: bgY, position: 'relative', zIndex: 1 }}>
        <Reveal as="div">
          <div className="prem-v2-head">
            <div className="prem-v2-eyebrow">// 07 — premium</div>
            <div className="prem-v2-eyebrow">$9.99 · one-time</div>
          </div>
          <h2 className="prem-v2-h2">One skill. <em>Twenty lenses.</em></h2>
          <p className="prem-v2-intro">
            OMNISCIENCE is the master skill. It contains all 20 free skills as cognitive lenses, orchestrated by a 9-step audit cascade. Load it once — never load the others again. Works on any agent.
          </p>
        </Reveal>

        <motion.div className="prem-v2-grid" style={{ opacity: headOpacity }}>
          {lenses.map((l, i) => (
            <Tilt key={l.name} maxTilt={5} scale={1.03} className="prem-v2-lens">
              <div className="n">LENS · {l.n}</div>
              <div className="nm">{l.name}</div>
              <div className="d">{l.d}</div>
            </Tilt>
          ))}
        </motion.div>

        <Reveal as="div" delay={0.1}>
          <div className="prem-v2-foot">
            <div className="l">
              <h4>OMNISCIENCE — the <em>Full Auditor</em></h4>
              <p>20 lenses · 9-step cascade · one skill file · works on any agent</p>
            </div>
            <div className="r">
              <Magnetic strength={0.25} as="div">
                <a
                  href="https://aslam-devloper.gumroad.com/l/omniscience"
                  className="btn amber"
                  data-premium-cta
                  data-cursor
                >
                  Get OMNISCIENCE <span className="arrow">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  )
}
