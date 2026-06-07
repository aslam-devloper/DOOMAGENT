import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { skills, domains } from '../data/skills.jsx'
import Tilt from './Tilt'
import Reveal from './Reveal'

const FILTERS = [
  { id: 'all', label: 'All · 21' },
  { id: 'reasoning', label: 'Reasoning' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'agents', label: 'Agents' },
  { id: 'code', label: 'Code' },
  { id: 'ops', label: 'Ops' },
  { id: 'design', label: 'Design' },
  { id: 'pro', label: 'Pro' },
]

export default function Library() {
  const [filter, setFilter] = useState('all')

  const grouped = useMemo(() => {
    let list = skills
    if (filter === 'pro') list = skills.filter(s => s.flag === 'pro')
    else if (filter !== 'all') list = skills.filter(s => s.domain === filter)
    const map = {}
    list.forEach(s => {
      if (!map[s.domain]) map[s.domain] = []
      map[s.domain].push(s)
    })
    return map
  }, [filter])

  const total = useMemo(() => {
    if (filter === 'all') return skills.length
    if (filter === 'pro') return skills.filter(s => s.flag === 'pro').length
    return skills.filter(s => s.domain === filter).length
  }, [filter])

  return (
    <section id="library" className="lib-v2">
      <div className="wrap">
        <Reveal as="div">
          <div className="eyebrow-sm">// 02 — the library</div>
          <h2>21 skills. <span className="ink">Six domains.</span> One library.</h2>
          <p className="lead">
            Each skill is a markdown file. Each one declares a <em style={{ color: 'var(--bone)' }}>philosophy</em>, a <em style={{ color: 'var(--bone)' }}>trigger</em>, and a <em style={{ color: 'var(--bone)' }}>protocol</em>. Drop them into your agent's skills folder — <code style={{ color: 'var(--cyan)' }}>~/agents/skills/</code> — and the model learns when to act like a debugger, when to act like an architect, when to refuse, and when to ship.
          </p>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <div className="lib-v2-download">
            <div className="ld-left">
              <div className="ld-glyph">↓</div>
              <div className="ld-text">
                <div className="ld-h">Download the free library</div>
                <div className="ld-meta">20 skills · ~140kb · Apache 2.0 · ZIP · works on any agent</div>
              </div>
            </div>
            <div className="ld-right">
              <a
                className="btn-v2 green ld-btn"
                href="https://github.com/aslam-devloper/DOOMAGENT/archive/refs/heads/main.zip"
                download
                data-cursor
                aria-label="Download the free DOOMAGENT library as a ZIP file"
              >
                <span className="ld-btn-glyph">↓</span>
                <span>Download .zip</span>
                <span className="ld-btn-size">~140kb</span>
              </a>
              <a
                className="btn-v2 ghost"
                href="https://github.com/aslam-devloper/DOOMAGENT"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <div className="lib-v2-filters" role="tablist" aria-label="Filter by domain">
            {FILTERS.map(f => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`lib-v2-pill ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
                data-cursor
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" delay={0.05}>
          <div className="lib-v2-count" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}>
            Showing <span style={{ color: 'var(--cyan)' }}>{total}</span> of 21 skills
          </div>
        </Reveal>

        <div className="lib-v2-domains">
          {domains.filter(d => grouped[d.id]).map((dom, di) => {
            const ds = grouped[dom.id]
            if (!ds || !ds.length) return null
            return (
              <div className="lib-v2-domain" key={dom.id}>
                <Reveal as="div">
                  <div className="lib-v2-domain-head">
                    <div className="n">DOMAIN {dom.n}</div>
                    <div className="h">{dom.title}</div>
                    <div className="c">{ds.length} skill{ds.length === 1 ? '' : 's'}</div>
                  </div>
                </Reveal>
                <div className="lib-v2-grid">
                  {ds.map((s, i) => (
                    <Tilt key={s.name} maxTilt={4} scale={1.015} className={`lib-v2-card ${s.pro ? 'is-pro' : ''}`}>
                      <div className="lib-v2-num">{String(skills.indexOf(s) + 1).padStart(2, '0')}</div>
                      <div className="lib-v2-card-top">
                        <div className="lib-v2-glyph">// {s.glyph}</div>
                        <div className={`lib-v2-flag ${s.flag === 'opt-in' ? 'opt' : s.flag === 'pro' ? 'pro' : 'free'}`}>
                          {s.flag === 'opt-in' ? 'OPT-IN' : s.flag === 'pro' ? 'PREMIUM' : 'FREE'}
                        </div>
                      </div>
                      <div className="lib-v2-name">{s.name}</div>
                      <div className="lib-v2-desc">{s.desc}</div>
                      <div className="lib-v2-tags">
                        {s.tags.map(t => <span className="lib-v2-tag" key={t}>{t}</span>)}
                      </div>
                    </Tilt>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
