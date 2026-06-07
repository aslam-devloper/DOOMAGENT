import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function WaitlistModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    if (open) {
      document.addEventListener('keydown', onKey)
      // trap confetti
      const onConfetti = (e) => spawnConfetti(e.detail.x, e.detail.y)
      window.addEventListener('dm:confetti', onConfetti)
      return () => {
        document.removeEventListener('keydown', onKey)
        window.removeEventListener('dm:confetti', onConfetti)
      }
    }
  }, [open, onClose])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 1400)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="modal"
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="close" onClick={onClose} aria-label="Close" data-cursor>×</button>
            <h3>You're in line.</h3>
            <p>Checkout is wiring up. Drop your email — we'll send it the moment it's live. You keep the $9.99 price.</p>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="[email protected]" required disabled={submitted} />
              <button type="submit" data-cursor style={submitted ? { background: 'var(--phosphor)' } : {}}>
                {submitted ? 'Locked in' : 'Notify me'}
              </button>
            </form>
            <div className="note">// no spam, ever. one email when checkout opens, that's it.</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function spawnConfetti(x, y) {
  const colors = ['#00E5FF', '#39FF14', '#FFD60A', '#FF2D55', '#FF00FF', '#B388FF']
  const N = 80
  for (let i = 0; i < N; i++) {
    const c = document.createElement('div')
    c.className = 'confetti'
    c.style.background = colors[Math.floor(Math.random() * colors.length)]
    c.style.left = x + 'px'
    c.style.top = y + 'px'
    document.body.appendChild(c)
    const angle = Math.random() * Math.PI * 2
    const speed = 4 + Math.random() * 9
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed - 4
    const rot = (Math.random() - 0.5) * 720
    const dur = 900 + Math.random() * 700
    c.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${vx * 30}px, ${vy * 30 + 240}px) rotate(${rot}deg)`, opacity: 0 },
    ], { duration: dur, easing: 'cubic-bezier(.2, .6, .4, 1)' })
    setTimeout(() => c.remove(), dur + 50)
  }
}
