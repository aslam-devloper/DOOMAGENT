import { downloads, shortenerNote } from '../data/skills'
import Reveal from './Reveal'
import Tilt from './Tilt'

export default function Premium() {
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
                20 cognitive skills. ~140kb total. Apache 2.0. No DRM. No telemetry.
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
                <a className="btn-v2 green" href={downloads.freeLibrary} download data-cursor>
                  ↓ Download .zip
                </a>
                <span className="card-meta">$0 · forever · no shortener</span>
              </div>
            </Tilt>
          </Reveal>

          {/* RIGHT — OMNISCIENCE, free via shortener */}
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

              <div className="pro-download">
                <a
                  className="btn-v2 pro pro-dl-btn"
                  href={downloads.omniscience}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  aria-label="Download OMNISCIENCE (free, via shortener link)"
                >
                  <span className="pro-dl-glyph">↓</span>
                  <span>Download OMNISCIENCE</span>
                  <span className="pro-dl-tag">free</span>
                </a>
              </div>

              {/* SHORTENER NOTE — honest, no-warning framing */}
              <div className="pro-note" role="note">
                <div className="pro-note-head">
                  <span className="pro-note-pill">{shortenerNote.title}</span>
                </div>
                {shortenerNote.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pro-fineprint">
                OMNISCIENCE is free for everyone. The shortener pays a small amount per click
                — that's the funding model. No email, no signup, no telemetry.
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
