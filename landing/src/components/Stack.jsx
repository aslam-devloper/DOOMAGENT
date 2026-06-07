import { motion } from 'framer-motion'
import { stackFlow } from '../data/skills.jsx'
import Reveal from './Reveal'

export default function Stack() {
  return (
    <section className="stk-v2">
      <div className="wrap">
        <Reveal as="div">
          <div className="eyebrow-sm">// 05 — the stack</div>
          <h2>They <span className="ink">compose</span>.</h2>
          <p className="lead">
            Skills don't fight. They stack. Here's what a real workflow looks like when you load the right six skills for a backend system design task — plus OMNISCIENCE at the end.
          </p>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <div className="stk-v2-frame">
            <div className="stk-v2-rail" aria-hidden>
              <span className="stk-v2-dot stk-v2-dot1" />
              <span className="stk-v2-dot stk-v2-dot2" />
              <span className="stk-v2-dot stk-v2-dot3" />
              <span className="stk-v2-dot stk-v2-dot4" />
              <span className="stk-v2-dot stk-v2-dot5" />
            </div>
            <div className="stk-v2-flow">
              {stackFlow.map((row, i) => {
                const isInput = row.type === 'input'
                const isOutput = row.type === 'output'
                const isPro = row.type === 'pro'
                return (
                  <motion.div
                    key={i}
                    className="stk-v2-row"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="stk-v2-idx">/0{i + 1}</div>
                    <div
                      className={`stk-v2-pill ${isInput ? 'is-input' : isOutput ? 'is-output' : isPro ? 'is-amber' : 'is-cyan'}`}
                      data-cursor
                    >
                      <span className="stk-v2-name">{row.text}</span>
                      {row.sub && <span className="stk-v2-sub">{row.sub}</span>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Reveal>

        <p className="stk-v2-foot">
          // 6 free skills + 1 premium. each one pulls its weight. none of them overlap.
        </p>
      </div>
    </section>
  )
}
