import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const items = [
  { k: '// the model', v: <>Skills don't make a 7B model into a 70B model. They make a 7B model <em>use what it knows</em> less wastefully. The discipline is the lift, not the data.</> },
  { k: '// compatibility', v: <>Tested on opencode, Claude Code, Cursor, Cline, Aider, OpenAI Playground, LangChain, Ollama, LM Studio. The format is plain markdown — if your tool reads a system prompt, it works.</> },
  { k: '// ethos', v: <>ETHOS is the only skill that's <em>opt-in</em>. It doesn't activate unless you ask. We didn't build a moral layer into the rest of the library. That's a feature.</> },
  { k: '// the square', v: <>Yes, the corner square is intentional. No, we won't stop. It's bounced <span data-bounces>0</span> times since you opened this page. <em>It has bounced more than you have thought today.</em></> },
  { k: '// who built it', v: <>One person. <em>ASLAM</em>. From a small keyboard. On a small desk. In a small apartment. The library is small because the builder is small, in the most affectionate sense.</> },
  { k: '// the license', v: <>Apache 2.0. Use in commercial projects. Modify. Redistribute. <em>Just don't remove the credits.</em> That's the only ask. It's a small ask.</> },
  { k: '// no DRM', v: <>OMNISCIENCE ships without DRM. We trust you. Don't make us regret it. If you share it, that's on your conscience and we hope your conscience is kind to you.</> },
  { k: '// unknown unknowns', v: <>We have no idea if every skill works on every model. We tested the library on 7 — Llama 3.1 8B, Mistral 7B, GPT-4o, Claude Sonnet, Claude Haiku, Gemini 1.5 Pro, Qwen 2.5 14B. <em>Tell us about the others.</em></> },
  { k: '// 2027', v: <>If you're reading this in 2027, hello from the past. The page is roughly the same. The bouncing square still bounces. <em>We've grown a little. The square has not.</em></> },
]

const variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Fineprint() {
  const ref = useRef(null)
  useEffect(() => {
    // mark bouncing counter initialization
    const bounces = parseInt(localStorage.getItem('dm_bounces') || '0', 10)
    document.querySelectorAll('[data-bounces]').forEach(el => el.textContent = bounces.toLocaleString())
  }, [])

  return (
    <section className="fineprint" ref={ref}>
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow-sm">// 08 — the fine print</div>
          <h2>What we should probably <span className="ink">mention</span>.</h2>
          <p className="lead">A list. Some of these are jokes. Some aren't. We left the line blurry because that's the brand.</p>
        </motion.div>
        <div className="fp-list">
          {items.map((it, i) => (
            <motion.div
              key={i}
              className="fp"
              custom={i}
              variants={variants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              data-cursor
            >
              <div className="k">{it.k}</div>
              <div className="v">{it.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
