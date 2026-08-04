# Design Principles

Visual polish is a core quality. UI decisions should feel deliberate — not like defaults.

---

## Visual Philosophy

Communicate **craft, precision, and confidence**. Clean whitespace, strong type hierarchy, cards with subtle depth, interactions that reward attention.

| Principle         | In practice                                                |
| ----------------- | ---------------------------------------------------------- |
| Clean layout      | Generous whitespace, consistent grid                       |
| Strong typography | Bold headings, readable body, clear hierarchy              |
| Modern cards      | Rounded corners, subtle borders, soft shadows              |
| Soft shadows      | Colour-tinted glow via `--glow-color` tokens               |
| Subtle gradients  | Page background, card fills — theme-aware                  |
| Hover feedback    | Every interactive element responds; 200–500 ms transitions |

---

## Colour & Theme System

Eight palettes selectable via `ThemePicker`: `original`, `thylo`, `paper`, `warm`, `fjord`, `hellas`, `terminal`, `ember`.

**Source of truth:** `src/config/ui-theme.css`

- `@theme inline` maps CSS vars → Tailwind tokens (`bg-background`, `text-primary`, …)
- Each `html.<theme>` block sets `--background`, `--brand`, `--card-gradient`, `--glow-color`, etc.
- Special chrome: `.thylo-chrome` overrides navbar/footer for Thylo palette

**In components:** use semantic tokens (`text-foreground`, `bg-muted`, `border-border`) or CSS vars (`var(--hero-border)`, `var(--card-gradient)`).

**Do not hardcode** palette-specific colours in `pages/` — define in theme CSS or shared section styles.

---

## CSS Architecture (Design Implementation)

### Three layers

1. **Tokens** — `ui-theme.css` (colours, radius, fonts)
2. **Shared patterns** — `components.css` (badges, shine, glow, glass)
3. **Page styles** — `pages/*.css` (layout + page-specific look)

### Section badge (standard label)

Defined in `components.css`, used across sections:

```html
<div class="section-badge">
  <div class="section-badge-dot"></div>
  <span class="section-badge-label">{label}</span>
</div>
```

Do not inline badge styles in TSX.

---

## Interaction Patterns

### 3D hover tilt (Hero only)

Portrait card tilts via `rotateX`/`rotateY` in React `style`. Unique to Hero — do not copy elsewhere.

### Card glow (`.hover-glow`)

Hover shadow using theme tokens:

```css
box-shadow:
  0 0 30px var(--glow-color),
  0 0 60px var(--glow-color-secondary);
transform: translateY(-2px);
```

Used in `components.css` and embedded in section styles (e.g. `footer-card--default:hover`).

### Card shine sweep (`.card-shine`)

White gradient sweep on hover. First child inside `.group` containers:

```tsx
<div className="card-shine" aria-hidden />
```

### Scroll reveal

- **Sections:** GSAP depth entrance in `SectionContainer`
- **Hero journey:** `ScrollIntoMachine` on desktop
- **Enter animations:** `.hero-card-slide-up`, `.card-fade-in-up`, `.tech-card-slide-up` in `animations.css`

### Page dot grid

`body::before` in `base.css` — radial dot pattern with cursor-reveal mask (`--cursor-x`, `--magnet-radius` set by `LivingGridDots`).

---

## Typography

- Font: JetBrains Mono (site-wide via `next/font`)
- Headings: `font-bold`, responsive scale (`hero-headline` → up to `text-6xl`)
- Body: `text-muted-foreground`, relaxed leading
- Labels: `.section-badge-label` — `text-xs font-medium`

Define type scale in section CSS, not inline in TSX.

---

## Spacing Conventions

- Section padding: via `SectionContainer` (`py-8 sm:py-12 …`)
- Section internal spacing: defined in section CSS (e.g. `.footer-inner`, `.hero-column-left-inner`)
- Grid gaps: set in section CSS with `@apply gap-*`

---

## Responsiveness

Mobile-first. Breakpoints in section CSS files:

| Breakpoint | Typical use                      |
| ---------- | -------------------------------- |
| Base       | Single column, stacked           |
| `sm`       | Wider cards, larger type         |
| `md`       | Desktop nav visible              |
| `lg`       | Two-column hero, desktop layouts |

Test at 375px, 768px, 1280px.

---

## Adding Styles to a Section

1. Open/create `src/styles/pages/<section>.css`
2. Use `@layer components { .section-element { @apply … } }`
3. Prefix all classes: `<section>-<element>`
4. Import in `globals.css`
5. Reference only semantic names in TSX

---

## What to Avoid

- Tailwind utility strings in `pages/` components
- Inline `style` except for JS-driven values (tilt, animation delay)
- Hardcoded colours that break theme switching
- Layout-triggering animation properties (`width`, `height`, `margin`, `top`)
- Animations > 600 ms for UI feedback
- New animation libraries
- Emojis in UI copy
- Generic placeholder text
