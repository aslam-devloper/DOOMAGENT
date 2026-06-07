# DOOMAGENT — Landing

The marketing site for [DOOMAGENT](https://github.com/aslam-devloper/DOOMAGENT) — 20 free cognitive skills for AI agents + **OMNISCIENCE**, the master skill that orchestrates all 20.

Live at **[doomagent.vercel.app](https://doomagent.vercel.app)**.

---

## What this is

A Vite + React 18 single-page app. Pure frontend, no backend. The founder-cohort waitlist modal generates license keys client-side via a DJB2 hash + base36 timestamp — the actual license file is delivered by email.

### Design system
- Dark brutalist terminal aesthetic
- Inter (UI) + JetBrains Mono (code/accents)
- Color tokens: `--void` `#0A0A0A` · `--bone` `#E8E8E8` · `--cyan` `#00E5FF` · `--phosphor` `#39FF14` · `--amber` `#FFD60A` · `--red` `#FF2D55`
- Lenis smooth scroll · framer-motion · custom cursor · magnetic buttons · 3D tilt · scroll progress bar

### Sections (in order)
1. **Nav** — sticky; founder-cohort badge with remaining seats
2. **Hero** — OMNISCIENCE-first headline; terminal preview of the cascade
3. **Marquee** — skill ticker
4. **Problem** — why generic agents fail
5. **Library** — all 21 skills, with a **Download .zip** bar at the top
6. **Showcase** — before/after of METIS, ATLAS, PHRONESIS
7. **Install** — copy-paste install commands
8. **Stack** — dependency-free pitch
9. **Stats** — 5 honest numbers (incl. founder seat counter)
10. **Premium** — free library vs OMNISCIENCE (founder-license CTA)
11. **Cascade** — the 9 steps + expert panel + auto-selected lens sets (the value proof)
12. **Fineprint** — honest disclosures
13. **Buy** — masterwork CTA + founder pill
14. **Footer** — credits + founder cohort closing date
15. **WaitlistModal** — the founder cohort flow (email → license key)

## Founder cohort config

All founder-cohort numbers live in **one place**: `src/data/skills.jsx` → the `founder` object.

```js
export const founder = {
  cap: 500,
  claimed: 247,                  // ← update with real number
  closesOn: '2026-08-31T23:59:59Z',  // ← update with real date
  benefits: [
    'OMNISCIENCE — the master skill, lifetime updates',
    'Founder license key (one person, one key, no DRM)',
    'Direct line to ASLAM for feedback and bugs',
    'Your name in the FOUNDERS.md credits',
    'First look at every new skill before public release',
  ],
  standardBenefits: [
    'OMNISCIENCE — the master skill, lifetime updates',
    'Single license key, single user, no telemetry',
  ],
}
```

Changing `claimed` and `closesOn` here updates the founder counter everywhere (Nav, Hero eyebrow, Stats card, Premium block, Cascade section, Buy section, Footer, WaitlistModal).

## Development

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # → dist/
```

## Deploy

Vercel. `pnpm build` → `dist/`. `vercel.json` rewrites all routes to `/index.html` (SPA).

## File structure

```
src/
├── App.jsx                 # section order, smooth scroll, modal trigger
├── main.jsx
├── data/
│   └── skills.jsx          # ← founder config + skills + cascade + lens sets
├── components/
│   ├── Hero.jsx            # OMNISCIENCE-first headline
│   ├── Library.jsx         # 21 skills + Download .zip bar
│   ├── Stats.jsx           # 5 honest numbers + founder counter
│   ├── Premium.jsx         # free vs OMNISCIENCE
│   ├── Cascade.jsx         # 9-step cascade + expert panel + lens sets
│   ├── Buy.jsx             # masterwork CTA
│   ├── Footer.jsx          # credits + founder closing date
│   ├── Nav.jsx             # founder pill with seat counter
│   ├── WaitlistModal.jsx   # founder cohort flow
│   ├── Reveal.jsx          # scroll-reveal wrapper
│   ├── Tilt.jsx            # 3D tilt
│   ├── Magnetic.jsx        # magnetic button
│   ├── Cursor.jsx          # custom cursor
│   ├── MeshGradient.jsx
│   ├── FloatingChips.jsx
│   ├── SectionIndicator.jsx
│   ├── Marquee.jsx
│   ├── Problem.jsx
│   ├── Showcase.jsx
│   ├── Install.jsx
│   ├── Stack.jsx
│   └── Fineprint.jsx
└── styles/
    └── global.css          # ← all styles (design tokens + components)
```

## Design philosophy

- **OMNISCIENCE is the product.** The free library is the proof of craft, not the headline.
- **Honest FOMO, not dark patterns.** Real cap, real deadline, real benefits. No fake countdowns. No "X viewing now."
- **The cascade is the value proof.** Don't tell people OMNISCIENCE is good — show them the 9 steps, the expert panel, the auto-selected lens sets.
- **Founder cohort is the gate.** One cohort at a time. When it's full, OMNISCIENCE waits. The discipline is the value.

## License

The site itself is MIT. The free library it links to is Apache 2.0. OMNISCIENCE is Commercial — license issued on https://doomagent.vercel.app.
