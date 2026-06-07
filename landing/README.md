# DOOMAGENT — Landing

The marketing site for [DOOMAGENT](https://github.com/aslam-devloper/DOOMAGENT) — 20 free cognitive skills for AI agents + **OMNISCIENCE**, the master skill that orchestrates all 20 (also free).

Live at **[doomagent.vercel.app](https://doomagent.vercel.app)**.

---

## What this is

A Vite + React 18 single-page app. Pure frontend, no backend.

### Design system
- Dark brutalist terminal aesthetic
- Inter (UI) + JetBrains Mono (code/accents)
- Color tokens: `--void` `#0A0A0A` · `--bone` `#E8E8E8` · `--cyan` `#00E5FF` · `--phosphor` `#39FF14` · `--amber` `#FFD60A` · `--red` `#FF2D55`
- Lenis smooth scroll · framer-motion · custom cursor · magnetic buttons · 3D tilt · scroll progress bar

### Sections (in order)
1. **Nav** — sticky; "Download OMNISCIENCE" pill
2. **Hero** — OMNISCIENCE-first headline; terminal preview of the cascade
3. **Marquee** — skill ticker
4. **Problem** — why generic agents fail
5. **Library** — all 21 skills, with a **Download .zip** bar at the top
6. **Showcase** — before/after of METIS, ATLAS, PHRONESIS
7. **Install** — copy-paste install commands
8. **Stack** — dependency-free pitch
9. **Stats** — 4 honest numbers
10. **Premium** — free library vs OMNISCIENCE (free download CTA + shortener note)
11. **Cascade** — the 9 steps + expert panel + auto-selected lens sets (the value proof)
12. **Fineprint** — honest disclosures
13. **Buy** — masterwork CTA + free download
14. **Footer** — credits + OMNISCIENCE free note

## Download links config

All download URLs live in **one place**: `src/data/skills.jsx` → the `downloads` object.

```js
export const downloads = {
  freeLibrary: 'https://github.com/aslam-devloper/DOOMAGENT/archive/refs/heads/main.zip',
  freeLibraryRepo: 'https://github.com/aslam-devloper/DOOMAGENT',
  omniscience: 'https://shrinkme.click/ppABk',  // ← funded by the shortener
}
```

Changing the OMNISCIENCE URL here updates it everywhere (Nav, Hero, Premium, Buy, Footer).

The shortener note is also centralized:

```js
export const shortenerNote = {
  title: 'Note: shortener link',
  body: [
    'The OMNISCIENCE download is a URL shortener. ...',
    'No accounts, no email, no signup. The other 20 free skills are on GitHub with no shortener.',
  ],
}
```

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
├── App.jsx                 # section order, smooth scroll
├── main.jsx
├── data/
│   └── skills.jsx          # ← downloads + skills + cascade + lens sets + shortener note
├── components/
│   ├── Hero.jsx            # OMNISCIENCE-first headline + free download CTAs
│   ├── Library.jsx         # 21 skills + Download .zip bar
│   ├── Stats.jsx           # 4 honest numbers
│   ├── Premium.jsx         # free library vs OMNISCIENCE (free + shortener note)
│   ├── Cascade.jsx         # 9-step cascade + expert panel + lens sets
│   ├── Buy.jsx             # masterwork CTA + free download
│   ├── Footer.jsx          # credits + OMNISCIENCE-free note
│   ├── Nav.jsx             # download pill in nav
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

- **OMNISCIENCE is the masterwork.** The free library is the proof of craft, not the headline.
- **Everything is free.** 20 free skills (Apache 2.0) + OMNISCIENCE (free, funded by the shortener).
- **The shortener is the funding model.** The note in the Premium block explains it in plain language. No "warning" framing — just honest disclosure.
- **The cascade is the value proof.** Don't tell people OMNISCIENCE is good — show them the 9 steps, the expert panel, the auto-selected lens sets.

## License

The site itself is MIT. The free library it links to is Apache 2.0. OMNISCIENCE is free for everyone — distributed via the download shortener at https://doomagent.vercel.app.
