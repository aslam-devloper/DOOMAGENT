import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MeshGradient from './MeshGradient'
import Reveal from './Reveal'
import Magnetic from './Magnetic'
import { founder } from '../data/skills'

export default function Buy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const markRot = useTransform(scrollYProgress, [0, 1], [0, 90])

  const remaining = Math.max(0, founder.cap - founder.claimed)

  return (
    <section id="buy" className="buy-v2" ref={ref}>
      <MeshGradient />
      <motion.div className="buy-v2-mark" style={{ rotate: markRot }} aria-hidden />
      <motion.div className="inner wrap-sm" style={{ scale, opacity, position: 'relative', zIndex: 2 }}>
        <Reveal as="div">
          <div className="eyebrow-sm">// 09 — the masterwork</div>
        </Reveal>
        <Reveal as="div" delay={0.1}>
          <h2 className="buy-v2-title">OMNISCIENCE.</h2>
        </Reveal>
        <Reveal as="p" delay={0.2} y={20}>
          One file. The 9-step cascade. The expert panel. The auto-selected lens sets.
          The full auditor that contains the 20 free skills as lenses.
        </Reveal>
        <Reveal as="div" delay={0.3} y={20}>
          <div className="dual-cta">
            <Magnetic strength={0.25} as="div">
              <a href="#waitlist" data-open-waitlist data-cursor className="btn amber">
                CLAIM FOUNDER LICENSE <span className="arrow">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25} as="div">
              <a href="https://github.com/aslam-devloper/DOOMAGENT" className="btn green" data-cursor>
                GET THE FREE LIBRARY
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal as="div" delay={0.4} y={10}>
          <div className="buy-trust">
            <span className="buy-funder-pill">
              <span className="bfp-dot" /> {remaining} of {founder.cap} founder seats · closes {new Date(founder.closesOn).toUTCString().slice(0, 16)}
            </span>
            <span>·</span>
            <span>20 free skills</span>
            <span>·</span>
            <span>Apache 2.0</span>
            <span>·</span>
            <span>any agent</span>
            <span>·</span>
            <span>no telemetry</span>
          </div>
        </Reveal>
        <Reveal as="p" delay={0.5} y={10} className="buy-v2-foot">
          OMNISCIENCE is the only one we charge for. The other 20 stay free forever.{' '}
          <a href="https://github.com/aslam-devloper/DOOMAGENT" data-cursor>Star the repo</a> if you want to see the library grow — the masterwork is what keeps the work alive.
        </Reveal>
      </motion.div>
    </section>
  )
}
