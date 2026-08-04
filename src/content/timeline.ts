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

/** Section headings for the Timeline block */
export const timelineSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
  education: string;
  summerIntern: string;
  work: string;
  whatILearned: string;
  architecture: string;
  github: string;
  demo: string;
  journal: string;
  readJournal: string;
}> = {
  no: {
    label: "Tidslinje",
    title: "Erfaring og prosjekter",
    subtitle: "Utdanning, jobber og det jeg har bygget — kronologisk.",
    education: "Utdanning",
    work: "Erfaring",
    summerIntern: "Sommerintern",
    whatILearned: "Hva lærte jeg?",
    architecture: "Arkitektur",
    github: "GitHub",
    demo: "Nettside",
    journal: "Journal",
    readJournal: "Les journal",
  },
  en: {
    label: "Timeline",
    title: "Experience and projects",
    subtitle: "Education, roles and what I've built — chronological.",
    education: "Education",
    work: "Experience",
    summerIntern: "Summer internship",
    whatILearned: "What did I learn?",
    architecture: "Architecture",
    github: "GitHub",
    demo: "Website",
    journal: "Journal",
    readJournal: "Read journal",
  },
};

/** Timeline entries — edit title/subtitle/description for each language */
export const timelineEntries: TimelineEntry[] = [
  {
    id: "thylo-insight",
    sortKey: 2027,
    period: "2025 – Nå",
    title: { no: "Medgründer og CTO", en: "Co-founder and CTO" },
    subtitle: { no: "Thylo Insight", en: "Thylo Insight" },
    description: {
      no: "En full plattform der vi løser et kompleks problem for en stor klinisk gruppe. Vi gjør innsikt og analyse av stoffskifte-data, og er en assistent for brukere som står fast i en vanskelig situasjon. App og nettside bygget med React Native og Next.js.",
      en: "A full platform where we solve a complex problem for a large clinical group. We make insights and analysis of thyroid data, and are an assistant for users who are stuck in a difficult situation. App and website built with React Native and Next.js.",
    },
    type: "work",
    learnings: {
      no: "Når man sitter med en idé og utvikler et produkt er det ingen fasit på hvordan man skal komme i mål. Det å lære seg å stå alene, uviten og gjenta utallige feil er en stor utfordring, men det er her jeg har lært klart mest på kortest tid..",
      en: "When you're sitting with an idea and developing a product, there's no formula for how to get to the goal. Learning to stand alone, unknown and repeating countless mistakes is a big challenge, but it's here I've learned the most in the shortest time.",
    },
    expandable: {
      architecture: {
        no: "React Native-app mot Supabase og FastAPI-backend. Next.js for markedsføringsside. AI-pipeline (KIM) bygget sammen med medisinsk fagpersonell — teknologi og klinisk modell i samme system.",
        en: "React Native app against Supabase and a FastAPI backend. Next.js for the marketing site. AI pipeline (KIM) built together with medical experts — technology and clinical model in the same system.",
      },
      demo: "https://thyloinsight.no",
      journalSlugs: [
        "waitlist-mistake",
        "thylo-idea-to-product",
        "when-not-to-use-ai",
      ],
    },
  },
  {
    id: "disruptive-technologies",
    sortKey: 2026,
    period: "2026",
    title: { no: "Software Engineer", en: "Software Engineer" },
    subtitle: {
      no: "Disruptive Technologies",
      en: "Disruptive Technologies",
    },
    description: {
      no: "Dataanalyse i BigQuery, utvikling av MCP-server og prediktive funksjoner på sensordata.",
      en: "Data analysis in BigQuery, MCP server development and predictive features on sensor data.",
    },
    type: "summerIntern",
    learnings: {
      no: "Det å jobbe i en scaleup bedrift gjorde meg bevisst på hvor viktig det er å være fleksibel og kreativ når det kommer til problemløsning. Dokumentasjon og kommunikasjon er kritisk for å få det til å fungere.",
      en: "Working in a scaleup company made me aware of how important it is to be flexible and creative when it comes to problem solving. Documentation and communication are critical to make it work.",
    },
  },
  {
    id: "ntnu-cs",
    sortKey: 2025,
    period: "2025 – 2028",
    title: { no: "Datateknologi", en: "Computer Science" },
    subtitle: {
      no: "NTNU — 5-årig master",
      en: "NTNU — 5-year master's",
    },
    description: {
      no: "Integrert master med fokus på programvareutvikling, IoT og komplekse IT-systemer.",
      en: "Integrated master's with focus on software development, IoT and complex IT systems.",
    },
    type: "education",
    learnings: {
      no: "Du kan lære mye på egenhånd eller kurs, men det er ingenting som gir meg mer trygghet når jeg utvikler systemer enn en grundig utdanning.",
      en: "You can learn a lot on your own or through courses, but there's nothing that gives me more confidence when I'm developing systems than a thorough education.",
    },
  },
  {
    id: "concentrix",
    sortKey: 2025,
    period: "2025",
    title: {
      no: "AI- og maskinlæringsanalytiker",
      en: "AI and Machine Learning Analyst",
    },
    subtitle: { no: "Concentrix", en: "Concentrix" },
    type: "summerIntern",
    learnings: {
      no: "Jeg lærte hvordan hvordan AI modeller skal testes, forbedres og vedlikeholdes. At kompleksiteten ved AI ikke er kode, men språkdata og restriksjoner. ",
      en: "I learned how to test, improve and maintain AI models. That the complexity of AI isn't code, but language data and restrictions.",
    },
  },
  {
    id: "emil-link",
    sortKey: 2024,
    period: "2024",
    title: { no: "Teamleder markedsføring", en: "Marketing Team Leader" },
    subtitle: { no: "EMIL-Link", en: "EMIL-Link" },
    description: {
      no: "Ledet markedsføringsteam og utviklet organisasjonens nettside.",
      en: "Led marketing team and built the organization's website.",
    },
    type: "work",
    learnings: {
      no: "Dette var det første prosjetet jeg hadde ansvaret for, her gjorde jeg utallige mange feil, noe jeg lærte ekstremt mye av. Det er ikke det stolteste produktet jeg har lansert, men linjeforeningen bruker det fortsatt den dag i dag.",
      en: "This was the first project I had the responsibility for, here I made countless mistakes, something I learned a lot from. It's not the most impressive product I've launched, but the student organization still uses it to this day.",
    },
    expandable: {
      architecture: {
        no: "React-frontend med Supabase som backend. Fokus på enkel innholdsstruktur og rask publisering for et frivillig team uten teknisk bakgrunn.",
        en: "React frontend with Supabase as backend. Focus on simple content structure and fast publishing for a volunteer team without a technical background.",
      },
      demo: "https://www.emil-link.no",
    },
  },
  {
    id: "teknologiporten",
    sortKey: 2023,
    period: "2023 – 2025",
    title: { no: "IT-utvikler", en: "IT Developer" },
    subtitle: { no: "Teknologiporten, NTNU", en: "Teknologiporten, NTNU" },
    description: {
      no: "Offisiell nettside for Teknologiporten — full-stack med React, Next.js og Supabase.",
      en: "Official website for Teknologiporten — full-stack with React, Next.js and Supabase.",
    },
    type: "work",
    learnings: {
      no: "Lansere noe folk faktisk bruker — ikke bare noe som ser bra ut i en demo.",
      en: "Launching something people actually use — not just something that looks good in a demo.",
    },
    expandable: {
      architecture: {
        no: "Next.js med Supabase for auth, innhold og admin. Statisk generering der det gir mening, server actions for dynamisk innhold.",
        en: "Next.js with Supabase for auth, content and admin. Static generation where it makes sense, server actions for dynamic content.",
      },
      demo: "https://tp-nettside.vercel.app/",
      journalSlugs: ["grades-vs-experience", "documenting-how-i-think"],
    },
  },
  {
    id: "ntnu-ikt",
    sortKey: 2023,
    period: "2023 – 2025",
    title: {
      no: "Ingeniørvitenskap og IKT",
      en: "Engineering Science and ICT",
    },
    subtitle: {
      no: "NTNU — Startet studiet",
      en: "NTNU — Started the program",
    },
    type: "education",
    learnings: {
      no: "Jeg forstod at programmering var det jeg virkelig ville jobbe med, og at fysikk og mekanikk ikke nødvendigvis var for meg. Byttet derfor etter 2 år.",
      en: "I understood that programming was what I really wanted to work with, and that physics and mechanics weren't necessarily for me. I therefore switched after 2 years.",
    },
  },
  {
    id: "uio-informatics",
    sortKey: 2022,
    period: "2022 – 2023",
    title: { no: "Informatikk", en: "Informatics" },
    subtitle: {
      no: "UiO — Årsenhet",
      en: "University of Oslo — One-year program",
    },
    type: "education",
    learnings: {
      no: "Mitt første møte med IT og programmering - la grunnlaget for studier jeg søkte neste år. Aldri angret på dette årstudiumet, hadde jeg ikke gått dette hadde jeg nok gått en helt annen studieretning.",
      en: "My first encounter with IT and programming - laid the foundation for the studies I applied for next year. I would never regret this year of studies, had I not gone through it I would have probably chosen a completely different study path.",
    },
  },
  {
    id: "toppidrett",
    sortKey: 2019,
    period: "2019 – 2022",
    title: { no: "Toppidrett fotball", en: "Elite sport football" },
    subtitle: {
      no: "Norges Toppidrettsskole — Stabæk",
      en: "Norwegian College of Elite Sport — Stabæk",
    },
    type: "education",
    learnings: {
      no: "Disiplin og å tåle å gjøre det kjedelige arbeidet hver dag er undervurdert — også i utvikling.",
      en: "Discipline and tolerating boring daily work is underrated — in development too.",
    },
  },
].sort((a, b) => b.sortKey - a.sortKey) as TimelineEntry[];

export function getJournalSlugFromHash(hash: string): string | null {
  if (!hash.startsWith("#journal-")) return null;
  const slug = hash.slice("#journal-".length);
  return slug.length > 0 ? slug : null;
}
