export type TimelineEntryType = "education" | "work";

export interface TimelineEntry {
  sortKey: number;
  period: string;
  title: { no: string; en: string };
  subtitle: { no: string; en: string };
  description?: { no: string; en: string };
  type: TimelineEntryType;
}

export const timelineEntries: TimelineEntry[] = [
  {
    sortKey: 2025,
    period: "2025 – Nå",
    title: { no: "Medgründer og CTO", en: "Co-founder and CTO" },
    subtitle: { no: "Thylo Insight", en: "Thylo Insight" },
    description: {
      no: "Full-stack utvikling av app og plattform med React Native, Next.js og Supabase.",
      en: "Full-stack development of app and platform with React Native, Next.js and Supabase.",
    },
    type: "work",
  },
  {
    sortKey: 2025,
    period: "2025 – 2028",
    title: { no: "Datateknologi", en: "Computer Science" },
    subtitle: {
      no: "NTNU — 5-årig master",
      en: "NTNU — 5-year master's",
    },
    description: {
      no: "Integrert master med fokus på AI, IoT og komplekse IT-systemer.",
      en: "Integrated master's with focus on AI, IoT and complex IT systems.",
    },
    type: "education",
  },
  {
    sortKey: 2025,
    period: "2025",
    title: {
      no: "AI- og maskinlæringsanalytiker",
      en: "AI and Machine Learning Analyst",
    },
    subtitle: { no: "Concentrix", en: "Concentrix" },
    type: "work",
  },
  {
    sortKey: 2024,
    period: "2024",
    title: { no: "Teamleder markedsføring", en: "Marketing Team Leader" },
    subtitle: { no: "EMIL-Link", en: "EMIL-Link" },
    description: {
      no: "Ledet markedsføringsteam og utviklet organisasjonens nettside.",
      en: "Led marketing team and built the organization's website.",
    },
    type: "work",
  },
  {
    sortKey: 2023,
    period: "2023 – Nå",
    title: { no: "IT-utvikler", en: "IT Developer" },
    subtitle: { no: "Teknologiporten, NTNU", en: "Teknologiporten, NTNU" },
    description: {
      no: "Full-stack utvikling av nettside med React, Next.js og Supabase.",
      en: "Full-stack website development with React, Next.js and Supabase.",
    },
    type: "work",
  },
  {
    sortKey: 2023,
    period: "2023 – 2025",
    title: {
      no: "Ingeniørvitenskap og IKT",
      en: "Engineering Science and ICT",
    },
    subtitle: {
      no: "NTNU — Maskin og IKT",
      en: "NTNU — Machine and ICT",
    },
    type: "education",
  },
  {
    sortKey: 2022,
    period: "2022 – 2023",
    title: { no: "Informatikk", en: "Informatics" },
    subtitle: {
      no: "UiO — Årsenhet",
      en: "University of Oslo — One-year program",
    },
    type: "education",
  },
  {
    sortKey: 2019,
    period: "2019 – 2022",
    title: { no: "Toppidrett fotball", en: "Elite sport football" },
    subtitle: {
      no: "Norges Toppidrettsskole — Stabæk",
      en: "Norwegian College of Elite Sport — Stabæk",
    },
    type: "education",
  },
].sort((a, b) => b.sortKey - a.sortKey) as TimelineEntry[];
