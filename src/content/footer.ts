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
    subtitle: "Er min profil spennende eller har du noe spørsmål? Kontakt meg!",
    cardTitle: "Send meg en melding",
    cardDescription: "Jeg svarer alltid kjapt.",
    cta: "Send melding",
  },
  en: {
    title: "Contact me",
    subtitle:
      "Is my profile interesting or do you have any questions? Contact me!",
    cardTitle: "Send me a message",
    cardDescription: "I always reply fast.",
    cta: "Send message",
  },
};
