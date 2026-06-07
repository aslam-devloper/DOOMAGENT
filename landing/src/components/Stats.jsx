import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

function Counter({ target, suffix = '', prefix = '' }) {
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
    const controls = animate(mv, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, target, mv])

  return (
    <span ref={ref} className="counter">
      {prefix}{display}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 06 — honest numbers</div>
          <h2>Not magic. <span className="ink">Discipline.</span></h2>
          <p className="lead">
            Skills don't add knowledge. They add the scaffolding an expert applies without thinking. The result is measurable — on 7B local models and on the frontier ones.
          </p>
        </motion.div>
        <div className="stats">
          <div className="stat">
            <div className="big"><Counter target={21} /></div>
            <div className="lbl">skills in library</div>
            <div className="note">// 20 free · 1 premium</div>
          </div>
          <div className="stat">
            <div className="big"><Counter target={6} /></div>
            <div className="lbl">domains covered</div>
            <div className="note">// reasoning, architecture, agents, code, ops, design</div>
          </div>
          <div className="stat">
            <div className="big">~<Counter target={140} /><span className="u">kb</span></div>
            <div className="lbl">total library size</div>
            <div className="note">// smaller than one npm package</div>
          </div>
          <div className="stat">
            <div className="big"><Counter target={0} /></div>
            <div className="lbl">dependencies</div>
            <div className="note">// it's markdown. that's the stack.</div>
          </div>
        </div>
        <motion.div
          className="quote"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote>"The difference is not subtle. It's a different engineer on the other end of the prompt."</blockquote>
          <div className="who">— ASLAM, builder of DOOMAGENT</div>
        </motion.div>
      </div>
    </section>
  )
}
