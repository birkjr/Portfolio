# AI Assistant Guidelines

Rules and conventions for AI coding assistants working on this repository.

---

## General Behaviour

- **Read before writing.** Read the target file and related imports/styles before editing.
- **Match existing patterns.** Follow semantic CSS in `pages/`, tokens in `config/ui-theme.css`, shared patterns in `styles/`.
- **Prefer editing to creating.** Only add files when genuinely new (e.g. a new section → `pages/X.tsx` + `styles/pages/x.css`).
- **Never introduce unnecessary complexity.** No new styling libraries.
- **Stay in scope.** A hero task should not touch unrelated sections.

---

## Styling Rules (Critical)

### Page components (`src/components/pages/`) — no inline Tailwind

All visual styling belongs in `src/styles/`. TSX uses semantic class names:

```tsx
<div className="journal-card">
  <div className="section-badge">
    <div className="section-badge-dot" />
    <span className="section-badge-label">{t.label}</span>
  </div>
</div>
```

When adding or changing UI for a section:

1. Add/update classes in `src/styles/pages/<section>.css`
2. Import the file in `src/app/globals.css` if new
3. Use only semantic classes (+ allowed exceptions) in the TSX file

### Allowed in TSX

| Pattern                    | Example                              | Why                                 |
| -------------------------- | ------------------------------------ | ----------------------------------- |
| Semantic classes           | `hero-portrait-card`                 | Primary styling                     |
| Shared components          | `section-badge`, `card-shine`        | Defined in `components.css`         |
| Theme hooks                | `thylo-chrome`, `nav-chrome-btn`     | Palette overrides in `ui-theme.css` |
| `group`                    | `className="group hero-cta-primary"` | Child hover variants                |
| State modifiers via `cn()` | `footer-card--visible`               | Dynamic visibility                  |
| Runtime `style`            | 3D tilt, stagger delay, nav slide-in | JS-computed values                  |

### Not allowed in `pages/`

- Long Tailwind utility strings
- `const foo = "flex items-center gap-4 …"` style constants
- `@apply` of custom classes inside section CSS

### shadcn primitives (`components/ui/`)

May keep internal Tailwind/cva. Page components override via semantic classes:

```tsx
<Button className="hero-cta-primary">{t.cta}</Button>
```

Define `hero-cta-primary` in `styles/pages/hero.css`.

---

## Section Checklist (new section)

1. Create `src/components/pages/MySection.tsx` — markup + logic only
2. Create `src/styles/pages/my-section.css` — all visual styles
3. Add `@import "../styles/pages/my-section.css"` to `globals.css`
4. Add content to `src/content/my-section.ts` with `no` / `en` keys
5. Wrap in `<SectionContainer id="my-section">`
6. Register nav link in `src/content/navbar.ts` if needed

---

## SectionContainer

```tsx
<SectionContainer id="my-section">{/* content */}</SectionContainer>
<SectionContainer variant="hero" id="home">{/* hero */}</SectionContainer>
<SectionContainer variant="featured" id="contact">{/* footer */}</SectionContainer>
<SectionContainer motion="none">{/* skip GSAP when driven elsewhere */}</SectionContainer>
```

---

## Internationalisation

Content lives in `src/content/`, not inside components:

```ts
// src/content/my-section.ts
import type { Localized } from "./types";

export const mySection: Localized<{ title: string; label: string }> = {
  no: { title: "…", label: "…" },
  en: { title: "…", label: "…" },
};
```

```tsx
const { language } = useLanguage();
const t = mySection[language];
```

Never hardcode English-only strings.

---

## Theme System

- Palettes: `original`, `thylo`, `paper`, `emil`, `terminal`, `ember`
- Tokens: `config/ui-theme.css` (`@theme inline` + `html.<theme>` blocks)
- Helpers: `usesDarkChrome()`, `isThyloChrome()` from `config/color-themes.ts`
- Navbar/footer chrome: combine semantic class + `thylo-chrome` when needed

---

## Animation Rules

- Scroll reveal: `SectionContainer` (GSAP) — don't duplicate
- Enter animations: add keyframes to `animations.css`, utility class in same file
- No `framer-motion` or new animation libraries
- GPU-only: `transform`, `opacity`, `scale`

---

## Naming Conventions

| Thing           | Convention                                               |
| --------------- | -------------------------------------------------------- |
| Page components | `src/components/pages/PascalCase.tsx`                    |
| Section CSS     | `src/styles/pages/kebab-case.css`                        |
| CSS classes     | `<section>-<element>` e.g. `navbar-link`, `footer-title` |
| Content files   | `src/content/kebab-case.ts`                              |
| Section IDs     | kebab-case matching nav href (`id="timeline"`)           |
| Imports         | `@/components/pages/…`, `@/content/…`, `@/config/…`      |

---

## What AI Assistants Must Never Do

- Add long Tailwind strings to `pages/` components
- Put section-specific styles in `globals.css` (use `styles/pages/`)
- Add `framer-motion`, CSS modules, or styled-components
- Remove `ScrollIntoMachine` / `SectionContainer` animation without explicit request
- Change `LanguageContext` API
- Hardcode copy without `no` + `en` in `src/content/`
- Use `!important` in Tailwind classes
- Introduce `any` TypeScript types
- Create documentation files unless explicitly requested
- Commit or push changes
