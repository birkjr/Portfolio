import type { Localized } from "./types";

export type ArticleKind = "thought" | "article" | "link";

export interface ArticleItem {
  kind: ArticleKind;
  title: { no: string; en: string };
  description: { no: string; en: string };
  href?: string;
  tag: { no: string; en: string };
}

/** Section headings for the Articles block */
export const articlesSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
}> = {
  no: {
    label: "Artikler",
    title: "Artikler og tanker",
    subtitle:
      "Notater fra studieliv, Thylo og prosjekter — ting jeg faktisk har lært, ikke generiske råd fra internett.",
  },
  en: {
    label: "Articles",
    title: "Articles and thoughts",
    subtitle:
      "Notes from student life, Thylo and projects — things I've actually learned, not generic advice from the internet.",
  },
};

/** Article cards — edit title/description/tag for each language */
export const articles: ArticleItem[] = [
  {
    kind: "thought",
    title: {
      no: "Kode mellom forelesninger",
      en: "Coding between lectures",
    },
    description: {
      no: "Mye av det jeg bygger skjer i kveldstimer og i helger. Som CTO i Thylo og student på NTNU har jeg lært at små, hyppige leveranser slår perfekt planlegging — medgründeren min og brukerne våre gir meg bedre retning enn noen bloggpost.",
      en: "Most of what I build happens in the evenings and on weekends. As CTO of Thylo and an NTNU student, I've learned that small, frequent releases beat perfect planning — my co-founder and our users steer me better than any blog post.",
    },
    tag: { no: "Tanker", en: "Thoughts" },
  },
  {
    kind: "article",
    title: {
      no: "Helsedata endrer hvordan jeg tenker",
      en: "Health data changed how I think",
    },
    description: {
      no: "Thylo startet fordi vi brydde oss om problemet — ikke for å fylle en CV. Når data faktisk betyr noe for folk, tenker jeg RLS, logging og feilhåndtering før jeg tenker på animasjoner. Det har gjort meg bedre på alt annet jeg bygger også.",
      en: "Thylo started because we cared about the problem — not to pad a CV. When data actually matters to people, I think about RLS, logging and error handling before I think about animations. That's made me better at everything else I build too.",
    },
    tag: { no: "Artikkel", en: "Article" },
  },
  {
    kind: "link",
    title: {
      no: "GitHub — der eksperimentene bor",
      en: "GitHub — where experiments live",
    },
    description: {
      no: "Det meste her er uferdig med vilje: scripts fra CTF-er, prototypes som døde etter to netter, og ting jeg bare måtte ta fra hverandre for å forstå. Porteføljen viser det polerte — GitHub viser hvordan jeg faktisk lærer.",
      en: "Most of it is intentionally unfinished: CTF scripts, prototypes that died after two nights, and things I had to take apart just to understand. The portfolio shows the polished stuff — GitHub shows how I actually learn.",
    },
    href: "https://github.com/birkjr",
    tag: { no: "Lenke", en: "Link" },
  },
  {
    kind: "thought",
    title: {
      no: "Stack valgt av tid, ikke hype",
      en: "Stack chosen by time, not hype",
    },
    description: {
      no: "React Native og Supabase i Thylo fordi vi måtte shippe fort. Next.js i Teknologiporten fordi hele teamet kunne bidra. BigQuery og MCP hos Disruptive Technologies fordi sensordata krevde det. Jeg velger verktøy ut fra hva som lar meg levere — ikke hva som trendet den uken.",
      en: "React Native and Supabase at Thylo because we had to ship fast. Next.js at Teknologiporten because the whole team could contribute. BigQuery and MCP at Disruptive Technologies because sensor data demanded it. I pick tools based on what lets me deliver — not what trended that week.",
    },
    tag: { no: "Workflow", en: "Workflow" },
  },
];
