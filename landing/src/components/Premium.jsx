import { founder } from '../data/skills'
import Reveal from './Reveal'
import Tilt from './Tilt'

export default function Premium() {
  const remaining = Math.max(0, founder.cap - founder.claimed)
  const pct = Math.min(100, (founder.claimed / founder.cap) * 100)

  return (
    <section className="prem-v2" id="premium">
      <div className="wrap">
        <Reveal as="div" className="prem-head">
          <div className="kicker">
            <span className="dot" /> 07 — THE MASTERWORK
          </div>
          <h2 className="t-h2">
            Twenty skills. <br />
            <span className="grad">One is the point.</span>
          </h2>
          <p className="t-sub">
            The free library is the proof of craft. OMNISCIENCE is the work itself — a
            meta-skill that loads the right lenses, runs the cascade, and ships a defended answer.
          </p>
        </Reveal>

        <div className="prem-grid">
          {/* LEFT — the free library (proof of craft) */}
          <Reveal as="article" className="prem-card prem-free" delay={60}>
            <Tilt>
              <div className="card-top">
                <div className="card-num">/ 01</div>
                <div className="card-flag">PROOF OF CRAFT</div>
              </div>
              <h3 className="card-h">The free library</h3>
              <p className="card-p">
                20 cognitive skills. ~140kb total. Apache-2.0. No DRM. No telemetry.
                Use one, use all, fork whatever you want. The library is the floor.
              </p>
              <ul className="card-list">
                <li>ATLAS, METIS, PHRONESIS, NOUS — reasoning & decision</li>
                <li>AEGIS, AETHER, THALASSA, STASIS, KRATOS — architecture</li>
                <li>ARGO, MNEMOSYNE — agents & memory</li>
                <li>TECHNE, MORPHE, STIGMA, ALETHEIA — craft & docs</li>
                <li>CHRONOS, VIGIL — operations & observability</li>
                <li>LUMEN, IRIS, ETHOS — design & guardrails</li>
              </ul>
              <div className="card-foot">
                <a className="btn-v2 ghost" href="#library">See the 20 skills</a>
                <span className="card-meta">$0 · forever · the floor</span>
              </div>
            </Tilt>
          </Reveal>

          {/* RIGHT — OMNISCIENCE + founder license */}
          <Reveal as="article" className="prem-card prem-pro" delay={120}>
            <Tilt>
              <div className="card-top">
                <div className="card-num">/ 02</div>
                <div className="card-flag pro">OMNISCIENCE</div>
              </div>
              <h3 className="card-h">The master skill</h3>
              <p className="card-p">
                One skill file. The 9-step cascade. The expert panel. The auto-selected lens sets.
                Drop it in your agent and the 20 free skills become a single, defensible voice.
              </p>

              {/* FOUNDER COHORT BLOCK */}
              <div className="founder-block">
                <div className="founder-row">
                  <span className="founder-label">FOUNDER COHORT</span>
                  <span className="founder-remaining">
                    <strong>{remaining}</strong> of {founder.cap} remaining
                  </span>
                </div>
                <div className="founder-bar" role="progressbar"
                     aria-valuemin="0" aria-valuemax={founder.cap}
                     aria-valuenow={founder.claimed}>
                  <div className="founder-bar-fill" style={{ width: pct + '%' }} />
                </div>
                <div className="founder-row sub">
                  <span className="founder-meta">
                    {founder.claimed} / {founder.cap} claimed
                  </span>
                  <span className="founder-meta">
                    Closes {new Date(founder.closesOn).toUTCString().slice(0, 16)}
                  </span>
                </div>

                <ul className="founder-benefits">
                  {founder.benefits.map((b) => (
                    <li key={b}><span className="check">✓</span>{b}</li>
                  ))}
                </ul>

                <div className="founder-foot">
                  <a className="btn-v2 pro" href="#waitlist" data-open-waitlist>
                    Claim founder license
                  </a>
                  <span className="founder-fine">
                    No subscription · pay once · keeps the work alive
                  </span>
                </div>
              </div>

              <div className="pro-fineprint">
                OMNISCIENCE is commercial-licensed. Founder cohort is the only way in.
                When the cap is met, OMNISCIENCE stays closed until the next cohort.
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
