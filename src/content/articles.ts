import type { Localized } from "./types";

export interface ArticleItem {
  question: { no: string; en: string };
  paragraphs: { no: string[]; en: string[] };
  tag: { no: string; en: string };
}

/** Section headings for the Articles block */
export const articlesSection: Localized<{
  label: string;
  title: string;
  subtitle: string;
  readAnswer: string;
}> = {
  no: {
    label: "Artikler",
    title: "Deler noen av mine tanker og erfaringer",
    subtitle:
      "Selv om jeg er langt fra noe ekspert, så er dette noe av de tingene jeg tenker mye på og tror andre vil finne interessant.",
    readAnswer: "Les svar",
  },
  en: {
    label: "Articles",
    title: "Shares some of my thoughts and experiences",
    subtitle:
      "Even though I'm far from being an expert, these are some of the things I think about and I think others will find interesting.",
    readAnswer: "Read answer",
  },
};

export const articles: ArticleItem[] = [
  {
    question: {
      no: "Var ventelisten vår en feil?",
      en: "Was our waitlist a mistake?",
    },
    paragraphs: {
      no: [
        "Jeg trodde en stor venteliste var et tegn på at vi gjorde noe riktig. På en måte var det det. På en annen måte ble den nesten grunnen til at vi ikke lanserte.",
        "Da vi åpnet ventelisten til Thylo Insight var målet enkelt: finne ut om noen faktisk ville ha produktet vi brukte all fritiden vår på å bygge.",
        "Over 1000 personer meldte seg på.",
        "Det var utrolig motiverende.",
        "Men så skjedde noe jeg ikke hadde forventet.",
        "Jo flere som sto på ventelisten, desto mer redd ble jeg for å lansere.",
        "Plutselig føltes det som om versjon 1 måtte være perfekt. Vi hadde jo «1000 mennesker som ventet». Hver eneste bug føltes som en katastrofe, og hver eneste funksjon måtte være gjennomtenkt.",
        "Sett i ettertid tror jeg vi stilte helt feil spørsmål.",
        "Ikke: «Er produktet perfekt?»",
        "Men: «Lærer vi noe nytt ved å vente én måned til?»",
        "Svaret var som regel nei.",
        "Den største feilen var derfor ikke at vi lagde en venteliste.",
        "Det var at vi lot størrelsen på ventelisten bestemme når vi skulle lansere.",
        "Hvis jeg skulle gjort det igjen, ville jeg kanskje sluppet inn 20 brukere. Så 100. Så 500.",
        "Produktet hadde sannsynligvis vært mye bedre i dag.",
      ],
      en: [
        "I thought a big waitlist meant we were doing something right. In a way, we were. In another way, it almost became the reason we didn't launch.",
        "When we opened the waitlist for Thylo Insight, the goal was simple: find out if anyone actually wanted the product we were spending all our free time building.",
        "Over 1000 people signed up.",
        "That was incredibly motivating.",
        "But then something happened I didn't expect.",
        "The more people on the waitlist, the more afraid I became to launch.",
        'Suddenly it felt like version 1 had to be perfect. We had "1000 people waiting". Every bug felt like a disaster, and every feature had to be fully thought through.',
        "In hindsight, I think we were asking completely the wrong question.",
        'Not: "Is the product perfect?"',
        'But: "Will we learn anything new by waiting one more month?"',
        "The answer was usually no.",
        "So the biggest mistake wasn't creating a waitlist.",
        "It was letting the size of the waitlist decide when we should launch.",
        "If I did it again, I'd maybe let in 20 users. Then 100. Then 500.",
        "The product would probably be much better today.",
      ],
    },
    tag: { no: "Thylo", en: "Thylo" },
  },
  {
    question: {
      no: "Når bør man faktisk ikke bruke AI?",
      en: "When should you actually not use AI?",
    },
    paragraphs: {
      no: [
        "Dette er kanskje spørsmålet jeg får oftest.",
        "Og jeg tror mange diskuterer det feil.",
        "Det handler ikke om AI er «bra» eller «dårlig».",
        "Det handler om hva du prøver å lære.",
        "Hvis AI kan spare meg fem timer med å skrive en SQL-query jeg allerede forstår, bruker jeg AI. Hver gang.",
        "Hvis AI kan forklare et nytt API på fem minutter i stedet for at jeg bruker en hel kveld på dokumentasjonen, bruker jeg AI.",
        "Men…",
        "Hvis jeg lar AI løse et problem jeg ikke forstår, har jeg egentlig bare utsatt problemet.",
        "Jeg merker det veldig godt når jeg programmerer.",
        "De dagene jeg kopierer kode uten å forstå den, mister jeg motivasjonen ganske fort. Jeg føler egentlig bare at jeg sitter og limer inn tekst.",
        "De dagene jeg bruker AI som en sparringspartner, lærer jeg ekstremt mye.",
        "For meg har forskjellen blitt:",
        "Bruk AI til å spare tid.",
        "Ikke bruk AI til å spare forståelse.",
        "Jeg er langt fra noen fasit på dette. Jeg prøver fortsatt å finne balansen selv.",
      ],
      en: [
        "This is probably the question I get most often.",
        "And I think a lot of people discuss it the wrong way.",
        'It\'s not about whether AI is "good" or "bad".',
        "It's about what you're trying to learn.",
        "If AI can save me five hours writing a SQL query I already understand, I use AI. Every time.",
        "If AI can explain a new API in five minutes instead of me spending a whole evening on the docs, I use AI.",
        "But…",
        "If I let AI solve a problem I don't understand, I've really just postponed the problem.",
        "I notice it clearly when I'm programming.",
        "On the days I copy code without understanding it, I lose motivation pretty quickly. It just feels like I'm pasting text.",
        "On the days I use AI as a sparring partner, I learn a huge amount.",
        "For me, the difference has become:",
        "Use AI to save time.",
        "Don't use AI to skip understanding.",
        "I'm far from having the final answer on this. I'm still trying to find the balance myself.",
      ],
    },
    tag: { no: "AI", en: "AI" },
  },
  {
    question: {
      no: "Er karakterer eller erfaring viktigst i 2026?",
      en: "Are grades or experience more important in 2026?",
    },
    paragraphs: {
      no: [
        "Jeg tenker overraskende mye på dette.",
        "På videregående var planen enkel: få gode karakterer, kom inn på drømmestudiet.",
        "Det fungerte.",
        "Men etter at jeg begynte på NTNU begynte jeg å lure på om karakterer alene faktisk var det som tok meg dit jeg ønsket.",
        "Jeg leste LinkedIn-profiler. Jeg så hvem som fikk jobbene jeg syntes virket spennende. Jeg leste intervjuer.",
        "Og én ting gikk igjen: de fleste hadde bygget noe.",
        "De hadde startet prosjekter. Hatt tekniske verv. Bidragt til open source. Bygget porteføljer.",
        "Det gjorde at jeg begynte å prioritere annerledes.",
        "Jeg ønsket fortsatt å gjøre det bra på studiet. Men jeg ville heller bruke tid på å bygge ting jeg var stolt av enn å bruke hver kveld på å hente de siste poengene på en eksamen.",
        "Det valget har både hjulpet og kostet.",
        "Jeg har mistet muligheter fordi noen arbeidsgivere kun så på karakterutskriften.",
        "Samtidig har jeg fått muligheter jeg aldri ville fått uten prosjektene jeg bygget ved siden av.",
        "Jeg tror derfor ikke spørsmålet er: er erfaring viktigere enn karakterer?",
        "Jeg tror spørsmålet er: hvilke dører ønsker du å åpne?",
        "For noen er karakterer den raskeste veien. For meg har det vært å bygge ting.",
      ],
      en: [
        "I think about this more than you'd expect.",
        "In high school the plan was simple: get good grades, get into my dream programme.",
        "It worked.",
        "But after starting at NTNU, I began wondering whether grades alone would actually get me where I wanted to go.",
        "I read LinkedIn profiles. I looked at who got the jobs that seemed exciting. I read interviews.",
        "And one thing kept coming up: most of them had built something.",
        "They'd started projects. Held technical roles in student orgs. Contributed to open source. Built portfolios.",
        "That made me start prioritising differently.",
        "I still wanted to do well at university. But I'd rather spend time building things I was proud of than every evening chasing the last points on an exam.",
        "That choice has both helped and cost me.",
        "I've missed opportunities because some employers only looked at the transcript.",
        "At the same time, I've gotten opportunities I never would have without the projects I built on the side.",
        "So I don't think the question is: is experience more important than grades?",
        "I think the question is: which doors do you want to open?",
        "For some people, grades are the fastest path. For me, it's been building things.",
      ],
    },
    tag: { no: "Studieliv", en: "Student life" },
  },
];
