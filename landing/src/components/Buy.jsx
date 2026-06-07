import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Buy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section id="buy" className="buy" ref={ref}>
      <div className="big-mark" />
      <motion.div className="inner wrap-sm" style={{ scale, opacity }}>
        <motion.div
          className="eyebrow-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          // 09 — the part with the buttons
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          DOOMAGENT.
        </motion.h2>
        <motion.p
          style={{ margin: '0 auto 40px', maxWidth: 540, color: 'var(--bone-2)', fontSize: 17 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          20 free skills. 1 premium. Zero dependencies. One person building it because the file has to be the file.
        </motion.p>
        <motion.div
          className="dual-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <a href="https://github.com/aslam-devloper/DOOMAGENT" className="btn green" data-cursor>
            GET THE FREE LIBRARY <span className="arrow">→</span>
          </a>
          <a href="#premium" className="btn amber" data-premium-cta data-cursor>
            UPGRADE TO OMNISCIENCE <span className="arrow">→</span>
          </a>
        </motion.div>
        <motion.div
          className="buy-trust"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span>21 skills</span>·<span>Apache 2.0</span>·<span>works on any model</span>·<span>no telemetry</span>·<span>instant</span>
        </motion.div>
        <motion.p
          style={{ margin: '36px auto 0', fontSize: 12, color: 'var(--muted-2)', maxWidth: 480 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          OMNISCIENCE is the only one we charge for. The other 20 stay free forever. <a href="https://github.com/aslam-devloper/DOOMAGENT" style={{ color: 'var(--cyan)', borderBottom: '1px dotted var(--muted-2)' }}>Star the repo</a> if you want to see it grow.
        </motion.p>
      </motion.div>
    </section>
  )
}
