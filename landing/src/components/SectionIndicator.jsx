import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Floating section indicator on the right edge.
 * Shows current section number + name as you scroll.
 */
const sections = [
  { id: 'top', n: '00', name: 'intro' },
  { id: 'problem', n: '01', name: 'problem' },
  { id: 'library', n: '02', name: 'library' },
  { id: 'showcase', n: '03', name: 'in action' },
  { id: 'install', n: '04', name: 'install' },
  { id: 'stack', n: '05', name: 'stack' },
  { id: 'stats', n: '06', name: 'numbers' },
  { id: 'premium', n: '07', name: 'premium' },
  { id: 'fineprint', n: '08', name: 'fine print' },
  { id: 'buy', n: '09', name: 'get it' },
]

export default function SectionIndicator() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? scrollY / docH : 0)

      // determine active section by midpoint
      let idx = 0
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // section is active when its top is above 40% of viewport
        if (rect.top < window.innerHeight * 0.4) {
          idx = i
        }
      }
      setActive(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current = sections[active]

  return (
    <motion.div
      className="section-indicator"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.4, duration: 0.6 }}
    >
      <div className="si-rail">
        <motion.div
          className="si-fill"
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>
      <div className="si-info">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.n}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="si-num">{current.n} / 09</div>
            <div className="si-name">{current.name}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
