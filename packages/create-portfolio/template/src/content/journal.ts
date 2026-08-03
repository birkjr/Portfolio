import type { Localized } from "./types";

export interface JournalItem {
  slug: string;
  question: { no: string; en: string };
  paragraphs: { no: string[]; en: string[] };
  tag: { no: string; en: string };
}

export const JOURNAL_INITIAL_VISIBLE = 3;
export const JOURNAL_LOAD_MORE = 3;

export const journalSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
  readAnswer: string;
  filterAll: string;
  showMore: string;
  showLess: string;
}> = {
  no: {
    label: "Journal",
    title: "Tanker og erfaringer",
    subtitle:
      "Korte refleksjoner om prosjekter, læring og det du tenker på som utvikler.",
    readAnswer: "Les svar",
    filterAll: "Alle",
    showMore: "Vis flere",
    showLess: "Vis færre",
  },
  en: {
    label: "Journal",
    title: "Thoughts and experiences",
    subtitle:
      "Short reflections on projects, learning and what you think about as a developer.",
    readAnswer: "Read answer",
    filterAll: "All",
    showMore: "Show more",
    showLess: "Show less",
  },
};

export const journal: JournalItem[] = [
  {
    slug: "example-lesson",
    question: {
      no: "Hva lærte du av ditt siste prosjekt?",
      en: "What did you learn from your latest project?",
    },
    paragraphs: {
      no: [
        "Dette er et eksempel på et journalinnlegg. Skriv om noe du faktisk har opplevd — en feil, en aha-opplevelse, eller en beslutning du tok.",
        "Gode journaltekster er ærlige og konkrete. De trenger ikke være lange.",
      ],
      en: [
        "This is an example journal entry. Write about something you actually experienced — a mistake, an aha moment, or a decision you made.",
        "Good journal posts are honest and concrete. They don't need to be long.",
      ],
    },
    tag: { no: "Læring", en: "Learning" },
  },
  {
    slug: "example-shipping",
    question: {
      no: "Hvorfor er det viktig å shippe tidlig?",
      en: "Why is it important to ship early?",
    },
    paragraphs: {
      no: [
        "Erstatt dette avsnittet med din egen mening eller erfaring.",
        "Journal-seksjonen er ment for å vise hvordan du tenker — ikke bare hva du har bygget.",
      ],
      en: [
        "Replace this paragraph with your own opinion or experience.",
        "The journal section is meant to show how you think — not just what you've built.",
      ],
    },
    tag: { no: "Produkt", en: "Product" },
  },
  {
    slug: "example-stack",
    question: {
      no: "Hvordan velger du tech stack?",
      en: "How do you choose your tech stack?",
    },
    paragraphs: {
      no: [
        "Eksempeltekst: Jeg starter med problemet, ikke teknologien. Hva må løses, hvem er brukeren, og hva er tidslinjen?",
        "Skriv ditt eget svar her — dette er placeholder-innhold.",
      ],
      en: [
        "Example copy: I start with the problem, not the technology. What needs to be solved, who is the user, and what's the timeline?",
        "Write your own answer here — this is placeholder content.",
      ],
    },
    tag: { no: "Tech", en: "Tech" },
  },
];
