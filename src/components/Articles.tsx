"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, MessageCircleQuestion, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { articlesSection, articles } from "@/content/articles";

export function Articles() {
  const { language } = useLanguage();
  const t = articlesSection[language];
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedArticle === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedArticle(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedArticle]);

  const selectedItem =
    selectedArticle !== null ? articles[selectedArticle] : null;
  const isModalOpen = selectedArticle !== null;

  const modal =
    mounted && selectedItem
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[100] cursor-default bg-black/20 dark:bg-black/40"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close"
            />
            <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
              <Card
                className="card-gradient-bg pointer-events-auto relative flex max-h-[min(68vh,28rem)] w-full max-w-md animate-fade-in flex-col overflow-hidden border-2 border-border text-left shadow-[0_20px_60px_rgba(15,23,42,0.45)] dark:border-slate-800/50 dark:backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute right-3 top-3 z-10 rounded-full bg-slate-900/70 p-1.5 text-white/80 transition-colors hover:bg-slate-800 hover:text-white dark:bg-slate-800/70 dark:hover:bg-slate-700"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <CardHeader className="shrink-0 space-y-2 px-5 pb-3 pt-5 pr-11">
                  <Badge variant="outline" className="w-fit text-xs">
                    {selectedItem.tag[language]}
                  </Badge>
                  <CardTitle className="text-base font-semibold leading-snug sm:text-lg">
                    {selectedItem.question[language]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-0">
                  <div className="space-y-2.5">
                    {selectedItem.paragraphs[language].map(
                      (paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <SectionContainer id="articles">
      <div className="relative mx-auto max-w-7xl">
        <div
          className={`transition-[filter] duration-300 ${
            isModalOpen ? "pointer-events-none blur-sm" : ""
          }`}
        >
          <div className="mb-10 text-center">
            <div className="section-badge">
              <div className="section-badge-dot" />
              <span className="section-badge-label">{t.label}</span>
            </div>
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">{t.title}</h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            {articles.map((item, index) => {
              const question = item.question[language];
              const teaser = item.paragraphs[language][0];
              const tag = item.tag[language];

              return (
                <Card
                  key={index}
                  role="button"
                  tabIndex={isModalOpen ? -1 : 0}
                  onClick={() => setSelectedArticle(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedArticle(index);
                    }
                  }}
                  className="group flex h-full cursor-pointer flex-col rounded-2xl border-2 border-border/60 card-gradient-bg transition-all duration-300 hover:-translate-y-1 hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <CardHeader className="flex-1 space-y-3 p-4 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/50">
                        <MessageCircleQuestion className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-semibold leading-snug transition-colors group-hover:text-foreground/90 sm:text-lg">
                      {question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 p-4 pt-0">
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {teaser}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      {t.readAnswer}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {modal}
      </div>
    </SectionContainer>
  );
}
