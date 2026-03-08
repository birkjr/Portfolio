# Components Map

A complete reference of every component in the project — what it does, where it lives, and how it fits into the page.

---

## Page Assembly

`src/app/page.tsx` composes the entire single-page portfolio in this order:

```
Navbar
└── Hero
└── Projects
└── SystemsBuilt
└── Education
└── Experience
└── Skills
└── Footer
```

---

## Layout & Infrastructure

### `SectionContainer` — `src/components/SectionContainer.tsx`

**Role:** Universal section wrapper.  
**Provides:** Consistent vertical padding, GSAP scroll-reveal (fade up from y:60), subtle background gradient overlay, responsive container.  
**Props:** `id`, `variant` (`"default"` | `"hero"` | `"featured"`), `className`, `children`.  
**Usage:** Wrap every new top-level section in this component.

### `Navbar` — `src/components/Navbar.tsx`

**Role:** Fixed top navigation bar.  
**Features:** Smooth-scroll to sections, language toggle (EN/NO), dark/light theme toggle, mobile hamburger menu with full-screen overlay.  
**Nav items:** About Me, Projects, Systems, Education, Experience, Skills.  
**State:** `isOpen` (mobile menu), reads `language` from context, reads `theme` from `next-themes`.

### `ScrollProgressLine` — `src/components/ScrollProgressLine.tsx`

**Role:** Thin gradient line at the top of the viewport that fills as the user scrolls.

### `theme-provider.tsx` — `src/components/theme-provider.tsx`

**Role:** Wraps the app in `next-themes` provider. Placed in `layout.tsx`.

---

## Section Components

### `Hero` — `src/components/Hero.tsx`

**Role:** First visible section — name, tagline, portrait card, social links, CTAs.  
**Key features:**

- Portrait card with 3D mouse-tilt (perspective + rotateX/Y via React state)
- Radial gradient "shine" overlay that follows cursor
- Slide-up entrance animation on intersection
- `TextType` typewriter for the name
- Scroll-to-section CTA buttons
- Location and birthdate metadata pills

**Content keys:** `info`, `role`, `greeting`, `name`, `description`, `location`, `born`, `cta`, `ctaSecondary`

### `Projects` — `src/components/Projects.tsx`

**Role:** Project showcase grid — featured products and specialised system/security projects.  
**Data structure:** Two arrays per language — `projects_no`/`projects_en` (featured full-stack) and `reverseProjects_no`/`reverseProjects_en` (security + AI). Merged at render time.  
**Card variants:**

- **Standard card:** image or icon header, title, description, tech badges, external link
- **AI System card:** violet accent, "AI System" badge, opens a detail modal on click

**Modal (`activeProject` state):** Full-screen overlay with tabbed sections (Problem / System / System Architecture / Result). Architecture section renders `<ArchitectureDiagram />` — a CSS-based pipeline flow visualisation.  
**Project interface:** `title`, `description`, `technologies`, `github`, `demo`, `featured`, `image`, `icon`, `isAISystem`, `sections`

### `SystemsBuilt` — `src/components/SystemsBuilt.tsx`

**Role:** Signals system-level thinking — lists architectures and platforms built, not just individual apps.  
**Layout:** Responsive 3-column card grid (1-col mobile, 2-col sm, 3-col lg).  
**Each card:** Coloured icon, system name, short description, tag pills with unique accent colour.  
**Accent colours:** violet, emerald, cyan, blue, purple, amber — each mapped to border/bg/text/icon classes via `accentMap`.  
**Systems listed:** AI Health Insight Engine, Secure Health Data Platform, Wearable Data Integration Layer, Prompt Orchestration Framework, AI Insight Generation Pipeline, Full-Stack Auth & Security Layer.

### `Education` — `src/components/Education.tsx`

**Role:** Academic background — NTNU programme, courses, grades.

### `Experience` — `src/components/Experience.tsx`

**Role:** Professional roles and organisational positions with timeline layout.

### `Skills` — `src/components/Skills.tsx`

**Role:** Technology stack overview.  
**Contains:** `SkillsRadarChart` sub-component for visual skill distribution.

### `Footer` — `src/components/Footer.tsx`

**Role:** Page footer with social links and copyright.

---

## UI Primitives — `src/components/ui/`

These are lightly customised shadcn/ui components. Do not rewrite them — extend via `className` prop.

| File            | Export                                                                            | Use for                                  |
| --------------- | --------------------------------------------------------------------------------- | ---------------------------------------- |
| `card.tsx`      | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | All card surfaces                        |
| `badge.tsx`     | `Badge`                                                                           | Tech tags, status labels, section badges |
| `button.tsx`    | `Button`                                                                          | CTAs, action triggers                    |
| `avatar.tsx`    | `Avatar`, `AvatarImage`, `AvatarFallback`                                         | Profile image in Hero                    |
| `separator.tsx` | `Separator`                                                                       | Horizontal dividers                      |
| `progress.tsx`  | `Progress`                                                                        | Skill bars (if used)                     |

---

## Utility Components

### `GradientText` — `src/components/GradientText.tsx`

Wraps text in the standard blue→cyan gradient clip. Use for highlighted inline text.

### `TextType` — `src/components/TextType.tsx`

Typewriter effect. Props: `text` (string[]), `typingSpeed`, `pauseDuration`, `showCursor`, `cursorCharacter`.  
Currently used only in `Hero` for the name reveal.

### `AnimatedSection` — `src/components/AnimatedSection.tsx`

Alternative scroll-reveal wrapper (intersection observer based). Prefer `SectionContainer` for new sections.

### `Avatar` (custom) — `src/components/Avatar.tsx`

Human avatar illustration used in the Navbar.

### `CTFScripts` — `src/components/CTFScripts.tsx`

Hidden component that loads CTF / hacking-related easter eggs or scripts. Do not modify.

### `GitHubCommitsChart` — `src/components/GitHubCommitsChart.tsx`

Visualises GitHub commit history. Data fetched client-side.

---

## Context & Hooks

### `LanguageContext` — `src/context/LanguageContext.tsx`

Provides `language` (`"en"` | `"no"`) and `setLanguage` via `useLanguage()` hook.  
Every component with user-facing text consumes this context.

---

## Public Assets — `public/`

Key images referenced in components:

| File                           | Used in                         |
| ------------------------------ | ------------------------------- |
| `Selvportrett-kopi.png`        | Hero portrait card              |
| `ThyloInsightv2.png`           | Projects — Thylo Insight card   |
| `teknologiporten_nettside.png` | Projects — Teknologiporten card |
| `emil_link.png`                | Projects — EMIL-Link card       |
