import { motion } from 'framer-motion'
import { stackFlow } from '../data/skills.jsx'

export default function Stack() {
  return (
    <section>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 05 — the stack</div>
          <h2>They <span className="ink">compose</span>.</h2>
          <p className="lead">
            Skills don't fight. They stack. Here's what a real workflow looks like when you load the right six skills for a backend system design task.
          </p>
        </motion.div>

        <motion.div
          className="stack-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="stack-flow">
            {stackFlow.map((row, i) => {
              const isInput = row.type === 'input'
              const isOutput = row.type === 'output'
              const isPro = row.type === 'pro'
              const isSkill = row.type === 'skill'

              const variants = {
                hidden: { opacity: 0, x: -30 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] } },
              }

              if (isInput || isOutput) {
                return (
                  <motion.div key={i} className="stack-row" variants={variants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                    <div className={`stack-pill ${isInput ? 'input' : 'gray'}`} data-cursor>{row.text}</div>
                  </motion.div>
                )
              }
              return (
                <div key={i}>
                  <motion.div
                    className="stack-row"
                    variants={variants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {isSkill && <div className="stack-arrow">↓</div>}
                    {isPro && <div className="stack-arrow">↓</div>}
                    <div className={`stack-pill ${isPro ? 'amber' : 'cyan'}`} data-cursor>
                      {row.text}
                      <span className="sub">{row.sub}</span>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.p
          style={{ marginTop: 28, fontSize: 13, color: 'var(--muted-2)', fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          // 6 free skills + 1 premium. each one pulls its weight. none of them overlap.
        </motion.p>
      </div>
    </section>
  )
}
