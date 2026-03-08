# Design Intent

## The Feeling This Site Should Convey

Someone landing on this portfolio should immediately think: _"This person builds real things — and cares about how they look."_

The design communicates three things simultaneously:

1. **Technical depth** — the work shown is system-level, not toy projects
2. **Product thinking** — every section is purposeful, information-dense but never cluttered
3. **Craft** — the UI details (transitions, shadows, spacing, type hierarchy) signal that quality matters

---

## Visual Direction

### References

The site draws inspiration from:

- Modern **developer portfolio** sites (Linear, Vercel team pages, Rauno Freiberg)
- **AI startup landing pages** (Anthropic, Perplexity, Cursor) — clean dark theme, strong type
- **Minimal SaaS interfaces** — card-based, whitespace-led, subtle depth

### Not inspired by:

- Generic "Bootstrap portfolio" layouts
- Over-animated agency sites (parallax backgrounds, cursor trails, every element animating)
- Cluttered layouts that try to show everything at once

---

## Key Visual Elements

### Dark theme

The site is dark-first. Backgrounds: `slate-950` → `black` for deep card interiors, `background` CSS variable for section backgrounds. Light mode is supported but the dark version is the primary design.

### Soft gradients

Used purposefully:

- **Gradient text:** Primary headings and key names use `bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent`
- **Icon containers:** Each icon lives in a gradient rounded square (`from-violet-600 to-indigo-500`, `from-emerald-600 to-teal-500`, etc.)
- **Section backgrounds:** Subtle `bg-gradient-to-b from-transparent via-blue-950/5 to-transparent` — barely visible, adds depth
- **Hero orb:** Pulsing blur orb behind the portrait card

Gradients are never garish. If a gradient draws attention to itself, it's too strong.

### Card-based layout

Almost all content lives in cards. Cards have:

- Rounded corners (`rounded-xl` minimum, `rounded-2xl` for larger cards)
- `border-2` with low-opacity colour (e.g. `border-slate-800/60`)
- Background: `bg-card` (theme-aware) or explicit dark: `bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/98`
- Hover: `hover:scale-[1.02]`, colour-tinted shadow, border brightens

### Subtle hover interactions

Every clickable or interactive element responds to hover. Interactions are:

- **Gentle** — `scale([1.02])` not `scale(1.1)`
- **Fast** — 200–300 ms for small elements, 400–500 ms for larger transitions
- **Purposeful** — they guide attention, not distract from it

---

## Accent Colour System

Each domain of the site has its own accent colour, creating visual organisation without chaos:

| Domain            | Accent          | Usage                                        |
| ----------------- | --------------- | -------------------------------------------- |
| General / primary | Blue + Cyan     | Hero, nav, most projects, section labels     |
| AI systems        | Violet + Indigo | AI project card, SystemsBuilt AI item, modal |
| Data / health     | Emerald + Teal  | Secure health platform, data systems         |
| Infrastructure    | Cyan + Sky      | Integration layers, pipelines                |
| Security          | Amber + Orange  | Auth layers, security tooling                |
| Deep compute      | Purple          | AI pipeline, model routing                   |

Use these consistently. A violet accent should only appear in AI-related contexts.

---

## Typography Intent

- **Headings** are bold, confident, large. They establish hierarchy immediately.
- **Body text** is muted (`text-muted-foreground`) and relaxed (`leading-relaxed`). It supports, not competes.
- **Labels** (section badges, tech tags) are `text-xs font-medium`. Small but legible.
- **No decorative fonts** — the system font stack or whatever Next.js configures in `layout.tsx` is used. The hierarchy comes from weight and size, not font personality.

---

## What the Site Should Communicate to Employers

**After 10 seconds on the hero:**

> This is a serious developer. They're working on AI and health data. The design quality suggests they care about UX, not just backend systems.

**After scrolling through Projects:**

> They've shipped real products (Thylo Insight has a live demo). They also understand security and low-level systems. The AI project suggests they can design full pipelines.

**After seeing "Systems I've Built":**

> This person thinks in architectures. They understand data pipelines, RAG, LLM integration — not just "I used GPT-4 in a project."

**After reading Skills + Experience:**

> Full-stack capable, holds leadership roles, studying CS at NTNU.

The portfolio should make this impression in under 2 minutes of browsing.

---

## Things That Would Break the Design Intent

- Adding too many sections (more than 6–7 is too much)
- Making any section feel like a "resume dump"
- Overstyling with too many gradients, colours, or animations in one area
- Breaking the visual rhythm (inconsistent spacing, missing hover states)
- Showing placeholder content or half-finished sections
- Making the mobile version feel like an afterthought
