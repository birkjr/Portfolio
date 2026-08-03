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
      "Eksempelkort — trykk for å lese hvorfor. Erstatt med teknologi du faktisk bruker.",
    whyHeading: "Hvorfor dette?",
  },
  en: {
    label: "Tech Stack",
    title: "Technologies I build with",
    subtitle:
      "Example cards — click to read why. Replace with tech you actually use.",
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

export const techItems: TechItemEntry[] = [
  {
    name: "React",
    group: { no: "Frontend", en: "Frontend" },
    why: {
      no: "Eksempel: React er et UI-bibliotek for komponenter og state. Beskriv hvorfor du bruker det i dine prosjekter.",
      en: "Example: React is a UI library for components and state. Describe why you use it in your projects.",
    },
    iconType: "image",
    imageSrc: "/Icons/react.jpeg",
  },
  {
    name: "Next.js",
    group: { no: "Frontend", en: "Frontend" },
    why: {
      no: "Eksempel: Next.js legger til routing, SSR og deploy oppå React — godt for offentlige nettsider.",
      en: "Example: Next.js adds routing, SSR and deployment on top of React — great for public websites.",
    },
    iconType: "image",
    imageSrc: "/Icons/nextjs.jpeg",
  },
  {
    name: "TypeScript",
    group: { no: "Språk", en: "Language" },
    why: {
      no: "Eksempel: TypeScript gir typer og bedre IDE-støtte. Skriv din egen grunn her.",
      en: "Example: TypeScript gives you types and better IDE support. Write your own reason here.",
    },
    iconType: "image",
    imageSrc: "/Icons/typescriptv2.png",
  },
  {
    name: "Tailwind CSS",
    group: { no: "Styling", en: "Styling" },
    why: {
      no: "Eksempel: Tailwind lar deg style raskt med utility-klasser. Erstatt med din erfaring.",
      en: "Example: Tailwind lets you style quickly with utility classes. Replace with your experience.",
    },
    iconType: "image",
    imageSrc: "/Icons/tailwindv2.png",
  },
  {
    name: "Python",
    group: { no: "Backend / AI", en: "Backend / AI" },
    why: {
      no: "Eksempel: Python for backend, scripts eller data. Tilpass teksten til det du faktisk gjør.",
      en: "Example: Python for backend, scripts or data. Adapt the text to what you actually do.",
    },
    iconType: "image",
    imageSrc: "/Icons/python.jpeg",
  },
  {
    name: "Node.js",
    group: { no: "Backend", en: "Backend" },
    why: {
      no: "Eksempel: Node.js når du vil bruke JavaScript/TypeScript på serveren også.",
      en: "Example: Node.js when you want to use JavaScript/TypeScript on the server too.",
    },
    iconType: "image",
    imageSrc: "/Icons/nodejs.png",
  },
  {
    name: "Docker",
    group: { no: "Infrastruktur", en: "Infrastructure" },
    why: {
      no: "Eksempel: Docker for containere og reproducerbare miljøer. Skriv din egen bruk her.",
      en: "Example: Docker for containers and reproducible environments. Write your own usage here.",
    },
    iconType: "image",
    imageSrc: "/Icons/docker_1.png",
  },
  {
    name: "Kubernetes",
    group: { no: "Infrastruktur", en: "Infrastructure" },
    why: {
      no: "Eksempel: Kubernetes for orchestration av containere i større oppsett.",
      en: "Example: Kubernetes for orchestrating containers in larger setups.",
    },
    iconType: "image",
    imageSrc: "/Icons/kubernetes.webp",
  },
  {
    name: "GitHub",
    group: { no: "Samarbeid", en: "Collaboration" },
    why: {
      no: "Eksempel: Versjonskontroll, PR-er og samarbeid. Beskriv hvordan du bruker det.",
      en: "Example: Version control, PRs and collaboration. Describe how you use it.",
    },
    iconType: "image",
    imageSrc: "/Icons/github.jpeg",
  },
  {
    name: "Cursor",
    group: { no: "IDE", en: "IDE" },
    why: {
      no: "Eksempel: Cursor som IDE med AI-assistanse. Erstatt med verktøyene du faktisk bruker.",
      en: "Example: Cursor as an IDE with AI assistance. Replace with the tools you actually use.",
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
