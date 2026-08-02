import type { Locale, Localized } from "./types";

/** Section headings and button labels for the Projects block */
export const projectsSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
  viewProject: string;
  visitProject: string;
  systemBadge: string;
  featuredBadge: string;
  swipeHint: string;
  previous: string;
  next: string;
}> = {
  no: {
    label: "Prosjekter",
    title: "Hva jeg har bygget til nå",
    subtitle:
      "Produkter, plattformer og systemarkitekturer jeg har bygget — fra full-stack apper til AI-pipelines og sikker datainfrastruktur.",
    viewProject: "Se prosjekt",
    visitProject: "Besøk prosjekt",
    systemBadge: "System",
    featuredBadge: "Utvalgt",
    swipeHint: "Dra kortet eller bruk pilene for å bla",
    previous: "Forrige prosjekt",
    next: "Neste prosjekt",
  },
  en: {
    label: "Projects",
    title: "What I've built so far",
    subtitle:
      "Products, platforms and system architectures I have built — from full-stack apps to AI pipelines and secure data infrastructure.",
    viewProject: "View Project",
    visitProject: "Visit Project",
    systemBadge: "System",
    featuredBadge: "Featured",
    swipeHint: "Drag the card or use the arrows to browse",
    previous: "Previous project",
    next: "Next project",
  },
};

export type ProjectIcon = "database";

export interface ProjectEntry {
  title: { no: string; en: string };
  description: { no: string; en: string };
  technologies: { no: string[]; en: string[] };
  github: string;
  demo: string;
  featured: boolean;
  image: string;
  icon?: ProjectIcon;
  isSystem?: boolean;
}

/** Project cards — edit title/description/technologies for each language */
export const projectEntries: ProjectEntry[] = [
  {
    title: { no: "Thylo Insight", en: "Thylo Insight" },
    description: {
      no: "Medgründer og CTO for Thylo Insight, et startup som leverer innsikt og analyse av kundenes stoffskifte-data. Både app og nettside er bygget med React (Native og JS).",
      en: "Co-founder and CTO of Thylo Insight, a startup that provides insights and analysis of customers Thyroid data. Both App and Website are built with React Native and React JS.",
    },
    technologies: {
      no: [
        "React Native",
        "Expo",
        "TypeScript",
        "Tailwind",
        "Supabase",
        "FastAPI",
        "Vercel",
        "React JS",
        "Next.js",
      ],
      en: [
        "React Native",
        "Expo",
        "TypeScript",
        "Tailwind",
        "Supabase",
        "FastAPI",
        "Vercel",
        "React JS",
        "Next.js",
      ],
    },
    github: "",
    demo: "https://thyloinsight.no",
    featured: true,
    image: "/ThyloInsightv2.png",
  },
  {
    title: { no: "Teknologiporten NTNU", en: "Teknologiporten NTNU" },
    description: {
      no: "Offisiell nettside for Teknologiporten - IT-utvikler",
      en: "Official website for Teknologiporten - IT developer",
    },
    technologies: {
      no: [
        "React",
        "Next.js",
        "Backend: Supabase",
        "Full-stack",
        "TypeScript",
        "Tailwind",
      ],
      en: [
        "React",
        "Next.js",
        "Backend: Supabase",
        "Full-stack",
        "TypeScript",
        "Tailwind",
      ],
    },
    github: "",
    demo: "https://tp-nettside.vercel.app/",
    featured: true,
    image: "/teknologiporten_nettside.png",
  },
  {
    title: { no: "EMIL-Link", en: "EMIL-Link" },
    description: {
      no: "Markedsførings- og webdesign prosjekt som Teamleder Markedsføring",
      en: "Marketing and web design project as Marketing Team Leader",
    },
    technologies: {
      no: [
        "Webdesign",
        "Backend: Supabase",
        "Full-stack",
        "TypeScript",
        "Tailwind",
        "React",
      ],
      en: [
        "Web Design",
        "Backend: Supabase",
        "Full-stack",
        "TypeScript",
        "Tailwind",
        "React",
      ],
    },
    github: "",
    demo: "https://www.emil-link.no",
    featured: true,
    image: "/emil_link.png",
  },
];

export function getProjectEntries(locale: Locale) {
  return projectEntries.map((entry) => ({
    title: entry.title[locale],
    description: entry.description[locale],
    technologies: entry.technologies[locale],
    github: entry.github,
    demo: entry.demo,
    featured: entry.featured,
    image: entry.image,
    icon: entry.icon,
    isSystem: entry.isSystem,
  }));
}
