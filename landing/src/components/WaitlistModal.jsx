import { useEffect, useRef, useState } from 'react'
import { founder } from '../data/skills'

function makeKey(seed) {
  let h = 5381
  const s = (seed || 'omni') + ':' + Date.now().toString(36)
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i)
  const t = Date.now().toString(36).toUpperCase()
  return 'OMNI-F-' + (h >>> 0).toString(36).toUpperCase() + '-' + t
}

export default function WaitlistModal() {
  const dialogRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [key, setKey] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [agent, setAgent] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    const onOpen = (e) => {
      if (e?.detail?.prefill) {
        const p = e.detail.prefill
        if (p.email) setEmail(p.email)
        if (p.role) setRole(p.role)
        if (p.agent) setAgent(p.agent)
      }
      setDone(false)
      setOpen(true)
    }
    window.addEventListener('open-waitlist', onOpen)
    return () => window.removeEventListener('open-waitlist', onOpen)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    const k = makeKey(email)
    setKey(k)
    setDone(true)
  }

  if (!open) return null

  const remaining = Math.max(0, founder.cap - founder.claimed)
  const pct = Math.min(100, (founder.claimed / founder.cap) * 100)

  return (
    <div className="modal-scrim" role="dialog" aria-modal="true"
         onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
      <div className="modal-v2" ref={dialogRef}>
        <button className="modal-x" aria-label="close"
                onClick={() => setOpen(false)}>×</button>

        {!done && (
          <>
            <div className="modal-kicker">
              <span className="dot" /> FOUNDER COHORT · OMNISCIENCE
            </div>
            <h3 className="modal-h">Claim a founder license</h3>
            <p className="modal-sub">
              Founder cohort closes when <strong>{founder.cap}</strong> seats are claimed
              or on <strong>{new Date(founder.closesOn).toUTCString().slice(0, 16)}</strong>,
              whichever comes first. One person, one key, lifetime updates.
            </p>

            <div className="modal-founder-row">
              <div className="modal-counter">
                <span className="mc-num">{remaining}</span>
                <span className="mc-of">of {founder.cap} remaining</span>
              </div>
              <div className="modal-bar">
                <div className="modal-bar-fill" style={{ width: pct + '%' }} />
              </div>
            </div>

            <form className="modal-form" onSubmit={submit}>
              <label className="m-row">
                <span>email</span>
                <input type="email" required value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="you@team.io" autoFocus />
              </label>
              <label className="m-row">
                <span>your role</span>
                <input type="text" value={role}
                       onChange={(e) => setRole(e.target.value)}
                       placeholder="founder, staff eng, PM, …" />
              </label>
              <label className="m-row">
                <span>agent you run</span>
                <input type="text" value={agent}
                       onChange={(e) => setAgent(e.target.value)}
                       placeholder="opencode, cursor, windsurf, …" />
              </label>
              <label className="m-row">
                <span>what would you want this to do better?</span>
                <textarea value={note} rows={3}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="(optional) — read by ASLAM, not a form field." />
              </label>

              <div className="m-fine">
                <p>
                  <strong>What you get:</strong>{' '}
                  {founder.benefits.join(' · ')}
                </p>
                <p className="m-fine-sub">
                  No subscription. One license key, issued on this site, supports any agent.
                  Founder cohort is the only path to OMNISCIENCE during this round.
                </p>
              </div>

              <div className="m-actions">
                <button className="btn-v2 pro" type="submit">Reserve my seat</button>
                <button className="btn-v2 ghost" type="button"
                        onClick={() => setOpen(false)}>Not yet</button>
              </div>
            </form>
          </>
        )}

        {done && (
          <div className="modal-done">
            <div className="modal-kicker">
              <span className="dot live" /> SEAT RESERVED
            </div>
            <h3 className="modal-h">You're in. Welcome to the cohort.</h3>
            <p className="modal-sub">
              Your founder license key is below. The download link is in the email we just queued
              to <strong>{email}</strong>. Reply to it — it reaches ASLAM directly.
            </p>

            <div className="key-block">
              <div className="key-label">LICENSE KEY</div>
              <code className="key-val">{key}</code>
              <button className="key-copy" onClick={() => {
                try { navigator.clipboard?.writeText(key) } catch (_) {}
              }}>copy</button>
            </div>

            <div className="m-fine">
              <p>
                <strong>What happens next:</strong> the OMNISCIENCE skill file + a one-time
                activation step. Drop it into your agent's skills folder and the cascade comes online.
              </p>
              <p className="m-fine-sub">
                Founder cohort cap: {founder.cap}. Closing date:{' '}
                {new Date(founder.closesOn).toUTCString().slice(0, 16)}.
              </p>
            </div>

            <div className="m-actions">
              <button className="btn-v2 pro" onClick={() => setOpen(false)}>Got it</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
