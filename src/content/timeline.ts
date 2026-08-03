import type { Localized } from "./types";

export type TimelineEntryType = "education" | "work" | "summerIntern";

export interface TimelineExpandable {
  images?: { src: string; alt: Localized<string> }[];
  architecture?: Localized<string>;
  github?: string;
  demo?: string;
  articleSlugs?: string[];
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
  readMore: string;
  readLess: string;
  images: string;
  architecture: string;
  github: string;
  demo: string;
  articles: string;
  readArticle: string;
}> = {
  no: {
    label: "Tidslinje",
    title: "Erfaring og prosjekter",
    subtitle: "Utdanning, jobber og det jeg har bygget — kronologisk.",
    education: "Utdanning",
    work: "Erfaring",
    summerIntern: "Sommerintern",
    whatILearned: "Hva lærte jeg?",
    readMore: "Les mer",
    readLess: "Vis mindre",
    images: "Bilder",
    architecture: "Arkitektur",
    github: "GitHub",
    demo: "Nettside",
    articles: "Artikler",
    readArticle: "Les artikkel",
  },
  en: {
    label: "Timeline",
    title: "Experience and projects",
    subtitle: "Education, roles and what I've built — chronological.",
    education: "Education",
    work: "Experience",
    summerIntern: "Summer internship",
    whatILearned: "What did I learn?",
    readMore: "Read more",
    readLess: "Show less",
    images: "Images",
    architecture: "Architecture",
    github: "GitHub",
    demo: "Website",
    articles: "Articles",
    readArticle: "Read article",
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
      no: "Innsikt og analyse av stoffskifte-data. App og nettside bygget med React Native og Next.js.",
      en: "Insights and analysis of thyroid data. App and website built with React Native and Next.js.",
    },
    type: "work",
    learnings: {
      no: "Jeg lærte at den vanskeligste delen av AI ikke er modellen, men å få brukeren til å stole på svaret.",
      en: "I learned that the hardest part of AI isn't the model — it's getting the user to trust the answer.",
    },
    expandable: {
      images: [
        {
          src: "/ThyloInsightv2.png",
          alt: {
            no: "Thylo Insight nettside",
            en: "Thylo Insight website",
          },
        },
      ],
      architecture: {
        no: "React Native-app mot Supabase og FastAPI-backend. Next.js for markedsføringsside. AI-pipeline (KIM) bygget sammen med medisinsk fagpersonell — teknologi og klinisk modell i samme system.",
        en: "React Native app against Supabase and a FastAPI backend. Next.js for the marketing site. AI pipeline (KIM) built together with medical experts — technology and clinical model in the same system.",
      },
      demo: "https://thyloinsight.no",
      articleSlugs: [
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
      no: "Jeg lærte at gode API-er handler minst like mye om dokumentasjon som om kode.",
      en: "I learned that good APIs are at least as much about documentation as they are about code.",
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
      no: "Integrert master med fokus på AI, IoT og komplekse IT-systemer.",
      en: "Integrated master's with focus on AI, IoT and complex IT systems.",
    },
    type: "education",
    learnings: {
      no: "Jeg lærte at bredde slår spesialisering tidlig — det er lettere å gå dypt når du først vet hva som fascinerer deg.",
      en: "I learned that breadth beats specialisation early on — it's easier to go deep once you know what fascinates you.",
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
      no: "Jeg lærte at de fleste AI-prosjekter feiler ikke på modellen, men på datakvalitet og tydelige success-kriterier.",
      en: "Most AI projects don't fail on the model — they fail on data quality and clear success criteria.",
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
      no: "Jeg lærte at teknologi og markedsføring ikke er to verdener — en god nettside er et produkt, ikke bare en brosjyre.",
      en: "I learned that technology and marketing aren't separate worlds — a good website is a product, not just a brochure.",
    },
    expandable: {
      images: [
        {
          src: "/emil_link.png",
          alt: { no: "EMIL-Link nettside", en: "EMIL-Link website" },
        },
      ],
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
      no: "Jeg lærte at det beste studentprosjekter lærer deg er å shippe noe folk faktisk bruker — ikke bare noe som ser bra ut i en demo.",
      en: "The best thing student projects teach you is shipping something people actually use — not just something that looks good in a demo.",
    },
    expandable: {
      images: [
        {
          src: "/teknologiporten_nettside.png",
          alt: {
            no: "Teknologiporten nettside",
            en: "Teknologiporten website",
          },
        },
      ],
      architecture: {
        no: "Next.js med Supabase for auth, innhold og admin. Statisk generering der det gir mening, server actions for dynamisk innhold.",
        en: "Next.js with Supabase for auth, content and admin. Static generation where it makes sense, server actions for dynamic content.",
      },
      demo: "https://tp-nettside.vercel.app/",
      articleSlugs: ["grades-vs-experience", "documenting-how-i-think"],
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
      no: "Jeg lærte at elsket programmering, og at fysikk og mekanikk ikke nødvendigvis var for meg. Byttet derfor etter 2 år.",
      en: "I learned that I loved programming, and that physics and mechanics weren't necessarily for me. I therefore switched after 2 years.",
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
      no: "Jeg lærte at disiplin og å tåle å gjøre det kjedelige arbeidet hver dag er undervurdert — også i utvikling.",
      en: "I learned that discipline and tolerating boring daily work is underrated — in development too.",
    },
  },
].sort((a, b) => b.sortKey - a.sortKey) as TimelineEntry[];

export function getArticleSlugFromHash(hash: string): string | null {
  if (!hash.startsWith("#article-")) return null;
  const slug = hash.slice("#article-".length);
  return slug.length > 0 ? slug : null;
}
