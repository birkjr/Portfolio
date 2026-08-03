import type { Localized } from "./types";

export const hero: Localized<{
  info: string;
  role: string;
  greeting: string;
  name: string;
  description: string;
  location: string;
  born: string;
  cta: string;
  ctaSecondary: string;
  tags: string[];
}> = {
  no: {
    info: "Din rolle eller tagline",
    role: "Full-Stack Developer",
    greeting: "Hei, jeg er",
    name: "__AUTHOR_NAME__",
    description: "Kort beskrivelse av hvem du er og hva du jobber med.",
    location: "By, Land",
    born: "Fødselsdato",
    cta: "Les journalen min",
    ctaSecondary: "Kontakt meg",
    tags: ["Eksempel-tag", "Portefølje", "Next.js"],
  },
  en: {
    info: "Your role or tagline",
    role: "Full-Stack Developer",
    greeting: "Hello, I'm",
    name: "__AUTHOR_NAME__",
    description: "Short description of who you are and what you work with.",
    location: "City, Country",
    born: "Date of birth",
    cta: "Read my journal",
    ctaSecondary: "Get in Touch",
    tags: ["Example tag", "Portfolio", "Next.js"],
  },
};
