import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MeshGradient from './MeshGradient'
import Reveal from './Reveal'
import Magnetic from './Magnetic'

export default function Buy() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.04])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const markRot = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section id="buy" className="buy-v2" ref={ref}>
      <MeshGradient />
      <motion.div className="buy-v2-mark" style={{ rotate: markRot }} aria-hidden />
      <motion.div className="inner wrap-sm" style={{ scale, opacity, position: 'relative', zIndex: 2 }}>
        <Reveal as="div">
          <div className="eyebrow-sm">// 09 — the part with the buttons</div>
        </Reveal>
        <Reveal as="div" delay={0.1}>
          <h2 className="buy-v2-title">DOOMAGENT.</h2>
        </Reveal>
        <Reveal as="p" delay={0.2} y={20}>
          20 free skills. 1 premium. Zero dependencies. One person building it because the file has to be the file.
        </Reveal>
        <Reveal as="div" delay={0.3} y={20}>
          <div className="dual-cta">
            <Magnetic strength={0.25} as="div">
              <a href="https://github.com/aslam-devloper/DOOMAGENT" className="btn green" data-cursor>
                GET THE FREE LIBRARY <span className="arrow">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25} as="div">
              <a href="#premium" className="btn amber" data-premium-cta data-cursor>
                UPGRADE TO OMNISCIENCE <span className="arrow">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal as="div" delay={0.4} y={10}>
          <div className="buy-trust">
            <span>21 skills</span><span>·</span><span>Apache 2.0</span><span>·</span><span>any agent</span><span>·</span><span>no telemetry</span><span>·</span><span>instant</span>
          </div>
        </Reveal>
        <Reveal as="p" delay={0.5} y={10} className="buy-v2-foot">
          OMNISCIENCE is the only one we charge for. The other 20 stay free forever.{' '}
          <a href="https://github.com/aslam-devloper/DOOMAGENT" data-cursor>Star the repo</a> if you want to see it grow.
        </Reveal>
      </motion.div>
    </section>
  )
}
