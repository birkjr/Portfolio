"use client";

import { ArrowUpRight, FileText, Link2, PenLine } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ArticleKind = "thought" | "article" | "link";

interface ArticleItem {
  kind: ArticleKind;
  title: { no: string; en: string };
  description: { no: string; en: string };
  href?: string;
  tag: { no: string; en: string };
}

const articles: ArticleItem[] = [
  {
    kind: "thought",
    title: {
      no: "Hvordan jeg jobber",
      en: "How I work",
    },
    description: {
      no: "Jeg starter med å forstå problemet, skisserer en enkel struktur, bygger en tynn vertikal slice og itererer med ekte feedback. Lite pynt, mye substans.",
      en: "I start by understanding the problem, sketch a simple structure, build a thin vertical slice and iterate with real feedback. Less polish upfront, more substance.",
    },
    tag: { no: "Tanker", en: "Thoughts" },
  },
  {
    kind: "article",
    title: {
      no: "Fra idé til produksjon",
      en: "From idea to production",
    },
    description: {
      no: "Notater om hvordan jeg strukturerer prosjekter: tydelige domener, enkle grenser mellom frontend og backend, og verktøy som holder tempoet oppe.",
      en: "Notes on how I structure projects: clear domains, simple boundaries between frontend and backend, and tools that keep momentum high.",
    },
    tag: { no: "Artikkel", en: "Article" },
  },
  {
    kind: "link",
    title: {
      no: "GitHub — kode og eksperimenter",
      en: "GitHub — code and experiments",
    },
    description: {
      no: "Prosjekter, scripts og små verktøy jeg bygger underveis. Ofte der nye idéer starter.",
      en: "Projects, scripts and small tools I build along the way. Often where new ideas start.",
    },
    href: "https://github.com/birkjr",
    tag: { no: "Lenke", en: "Link" },
  },
  {
    kind: "link",
    title: {
      no: "Stack og verktøy",
      en: "Stack and tooling",
    },
    description: {
      no: "TypeScript, React, Next.js, Supabase og Cursor i hverdagen. Jeg foretrekker få, gjennomtenkte valg fremfor mange halvbrukte verktøy.",
      en: "TypeScript, React, Next.js, Supabase and Cursor day to day. I prefer a few deliberate choices over many half-used tools.",
    },
    tag: { no: "Workflow", en: "Workflow" },
  },
];

const sectionContent = {
  no: {
    label: "Artikler",
    title: "Artikler og tanker",
    subtitle:
      "Korte notater om hvordan jeg tenker, jobber og bygger — pluss lenker jeg liker.",
  },
  en: {
    label: "Articles",
    title: "Articles and thoughts",
    subtitle:
      "Short notes on how I think, work and build — plus links I find useful.",
  },
};

const kindIcon: Record<ArticleKind, typeof PenLine> = {
  thought: PenLine,
  article: FileText,
  link: Link2,
};

export function Articles() {
  const { language } = useLanguage();
  const t = sectionContent[language];

  return (
    <SectionContainer id="articles">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {articles.map((item, index) => {
            const Icon = kindIcon[item.kind];
            const title = item.title[language];
            const description = item.description[language];
            const tag = item.tag[language];

            const inner = (
              <Card className="group h-full border-2 border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 card-gradient-bg">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 rounded-xl bg-foreground/85 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-background" />
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold pt-2 group-hover:text-foreground transition-colors">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardHeader>
                {item.href && (
                  <CardContent className="pt-0">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
                      {language === "no" ? "Åpne" : "Open"}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                )}
              </Card>
            );

            if (item.href) {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {inner}
                </a>
              );
            }

            return <div key={index}>{inner}</div>;
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
