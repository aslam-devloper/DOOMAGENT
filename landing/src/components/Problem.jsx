import { motion } from 'framer-motion'
import Tilt from './Tilt'
import Reveal from './Reveal'

const items = [
  { t: '"Both are great options!"', d: 'when you needed a recommendation' },
  { t: 'Try/catch around the symptom', d: 'instead of finding the cause' },
  { t: 'Agrees with your architecture', d: 'instead of telling you the cost' },
  { t: '200 words that said what 20 could', d: '"I hope this helps" after' },
  { t: 'Confident answers it can\'t back up', d: 'bluffing is the default mode' },
  { t: 'Re-derives the same answer 4 ways', d: 'because the structure isn\'t there' },
]

export default function Problem() {
  return (
    <section className="prob-v2">
      <div className="wrap">
        <Reveal as="div">
          <div className="eyebrow-sm">// 01 — the problem</div>
          <h2>Generic AI is <span className="ink">generic</span>.</h2>
          <p className="lead">
            You ask the model to debug. It patches the symptom. You ask it to architect. It gives you three options and "depends on your needs." You ask it to ship. It writes a README and hopes for the best.
          </p>
          <p>
            What you're missing isn't intelligence. It's <em style={{ color: 'var(--bone)' }}>discipline</em> — the specific, opinionated, load-bearing kind that an expert applies without thinking. Skills are that discipline, codified.
          </p>
        </Reveal>

        <div className="prob-v2-grid">
          {items.map((it, i) => (
            <Tilt key={i} maxTilt={5} scale={1.02} className="prob-v2-card">
              <div className="prob-v2-x">×</div>
              <div className="prob-v2-t">{it.t}</div>
              <div className="prob-v2-d">{it.d}</div>
              <div className="prob-v2-num">{String(i + 1).padStart(2, '0')}</div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  )
}
