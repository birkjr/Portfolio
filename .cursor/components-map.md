# Components Map

Reference for every component — role, path, and page position.

---

## Page Assembly

`src/app/page.tsx` renders in this order:

```
CursorEffect, LivingGridDots, FloatingOrbs   ← global ambient layers
Navbar
main
├── ScrollIntoMachine
│   ├── Hero
│   └── About (desktop: motion="none"; mobile: normal SectionContainer)
├── Timeline
├── Journal
├── Skills
└── Footer
```

---

## Styles Map

| File                          | Purpose                                                        |
| ----------------------------- | -------------------------------------------------------------- |
| `src/app/globals.css`         | Tailwind entry — imports only                                  |
| `src/config/ui-theme.css`     | `@theme` tokens + palette variables                            |
| `src/styles/base.css`         | html, body, dot grid, scrollbar, cursor-none                   |
| `src/styles/components.css`   | `.section-badge`, `.tag-pill`, `.card-shine`, `.hover-glow`, … |
| `src/styles/animations.css`   | All `@keyframes` + `.animate-*`, `.hero-card-slide-up`, …      |
| `src/styles/pages/hero.css`   | `.hero-*` classes                                              |
| `src/styles/pages/navbar.css` | `.navbar-*` classes                                            |
| `src/styles/pages/footer.css` | `.footer-*` classes                                            |

**Migration status:** All page components (Hero, Navbar, Footer, About, Timeline, Journal, Skills) → semantic CSS in `styles/pages/`.

---

## Layout & Infrastructure

### `SectionContainer` — `src/components/animations/SectionContainer.tsx`

Universal section wrapper.

- Padding, max-width, scroll-margin
- GSAP depth-reveal (`motion="depth"`, default)
- Variants: `"default"` | `"hero"` | `"featured"`
- Skip animation: `motion="none"`

### `ScrollIntoMachine` — `src/components/animations/ScrollIntoMachine.tsx`

Desktop: sticky scroll journey — hero sides peel, About emerges.  
Mobile / reduced-motion: simple `{hero}{about}` stack.

### `Navbar` — `src/components/pages/Navbar.tsx`

Fixed top nav. Styles: `styles/pages/navbar.css`.

- Desktop links, lang toggle, `ThemePicker`
- Mobile full-screen overlay
- Theme-aware shell: `navbar-shell--default` | `thylo-chrome navbar-shell--thylo`

### `CursorEffect` — `src/components/animations/CursorEffect.tsx`

Custom cursor; toggles `body.cursor-none`.

### `FloatingOrbs` / `LivingGridDots` — `src/components/animations/`

Ambient background motion and dot grid magnet effect.

### `theme-provider` — `src/components/ui/theme-provider.tsx`

`next-themes` wrapper in `layout.tsx`.

### `ThemePicker` — `src/components/ui/ThemePicker.tsx`

Multi-palette picker (original, thylo, paper, warm, fjord, hellas, terminal, ember).

---

## Section Components — `src/components/pages/`

### `Hero` — `Hero.tsx` + `styles/pages/hero.css`

Portrait card with 3D mouse-tilt, `TextType` name, CTAs, social links.

Key classes: `hero-layout`, `hero-portrait-card`, `hero-cta-primary`, `hero-social-link`  
Content: `@/content/hero`

### `About` — `About.tsx`

Bio section. Uses `.section-badge`. Embedded in `ScrollIntoMachine` on desktop.  
Content: `@/content/about`

### `Timeline` — `Timeline.tsx`

Scroll-based card fade timeline.  
Content: `@/content/timeline`

### `Journal` — `Journal.tsx`

Filterable journal entries + detail modal.  
Content: `@/content/journal`

### `Skills` — `Skills.tsx`

Tech grid with bounce-in cards + detail modal.  
Content: `@/content/skills`

### `Footer` — `Footer.tsx` + `styles/pages/footer.css`

Contact CTA, social icons, copyright. Variant: `SectionContainer featured`.

Key classes: `footer-card`, `footer-title`, `footer-social-btn`  
Content: `@/content/footer`

---

## UI Primitives — `src/components/ui/`

shadcn/ui components. Extend via `className` — do not rewrite internals.

| File              | Export                               | Use for                |
| ----------------- | ------------------------------------ | ---------------------- |
| `card.tsx`        | `Card`, `CardHeader`, `CardTitle`, … | Card surfaces          |
| `badge.tsx`       | `Badge`                              | Status labels          |
| `button.tsx`      | `Button`                             | CTAs                   |
| `TextType.tsx`    | default                              | Typewriter (Hero name) |
| `ThemePicker.tsx` | `ThemePicker`                        | Palette switcher       |

---

## Content — `src/content/`

| File          | Used by             |
| ------------- | ------------------- |
| `hero.ts`     | Hero                |
| `about.ts`    | About               |
| `navbar.ts`   | Navbar              |
| `footer.ts`   | Footer              |
| `timeline.ts` | Timeline            |
| `journal.ts`  | Journal             |
| `skills.ts`   | Skills              |
| `types.ts`    | `Localized<T>` type |

All content objects export `no` and `en` keys.

---

## Context & Lib

### `LanguageContext` — `src/context/LanguageContext.tsx`

`useLanguage()` → `{ language, setLanguage }` where `language` is `"en"` | `"no"`.

### `lib/utils.ts`

- `cn()` — clsx + tailwind-merge
- `isMobileViewport()`, `prefersReducedMotion()`

### `lib/fonts.ts`

JetBrains Mono via `next/font/google`.

---

## Config

### `config/color-themes.ts`

Theme IDs, `DEFAULT_COLOR_THEME`, `usesDarkChrome()`, `isThyloChrome()`, swatch colours.

### `config/ui-theme.css`

CSS variables per palette, `@theme inline` mapping to Tailwind tokens, `.thylo-chrome` navbar/footer overrides.
