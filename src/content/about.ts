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
      "Jeg elsker å bygge nye ting — kanskje litt for mye, om jeg skal være ærlig. Det hender jeg har et sideprosjekt til sideprosjektet, og så ett til som «bare skal ta en halvtime».",
      "Jeg vokste opp med rundt fem ulike idretter, og lærte tidlig at det er greit å være nybegynner igjen: bytte arena, stille dumme spørsmål, og finne ut underveis hva man faktisk liker.",
      "Det har fulgt meg inn i voksenlivet. Programvareutvikling ble stedet der jeg får kombinere begge deler — bygge noe konkret, samtidig som jeg stadig må lære noe nytt. Jeg er langt fra ferdig, men det er egentlig det som gjør det gøy.",
      "Denne siden blir også brukt til å teste ulike animasjoner, effekter og paletter. Både de ulike prosjektene mine som er lansert og de som er i idéfasen har jeg lagt ved designinspirasjonene i menyen under palette ikonet.",
    ],
  },
  en: {
    label: "About",
    title: "Short about me",
    paragraphs: [
      "I love building new things — maybe a bit too much, if I'm honest. I often end up with a side project for my side project, plus another one that's \"just a quick half hour\".",
      "I grew up doing around five different sports, and learned early that it's okay to be a beginner again: switch arenas, ask silly questions, and figure out along the way what you actually enjoy.",
      "That has stayed with me into adulthood. Software development became the place where I get to combine both — build something concrete while constantly having to learn something new. I'm far from done, but that's kind of what makes it fun.",
      "This page is also used to test different animations, effects and palettes. Both the projects I've launched and the ones I'm working on have their design inspirations listed in the palette menu.",
    ],
  },
};
