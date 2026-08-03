# AI Assistant Guidelines

Rules and conventions for AI coding assistants working on this repository.

---

## General Behaviour

- **Read before writing.** Always read the target file (and any related components it imports) before making edits.
- **Match existing patterns.** Every file has an established style — class ordering, spacing conventions, naming. Follow it exactly.
- **Prefer editing to creating.** Only create a new file when the component genuinely does not exist yet.
- **Never introduce unnecessary complexity.** If a straightforward Tailwind + React solution works, use it. Do not reach for new libraries.
- **Never modify files outside the task scope.** A task about the hero section should not touch the projects section.

---

## UI Component Rules

### Always use `SectionContainer` for new sections

```tsx
<SectionContainer id="my-section">{/* content */}</SectionContainer>
```

This provides consistent padding, the GSAP scroll-reveal animation, and the background gradient overlay automatically.

### Use shadcn primitives from `components/ui/`

Prefer `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription`, `Badge`, `Button` over custom markup. Import from `@/components/ui/`.

### Section label pattern

Every section header uses this badge pattern above the `<h2>`:

```tsx
<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm mb-4">
  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
    {t.label}
  </span>
</div>
```

Match this pattern for any new sections. Use a different accent colour if the section has a distinct identity (e.g. violet for AI/systems sections).

---

## Styling Rules

- **Tailwind only** for static styles. Use inline `style` only for values that must be computed at runtime (e.g. mouse position for tilt/shine effects).
- **Dark mode via `dark:` prefix** — never use `if (theme === 'dark')` in JSX for styling.
- **Responsive first** — add `sm:`, `md:`, `lg:` variants for all layout-affecting classes.
- **Opacity modifiers** for translucent colours: `blue-500/20` not `rgba(59,130,246,0.2)`.
- **`cn()` utility** for conditional class merging: `import { cn } from "@/lib/utils"`.

---

## Animation Rules

- Prefer Tailwind `transition-all duration-300` for hover effects.
- Use `hover:scale-[1.02]` for card lift — not `hover:scale-105` (too aggressive).
- Shadows should be colour-tinted: `hover:shadow-blue-500/15` not plain `hover:shadow-lg`.
- For enter animations use GSAP via `SectionContainer` or the `section-slide-up` / `section-slide-down` CSS classes already defined in `globals.css`.
- Do not add `framer-motion` or other animation libraries — GSAP and CSS keyframes are already in use.
- All animated properties must be GPU-composited: use `transform` and `opacity` only.

---

## Internationalisation

Every component with user-facing text must define a `content` object with `no` and `en` keys:

```ts
const content = {
  no: { title: "Norsk tekst", ... },
  en: { title: "English text", ... },
};
```

Consume it with:

```ts
const { language } = useLanguage();
const t = content[language];
```

Never hardcode English-only strings in JSX.

---

## Naming Conventions

| Thing                  | Convention                                                                  |
| ---------------------- | --------------------------------------------------------------------------- |
| Component files        | `PascalCase.tsx`                                                            |
| Component exports      | Named exports (`export function Foo`)                                       |
| Content data constants | `content_no`, `content_en` or a single `content` object with `no`/`en` keys |
| Section IDs            | kebab-case matching the nav href (e.g. `id="systems"`)                      |
| Accent colour tokens   | Use the colour name as a string key in a local map (see `SystemsBuilt.tsx`) |

---

## What AI Assistants Must Never Do

- Add `framer-motion`, `styled-components`, `emotion`, or CSS modules
- Remove or alter the `SectionContainer` scroll animation logic
- Change the `LanguageContext` API
- Hardcode language strings without adding both `no` and `en` variants
- Use `!important` in Tailwind classes
- Introduce `any` TypeScript types
- Create documentation files unless explicitly requested
- Commit or push changes
