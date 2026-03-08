# Project Architecture

## Directory Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — fonts, theme provider, metadata
│   │   ├── page.tsx            # Single-page composition (assembles all sections)
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (Card, Badge, Button, etc.)
│   │   ├── Hero.tsx            # Hero section with portrait card and 3D tilt
│   │   ├── Navbar.tsx          # Sticky nav with smooth-scroll, lang toggle, theme toggle
│   │   ├── Projects.tsx        # Project grid — featured + security/AI projects + modal
│   │   ├── SystemsBuilt.tsx    # "Systems I've Built" grid section
│   │   ├── Education.tsx       # Academic timeline
│   │   ├── Experience.tsx      # Professional and organisational experience
│   │   ├── Skills.tsx          # Skills grid + radar chart
│   │   ├── SkillsRadarChart.tsx
│   │   ├── Contact.tsx         # Contact CTA
│   │   ├── Footer.tsx
│   │   ├── SectionContainer.tsx  # Wrapper with GSAP scroll-reveal, consistent padding
│   │   ├── AnimatedSection.tsx
│   │   ├── Avatar.tsx
│   │   ├── GradientText.tsx
│   │   ├── TextType.tsx        # Typewriter effect component
│   │   ├── CTFScripts.tsx
│   │   ├── GitHubCommitsChart.tsx
│   │   ├── ScrollProgressLine.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── context/
│   │   └── LanguageContext.tsx  # EN / NO language switcher (React context)
│   │
│   ├── hooks/                  # Custom React hooks
│   └── lib/
│       └── utils.ts            # cn() utility (clsx + tailwind-merge)
│
├── public/                     # Static assets — images, icons
├── .cursor/                    # AI assistant context files (this folder)
└── .claude/                    # Claude-specific context files
```

---

## Architecture Principles

### Component-driven

Every section is a self-contained React component. The page (`page.tsx`) is purely compositional — it only imports and renders section components in order, with no logic.

### Reusable primitives first

Before creating a new styled element, check `components/ui/` for an existing shadcn primitive. Prefer composition over custom markup.

### Data co-located with components

Each section component owns its content data (typed objects keyed by language). There is no global CMS or data-fetching layer — content is defined as TypeScript constants inside each component file.

### SectionContainer as the layout primitive

Every top-level section is wrapped in `<SectionContainer>`, which provides:

- Consistent vertical padding (`py-8 sm:py-12 md:py-16 lg:py-20`)
- GSAP scroll-reveal animation (fade-up on entry)
- A subtle blue-tint background gradient overlay
- A `container mx-auto px-4 sm:px-6 lg:px-8` content wrapper

Always wrap new sections in `<SectionContainer>` with a unique `id`.

---

## Key Component Roles

| Component            | Responsibility                                            |
| -------------------- | --------------------------------------------------------- |
| `SectionContainer`   | Layout shell, scroll animation, consistent spacing        |
| `Hero`               | Portrait card with 3D mouse-tilt, typewriter name, CTAs   |
| `Navbar`             | Fixed top nav, smooth scroll, language + dark mode toggle |
| `Projects`           | Project card grid + AI project detail modal               |
| `SystemsBuilt`       | System architecture overview as card grid                 |
| `TextType`           | Typewriter animation component (used in Hero)             |
| `ScrollProgressLine` | Thin progress bar at top of viewport                      |
| `LanguageContext`    | Global EN/NO language state                               |

---

## Animation Strategy

Animations are layered at two levels:

1. **Scroll-reveal** — handled by GSAP `ScrollTrigger` inside `SectionContainer`. Each section fades up from `y: 60` to `y: 0` as it enters the viewport.
2. **Micro-interactions** — handled by Tailwind transition utilities (`hover:scale-[1.02]`, `group-hover:`, `transition-all duration-300`) and a few custom CSS keyframes defined in `globals.css` (e.g. `hero-card-slide-up`, `animate-gradient`).

Keep animations **GPU-friendly**: prefer `transform`, `opacity`, and `scale` over properties that trigger layout (e.g. `width`, `height`, `top`, `left`).
