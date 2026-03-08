# Project Overview

## Developer

**Birk Jonathan Ramstad**  
Co-founder & CTO, Thylo Insight  
NTNU — Computer Science  
Trondheim / Oslo, Norway

---

## What This Repository Is

A personal developer portfolio website built with Next.js, TypeScript and Tailwind CSS. It is a single-page application deployed on Vercel. The site presents Birk's professional identity, projects, and technical depth to potential employers, collaborators, and the broader developer community.

---

## Focus Areas

The portfolio is designed to communicate expertise in the following domains:

| Domain                     | Examples                                                                       |
| -------------------------- | ------------------------------------------------------------------------------ |
| **AI systems**             | AI Health Insight Engine — RAG pipeline, LLM integration, prompt orchestration |
| **Data-driven products**   | Thylo Insight — health data platform with wearable ingestion and analysis      |
| **Software architecture**  | Modular AI pipelines, retrieval layers, data pipelines, Supabase backend       |
| **Full-stack development** | React Native, Next.js, FastAPI, TypeScript, Supabase                           |
| **Security engineering**   | Reverse engineering, forensics tooling, CTF participation                      |
| **Developer tools**        | Open-source security toolkits and analysis scripts                             |

---

## Projects Showcased

### Featured Products

- **Thylo Insight** — Health insight startup (co-founder & CTO). React Native app + Next.js website backed by Supabase and FastAPI.
- **Teknologiporten NTNU** — Official website for the NTNU IT students' organisation.
- **EMIL-Link** — Marketing platform, full-stack lead.

### AI & System Projects

- **AI Health Insight Engine** — End-to-end AI system with wearable data ingestion, RAG architecture, prompt orchestration, LLM integration, and response validation. Outputs weekly summaries, daily insights and personalised recommendations.

### Security & Reverse Engineering

- **Reverse Engineering Challenge Analyzer** — Ghidra analysis, state-machine reconstruction, brute-force key discovery.
- **Forensics Toolkit** — Modular DFIR-inspired document and file analysis.

---

## Systems Built (Architecture-Level)

The "Systems I've Built" section signals that Birk designs complete architectures, not just individual features:

- **AI Health Insight Engine** — Full AI pipeline
- **Secure Health Data Platform** — HIPAA-aware Supabase backend with RLS
- **Wearable Data Integration Layer** — Unified ETL pipeline across device APIs
- **Prompt Orchestration Framework** — LangChain-based structured prompt management
- **AI Insight Generation Pipeline** — RAG + model router + response validation
- **Full-Stack Auth & Security Layer** — JWT, OAuth2, RBAC

---

## Technical Stack Summary

```
Frontend:   Next.js 14, React 18, TypeScript
Styling:    Tailwind CSS, custom CSS keyframes
Animation:  GSAP (ScrollTrigger), CSS transitions
Icons:      Lucide React
UI:         shadcn/ui primitives
Backend:    Supabase (PostgreSQL + RLS + Storage)
API:        FastAPI (Python) — used in Thylo Insight
Deployment: Vercel
```

---

## Repository Structure

```
src/
  app/          — Next.js App Router (layout, page, metadata)
  components/   — All React section and UI components
  context/      — Language context (EN/NO i18n)
  hooks/        — Custom React hooks
  lib/          — Utility functions (cn)
public/         — Static images and assets
.cursor/        — Cursor AI context files
.claude/        — Claude AI context files (this folder)
```
