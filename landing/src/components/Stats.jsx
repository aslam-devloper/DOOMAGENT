import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import Reveal from './Reveal'
import Tilt from './Tilt'

function Counter({ target, suffix = '', prefix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString())
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v))
    return unsub
  }, [rounded])

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, target, { duration, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [inView, target, mv, duration])

  return (
    <span ref={ref} className="counter">
      {prefix}{display}{suffix}
    </span>
  )
}

const items = [
  { target: 21, suffix: '', label: 'skills in library', note: '// 20 free · 1 premium' },
  { target: 6, suffix: '', label: 'domains covered', note: '// reasoning, architecture, agents, code, ops, design' },
  { target: 140, suffix: 'kb', label: 'total library size', note: '// smaller than one npm package' },
  { target: 0, suffix: '', label: 'dependencies', note: '// it\'s markdown. that\'s the stack.' },
]

export default function Stats() {
  return (
    <section className="stat-v2">
      <div className="wrap">
        <Reveal as="div">
          <div className="eyebrow-sm">// 06 — honest numbers</div>
          <h2>Not magic. <span className="ink">Discipline.</span></h2>
          <p className="lead">
            Skills don't add knowledge. They add the scaffolding an expert applies without thinking. The result is measurable — on 7B local models and on the frontier ones.
          </p>
        </Reveal>

        <div className="stat-v2-grid">
          {items.map((it, i) => (
            <Tilt key={i} maxTilt={3} scale={1.01} className="stat-v2-card">
              <div className="stat-v2-big">
                {it.target === 0 ? '0' : null}
                {it.target !== 0 && <Counter target={it.target} suffix={it.suffix} />}
                {it.target === 0 && <span className="stat-v2-suffix">kb</span>}
              </div>
              <div className="stat-v2-lbl">{it.label}</div>
              <div className="stat-v2-note">{it.note}</div>
              <div className="stat-v2-num">/0{i + 1}</div>
            </Tilt>
          ))}
        </div>

        <Reveal as="div" delay={0.1}>
          <blockquote className="stat-v2-quote">
            "The difference is not subtle. It's a different engineer on the other end of the prompt."
            <cite>— ASLAM, builder of DOOMAGENT</cite>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
