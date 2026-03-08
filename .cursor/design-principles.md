# Design Principles

Visual polish is the most important non-functional quality of this project. Every UI decision should be deliberate — nothing should feel like a default or an afterthought.

---

## Visual Philosophy

The site should communicate **craft, precision and confidence**. Think of the best developer and SaaS portfolios you've seen: clean whitespace, type that breathes, cards with just enough depth, interactions that reward attention.

| Principle         | What it means in practice                                                         |
| ----------------- | --------------------------------------------------------------------------------- |
| Clean layout      | Generous whitespace, consistent grid, nothing cramped                             |
| Strong typography | Bold headings, readable body text, clear hierarchy                                |
| Modern cards      | Rounded corners (≥ `rounded-xl`), subtle borders, soft shadows                    |
| Soft shadows      | `shadow-md` to `shadow-2xl` with colour-tinted spread (e.g. `shadow-blue-500/15`) |
| Subtle gradients  | Used for backgrounds, icon containers and text — never garish                     |
| Hover animations  | Every interactive element responds to hover; transitions are 200–500 ms           |

---

## Colour System

The site uses a **dark-first** palette with blue/cyan as the primary accent:

- **Primary accent:** `blue-600` / `cyan-500`
- **AI / system accent:** `violet-600` / `indigo-500`
- **Success / data accent:** `emerald-500`
- **Warning accent:** `amber-500`
- **Backgrounds:** `slate-900` → `slate-950` → `black` (card interiors)
- **Borders:** `slate-800/60` (dark), `[#e3d4c3]/80` (light)

Always use CSS variables (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) for theme-adaptive elements, and Tailwind opacity modifiers (e.g. `blue-500/20`) for translucent overlays.

---

## Interaction Patterns

### 3D hover tilt (Hero portrait card)

The hero portrait card tilts in 3D in response to mouse position using `perspective` and `rotateX`/`rotateY` transforms. A radial gradient "shine" overlay follows the cursor. This effect is implemented with `onMouseMove`/`onMouseLeave` in React state — do not replicate this pattern elsewhere; it is intentionally unique to the hero.

### Card glow effects

Project and system cards emit a coloured shadow on hover:

```
hover:shadow-2xl hover:shadow-blue-500/15
```

AI-system cards use violet: `hover:shadow-violet-500/20`.

### Card shine sweep

`.card-shine` is a CSS pseudo-element that sweeps a white gradient highlight across the card on hover. It is defined in `globals.css` and applied as a `<div className="card-shine" />` as the first child of each project card.

### Scroll reveal

`SectionContainer` uses GSAP `ScrollTrigger` to fade sections up from `y: 60`. Sections animate once on first entry and do not repeat.

### Gradient text

Gradient text is achieved with:

```
bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent
```

Use sparingly — only for primary headings and key labels.

---

## Typography

- Headings: `font-bold`, sizes scale from `text-3xl` (section) to `text-4xl sm:text-5xl md:text-6xl` (hero)
- Body: `text-sm` to `text-lg`, `text-muted-foreground`, `leading-relaxed`
- Labels / badges: `text-xs font-medium`, uppercase tracking for section labels
- Monospace: reserved for code snippets only

---

## Spacing Conventions

- Section padding: `py-8 sm:py-12 md:py-16 lg:py-20` (via `SectionContainer`)
- Card padding: `p-3` to `p-5` (prefer `p-5` for new system/info cards)
- Gap between grid items: `gap-4 lg:gap-6`
- Section header margin below: `mb-10`

---

## Responsiveness

All components are mobile-first. Breakpoint usage:

| Breakpoint    | Usage                                   |
| ------------- | --------------------------------------- |
| Base (mobile) | Single-column layout, stacked elements  |
| `sm` (640px)  | Two-column grids, larger text sizes     |
| `md` (768px)  | Wider cards, adjusted padding           |
| `lg` (1024px) | Three-column grids, desktop hero layout |

Never assume a desktop viewport. Test layout at 375px, 768px, and 1280px.

---

## What to Avoid

- Inline `style` objects except for dynamic values (tilt transforms, shine position, gradient positions)
- Large blocks of text inside cards
- More than 3 colours in the same visual region
- Animations exceeding 600 ms (feels sluggish)
- Layout-triggering CSS properties in animations (`width`, `height`, `margin`, `top`, `left`)
- Emojis in UI text
- Generic placeholder content ("Lorem ipsum", "Coming soon")
