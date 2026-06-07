import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

function PriceCounter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => v.toFixed(2))
  const [display, setDisplay] = useState('0.00')

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return unsub
  }, [rounded])

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, 9.99, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, mv])

  return <span ref={ref} className="c">${display}</span>
}

export default function Premium() {
  return (
    <section id="premium">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 07 — the premium tier</div>
          <h2>One skill. <span className="amber">One price.</span> Different brain.</h2>
          <p className="lead">
            20 of the 21 skills are free. The 21st is <b style={{ color: 'var(--amber)' }}>OMNISCIENCE</b> — the master skill. It contains all 20 other skills as named lenses, orchestrated by a 9-step cascade. Load it once, and you don't need the others.
          </p>
        </motion.div>

        <div className="tier">
          <motion.div
            className="tier-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flag">PREMIUM · TIER S</div>
            <h3>OMNISCIENCE</h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 0 }}>Cognitive amplifier. Activates on hard problems. Skips trivial ones.</p>
            <div className="price"><PriceCounter /></div>
            <div className="pnote">one-time · no subscription · instant download · forever yours</div>
            <ul>
              <li>The 280-token injection block (the entire cognitive OS)</li>
              <li>The Expert Panel protocol (DOMAIN EXPERT · RED TEAM · SHIPPER)</li>
              <li>The one-sentence compression test</li>
              <li>5-tier calibration rubric with examples</li>
              <li>Anti-bluff guard — "I don't know" is a feature</li>
              <li>Deployment guides for every model + framework</li>
              <li>First 1,000 buyers get this price. After that, it doubles.</li>
            </ul>
            <a
              href="#buy"
              className="btn amber"
              style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}
              data-premium-cta
              data-cursor
            >
              Get OMNISCIENCE <span className="arrow">→</span>
            </a>
          </motion.div>
          <motion.div
            className="tier-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>What it actually does</h3>
            <p>OMNISCIENCE doesn't add knowledge. It adds the <em style={{ color: 'var(--bone)' }}>orchestration</em> the other 20 skills need to play together. Drop the protocol into any system prompt, and the model runs a 9-step cascade — and inside the audit step, picks the right lenses from the 20-skill library.</p>
            <p>You see the answer, the lens verdicts, and the confidence. You don't see the work. But the answer is shorter, denser, less likely to bluff, and three times more likely to push back when you're wrong.</p>
            <div className="lens-grid">
              <div className="lens-cell">NOUS <span>framing</span></div>
              <div className="lens-cell">PHRONESIS <span>trade-offs</span></div>
              <div className="lens-cell">METIS <span>root cause</span></div>
              <div className="lens-cell">ATLAS <span>architecture</span></div>
              <div className="lens-cell">THALASSA <span>data</span></div>
              <div className="lens-cell">AETHER <span>contracts</span></div>
              <div className="lens-cell">AEGIS <span>security</span></div>
              <div className="lens-cell">STASIS <span>cache</span></div>
              <div className="lens-cell">KRATOS <span>perf</span></div>
              <div className="lens-cell">ARGO <span>orchestration</span></div>
              <div className="lens-cell">MNEMOSYNE <span>memory</span></div>
              <div className="lens-cell">TECHNE <span>craft</span></div>
              <div className="lens-cell">MORPHE <span>shape</span></div>
              <div className="lens-cell">STIGMA <span>tests</span></div>
              <div className="lens-cell">ALETHEIA <span>truth</span></div>
              <div className="lens-cell">CHRONOS <span>automation</span></div>
              <div className="lens-cell">VIGIL <span>observability</span></div>
              <div className="lens-cell">LUMEN <span>UI</span></div>
              <div className="lens-cell">IRIS <span>design system</span></div>
              <div className="lens-cell">ETHOS <span>ethics · opt-in</span></div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted-2)', marginTop: 18 }}>
              // 20 lenses, one cascade, one protocol. the only file in the library with a price — because it's the only one that wouldn't exist without the discipline of selling it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
