import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'

import Nav from './components/Nav'
import Cursor from './components/Cursor'
import SectionIndicator from './components/SectionIndicator'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Problem from './components/Problem'
import Library from './components/Library'
import Showcase from './components/Showcase'
import Install from './components/Install'
import Stack from './components/Stack'
import Stats from './components/Stats'
import Premium from './components/Premium'
import Fineprint from './components/Fineprint'
import Buy from './components/Buy'
import Footer from './components/Footer'
import WaitlistModal from './components/WaitlistModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const lenisRef = useRef(null)

  // Smooth scroll via Lenis
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Scroll progress
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  // Open waitlist modal from any premium CTA
  useEffect(() => {
    function onClick(e) {
      const target = e.target.closest('[data-premium-cta]')
      if (!target) return
      e.preventDefault()
      setModalOpen(true)
      const rect = target.getBoundingClientRect()
      window.dispatchEvent(new CustomEvent('dm:confetti', {
        detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      }))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main" data-cursor>Skip to content</a>
      <Cursor />
      <SectionIndicator />
      <motion.div className="progress" style={{ scaleX: progressX, transformOrigin: '0% 50%' }} />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Problem />
        <Library />
        <Showcase />
        <Install />
        <Stack />
        <Stats />
        <Premium />
        <Fineprint />
        <Buy />
      </main>
      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
