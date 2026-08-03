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
      "Techstacken jeg alltid vurderer i prosjekene mine.\n  Gjerne trykk på dem for å lese mine erfaringer med dem.",
    whyHeading: "Hvorfor dette?",
  },
  en: {
    label: "Tech Stack",
    title: "Technologies I build with",
    subtitle:
      "Techstack I always consider in my projects.\n— Please click a card to read my experiences with them.",
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
      no: "React er fortsatt frontend-verktøyet jeg trives best med. Det får meg til å tenke i små, gjenbrukbare komponenter i stedet for hele sider. Jeg har brukt det i Thylo Insight, Teknologiporten og EMIL-Link, og selv om React alene sjelden er nok for prosjektene jeg bygger i dag, er det fortsatt fundamentet alt annet bygges på.",
      en: "React is still the frontend tool I enjoy working with the most. It gets me thinking in small, reusable components instead of whole pages. I've used it in Thylo Insight, Teknologiporten and EMIL-Link, and while React alone is rarely enough for the projects I build today, it's still the foundation everything else is built on.",
    },
    iconType: "image",
    imageSrc: "/Icons/react.jpeg",
  },
  {
    name: "Next.js",
    group: { no: "Frontend", en: "Frontend" },
    why: {
      no: "Jeg velger nesten alltid Next.js når jeg bygger noe som skal brukes av andre. Routing, server rendering, metadata og deploy er allerede løst, slik at jeg kan fokusere på produktet. Det er også grunnen til at både denne nettsiden, Thylo Insight og Teknologiporten er bygget med Next.js i stedet for ren React.",
      en: "I almost always choose Next.js when building something that will be used by others. Routing, server rendering, metadata and deployment are already solved, so I can focus on the product. That's also why both this website, Thylo Insight and Teknologiporten are built with Next.js instead of plain React.",
    },
    iconType: "image",
    imageSrc: "/Icons/nextjs.jpeg",
  },
  {
    name: "TypeScript",
    group: { no: "Språk", en: "Language" },
    why: {
      no: "Da jeg gikk fra JavaScript til TypeScript føltes det som et stort steg opp i kvalitet. Jeg liker spesielt hvordan typene fungerer som dokumentasjon mens jeg utvikler. Når prosjekter vokser, eller flere utviklere jobber sammen, opplever jeg at TypeScript gjør kodebasen langt enklere å forstå og vedlikeholde.",
      en: "When I switched from JavaScript to TypeScript it felt like a big step up in quality. I especially like how types work as documentation while I'm developing. When projects grow, or multiple developers work together, I experience that TypeScript makes the codebase much easier to understand and maintain.",
    },
    iconType: "image",
    imageSrc: "/Icons/typescriptv2.png",
  },
  {
    name: "Python",
    group: { no: "Backend / AI", en: "Backend / AI" },
    why: {
      no: "Python har blitt språket jeg bruker når backend møter data. Hos Disruptive Technologies jobbet jeg med analyse av sensordata, hos Concentrix med AI, og i Thylo Insight brukes Python blant annet til deler av AI-arbeidet. Jeg skriver fortsatt mest TypeScript, men Python er språket jeg går til når problemet handler mer om data enn web.",
      en: "Python is the language I use when backend meets data. At Disruptive Technologies I worked on data analysis, at Concentrix I did AI work, and in Thylo Insight Python is used for various parts of the AI work. I still write mostly TypeScript, but Python is the language I go to when the problem is more about data than web.",
    },
    iconType: "image",
    imageSrc: "/Icons/python.jpeg",
  },
  {
    name: "Supabase",
    group: { no: "Database", en: "Database" },
    why: {
      no: "Jeg har aldri vært spesielt glad i å skrive SQL. Supabase lot meg komme raskt i gang uten å gi opp kontrollen over databasen. Postgres, autentisering og Row Level Security dekker mye av det jeg trenger i prosjekter som Thylo Insight, samtidig som jeg fortsatt føler at jeg bygger på åpne standarder og ikke et lukket økosystem.",
      en: "I've never been particularly fond of writing SQL. Supabase let me get started quickly without giving up control over the database. Postgres, authentication and Row Level Security cover a lot of what I need in projects like Thylo Insight, while I still feel like I'm building on open standards and not a closed ecosystem.",
    },
    iconType: "image",
    imageSrc: "/Icons/supabasev2.png",
  },
  {
    name: "Docker",
    group: { no: "Infrastruktur", en: "Infrastructure" },
    why: {
      no: "Docker har blitt en naturlig del av hvordan jeg utvikler og distribuerer programvare. Jeg bruker det til å skape konsistente utviklingsmiljøer og gjøre applikasjoner enklere å flytte mellom lokal utvikling og produksjon. Jeg ser på Docker som et grunnleggende verktøy i moderne backend-utvikling, og noe jeg ønsker å bruke som standard i prosjektene mine fremover.",
      en: "Docker has become a natural part of how I develop and distribute software. I use it to create consistent development environments and make applications easier to move between local development and production. I see Docker as a fundamental tool in modern backend development, and something I want to use as standard in my projects going forward.",
    },
    iconType: "image",
    imageSrc: "/Icons/docker_1.png",
  },
  {
    name: "Kubernetes",
    group: { no: "Infrastruktur", en: "Infrastructure" },
    why: {
      no: "Kubernetes er et område jeg aktivt holder på å lære. Jeg har valgt å vente med å ta det i bruk til prosjektene mine faktisk har behov for det, i stedet for å introdusere unødvendig kompleksitet for tidlig. Planen er å bruke Kubernetes når Thylo vokser til flere tjenester og deployeringen blir mer kompleks. Målet mitt er ikke bare å kunne bruke Kubernetes, men å forstå hvilke problemer det løser og når det faktisk er riktig verktøy.",
      en: "Kubernetes is an area I actively learn about. I've chosen to wait until my projects actually need it, instead of introducing unnecessary complexity too early. The plan is to use Kubernetes when Thylo grows to multiple services and deployment becomes more complex. My goal is not just to be able to use Kubernetes, but to understand what problems it solves and when it's actually the right tool.",
    },
    iconType: "image",
    imageSrc: "/Icons/kubernetes.webp",
  },
  {
    name: "PostgreSQL",
    group: { no: "Database", en: "Database" },
    why: {
      no: "PostgreSQL er det databaseverktøyet jeg har brukt mest. Det er et robust, ope kildekode-basert verktøy som lar meg bygge skalerbare og fleksible databaser. Jeg har brukt det i Thylo Insight, Teknologiporten og EMIL-Link, og det har hjulpet meg å løse komplekse problemer med datamodellering og skalering.",
      en: "PostgreSQL is the database tool I've used the most. It's a robust, open-source-based tool that allows me to build scalable and flexible databases. I've used it in Thylo Insight, Teknologiporten and EMIL-Link, and it has helped me solve complex problems with data modeling and scaling.",
    },
    iconType: "image",
    imageSrc: "/Icons/postgresql.jpeg",
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
