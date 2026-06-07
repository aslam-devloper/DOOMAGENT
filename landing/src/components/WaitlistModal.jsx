import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Deterministic client-side license key generator.
// No backend needed — the key is the receipt, the file is the deliverable.
function makeKey(email) {
  const ts = Date.now()
  const ts36 = ts.toString(36).toUpperCase()
  const clean = email.toLowerCase().trim()
  let h = 5381
  for (let i = 0; i < clean.length; i++) {
    h = ((h << 5) + h) ^ clean.charCodeAt(i)
  }
  const hex = Math.abs(h).toString(16).toUpperCase().padStart(8, '0')
  return `OMNI-${ts36.slice(-4)}-${hex}-${ts36.slice(0, 4)}`
}

const OMNI_URL = 'https://raw.githubusercontent.com/aslam-devloper/DOOMAGENT/main/AGENTDOOM/premium/omniscience/SKILL.md'

export default function WaitlistModal({ open, onClose }) {
  const [step, setStep] = useState('form')
  const [email, setEmail] = useState('')
  const [key, setKey] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    if (open) {
      document.addEventListener('keydown', onKey)
      const onConfetti = (e) => spawnConfetti(e.detail.x, e.detail.y)
      window.addEventListener('dm:confetti', onConfetti)
      return () => {
        document.removeEventListener('keydown', onKey)
        window.removeEventListener('dm:confetti', onConfetti)
      }
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep('form')
        setEmail('')
        setKey('')
        setCopied(false)
      }, 250)
      return () => clearTimeout(t)
    }
  }, [open])

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setKey(makeKey(email))
    setStep('done')
  }

  function copyKey() {
    if (!key) return
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(key).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }).catch(() => fallbackCopy(key))
    } else {
      fallbackCopy(key)
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch {}
    document.body.removeChild(ta)
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
            className="modal lic-modal"
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="close" onClick={onClose} aria-label="Close" data-cursor>×</button>

            {step === 'form' && (
              <>
                <div className="lic-flag">OMNISCIENCE · COMMERCIAL LICENSE</div>
                <h3>Get your license.</h3>
                <p className="lic-tagline">$9.99 · one-time · issued on this site · supports any agent</p>

                <ul className="lic-includes">
                  <li>The Full Auditor — 20 cognitive lenses, 9-step cascade</li>
                  <li>The <code>SKILL.md</code> deliverable with your license key</li>
                  <li>Lifetime updates to OMNISCIENCE</li>
                  <li>Single user, single key, no telemetry</li>
                </ul>

                <form className="lic-form" onSubmit={handleSubmit}>
                  <label htmlFor="lic-email">your email</label>
                  <input
                    id="lic-email"
                    type="email"
                    placeholder="[email protected]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                  <button type="submit" className="btn amber" data-cursor>
                    ISSUE LICENSE <span className="arrow">→</span>
                  </button>
                </form>

                <div className="lic-foot">
                  // license is issued on <a href="https://doomagent.vercel.app" target="_blank" rel="noopener noreferrer" data-cursor>doomagent.vercel.app</a>. no third party.
                </div>
              </>
            )}

            {step === 'done' && (
              <>
                <div className="lic-flag issued">LICENSE ISSUED</div>
                <h3>You're licensed.</h3>
                <p className="lic-tagline">Save this key. It travels with the SKILL.md file.</p>

                <div className="lic-key-box">
                  <code>{key}</code>
                  <button type="button" className="lic-copy" onClick={copyKey} data-cursor aria-label="Copy license key">
                    {copied ? 'COPIED ✓' : 'COPY'}
                  </button>
                </div>

                <a
                  href={OMNI_URL}
                  className="btn amber lic-dl"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                >
                  ↓ DOWNLOAD OMNISCIENCE.SKILL.MD
                </a>

                <div className="lic-foot">
                  // to activate: drop the file into <code>~/agents/skills/omniscience/SKILL.md</code> and add your key as a comment at the top. works on any agent.
                </div>
              </>
            )}
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
