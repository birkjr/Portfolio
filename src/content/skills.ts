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
      no: "React er et UI-bibliotek — det handler om komponenter, state og gjenbrukbar frontend-logikk. Jeg bruker det i Thylo Insight, Teknologiporten og EMIL-Link. Men React alene er bare view-laget: uten et rammeverk rundt rendrer siden ofte i nettleseren (CSR), og da får søkemotorer mindre ferdig HTML med én gang. For SEO-tunge nettsider holder det ofte ikke alene.",
      en: "React is a UI library — components, state and reusable frontend logic. I use it across Thylo Insight, Teknologiporten and EMIL-Link. On its own, though, React is just the view layer: without a framework around it, the page often renders in the browser (CSR), so search engines get less ready-made HTML upfront. For SEO-heavy sites, that often isn't enough on its own.",
    },
    iconType: "image",
    imageSrc: "/Icons/react.jpeg",
  },
  {
    name: "Next.js",
    group: { no: "Frontend", en: "Frontend" },
    why: {
      no: "Next.js er rammeverket jeg legger oppå React for offentlige nettsider. Forskjellen: React bygger UI-et, mens Next.js legger til routing, SSR/SSG, metadata og deploy — HTML sendes ferdig fra serveren, bedre for SEO og raskere første visning. Derfor kjører Teknologiporten og denne porteføljen Next.js, ikke ren client-side React.",
      en: "Next.js is the framework I layer on top of React for public websites. The difference: React builds the UI, while Next.js adds routing, SSR/SSG, metadata and deployment — HTML is sent ready from the server, which is better for SEO and faster first paint. That's why Teknologiporten and this portfolio run on Next.js, not plain client-side React.",
    },
    iconType: "image",
    imageSrc: "/Icons/nextjs.jpeg",
  },
  {
    name: "TypeScript",
    group: { no: "Språk", en: "Language" },
    why: {
      no: "Fra å først være kjent med JavaScript til å bli kjent med TypeScript var natt og dag, og spesielt når man skal lage felles komponenter for flere repoer er dette det perfekte språket for meg. Det gjør det også lettere å vedlikehole kodebasen.",
      en: "From being familiar with JavaScript to becoming familiar with TypeScript was night and day, and especially when making shared components for multiple repos this is the perfect language for me. It also makes it easier to maintain the codebase.",
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
    group: { no: "Deploy", en: "Deploy" },
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
