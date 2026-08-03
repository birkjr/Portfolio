import type { Localized } from "./types";

export type TimelineEntryType = "education" | "work" | "summerIntern";

export interface TimelineExpandable {
  architecture?: Localized<string>;
  github?: string;
  demo?: string;
  journalSlugs?: string[];
}

export interface TimelineEntry {
  id: string;
  sortKey: number;
  period: string;
  title: Localized<string>;
  subtitle: Localized<string>;
  description?: Localized<string>;
  type: TimelineEntryType;
  learnings: Localized<string>;
  expandable?: TimelineExpandable;
}

export const timelineSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
  education: string;
  summerIntern: string;
  work: string;
  whatILearned: string;
  readMore: string;
  readLess: string;
  architecture: string;
  github: string;
  demo: string;
  journal: string;
  readJournal: string;
}> = {
  no: {
    label: "Tidslinje",
    title: "Erfaring og prosjekter",
    subtitle: "Utdanning, jobber og prosjekter — kronologisk.",
    education: "Utdanning",
    work: "Erfaring",
    summerIntern: "Sommerintern",
    whatILearned: "Hva lærte jeg?",
    readMore: "Les mer",
    readLess: "Vis mindre",
    architecture: "Arkitektur",
    github: "GitHub",
    demo: "Nettside",
    journal: "Journal",
    readJournal: "Les journal",
  },
  en: {
    label: "Timeline",
    title: "Experience and projects",
    subtitle: "Education, roles and projects — chronological.",
    education: "Education",
    work: "Experience",
    summerIntern: "Summer internship",
    whatILearned: "What did I learn?",
    readMore: "Read more",
    readLess: "Show less",
    architecture: "Architecture",
    github: "GitHub",
    demo: "Website",
    journal: "Journal",
    readJournal: "Read journal",
  },
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "example-education",
    sortKey: 2024,
    period: "2022 – 2026",
    title: { no: "Studier", en: "Studies" },
    subtitle: { no: "Universitet / Høyskole", en: "University / College" },
    description: {
      no: "Kort beskrivelse av studieretning, fagområde eller spesialisering.",
      en: "Short description of your degree, field or specialization.",
    },
    type: "education",
    learnings: {
      no: "Hva lærte du her? Teknologi, samarbeid, metoder — skriv ditt eget eksempel.",
      en: "What did you learn here? Tech, teamwork, methods — write your own example.",
    },
  },
  {
    id: "example-internship",
    sortKey: 2025,
    period: "2025",
    title: { no: "Sommerintern", en: "Summer intern" },
    subtitle: { no: "Eksempel Bedrift AS", en: "Example Company Inc." },
    description: {
      no: "Kort om hva du jobbet med — f.eks. frontend, backend, data eller produkt.",
      en: "Briefly what you worked on — e.g. frontend, backend, data or product.",
    },
    type: "summerIntern",
    learnings: {
      no: "Hva tok du med deg fra rollen? Erstatt denne teksten med egne erfaringer.",
      en: "What did you take away from the role? Replace this with your own experience.",
    },
  },
  {
    id: "example-project",
    sortKey: 2026,
    period: "2025 – Nå",
    title: { no: "Sideprosjekt", en: "Side project" },
    subtitle: { no: "Eksempelprosjekt", en: "Example Project" },
    description: {
      no: "Beskriv et prosjekt du har bygget — hva det løser, og hvilken stack du brukte.",
      en: "Describe a project you built — what it solves and which stack you used.",
    },
    type: "work",
    learnings: {
      no: "Hva lærte du av å shippe noe selv? Deploy, brukerfeedback, arkitekturvalg osv.",
      en: "What did you learn from shipping something yourself? Deploy, user feedback, architecture choices, etc.",
    },
    expandable: {
      architecture: {
        no: "Eksempel: Next.js frontend, API-ruter, database og deploy på Vercel.",
        en: "Example: Next.js frontend, API routes, database and deploy on Vercel.",
      },
      github: "https://github.com/__GITHUB_USERNAME__",
      demo: "https://example.com",
      journalSlugs: ["example-lesson"],
    },
  },
].sort((a, b) => b.sortKey - a.sortKey) as TimelineEntry[];

export function getJournalSlugFromHash(hash: string): string | null {
  if (!hash.startsWith("#journal-")) return null;
  const slug = hash.slice("#journal-".length);
  return slug.length > 0 ? slug : null;
}
