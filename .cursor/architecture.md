# Project Architecture

## Directory Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, ThemeProvider, metadata
│   │   ├── page.tsx            # Single-page composition (assembles all sections)
│   │   ├── globals.css         # Tailwind entry — imports only (no component styles)
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── pages/              # Section components (semantic CSS classNames only)
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Journal.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── animations/         # Global effects + layout animation wrappers
│   │   │   ├── SectionContainer.tsx
│   │   │   ├── ScrollIntoMachine.tsx
│   │   │   ├── CursorEffect.tsx
│   │   │   ├── FloatingOrbs.tsx
│   │   │   └── LivingGridDots.tsx
│   │   │
│   │   └── ui/                 # shadcn/ui primitives (Button, Card, Badge, …)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── TextType.tsx
│   │       ├── ThemePicker.tsx
│   │       └── theme-provider.tsx
│   │
│   ├── styles/                 # All visual styling lives here
│   │   ├── base.css            # html, body, grid overlay, scrollbar, focus rings
│   │   ├── components.css      # Shared UI patterns (.section-badge, .card-shine, …)
│   │   ├── animations.css      # @keyframes + .animate-* / .hero-card-slide-up
│   │   └── pages/              # One CSS file per page component
│   │       ├── hero.css
│   │       ├── navbar.css
│   │       └── footer.css        # about.css, timeline.css, … as pages migrate
│   │
│   ├── config/
│   │   ├── color-themes.ts     # Theme IDs, helpers (usesDarkChrome, isThyloChrome)
│   │   └── ui-theme.css        # @theme tokens + per-palette CSS variables
│   │
│   ├── content/                # All copy — typed, localized (no/en)
│   │   ├── types.ts
│   │   ├── hero.ts, about.ts, navbar.ts, footer.ts
│   │   ├── timeline.ts, journal.ts, skills.ts
│   │   └── index.ts
│   │
│   ├── context/
│   │   └── LanguageContext.tsx
│   │
│   └── lib/
│       ├── utils.ts            # cn(), isMobileViewport(), prefersReducedMotion()
│       └── fonts.ts            # JetBrains Mono via next/font
│
├── tailwind.config.js          # content paths + theme.extend (mirrors ui-theme.css)
├── postcss.config.mjs          # @tailwindcss/postcss (Tailwind v4)
├── packages/create-portfolio/  # CLI scaffold (excluded from root tsconfig)
├── public/                     # Static assets
└── .cursor/                    # AI assistant context (this folder)
```

---

## CSS Architecture

Styling is **declarative and centralized** — page components must not contain Tailwind utility strings.

### Layer stack (import order in `globals.css`)

```
@import "tailwindcss"
@config "../../tailwind.config.js"
@import "../config/ui-theme.css"     ← design tokens + theme palettes
@import "../styles/base.css"          ← global base / pseudo-elements
@import "../styles/components.css"    ← reusable patterns
@import "../styles/animations.css"    ← keyframes + animation classes
@import "../styles/pages/*.css"    ← page-specific semantic classes
```

### Where to put new styles

| What                          | Where                                   | Example                         |
| ----------------------------- | --------------------------------------- | ------------------------------- |
| Color tokens, radius, fonts   | `config/ui-theme.css` (`@theme inline`) | `--background`, `--brand`       |
| Theme palette overrides       | `config/ui-theme.css`                   | `html.thylo { … }`              |
| Shared UI patterns            | `styles/components.css`                 | `.section-badge`, `.hover-glow` |
| Keyframes / enter animations  | `styles/animations.css`                 | `.hero-card-slide-up`           |
| Page layout + look            | `styles/pages/<name>.css`               | `.hero-portrait-card`           |
| Global base (body, scrollbar) | `styles/base.css`                       | `body::before` dot grid         |

### Naming convention for page CSS

Prefix classes with the section name: `hero-*`, `navbar-*`, `footer-*`, `journal-*`, etc.

TSX uses **semantic classNames only**:

```tsx
// ✅ Good
<div className="hero-layout">
  <h1 className="hero-headline">{t.greeting}</h1>
</div>

// ❌ Avoid in pages/
<div className="mt-0 flex flex-col items-center gap-6 sm:mt-16 …">
```

**Exceptions allowed in TSX:**

- `group` (Tailwind variant hook for child hover)
- Theme hooks: `thylo-chrome`, `nav-chrome-*` (defined in `ui-theme.css`)
- Dynamic `style={{}}` for JS-driven values (3D tilt, scroll animation delay, nav slide-in)
- `cn()` for state/theme modifiers: `footer-card--visible`, `navbar-overlay--open`

### `@apply` rules (Tailwind v4)

- Only `@apply` built-in Tailwind utilities — never `@apply` custom classes (`card-gradient-bg`, `group`, `thylo-chrome`)
- For custom patterns, use plain CSS properties or compose multiple classes in TSX

---

## Architecture Principles

### Component-driven, CSS-driven

- **`pages/`** — structure, data wiring, behaviour; semantic classNames only
- **`styles/`** — all visual design; change globally from one place
- **`content/`** — all user-facing copy, typed and localized
- **`ui/`** — shadcn primitives; may use `cva`/Tailwind internally

### Page is purely compositional

`page.tsx` imports section components and animation wrappers. No styling logic.

### SectionContainer as layout primitive

Every top-level section wraps content in `<SectionContainer>`:

- Consistent padding and max-width
- GSAP depth-reveal on scroll (`motion="depth"`, default)
- Hero variant: full-height, top padding for navbar
- Pass `motion="none"` when animation is handled elsewhere (e.g. `ScrollIntoMachine`)

### Content lives in `src/content/`

Import from `@/content/<section>` or `@/content`. Never hardcode copy in components.

---

## Key Component Roles

| Component           | Path                               | Responsibility                                    |
| ------------------- | ---------------------------------- | ------------------------------------------------- |
| `SectionContainer`  | `animations/SectionContainer.tsx`  | Section shell, GSAP scroll reveal                 |
| `ScrollIntoMachine` | `animations/ScrollIntoMachine.tsx` | Desktop hero → About scroll journey               |
| `Hero`              | `pages/Hero.tsx`                   | Portrait card, 3D tilt, typewriter, CTAs          |
| `Navbar`            | `pages/Navbar.tsx`                 | Fixed nav, lang toggle, theme picker, mobile menu |
| `About`             | `pages/About.tsx`                  | Bio section                                       |
| `Timeline`          | `pages/Timeline.tsx`               | Career / education timeline                       |
| `Journal`           | `pages/Journal.tsx`                | Blog-style entries + modal                        |
| `Skills`            | `pages/Skills.tsx`                 | Tech stack grid + detail modal                    |
| `Footer`            | `pages/Footer.tsx`                 | Contact CTA, socials, copyright                   |
| `ThemePicker`       | `ui/ThemePicker.tsx`               | Multi-palette theme switcher                      |
| `LanguageContext`   | `context/LanguageContext.tsx`      | Global EN/NO state                                |

---

## Animation Strategy

1. **Scroll-reveal** — GSAP in `SectionContainer` (scale + opacity depth entrance)
2. **Scroll journey** — `ScrollIntoMachine` on desktop (hero peels, About emerges); simple stack on mobile
3. **Section enter** — CSS keyframes in `animations.css` (`.hero-card-slide-up`, `.card-fade-in-up`, …)
4. **Micro-interactions** — semantic CSS hover rules in section/styles files (`.hover-glow`, `.card-shine`)

Keep animations GPU-friendly: `transform`, `opacity`, `scale` — not layout properties.
