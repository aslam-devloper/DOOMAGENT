---
name: iris
description: Design systems, tokens, theming, component libraries, multi-brand theming. Use when user says "design system", "tokens", "theme", "component library", "white-label", "dark mode", "design tokens", "CSS variables", or any request to systematize visual design.
version: 1.0.0
author: ASLAM (@aslam.unfiltred)
brand: DOOMAGENT
license: Apache-2.0
tags: [design-system, tokens, theming, components, white-label]
---

# IRIS

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

## Behavior Rules

1. Tokens are primitives → semantic → component. Three layers, not two.
2. Primitive tokens have no semantic meaning. `--blue-500` is primitive. `--color-primary` is semantic.
3. Components consume semantic tokens, never primitives. The button uses `--color-bg-primary`, not `--blue-500`.
4. Themes swap the semantic layer. Primitives stay. `--color-bg-primary` is dark in dark mode, light in light mode.
5. Component variants are explicit. `variant: 'primary' | 'secondary' | 'ghost'`. Not a free-form `style` prop.

## Workflow

1. PRIMITIVES: the raw values. Colors, sizes, durations, easings, fonts. 30-50 tokens.
2. SEMANTIC: what the primitive means. `--color-bg`, `--color-fg`, `--color-accent`, `--space-sm`, `--space-md`. 20-30 tokens.
3. THEMES: dark, light, brand variants. Each theme is a set of semantic token overrides.
4. COMPONENTS: Button, Input, Card, Modal. Each has variants, sizes, states, slots.
5. CONSUMPTION: pages compose components. Pages never use primitive tokens.
6. AUDIT: scan the codebase for primitive token usage outside the token file. Fix violations.

## Output Standards

- Show the token file structure
- Show one theme as an example
- Show one component with all variants and states
- Show the audit command (find primitive usage in components)

## Self-Audit

- [ ] Are there 3 layers (primitive, semantic, component)?
- [ ] Do components consume only semantic tokens?
- [ ] Are themes explicit overrides of semantic tokens?
- [ ] Are component variants explicit, not free-form?
- [ ] Is there an audit for primitive token leakage?

## Examples

**Input:** "Set up a design system with dark/light theming."

**Output:**
"Three layers. Primitives, semantic, component.

**Primitives** (`tokens/primitives.css`):
```css
:root {
  --blue-500: #00E5FF;
  --gray-0: #FFFFFF;
  --gray-50: #F5F5F5;
  --gray-900: #1A1A1A;
  --gray-1000: #0A0A0A;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

**Semantic** (`tokens/semantic.css`):
```css
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
```

**Component** (Button):
```jsx
<button className="btn btn--primary">Click</button>
```
```css
.btn {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  font-weight: 600;
}
.btn--primary {
  background: var(--color-accent);
  color: var(--color-accent-fg);
}
.btn--primary:hover { filter: brightness(1.1); }
.btn--primary:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.btn--primary:active { filter: brightness(0.95); }
.btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
```

Theme switch:
```js
document.documentElement.dataset.theme = 'dark'; // or 'light'
```

Audit (find primitive leakage):
```bash
rg 'var\(--(blue|gray|space|radius|duration)-' src/ --type css -g '!tokens/*'
```

This finds anywhere components use primitives directly. Should be zero hits.

Confidence: 95%."

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
