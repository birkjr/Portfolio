import type { Localized } from "./types";

export const about: Localized<{
  label: string;
  title: string;
  paragraphs: string[];
}> = {
  no: {
    label: "Om meg",
    title: "Kort om meg",
    paragraphs: [
      "Skriv noen setninger om deg selv her. Hva liker du å jobbe med? Hva er du nysgjerrig på?",
      "Dette er et eksempelavsnitt — erstatt teksten med din egen historie, motivasjon og det som gjør deg unik som utvikler.",
      "Tips: hold det kort og personlig. Porteføljen skal gi et inntrykk, ikke være en CV i prose.",
    ],
  },
  en: {
    label: "About",
    title: "Short about me",
    paragraphs: [
      "Write a few sentences about yourself here. What do you enjoy working on? What are you curious about?",
      "This is example copy — replace it with your own story, motivation and what makes you unique as a developer.",
      "Tip: keep it short and personal. The portfolio should give an impression, not read like a full CV.",
    ],
  },
};
