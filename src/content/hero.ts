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
    info: "Gründer og CTO for Thylo Insight",
    role: "Full-Stack Developer",
    greeting: "Hei, jeg er",
    name: "Birk Jonathan Ramstad",
    description: "Programvareutvikler. Medgründer og CTO for Thylo Insight.",
    location: "Trondheim, Norge",
    born: "5. april 2003",
    cta: "Se tidslinje",
    ctaSecondary: "Kontakt meg",
    tags: ["Programvareutvikler", "Medgründer", "NTNU"],
  },
  en: {
    info: "Founder and CTO of Thylo Insight",
    role: "Full-Stack Developer",
    greeting: "Hello, I'm",
    name: "Birk Jonathan Ramstad",
    description: "Software engineer. Co-founder and CTO of Thylo Insight.",
    location: "Trondheim, Norway",
    born: "April 5th, 2003",
    cta: "View timeline",
    ctaSecondary: "Get in Touch",
    tags: ["Software engineer", "Co-founder", "NTNU"],
  },
};
