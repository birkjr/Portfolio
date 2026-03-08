# Project Context — Birk Jonathan Ramstad Portfolio

## Overview

**Project name:** Birk Jonathan Ramstad Portfolio  
**Type:** Personal developer portfolio website  
**URL:** Production deployment via Vercel

This is a modern, visually polished developer portfolio for Birk Jonathan Ramstad — co-founder and CTO of Thylo Insight, NTNU computer science student, and software engineer focused on AI systems and data-driven products.

---

## Purpose

The portfolio has three primary goals:

1. **Present projects clearly** — each project communicates what was built, why it matters, and what technologies were used.
2. **Communicate system design capability** — the site signals that the owner designs and builds complete end-to-end systems, not just isolated features.
3. **Create a strong first impression** — the design should feel premium, intentional, and visually competitive with the best developer portfolios on the market.

---

## Audience

- Potential employers and engineering hiring managers
- Startup founders and CTOs evaluating technical co-founders
- Collaborators and developers in the broader community

---

## Design Philosophy

The portfolio should feel like:

- A **modern SaaS landing page** — clean, fast, purposeful
- A **premium developer portfolio** — high polish, strong typography, thoughtful spacing
- A **minimal but interactive** experience — animations exist to enhance clarity, never to distract

Design quality and UI polish are **the most important non-functional requirements** of this project. Visitors should immediately sense craft and attention to detail.

---

## Key Content Areas

| Section            | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| Hero               | First impression — name, tagline, portrait card with 3D tilt |
| Projects           | Showcase of full-stack and AI system projects                |
| Systems I've Built | Signals architecture and system-level thinking               |
| Education          | Academic background at NTNU                                  |
| Experience         | Professional and organisational roles                        |
| Skills             | Technology stack visualised                                  |

---

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger), custom CSS keyframes
- **Icons:** Lucide React
- **UI primitives:** shadcn/ui (`Card`, `Badge`, `Button`, `Avatar`)
- **Backend / DB:** Supabase (used in Thylo Insight, referenced in systems)
- **Deployment:** Vercel

---

## Languages

The site supports two languages: **English** and **Norwegian (Bokmål)**. All user-facing strings are defined in a `content` object keyed by `"en"` and `"no"` within each component, consumed via `useLanguage()` from `LanguageContext`.
