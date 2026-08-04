# Project Context — Birk Jonathan Ramstad Portfolio

## Overview

**Project name:** Birk Jonathan Ramstad Portfolio  
**Type:** Personal developer portfolio (single-page)  
**URL:** https://www.birkramstad.no (Vercel)

Modern portfolio for Birk Jonathan Ramstad — co-founder/CTO of Thylo Insight, NTNU computer science student, software engineer focused on AI systems and data-driven products.

---

## Purpose

1. **Present work clearly** — projects, timeline, skills, journal entries
2. **Signal craft** — premium visual design, intentional motion
3. **Strong first impression** — competitive with top developer portfolios

---

## Audience

- Engineering hiring managers
- Startup founders / CTOs
- Collaborators and developers

---

## Current Sections

| Section          | ID         | Notes                                         |
| ---------------- | ---------- | --------------------------------------------- |
| Hero             | `home`     | 3D portrait, typewriter, scroll journey entry |
| About            | `about`    | Bio; scroll-animated on desktop               |
| Timeline         | `timeline` | Career/education cards                        |
| Journal          | `journal`  | Blog-style posts + modal                      |
| Skills           | `skills`   | Tech stack grid + modal                       |
| Footer / Contact | `contact`  | CTA, socials, copyright                       |

---

## Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + semantic CSS in `src/styles/`
- **Theming:** CSS variables in `ui-theme.css`, 8 palettes via `ThemePicker`
- **Animations:** GSAP ScrollTrigger, CSS keyframes in `animations.css`
- **Icons:** Lucide React
- **UI:** shadcn/ui primitives in `components/ui/`
- **Deployment:** Vercel
- **Package manager:** pnpm (monorepo includes `packages/create-portfolio`)

---

## Styling Philosophy

**TSX describes structure; CSS describes appearance.**

- Page components use semantic classes (`hero-headline`, `navbar-link`)
- Shared patterns live in `styles/components.css`
- Section-specific styles in `styles/pages/<name>.css`
- Design tokens and palettes in `config/ui-theme.css`
- `globals.css` is a thin import manifest only

When migrating a section, move all Tailwind from TSX → section CSS file.

---

## Languages

English and Norwegian (Bokmål). All copy in `src/content/*.ts`, consumed via `useLanguage()`.

---

## Related Docs

| File                   | Contents                                  |
| ---------------------- | ----------------------------------------- |
| `architecture.md`      | Directory tree, CSS layers, principles    |
| `ai-guidelines.md`     | Rules for AI assistants editing this repo |
| `components-map.md`    | Component reference + migration status    |
| `design-principles.md` | Visual language, interaction patterns     |
