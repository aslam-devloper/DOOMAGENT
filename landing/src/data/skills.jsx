// All 21 DOOMAGENT skills, structured for the library landing page.

// --- DOWNLOAD LINKS (the only thing that matters for distribution) ---
// The 20 free skills live on GitHub. OMNISCIENCE is hosted at the shortener
// link below — that's how the project gets funded (the shortener pays a
// small amount per click). Edit the URL if the host changes.
export const downloads = {
  freeLibrary: 'https://github.com/aslam-devloper/DOOMAGENT/archive/refs/heads/main.zip',
  freeLibraryRepo: 'https://github.com/aslam-devloper/DOOMAGENT',
  omniscience: 'https://shrinkme.click/ppABk',
}

// --- SHORTENER NOTE (shown next to the OMNISCIENCE download) ---
// Honest, no-warning framing. The shortener is the project's funding model.
export const shortenerNote = {
  title: 'Note: shortener link',
  body: [
    'The OMNISCIENCE download is a URL shortener. It opens an interstitial page first — that is the shortener, not malware. The site earns a small amount per click, and that is how DOOMAGENT stays free for everyone.',
    'No accounts, no email, no signup. The other 20 free skills are on GitHub with no shortener.',
  ],
}

export const skills = [
  // REASONING & DECISION
  {
    name: 'NOUS',
    flag: 'free',
    glyph: 'nous/',
    desc: 'First-principles reasoning. Refuses to solve the wrong problem. Frame first, solve second. Strips assumed framing.',
    tags: ['reasoning', 'framing', 'why'],
    domain: 'reasoning',
  },
  {
    name: 'PHRONESIS',
    flag: 'free',
    glyph: 'phronesis/',
    desc: 'Trade-off analysis. Forces explicit cost enumeration. No fence-sitting. "Pick one, defend it, name what flips it."',
    tags: ['decisions', 'x-vs-y', 'trade-offs'],
    domain: 'reasoning',
  },
  {
    name: 'METIS',
    flag: 'free',
    glyph: 'metis/',
    desc: 'Deep debugging. Refuses surface fixes. Symptoms are liars — hunts the cause, not the effect. Bug archaeology.',
    tags: ['debugging', 'root-cause', 'investigation'],
    domain: 'reasoning',
  },
  {
    name: 'OMNISCIENCE',
    flag: 'pro',
    glyph: 'omniscience/',
    desc: 'The Full Auditor. 20 cognitive lenses, 9-step cascade, expert panel that argues with itself. Load one skill — get the entire library, orchestrated.',
    tags: ['full-auditor', 'meta-skill', 'orchestrator'],
    domain: 'reasoning',
    pro: true,
  },

  // ARCHITECTURE & SYSTEMS
  {
    name: 'ATLAS',
    flag: 'free',
    glyph: 'atlas/',
    desc: 'System architecture. Backend infrastructure. 10-year decisions, regret-minimization over feature count.',
    tags: ['architecture', 'infra', 'scale'],
    domain: 'architecture',
  },
  {
    name: 'THALASSA',
    flag: 'free',
    glyph: 'thalassa/',
    desc: 'Database design, schema architecture, query optimization. "Data outlives code." Get the schema right before you get it fast.',
    tags: ['database', 'schema', 'sql'],
    domain: 'architecture',
  },
  {
    name: 'AETHER',
    flag: 'free',
    glyph: 'aether/',
    desc: 'API design, contracts, REST/GraphQL/RPC architecture. Breaking changes are violence against every consumer.',
    tags: ['api', 'rest', 'graphql'],
    domain: 'architecture',
  },
  {
    name: 'AEGIS',
    flag: 'free',
    glyph: 'aegis/',
    desc: 'Security hardening, threat modeling, defensive code. Threat-model first. Fail closed. Secrets are toxic.',
    tags: ['security', 'auth', 'hardening'],
    domain: 'architecture',
  },
  {
    name: 'STASIS',
    flag: 'free',
    glyph: 'stasis/',
    desc: 'Caching strategy, read replicas, performance layers. "The most expensive operation is the unnecessary one."',
    tags: ['cache', 'redis', 'memo'],
    domain: 'architecture',
  },
  {
    name: 'KRATOS',
    flag: 'free',
    glyph: 'kratos/',
    desc: 'Performance optimization, profiling, refactoring for speed. "Fast" without measurement is just guessing.',
    tags: ['performance', 'latency', 'profile'],
    domain: 'architecture',
  },

  // AGENTS & MEMORY
  {
    name: 'ARGO',
    flag: 'free',
    glyph: 'argo/',
    desc: 'Multi-agent orchestration. Agent roles, handoffs, workflows. "The fix is the chart, not the agents."',
    tags: ['multi-agent', 'orchestration', 'langchain'],
    domain: 'agents',
  },
  {
    name: 'MNEMOSYNE',
    flag: 'free',
    glyph: 'mnemosyne/',
    desc: 'Long-context memory. Project context retention, decision logging, conversation continuity across long sessions.',
    tags: ['memory', 'context', 'decisions'],
    domain: 'agents',
  },

  // CODE QUALITY
  {
    name: 'TECHNE',
    flag: 'free',
    glyph: 'techne/',
    desc: 'Code craftsmanship. Idiomatic patterns, language mastery. "Code that works is the floor. Code that deserves to exist is the goal."',
    tags: ['code-quality', 'idiomatic', 'style'],
    domain: 'code',
  },
  {
    name: 'MORPHE',
    flag: 'free',
    glyph: 'morphe/',
    desc: 'Refactoring, code shape, behavior-preserving transformations. "Shape is correctness. Code that reads like prose survives."',
    tags: ['refactor', 'shape', 'restructure'],
    domain: 'code',
  },
  {
    name: 'STIGMA',
    flag: 'free',
    glyph: 'stigma/',
    desc: 'Testing, QA, edge case hunting. "Untested code is broken code. The corner case is where the bug lives."',
    tags: ['testing', 'qa', 'edge-cases'],
    domain: 'code',
  },
  {
    name: 'ALETHEIA',
    flag: 'free',
    glyph: 'aletheia/',
    desc: 'Documentation that tells the truth. READMEs, API docs, architecture docs. "A README that lies is worse than no README."',
    tags: ['docs', 'readme', 'truth'],
    domain: 'code',
  },

  // OPERATIONS
  {
    name: 'CHRONOS',
    flag: 'free',
    glyph: 'chronos/',
    desc: 'DevOps, CI/CD, deployment, infrastructure as code, automation. "If it\'s not automated, it\'s broken."',
    tags: ['devops', 'ci-cd', 'deploy'],
    domain: 'ops',
  },
  {
    name: 'VIGIL',
    flag: 'free',
    glyph: 'vigil/',
    desc: 'Observability, monitoring, logging, alerting, metrics, tracing. "If you can\'t see it, you can\'t fix it."',
    tags: ['observability', 'logs', 'alerts'],
    domain: 'ops',
  },

  // DESIGN & GUARDRAILS
  {
    name: 'LUMEN',
    flag: 'free',
    glyph: 'lumen/',
    desc: 'UI design, visual hierarchy, typography, color, spacing, motion. "Clarity is the highest aesthetic. Restraint is harder than decoration."',
    tags: ['ui', 'typography', 'layout'],
    domain: 'design',
  },
  {
    name: 'IRIS',
    flag: 'free',
    glyph: 'iris/',
    desc: 'Design systems, tokens, theming, component libraries, multi-brand theming. "Tokens as law. Variables as truth."',
    tags: ['design-system', 'tokens', 'theme'],
    domain: 'design',
  },
  {
    name: 'ETHOS',
    flag: 'opt-in',
    glyph: 'ethos/',
    desc: 'Halal compliance, ethical guardrails, permissible-only mode. Opt-in only — never imposed. Refuses, names the violation.',
    tags: ['halal', 'ethics', 'opt-in'],
    domain: 'design',
  },
]

export const domains = [
  { id: 'reasoning', n: '01', title: 'Reasoning & Decision', sub: '4 skills · the mind' },
  { id: 'architecture', n: '02', title: 'Architecture & Systems', sub: '6 skills · the system' },
  { id: 'agents', n: '03', title: 'Agents & Memory', sub: '2 skills · the coordination' },
  { id: 'code', n: '04', title: 'Code Quality & Craft', sub: '4 skills · the craft' },
  { id: 'ops', n: '05', title: 'Operations & Visibility', sub: '2 skills · the running' },
  { id: 'design', n: '06', title: 'Design & Guardrails', sub: '3 skills · the surface & the line' },
]

export const showcases = [
  {
    name: 'METIS',
    color: 'phosphor',
    glyph: 'skill loaded:',
    tagline: 'deep debugging · root-cause analysis',
    intro: 'User says: "the app crashes randomly." METIS refuses to ask about the crash log. It asks what changed before the crashes started. Symptoms are liars. The cause is upstream.',
    q: '"My app crashes randomly. Help?"',
    before: `There are several reasons an app might crash randomly:

1. Memory leaks
2. Unhandled exceptions
3. Race conditions
4. Null pointer errors
5. Resource exhaustion

You should add try/catch blocks around your code and check your logs. If the issue persists, you can use a debugger to step through the code.

Hope this helps!`,
    after: `"Randomly" is not a cause. It's a description of your experience. Two questions before I touch any code:

1. When did it start? — what's the most recent deploy, config change, or dependency bump?
2. What's the failure mode? — segfault, OOM, exception, hang? "Random" usually means one of these in a specific call path.

Symptoms lie. The cause is upstream of the crash. Show me the most recent change first — that's where we'll find it.`,
  },
  {
    name: 'ATLAS',
    color: 'phosphor',
    glyph: 'skill loaded:',
    tagline: 'system architecture · regret minimization',
    intro: 'User says: "should I split this into microservices?" ATLAS doesn\'t list pros and cons. It asks what the cost of being wrong is in 3 years, vs. the cost of being slow now. Then it picks.',
    q: '"Should I split my monolith into microservices?"',
    before: `Both approaches have pros and cons! Monoliths are simpler to develop and deploy but can become hard to scale. Microservices offer better scalability and fault isolation but add operational complexity.

Things to consider:
- Team size and structure
- Deployment frequency
- Scale requirements
- Domain boundaries

Many companies start with a monolith and migrate to microservices later.`,
    after: `No. Not yet. Three reasons:

1. Distributed systems tax: you'll pay it on every change. Network calls, partial failures, deployment coordination, observability. Tax is high, interest compounds.
2. You don't have the data to split well yet. Service boundaries emerge from watching actual coupling, not whiteboard diagrams.
3. Migration is irreversible-ish. The wrong split is harder to undo than the wrong monolith.

Do this instead: keep the monolith, mark internal module boundaries, pay down the dependencies that hurt. Split the day a real team (5+ people, not 1) owns a real service (10k+ rps, not 100). That day is not today.

Confidence: 80% — assumes standard SaaS, not e.g. ML infra.`,
  },
  {
    name: 'PHRONESIS',
    color: 'phosphor',
    glyph: 'skill loaded:',
    tagline: 'trade-off analysis · no fence-sitting',
    intro: 'User says: "Postgres or MongoDB?" PHRONESIS doesn\'t list pros. It names the decision, picks one, defends it, and names the variable that would flip the answer.',
    q: '"Postgres or MongoDB for my SaaS?"',
    before: `Both are great options, and the best choice really depends on your specific needs! Postgres is a powerful relational database with strong consistency and a rich SQL ecosystem. MongoDB is a flexible NoSQL document store that's great for unstructured data.

Some things to consider:
- If your data is highly relational, Postgres may be a better fit
- If you need flexible schemas, MongoDB could be a good choice
- Both are widely used and well-supported

I hope this helps you make the right decision for your project!`,
    after: `Postgres. Unless you have evidence Mongo fits better.

SaaS data is inherently relational — users, subscriptions, billing, audit logs. Mongo optimizes for document shapes you don't have. Migration cost is brutal and people systematically underestimate it.

Pick the relational default now. Switch only with evidence.

Confidence: 85% — assumes standard SaaS workload, not e.g. a CMS with deep document nesting.

Flip variable: if your data has deep, sparse, document-shaped records and your queries are mostly by-ID, Mongo wins. Show me that evidence and I'll change my answer.`,
  },
]

export const stackFlow = [
  { type: 'input', text: 'user: "design the new billing system"' },
  { type: 'skill', text: 'NOUS', sub: '// what does "billing" actually mean here?' },
  { type: 'skill', text: 'PHRONESIS', sub: '// 3 candidates, named, defended' },
  { type: 'skill', text: 'ATLAS', sub: '// 10-year decision, regret-minimizing' },
  { type: 'skill', text: 'THALASSA', sub: '// schema before speed' },
  { type: 'skill', text: 'AEGIS', sub: '// threat model the money path' },
  { type: 'skill', text: 'AETHER', sub: '// the public contract, sacred' },
  { type: 'pro', text: 'OMNISCIENCE', sub: '// stress-test, attack, compress, ship' },
  { type: 'output', text: 'answer: a design you\'d still respect in 5 years' },
]

// --- OMNISCIENCE: the 9-step cascade (the value proof) ---
export const cascade = [
  { n: '01', name: 'DECODE',   d: 'Restate the true intent — not the surface request.' },
  { n: '02', name: 'FORK',     d: 'Generate 3–5 distinct approaches. No premature convergence.' },
  { n: '03', name: 'STRESS',   d: 'Pre-mortem each candidate. Name the failure modes before they happen.' },
  { n: '04', name: 'COMMIT',   d: 'Pick the risk-adjusted best. Defend the pick. Name the flip variable.' },
  { n: '05', name: 'AUDIT',    d: 'Run the relevant lenses from the 20-skill library, in the right order.' },
  { n: '06', name: 'BUILD',    d: 'Lead with the conclusion. Then the reasoning. Then the evidence.' },
  { n: '07', name: 'ATTACK',   d: 'Red-team the output. Steelman the strongest objection. Then decide.' },
  { n: '08', name: 'COMPRESS', d: 'One-sentence test. If it cannot survive compression, it was not load-bearing.' },
  { n: '09', name: 'SHIP',     d: 'Calibrated. Terse. Honest. Confidence + flip variable, always.' },
]

// --- The expert panel: three voices that argue inside the cascade ---
export const expertPanel = [
  { name: 'DOMAIN EXPERT', glyph: '◆', d: 'What is the load-bearing fact of this domain? What is the 5-year call?' },
  { name: 'RED TEAM',      glyph: '◇', d: 'What is the strongest objection? What would a hostile reviewer say? Where does this break?' },
  { name: 'SHIPPER',       glyph: '◈', d: 'Is this shippable? What\'s the smallest correct version? What is unblock sequence?' },
]

// --- Auto-selected lens sets by task type (value proof: pre-built playbooks) ---
export const lensSets = [
  { task: 'Architecture decision', lenses: 'NOUS → PHRONESIS → ATLAS → THALASSA → AETHER → AEGIS' },
  { task: 'Code review',           lenses: 'METIS → TECHNE → MORPHE → STIGMA → AEGIS → ALETHEIA' },
  { task: 'Production debug',      lenses: 'METIS → STIGMA → VIGIL → STASIS → AEGIS' },
  { task: 'API design',            lenses: 'AETHER → AEGIS → THALASSA → ALETHEIA → KRATOS' },
  { task: 'Database / schema',     lenses: 'THALASSA → AEGIS → STASIS → KRATOS' },
  { task: 'Frontend / UI',         lenses: 'LUMEN → IRIS → TECHNE → STIGMA → KRATOS' },
  { task: 'DevOps / deploy',       lenses: 'CHRONOS → VIGIL → AEGIS → STASIS' },
  { task: 'Multi-agent system',    lenses: 'ARGO → MNEMOSYNE → METIS → AEGIS' },
  { task: 'Documentation',         lenses: 'ALETHEIA → TECHNE → AETHER' },
  { task: 'Performance work',      lenses: 'KRATOS → STIGMA → VIGIL → METIS' },
  { task: 'Security review',       lenses: 'AEGIS → METIS → STIGMA → ALETHEIA' },
  { task: 'Full audit',            lenses: 'All 20 lenses in parallel', highlight: true },
]

export const installCmds = [
  { tag: 'STEP 01', text: <><span className="com"># clone the library</span><br />git clone <span className="hi">https://github.com/aslam-devloper/DOOMAGENT.git</span></> },
  { tag: 'STEP 02', text: <><span className="com"># drop the skills you want into your agent's skills folder</span><br />cp -r DOOMAGENT/skills/<span className="hi">atlas</span> DOOMAGENT/skills/<span className="hi">metis</span> <span className="hi">~/agents/skills/</span></> },
  { tag: 'STEP 02b', text: <><span className="com"># (or copy them all — 20 skills, ~140kb total)</span><br />cp -r DOOMAGENT/skills/* <span className="hi">~/agents/skills/</span></> },
  { tag: 'STEP 03', text: <><span className="com"># drop OMNISCIENCE on top — the master skill</span><br />cp -r DOOMAGENT/skills/<span className="hi">omniscience</span> <span className="hi">~/agents/skills/</span></> },
  { tag: 'STEP 04', text: <><span className="com"># restart your agent. that's it.</span><br /><span className="hi">// one file, twenty lenses, one cascade.</span></> },
]
