import type { Localized } from "./types";

export const footer: Localized<{
  title: string;
  subtitle: string;
  cardTitle: string;
  cardDescription: string;
  cta: string;
}> = {
  no: {
    title: "Kontakt meg",
    subtitle: "Har du spørsmål eller vil ta kontakt? Send meg en melding.",
    cardTitle: "Send meg en melding",
    cardDescription: "Erstatt med din egen kontakttekst.",
    cta: "Send melding",
  },
  en: {
    title: "Contact me",
    subtitle: "Have a question or want to get in touch? Send me a message.",
    cardTitle: "Send me a message",
    cardDescription: "Replace with your own contact copy.",
    cta: "Send message",
  },
};
