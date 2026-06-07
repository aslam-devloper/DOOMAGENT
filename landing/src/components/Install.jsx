import { motion } from 'framer-motion'
import { installCmds } from '../data/skills.jsx'

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Install() {
  return (
    <section id="install">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 04 — install</div>
          <h2>60 seconds. <span className="ink">No dependencies.</span></h2>
          <p className="lead">
            Skills are markdown files. There's no runtime, no package manager, no SDK. Clone the repo, copy a folder, restart your AI. That's it.
          </p>
        </motion.div>

        <motion.div
          className="install-block"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {installCmds.map((cmd, i) => (
            <motion.div className="install-row" key={i} custom={i} variants={stepVariants}>
              <span className="p">$</span>
              <span className="c">{cmd.text}</span>
              <span className="tag">{cmd.tag}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="install-steps">
          {[
            { n: '/01', t: 'Pick your skills', d: "Don't install all 21 on day one. Start with the ones that match the work you actually do: METIS for debugging, ATLAS for architecture, TECHNE for code review." },
            { n: '/02', t: 'Drop into .opencode/skills/', d: 'opencode, Claude Code, Cursor, Cline, Aider — anything that reads a system prompt. The skills auto-load. No config required.' },
            { n: '/03', t: 'Watch the model change', d: 'Trigger phrases in each skill\'s frontmatter teach the model when to activate. "Bug" → METIS. "Architect" → ATLAS. "Should I" → PHRONESIS.' },
          ].map((step, i) => (
            <motion.div
              key={i}
              className="install-step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor
            >
              <div className="n">{step.n}</div>
              <div className="t">{step.t}</div>
              <div className="d">{step.d}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
