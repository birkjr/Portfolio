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
import {
  articlesSection,
  articles,
  type ArticleKind,
} from "@/content/articles";

const kindIcon: Record<ArticleKind, typeof PenLine> = {
  thought: PenLine,
  article: FileText,
  link: Link2,
};

export function Articles() {
  const { language } = useLanguage();
  const t = articlesSection[language];

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
            const isLink = Boolean(item.href);

            const card = (
              <Card
                className={`group h-full border-2 border-border/60 rounded-2xl hover-glow transition-all duration-300 hover:-translate-y-1 card-gradient-bg ${
                  isLink ? "cursor-pointer" : ""
                }`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-muted/50 border border-border/60">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold pt-2 group-hover:text-foreground/90 transition-colors">
                    {title}
                    {isLink && (
                      <ArrowUpRight className="inline-block ml-1 w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            );

            return item.href ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {card}
              </a>
            ) : (
              <div key={index}>{card}</div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
