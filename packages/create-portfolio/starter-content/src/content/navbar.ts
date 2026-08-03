import type { Localized } from "./types";

export interface NavItem {
  name: string;
  href: string;
}

export const navbar: Localized<NavItem[]> = {
  no: [
    { name: "Hjem", href: "#home" },
    { name: "Om meg", href: "#about" },
    { name: "Tidslinje", href: "#timeline" },
    { name: "Journal", href: "#journal" },
    { name: "Techstack", href: "#skills" },
    { name: "Kontakt", href: "#contact" },
  ],
  en: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Timeline", href: "#timeline" },
    { name: "Journal", href: "#journal" },
    { name: "Techstack", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ],
};
