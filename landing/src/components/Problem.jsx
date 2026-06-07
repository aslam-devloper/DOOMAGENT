import { motion } from 'framer-motion'

const items = [
  { t: '"Both are great options!"', d: 'when you needed a recommendation' },
  { t: 'Try/catch around the symptom', d: 'instead of finding the cause' },
  { t: 'Agrees with your architecture', d: 'instead of telling you the cost' },
  { t: '200 words that said what 20 could', d: '"I hope this helps" after' },
  { t: 'Confident answers it can\'t back up', d: 'bluffing is the default mode' },
  { t: 'Re-derives the same answer 4 ways', d: 'because the structure isn\'t there' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Problem() {
  return (
    <section>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 01 — the problem</div>
          <h2>Generic AI is <span className="ink">generic</span>.</h2>
          <p className="lead">
            You ask the model to debug. It patches the symptom. You ask it to architect. It gives you three options and "depends on your needs." You ask it to ship. It writes a README and hopes for the best.
          </p>
          <p>
            What you're missing isn't intelligence. It's <em style={{ color: 'var(--bone)' }}>discipline</em> — the specific, opinionated, load-bearing kind that an expert applies without thinking. Skills are that discipline, codified.
          </p>
        </motion.div>
        <motion.div
          className="bad-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {items.map((it, i) => (
            <motion.div key={i} variants={card}>
              <div className="x">×</div>
              <div className="t">{it.t}</div>
              <div className="d">{it.d}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
