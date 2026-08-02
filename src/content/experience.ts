import type { Locale, Localized } from "./types";

export const experienceSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
}> = {
  no: {
    label: "Erfaringer",
    title: "Erfaringer",
    subtitle:
      "Noen milepæler og prestasjoner jeg er stolt av gjennom karrieren.",
  },
  en: {
    label: "Experience",
    title: "Experience",
    subtitle:
      "Some milestones and achievements I am proud of throughout my career.",
  },
};

export type ExperienceIcon =
  | "activity"
  | "code"
  | "brain"
  | "users"
  | "trendingUp"
  | "star";

export interface ExperienceEntry {
  title: { no: string; en: string };
  description: { no: string; en: string };
  year: { no: string; en: string } | string;
  icon: ExperienceIcon;
  detailedDescription?: { no: string; en: string };
}

export const experienceEntries: ExperienceEntry[] = [
  {
    title: { no: "Medgründer og CTO", en: "Co-founder and CTO" },
    description: {
      no: "Thylo Insight - Helsetech startup som leverer innsikt og analyse av kundenes Thyroid data ved hjelp av AI",
      en: "Thylo Insight - Health-tech startup that provides insights and analysis of customers Thyroid data using AI",
    },
    year: { no: "2025 - Nå", en: "2025 - Now" },
    icon: "activity",
    detailedDescription: {
      no: "Som medgründer og CTO for Thylo Insight har jeg jobbet med utvikling av appen og nettsiden. Gjennom dette prosjektet har jeg tatt hovedansvar for frontend-utvikling med React Native og React, samt backend-utvikling med Supabase. Jeg har også samarbeidet tett med teamet for å sikre at løsningen oppfyller organisasjonens behov og standarder. Denne rollen har gitt meg verdifull erfaring innen full-stack utvikling, prosjektledelse og samarbeid med tverrfaglige team.",
      en: "As co-founder and CTO of Thylo Insight, I have worked on developing the app and website. Through this project, I have taken primary responsibility for frontend development with React Native and React, as well as backend development with Supabase. I have also collaborated closely with the team to ensure that the solution meets the organization's needs and standards. This role has given me valuable experience in full-stack development, project management, and collaboration with interdisciplinary teams.",
    },
  },
  {
    title: { no: "IT-utvikler", en: "IT Developer" },
    description: {
      no: "Teknologiporten, NTNU - Full-stack utvikler",
      en: "Teknologiporten, NTNU - Full-stack developer",
    },
    year: { no: "2023 - Nå", en: "2023 - Now" },
    icon: "code",
    detailedDescription: {
      no: "Som IT-utvikler ved Teknologiporten har jeg jobbet med utvikling av organisasjonens offisielle nettside. Gjennom dette prosjektet har jeg tatt hovedansvar for frontend-utvikling med React og Next.js, samt backend-utvikling med Supabase. Jeg har også samarbeidet tett med teamet for å sikre at løsningen oppfyller organisasjonens behov og standarder. Denne rollen har gitt meg verdifull erfaring innen full-stack utvikling, prosjektledelse og samarbeid med tverrfaglige team.",
      en: "As an IT Developer at Teknologiporten, I have worked on developing the organization's official website. Through this project, I have taken primary responsibility for frontend development with React and Next.js, as well as backend development with Supabase. I have also collaborated closely with the team to ensure that the solution meets the organization's needs and standards. This role has given me valuable experience in full-stack development, project management, and collaboration with interdisciplinary teams.",
    },
  },
  {
    title: {
      no: "AI og maskinlærings Analytiker",
      en: "AI and Machine Learning Analyst",
    },
    description: {
      no: "Concentrix - Analyse og utvikling av AI-løsninger med fokus på machine learning og kunstig intelligens",
      en: "Concentrix - Analysis and development of AI solutions with focus on machine learning and artificial intelligence",
    },
    year: "2025",
    icon: "brain",
    detailedDescription: {
      no: "I rollen som AI og maskinlærings analytiker hos Concentrix arbeidet jeg med analyse og utvikling av AI-løsninger.",
      en: "In the role of AI and Machine Learning Analyst at Concentrix, I worked with analysis and development of AI solutions.",
    },
  },
  {
    title: { no: "Teamleder Markedsføring", en: "Marketing Team Leader" },
    description: {
      no: "EMIL-Link - Leder team med fokus på forhandling og samarbeid, og utviklet ferdig nettside",
      en: "EMIL-Link - Leads team with focus on negotiation and collaboration, and developed finished website",
    },
    year: "2024",
    icon: "users",
    detailedDescription: {
      no: "Som Teamleder for Markedsføring ved EMIL-Link ledet jeg et team med fokus på forhandling, samarbeid og strategisk markedsføring. I tillegg til ledervervet tok jeg ansvar for å utvikle organisasjonens offisielle nettside fra bunnen av, ved bruk av moderne webteknologier. Dette prosjektet kombinerte mine tekniske ferdigheter med lederegenskaper og ga meg dyptgående innsikt i hvordan teknologi kan brukes til å styrke et selskaps markedsføringsinnsats.",
      en: "As Marketing Team Leader at EMIL-Link, I led a team with focus on negotiation, collaboration, and strategic marketing. In addition to the leadership responsibility, I took on the role of developing the organization's official website from scratch, using modern web technologies. This project combined my technical skills with leadership qualities and gave me deep insight into how technology can be used to strengthen a company's marketing efforts.",
    },
  },
  {
    title: { no: "Marketing Team Member", en: "Marketing Team Member" },
    description: {
      no: "EMIL-Link - Markedsføring og webdesign",
      en: "EMIL-Link - Marketing and web design",
    },
    year: "2023-2024",
    icon: "trendingUp",
    detailedDescription: {
      no: "Som medlem av markedsføringsteamet ved EMIL-Link jobbet jeg med ulike markedsføringsoppgaver og webdesign. Jeg deltok i utviklingen av markedsføringsmateriell, strategiutforming og implementering av digitale markedsføringsprogrammer. Denne rollen gav meg grunnleggende erfaring med markedsføring og var et viktig steg i min utvikling mot en mer ledende rolle i organisasjonen.",
      en: "As a member of the marketing team at EMIL-Link, I worked on various marketing tasks and web design. I participated in the development of marketing materials, strategy formulation, and implementation of digital marketing programs. This role gave me fundamental experience with marketing and was an important step in my development towards a more leading role in the organization.",
    },
  },
  {
    title: { no: "Servitør", en: "Waiter" },
    description: {
      no: "Risør Fiskemottak Restaurant - Kundeservice og salg",
      en: "Risør Fiskemottak Restaurant - Customer service and sales",
    },
    year: "2024",
    icon: "star",
    detailedDescription: {
      no: "Som servitør ved Risør fiskemottak fikk jeg verdifull erfaring med kundeservice og salg. Denne rollen lærte meg å jobbe under tidspress, håndtere ulike kundeskjebner og sikre høy servicekvalitet. Selv om dette ikke var en teknisk rolle, utviklet jeg ferdigheter i kommunikasjon, problemløsing og tilpasningsevne som er overførbare til alle aspekter av min karriere.",
      en: "As a waiter at Risør Fiskemottak Restaurant, I gained valuable experience in customer service and sales. This role taught me to work under time pressure, handle different customer situations, and ensure high service quality. Although this was not a technical role, I developed skills in communication, problem-solving, and adaptability that are transferable to all aspects of my career.",
    },
  },
];

export function getExperienceEntries(locale: Locale) {
  return experienceEntries.map((entry) => ({
    title: entry.title[locale],
    description: entry.description[locale],
    year: typeof entry.year === "string" ? entry.year : entry.year[locale],
    icon: entry.icon,
    detailedDescription: entry.detailedDescription?.[locale],
  }));
}
