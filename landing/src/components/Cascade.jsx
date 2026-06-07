import { cascade, expertPanel, lensSets } from '../data/skills'
import Reveal from './Reveal'

export default function Cascade() {
  return (
    <section className="cascade-v2" id="cascade">
      <div className="wrap">
        <Reveal as="div" className="cascade-head">
          <div className="kicker">
            <span className="dot" /> OMNISCIENCE — THE 9-STEP CASCADE
          </div>
          <h2 className="t-h2">
            One skill.<br />
            Twenty lenses.<br />
            <span className="grad">A cascade that argues with itself.</span>
          </h2>
          <p className="t-sub">
            Most AI agents give you a confident answer.
            OMNISCIENCE gives you a <em>defended</em> answer.
            Same prompt. Different shape of thought.
          </p>
        </Reveal>

        {/* CASCADE — 9 steps */}
        <Reveal as="div" className="cascade-grid" delay={80}>
          {cascade.map((s) => (
            <article className="cascade-step" key={s.n}>
              <div className="cs-num">{s.n}</div>
              <div className="cs-body">
                <h3 className="cs-name">{s.name}</h3>
                <p className="cs-desc">{s.d}</p>
              </div>
            </article>
          ))}
        </Reveal>

        {/* EXPERT PANEL */}
        <Reveal as="div" className="cascade-panel" delay={120}>
          <div className="cp-head">
            <span className="kicker sm">
              <span className="dot" /> THE EXPERT PANEL
            </span>
            <h3 className="cp-title">Three voices, arguing inside the cascade.</h3>
            <p className="cp-sub">
              On every non-trivial task, OMNISCIENCE drafts three responses —
              then forces them to disagree. The shipped answer is the
              <em> residue</em> of the disagreement.
            </p>
          </div>
          <div className="cp-grid">
            {expertPanel.map((p) => (
              <div className="cp-card" key={p.name}>
                <div className="cp-glyph">{p.glyph}</div>
                <h4 className="cp-name">{p.name}</h4>
                <p className="cp-desc">{p.d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* LENS SETS — auto-selected by task */}
        <Reveal as="div" className="cascade-sets" delay={160}>
          <div className="cs-head">
            <span className="kicker sm">
              <span className="dot" /> LENS SETS — AUTO-SELECTED
            </span>
            <h3 className="cp-title">The right lenses, in the right order, for the task.</h3>
            <p className="cp-sub">
              You name the task. OMNISCIENCE selects the lens set, the order,
              and the calibration level. No prompt engineering required.
            </p>
          </div>
          <ul className="lens-sets">
            {lensSets.map((s) => (
              <li className={'ls-row' + (s.highlight ? ' ls-hi' : '')} key={s.task}>
                <span className="ls-task">{s.task}</span>
                <span className="ls-arr">→</span>
                <span className="ls-lens">{s.lenses}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
