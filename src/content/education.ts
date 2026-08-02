import type { Locale, Localized } from "./types";

export const educationSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
}> = {
  no: {
    label: "Utdanning",
    title: "Utdanning",
    subtitle: "Min utdanningsreise",
  },
  en: {
    label: "Education",
    title: "Education",
    subtitle: "My educational journey",
  },
};

export type EducationIcon = "graduationCap" | "school";

export interface EducationEntry {
  institution: { no: string; en: string };
  program: { no: string; en: string };
  period: string;
  description?: { no: string; en: string };
  icon: EducationIcon;
}

export const educationEntries: EducationEntry[] = [
  {
    institution: {
      no: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
      en: "Norwegian University of Science and Technology (NTNU)",
    },
    program: {
      no: "Datateknologi (5-årig master)",
      en: "Computer Science (5-year master's)",
    },
    period: "2025 - 2028",
    description: {
      no: "3. år av 5-årig integrert masterprogram i datateknologi. Byttet fra Ingeniørvitenskap og IKT i 3. klasse. Fokus på kunstig intelligens, IoT, bærekraftige løsninger og utvikling av komplekse IT-systemer.",
      en: "3rd year of a 5-year integrated master's program in computer science. Switched from Engineering Science and ICT in 3rd year. Focus on artificial intelligence, IoT, sustainable solutions, and development of complex IT systems.",
    },
    icon: "graduationCap",
  },
  {
    institution: {
      no: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
      en: "Norwegian University of Science and Technology (NTNU)",
    },
    program: {
      no: "Ingeniørvitenskap og IKT - Maskin og IKT (maskinlæring)",
      en: "Engineering Science and ICT - Machine and ICT (machine learning)",
    },
    period: "2023 - 2025",
    description: {
      no: "Etter 2 år med Ingeniørvitenskap og IKT og retningen Maskin og IKT med fokus på maskinlæring, valgte jeg å følge magefølelsen til å bytte til Datateknologi.",
      en: "After 2 years with Engineering Science and ICT and the specialization Machine and ICT with focus on machine learning, I chose to follow my gut feeling and switch to Computer Science.",
    },
    icon: "graduationCap",
  },
  {
    institution: {
      no: "Universitetet i Oslo (UiO)",
      en: "University of Oslo (UiO)",
    },
    program: {
      no: "Årsenhet, Informatikk",
      en: "One-year program, Informatics",
    },
    period: "2022 - 2023",
    description: {
      no: "Fag i informatikk og informatikk-relaterte disipliner.",
      en: "Preliminary subjects in informatics and informatics-related disciplines.",
    },
    icon: "graduationCap",
  },
  {
    institution: {
      no: "Norges Toppidrettsskole",
      en: "Norwegian College of Elite Sport",
    },
    program: {
      no: "Stabæk Fotball",
      en: "Stabæk Football Academy",
    },
    period: "2019 - 2022",
    description: {
      no: "Kombinerte toppidrett i fotball og videregående skole.",
      en: "Combined high school education with elite sport.",
    },
    icon: "school",
  },
];

export function getEducationEntries(locale: Locale) {
  return educationEntries.map((entry) => ({
    institution: entry.institution[locale],
    program: entry.program[locale],
    period: entry.period,
    description: entry.description?.[locale],
    icon: entry.icon,
  }));
}
