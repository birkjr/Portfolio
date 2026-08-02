import type { Locale, Localized } from "./types";

export const skillsSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
  whyHeading: string;
}> = {
  no: {
    label: "Teknologi",
    title: "Teknologier jeg bygger med",
    subtitle:
      "Teknologiene jeg faktisk bruker — trykk på et kort for å lese hvorfor jeg valgte det.",
    whyHeading: "Hvorfor dette?",
  },
  en: {
    label: "Tech Stack",
    title: "Technologies I build with",
    subtitle:
      "Technologies I actually use — click a card to read why I chose it.",
    whyHeading: "Why this?",
  },
};

export type TechIcon = "github" | "cursor";

export interface TechItemEntry {
  name: string;
  group: { no: string; en: string };
  why: { no: string; en: string };
  iconType: "lucide" | "image";
  icon?: TechIcon;
  imageSrc?: string;
}

/** Technology cards — edit name, group and why for each language */
export const techItems: TechItemEntry[] = [
  {
    name: "React",
    group: { no: "Frontend", en: "Frontend" },
    why: {
      no: "Bruker React i Thylo Insight (app og web), Teknologiporten og EMIL-Link. Komponentmodellen sitter, og jeg slipper å bytte mental modell mellom prosjektene mine.",
      en: "I use React across Thylo Insight (app and web), Teknologiporten and EMIL-Link. The component model clicks for me, and I don't have to switch mental models between projects.",
    },
    iconType: "image",
    imageSrc: "/Icons/react.jpeg",
  },
  {
    name: "Next.js",
    group: { no: "Frontend", en: "Frontend" },
    why: {
      no: "Routing, SSR og deploy rett ut av boksen. Teknologiporten og denne porteføljen kjører Next.js — mindre oppsett, mer tid til å shippe.",
      en: "Routing, SSR and deployment out of the box. Teknologiporten and this portfolio run on Next.js — less setup, more time shipping.",
    },
    iconType: "image",
    imageSrc: "/Icons/nextjs.jpeg",
  },
  {
    name: "TypeScript",
    group: { no: "Språk", en: "Language" },
    why: {
      no: "Når jeg hopper mellom studie, startup og internships, fanger TypeScript feil før de når brukerne. Typene er dokumentasjon jeg faktisk holder oppdatert.",
      en: "When I jump between studies, startup work and internships, TypeScript catches bugs before users do. The types are documentation I actually keep up to date.",
    },
    iconType: "image",
    imageSrc: "/Icons/typescriptv2.png",
  },
  {
    name: "Tailwind CSS",
    group: { no: "Styling", en: "Styling" },
    why: {
      no: "Som student med begrenset tid vil jeg style raskt uten å hoppe mellom filer. Tailwind gir meg konsistent UI uten et eget designsystem jeg må vedlikeholde.",
      en: "As a student with limited time, I want to style fast without jumping between files. Tailwind gives me consistent UI without a design system I have to maintain.",
    },
    iconType: "image",
    imageSrc: "/Icons/tailwindv2.png",
  },
  {
    name: "Python",
    group: { no: "Backend / AI", en: "Backend / AI" },
    why: {
      no: "FastAPI i Thylo Insight, dataanalyse hos Disruptive Technologies og AI-arbeid hos Concentrix. Python er der backend og data møtes for meg.",
      en: "FastAPI at Thylo Insight, data analysis at Disruptive Technologies and AI work at Concentrix. Python is where backend and data meet for me.",
    },
    iconType: "image",
    imageSrc: "/Icons/python.jpeg",
  },
  {
    name: "Node.js",
    group: { no: "Backend", en: "Backend" },
    why: {
      no: "Når frontend allerede er TypeScript, vil jeg ha scripts, API-er og verktøy i samme språk. Mindre kontekstbytte når tempoet er høyt.",
      en: "When the frontend is already TypeScript, I want scripts, APIs and tooling in the same language. Less context switching when the pace is high.",
    },
    iconType: "image",
    imageSrc: "/Icons/nodejs.png",
  },
  {
    name: "Supabase",
    group: { no: "Database", en: "Database" },
    why: {
      no: "Auth, Postgres og RLS uten å drifte egen infrastruktur. Thylo Insigt og Teknologiporten trengte det — spesielt når helsedata krever at tilgang styres ordentlig.",
      en: "Auth, Postgres and RLS without running my own infrastructure. Thylo Insight and Teknologiporten needed that — especially when health data requires proper access control.",
    },
    iconType: "image",
    imageSrc: "/Icons/supabasev2.png",
  },
  {
    name: "Vercel",
    group: { no: "Infrastruktur", en: "Infrastructure" },
    why: {
      no: "Push til main, live på sekunder. For sideprosjekter og produksjonssider er friksjonen så lav at jeg faktisk deployer ofte.",
      en: "Push to main, live in seconds. For side projects and production sites the friction is low enough that I actually deploy often.",
    },
    iconType: "image",
    imageSrc: "/Icons/vercel.png",
  },
  {
    name: "GitHub",
    group: { no: "Samarbeid", en: "Collaboration" },
    why: {
      no: "Versjonskontroll, PR-er med teamet i Teknologiporten, og et sted for uferdige eksperimenter. Alt som ikke er polert nok til porteføljen, bor her.",
      en: "Version control, PRs with the Teknologiporten team, and a home for unfinished experiments. Anything not polished enough for the portfolio lives here.",
    },
    iconType: "image",
    imageSrc: "/Icons/github.jpeg",
  },
  {
    name: "Cursor",
    group: { no: "IDE", en: "IDE" },
    why: {
      no: "Etter å ha prøvd mange IDE'er og AI agenter, kommer jeg alltid tilbake til Cursor. Ikke bare fordi det er enkelt å bytte mellom AI modeller, men også fordi jeg har full kontroll på filer som blir endret og at den aldri vil gjøre noe jeg ikke har bedt om.",
      en: "After trying many IDEs and AI agents, I always come back to Cursor. Not just because it's easy to switch between AI models, but also because I have full control over files that are being changed and that it will never do anything I haven't asked for.",
    },
    iconType: "image",
    imageSrc: "/Icons/cursor.jpeg",
  },
];

export function getTechItems(locale: Locale) {
  return techItems.map((item) => ({
    name: item.name,
    group: item.group[locale],
    why: item.why[locale],
    iconType: item.iconType,
    icon: item.icon,
    imageSrc: item.imageSrc,
  }));
}
