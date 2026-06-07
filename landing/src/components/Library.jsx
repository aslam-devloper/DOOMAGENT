import { motion } from 'framer-motion'
import { skills, domains } from '../data/skills.jsx'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: (i % 6) * 0.05,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Library() {
  return (
    <section id="library">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 02 — the library</div>
          <h2>21 skills. <span className="ink">Six domains.</span> One library.</h2>
          <p className="lead">
            Each skill is a markdown file. Each one declares a <em style={{ color: 'var(--bone)' }}>philosophy</em>, a <em style={{ color: 'var(--bone)' }}>trigger</em>, and a <em style={{ color: 'var(--bone)' }}>protocol</em>. Drop them into <code style={{ color: 'var(--cyan)' }}>.opencode/skills/</code> and the model learns when to act like a debugger, when to act like an architect, when to refuse, and when to ship.
          </p>
        </motion.div>

        <div className="lib-cats">
          {domains.map((dom, di) => {
            const ds = skills.filter(s => s.domain === dom.id)
            return (
              <div className="lib-cat" key={dom.id}>
                <motion.div
                  className="lib-cat-head"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="n">DOMAIN {dom.n}</div>
                  <div className="h">{dom.title}</div>
                  <div className="c">{dom.sub}</div>
                </motion.div>
                <div className="lib-grid">
                  {ds.map((s, i) => (
                    <motion.div
                      key={s.name}
                      className={`skill${s.pro ? ' amber-glow' : ''}`}
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-40px' }}
                      data-cursor
                    >
                      <div className="skill-top">
                        <div className="skill-glyph">// {s.glyph}</div>
                        <div className={`skill-flag ${s.flag}`}>{s.flag === 'opt-in' ? 'OPT-IN' : s.flag === 'pro' ? 'PREMIUM' : 'FREE'}</div>
                      </div>
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-desc">{s.desc}</div>
                      <div className="skill-tags">
                        {s.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
