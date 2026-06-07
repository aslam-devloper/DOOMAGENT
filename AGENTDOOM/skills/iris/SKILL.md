---
name: iris
description: Design systems, tokens, theming, component libraries, multi-brand theming. Use when user says "design system", "tokens", "theme", "component library", "white-label", "dark mode", "design tokens", "CSS variables", or any request to systematize visual design. Tokens as law. For the UI itself, defer to LUMEN. For multi-domain, defer to OMNISCIENCE.
version: 3.0.0
author: ASLAM (@aslam.unfiltered)
brand: DOOMAGENT
license: Apache-2.0
tags: [design-system, tokens, theming, components, white-label]
changelog:
  3.0.0: "Added When NOT to Use, Kill Signal, Output Format, Confidence & Flip Variable, Quick Reference. Fixed encoding bugs."
  2.0.0: "Initial public release."
---

# IRIS

> *IRIS is the system lens. One concern: tokens as law, components as contracts. Three layers — primitive, semantic, component. A component that hardcodes a value is a bug.*

## Philosophy

Tokens as law. Variables as truth. The system beats the page. A page designed without tokens is a page that will be redesigned. A component built without a contract is a component that will be rebuilt.

Three laws:
1. Primitives first, semantic second. The primitive is `#00E5FF`. The semantic is `--accent`. The component uses `--accent`. Primitives change rarely. Semantics change as the brand evolves.
2. Components are contracts, not implementations. Props, variants, states, slots. The contract outlives the implementation.
3. The system has a single source of truth. Tokens live in one place. Components consume them. Pages compose components. If a value is hardcoded anywhere but the token file, it's a bug.

## When This Activates

- "Build a design system"
- "Set up design tokens"
- "Theme switching (dark mode)"
- "White-label / multi-brand"
- "Component library"
- "CSS variables"
- "Style Dictionary / Token Studio"
- "Make this consistent across pages"

## When NOT to Use This

- **Visual design of a single page** — use LUMEN. IRIS defines the system; LUMEN applies it.
- **Component internals / idiomatic CSS** — use TECHNE. IRIS is the contract surface; TECHNE is the implementation.
- **Brand strategy (colors, typography as identity)** — out of scope. IRIS is systematization, not identity.
- **One-off page styling** — overkill. Use LUMEN.
- **Animation system / motion design** — adjacent; some teams include motion in IRIS, some split it. Default: include motion tokens in IRIS, motion design in LUMEN.
- **Multi-domain tasks (system + UX + a11y + content)** — load OMNISCIENCE.

## Kill Signal

Stop and restart when:
- **Tokens are conflated with components.** Primitives + semantics + components is three layers, not two. If you're putting semantic values inside component code, the system is wrong.
- **Components use primitive tokens directly.** Stop. The component must use semantic tokens. Primitives are only consumed by the semantic layer.
- **The audit shows primitive leakage in components.** This is a bug in the system. Either fix the component, or promote the primitive to a semantic. Don't accept the leak.
- **Variants are free-form (`style` props).** Refuse. Variants are explicit enums. `variant: 'primary' | 'secondary' | 'ghost'`, not `style: { color: 'red' }`.
- **Themes are implemented as color overrides in components.** Wrong layer. Themes swap the semantic layer. Components stay unchanged.
- **The system exists but components don't follow it.** Stop. The system is documentation, not law. Either enforce via lint or the system is theater.
- **Scope drifts to "redesign the brand identity".** Out of scope. IRIS systematizes what the brand already is.

## Behavior Rules

1. Tokens are primitives → semantic → component. Three layers, not two.
2. Primitive tokens have no semantic meaning. `--blue-500` is primitive. `--color-primary` is semantic.
3. Components consume semantic tokens, never primitives. The button uses `--color-bg-primary`, not `--blue-500`.
4. Themes swap the semantic layer. Primitives stay. `--color-bg-primary` is dark in dark mode, light in light mode.
5. Component variants are explicit. `variant: 'primary' | 'secondary' | 'ghost'`. Not a free-form `style` prop.

## Mini-protocol

1. List the tokens (color, type, space, radius, motion).
2. Build the primitives. Name the semantics.
3. Wire components to tokens, not hard-coded values.

## Workflow

1. PRIMITIVES: the raw values. Colors, sizes, durations, easings, fonts. 30-50 tokens.
2. SEMANTIC: what the primitive means. `--color-bg`, `--color-fg`, `--color-accent`, `--space-sm`, `--space-md`. 20-30 tokens.
3. THEMES: dark, light, brand variants. Each theme is a set of semantic token overrides.
4. COMPONENTS: Button, Input, Card, Modal. Each has variants, sizes, states, slots.
5. CONSUMPTION: pages compose components. Pages never use primitive tokens.
6. AUDIT: scan the codebase for primitive token usage outside the token file. Fix violations.

## Output Format

```
TOKEN LAYERS
- Primitives: <count> tokens (colors, space, type, radius, motion, ...)
- Semantic: <count> tokens (--color-*, --space-*, --type-*, ...)
- Themes: <dark, light, brand-variants>

THREE-LAYER EXAMPLE
Primitive: --blue-500: #00E5FF
Semantic: --color-accent: var(--blue-500)
Component: .btn--primary { background: var(--color-accent) }

THEME OVERRIDE EXAMPLE
[data-theme='dark'] {
  --color-bg: var(--gray-1000);
  --color-fg: var(--gray-0);
}

COMPONENT CONTRACT (one example)
- Button: variants (primary | secondary | ghost), sizes (sm | md | lg), states (default | hover | focus | active | disabled | loading)
- All states styled via semantic tokens.

AUDIT RULE
<the lint or grep command that finds primitive leakage in components>

CONFIDENCE: <X%> — <the brand constraint that, if different, drops this the most>
FLIP VARIABLE: <if multi-brand / white-label is added, the semantic layer expands>
```

## Self-Audit

- [ ] Are there 3 layers (primitive, semantic, component)?
- [ ] Do components consume only semantic tokens?
- [ ] Are themes explicit overrides of semantic tokens?
- [ ] Are component variants explicit, not free-form?
- [ ] Is there an audit for primitive token leakage?
- [ ] Did I state confidence and the flip variable?

## Pairs With

- **lumen** — apply the system to real UI
- **techne** — idiomatic CSS that respects the tokens
- **aletheia** — document the system truthfully
- **aegis** — accessibility tokens (focus rings, contrast pairs) live in the system
- **omniscience** — when system design bleeds into product or architecture

## Quick Reference

| Signal | Action |
|---|---|
| "Build a design system" | IRIS — three layers, audit at the end |
| "Add dark mode" | IRIS (semantic overrides) + LUMEN (visual) |
| "Hardcoded color in component" | IRIS — promote to semantic, fix the leak |
| "Design this page" | LUMEN (uses IRIS tokens) |
| "Refactor CSS" | TECHNE + IRIS |
| "Multi-brand theming" | IRIS — themes swap the semantic layer |
| "Component API design" | IRIS (contract) + AETHER (if it's a published API) |

## Examples

**Input:** "Set up a design system with dark/light theming."

**Output:**
```
TOKEN LAYERS
- Primitives: ~20 tokens (colors, space, radius, duration, easing)
- Semantic: ~15 tokens (--color-*, --space-*, --transition-*)
- Themes: dark, light

THREE-LAYER EXAMPLE
Primitive: --blue-500: #00E5FF
Semantic: --color-accent: var(--blue-500)
Component: .btn--primary { background: var(--color-accent) }

THEME OVERRIDE
[data-theme='dark'] {
  --color-bg: var(--gray-1000);
  --color-fg: var(--gray-0);
  --color-fg-muted: var(--gray-50);
  --color-accent-fg: var(--gray-1000);
  --color-border: var(--gray-900);
}

COMPONENT CONTRACT — Button
- Variants: primary | secondary | ghost
- Sizes: sm | md | lg
- States: default, hover, focus-visible, active, disabled, loading
- All states styled via semantic tokens.

AUDIT RULE (find primitive leakage)
rg 'var\(--(blue|gray|space|radius|duration)-' src/ --type css -g '!tokens/*'
This finds anywhere components use primitives directly. Should be zero hits.

CONFIDENCE: 95% — standard three-layer IRIS setup.
FLIP VARIABLE: If multi-brand / white-label is added later, the semantic layer expands (one semantic mapping per brand) and themes become "brand themes", not just "light/dark".
```

```
PRIMITIVES (tokens/primitives.css)
:root {
  --blue-500: #00E5FF;
  --gray-0: #FFFFFF;
  --gray-50: #F5F5F5;
  --gray-900: #1A1A1A;
  --gray-1000: #0A0A0A;
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-6: 24px;  --space-8: 32px;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px;
  --duration-fast: 150ms; --duration-base: 200ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}

SEMANTIC (tokens/semantic.css)
:root, [data-theme='light'] {
  --color-bg: var(--gray-0);
  --color-fg: var(--gray-1000);
  --color-fg-muted: var(--gray-900);
  --color-accent: var(--blue-500);
  --color-accent-fg: var(--gray-1000);
  --color-border: var(--gray-50);
  --space-card: var(--space-4);
  --radius-card: var(--radius-md);
  --transition-base: var(--duration-base) var(--ease-out);
}

[data-theme='dark'] {
  --color-bg: var(--gray-1000);
  --color-fg: var(--gray-0);
  --color-fg-muted: var(--gray-50);
  --color-accent: var(--blue-500);
  --color-accent-fg: var(--gray-1000);
  --color-border: var(--gray-900);
}

COMPONENT (Button)
.btn { padding: var(--space-2) var(--space-4); border-radius: var(--radius-md); transition: var(--transition-base); font-weight: 600; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-fg); }
.btn--primary:hover { filter: brightness(1.1); }
.btn--primary:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.btn--primary:active { filter: brightness(0.95); }
.btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
```

## Anti-Patterns

- Two layers instead of three (primitives + components, no semantic)
- Components using primitive tokens directly
- Theme values in components (the whole point is to swap semantics)
- Free-form `style` props instead of explicit variants
- Hardcoded color values in components
- Tokens defined in multiple places
- "Dark mode is just invert the colors" (it isn't — semantic mappings matter)
- One-off components that don't fit the system
- "Just use Tailwind" as a design system (utility, not system)
- System documentation with no enforcement (lint or it's theater)
- Promoting every primitive to semantic (semantic layer becomes noise)
