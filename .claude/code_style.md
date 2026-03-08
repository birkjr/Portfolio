# Code Style Guide

## Language & Framework

- **TypeScript** everywhere. No `.js` or `.jsx` files in `src/`.
- **React functional components** only. No class components.
- **Next.js App Router** conventions — `"use client"` directive on all interactive components.

---

## Component Structure

Every component file follows this order:

```tsx
"use client";                          // 1. Directive (if interactive)

import { ... } from "react";          // 2. React imports
import { ... } from "next/...";       // 3. Next.js imports
import { ... } from "@/components/"; // 4. Internal component imports
import { ... } from "lucide-react";  // 5. Icon imports
import { ... } from "@/context/..."; // 6. Context imports
import { ... } from "@/lib/...";     // 7. Utility imports

interface MyProps { ... }             // 8. Type definitions
interface MyData { ... }

const data_en: MyData[] = [ ... ];   // 9. Static data constants
const data_no: MyData[] = [ ... ];

const content = {                     // 10. i18n content object
  en: { ... },
  no: { ... },
};

export function MyComponent() {       // 11. Named export (not default)
  const { language } = useLanguage();
  const t = content[language];
  // ...
}
```

---

## Naming Conventions

| Thing                    | Convention                    | Example                                     |
| ------------------------ | ----------------------------- | ------------------------------------------- |
| Component files          | PascalCase                    | `SystemsBuilt.tsx`                          |
| Component functions      | PascalCase named export       | `export function SystemsBuilt()`            |
| Props interfaces         | `ComponentNameProps`          | `interface CardProps`                       |
| Data interfaces          | Descriptive nouns             | `interface Project`, `interface SystemItem` |
| Content data             | `content` with `en`/`no` keys | `const content = { en: {...}, no: {...} }`  |
| Language-specific arrays | `name_en`, `name_no`          | `const projects_en`, `const projects_no`    |
| Section IDs              | kebab-case                    | `id="systems-built"`                        |
| CSS class strings        | Tailwind utilities only       | No custom class names                       |

---

## TypeScript Rules

- All props and data structures must have explicit interfaces.
- Avoid `any`. Use `unknown` and narrow it, or define a proper interface.
- Use `React.ElementType` for icon component props (from Lucide React).
- Use `LucideIcon` type for typed icon props: `import { LucideIcon } from "lucide-react"`.
- Prefer `useState<Type>` explicit generics over inferred types when the type is non-trivial.
- Use `useRef<HTMLDivElement>(null)` with explicit generics.

---

## Tailwind CSS Rules

- **Tailwind only** for styling — no inline `style` objects except for runtime-computed values.
- Use `cn()` from `@/lib/utils` for conditional class merging:
  ```ts
  import { cn } from "@/lib/utils";
  className={cn("base-classes", condition && "conditional-class")}
  ```
- Dark mode via `dark:` prefix — never conditional JSX for colours.
- Responsive classes are mobile-first: `text-sm sm:text-base lg:text-lg`.
- Colour opacity via Tailwind modifier: `bg-blue-500/20` not `rgba(...)`.
- Avoid `!important` modifiers (`!bg-red-500`).

---

## Component Composition

### Prefer small, focused components

If a render function grows beyond ~80 lines, extract logical sub-sections into separate named components within the same file (or a new file if reused elsewhere).

### Reuse before creating

Before writing a new styled element, check:

1. `src/components/ui/` — shadcn primitives
2. `src/components/` — existing shared components (`SectionContainer`, `GradientText`, `AnimatedSection`)

### Section wrapper

All page sections must use `SectionContainer`:

```tsx
<SectionContainer id="section-id">{/* content */}</SectionContainer>
```

---

## Internationalisation Pattern

All user-facing strings live in a `content` constant, never hardcoded in JSX:

```ts
// Good
const content = {
  en: { title: "Systems I've Built", subtitle: "..." },
  no: { title: "Systemer jeg har bygget", subtitle: "..." },
};
const t = content[language];
return <h2>{t.title}</h2>;

// Bad
return <h2>Systems I've Built</h2>;
```

---

## Animation & Interaction

- Hover transitions: `transition-all duration-300` (default), `duration-500` for larger elements.
- Card scale: `hover:scale-[1.02]` — not `hover:scale-105`.
- Shadow on hover: colour-tinted, e.g. `hover:shadow-blue-500/15`.
- Scroll animations: via `SectionContainer` (GSAP) or `section-slide-up` CSS class.
- Do not import `framer-motion` or any other animation library.
- Animated CSS properties must be GPU-composited: `transform`, `opacity`, `filter`.

---

## What to Avoid

```ts
// No default exports for components
export default function Hero() { ... }  // ❌
export function Hero() { ... }          // ✓

// No hardcoded language strings in JSX
<p>View Project</p>                     // ❌
<p>{t.viewProject}</p>                  // ✓

// No inline style for static values
<div style={{ color: 'blue' }}>         // ❌
<div className="text-blue-600">         // ✓

// No 'any'
const data: any = ...                   // ❌
const data: Project[] = ...             // ✓

// No class components
class Hero extends React.Component { }  // ❌
```
