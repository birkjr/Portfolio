"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  MessageCircleQuestion,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  JOURNAL_INITIAL_VISIBLE,
  JOURNAL_LOAD_MORE,
  journalSection,
  journal,
} from "@/content/journal";
import { getJournalSlugFromHash } from "@/content/timeline";

export function Journal() {
  const { language } = useLanguage();
  const t = journalSection[language];
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleCountsByFilter, setVisibleCountsByFilter] = useState<
    Record<string, number>
  >({});

  const filterKey = `${language}:${activeTag ?? "all"}`;
  const visibleCount =
    visibleCountsByFilter[filterKey] ?? JOURNAL_INITIAL_VISIBLE;

  const tags = useMemo(
    () => [...new Set(journal.map((item) => item.tag[language]))],
    [language]
  );

  const filteredJournal = useMemo(
    () =>
      activeTag === null
        ? journal
        : journal.filter((item) => item.tag[language] === activeTag),
    [activeTag, language]
  );

  const visibleJournal = filteredJournal.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJournal.length;
  const canCollapse = visibleCount > JOURNAL_INITIAL_VISIBLE;

  const closeArticle = () => {
    setSelectedSlug(null);
    if (window.location.hash.startsWith("#journal-")) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      );
    }
  };

  useEffect(() => {
    const openFromHash = () => {
      const slug = getJournalSlugFromHash(window.location.hash);
      if (slug && journal.some((item) => item.slug === slug)) {
        setSelectedSlug(slug);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => {
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  useEffect(() => {
    if (selectedSlug === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeArticle();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedSlug]);

  const selectedItem =
    journal.find((item) => item.slug === selectedSlug) ?? null;
  const isModalOpen = selectedSlug !== null;

  const openArticle = (slug: string) => setSelectedSlug(slug);

  const modal =
    selectedItem && typeof document !== "undefined"
      ? createPortal(
          <>
            <button
              type="button"
              className="fixed inset-0 z-[100] cursor-default bg-black/20 dark:bg-black/40"
              onClick={closeArticle}
              aria-label="Close"
            />
            <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4">
              <Card
                className="card-gradient-bg pointer-events-auto relative flex max-h-[min(75vh,36rem)] w-full max-w-7xl animate-fade-in flex-col overflow-hidden border-2 border-border text-left shadow-[0_20px_60px_rgba(15,23,42,0.45)] dark:border-slate-800/50 dark:backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeArticle}
                  className="absolute right-3 top-3 z-10 rounded-full bg-slate-900/70 p-1.5 text-white/80 transition-colors hover:bg-slate-800 hover:text-white dark:bg-slate-800/70 dark:hover:bg-slate-700"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <CardHeader className="shrink-0 space-y-2 px-5 pb-2 pt-5 pr-12 sm:px-6 sm:pt-6">
                  <Badge variant="outline" className="w-fit text-xs">
                    {selectedItem.tag[language]}
                  </Badge>
                  <CardTitle className="text-lg font-semibold leading-snug sm:text-xl">
                    {selectedItem.question[language]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                  <div className="columns-1 gap-x-8 md:columns-2 md:gap-x-10">
                    {selectedItem.paragraphs[language].map(
                      (paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="mb-2.5 break-inside-avoid text-sm leading-snug text-muted-foreground sm:text-[0.9375rem]"
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
    <SectionContainer id="journal">
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

          <div className="mb-5 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === null
                  ? "border-foreground/30 bg-foreground text-background"
                  : "border-border bg-card/40 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
              }`}
            >
              {t.filterAll}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? "border-foreground/30 bg-foreground text-background"
                    : "border-border bg-card/40 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <ul className="space-y-3">
            {visibleJournal.map((item) => {
              const question = item.question[language];
              const teaser = item.paragraphs[language][0];
              const tag = item.tag[language];

              return (
                <li key={item.slug}>
                  <Card
                    role="button"
                    tabIndex={isModalOpen ? -1 : 0}
                    onClick={() => openArticle(item.slug)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openArticle(item.slug);
                      }
                    }}
                    className="group cursor-pointer rounded-2xl border-2 border-border/60 card-gradient-bg transition-all duration-300 hover:-translate-y-0.5 hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <CardContent className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted/50">
                        <MessageCircleQuestion className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold leading-snug transition-colors group-hover:text-foreground/90 sm:text-lg">
                          {question}
                        </h3>
                        <p className="mt-2 line-clamp-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {teaser}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                          {t.readAnswer}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>

          {(hasMore || canCollapse) && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {hasMore && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setVisibleCountsByFilter((prev) => ({
                      ...prev,
                      [filterKey]: visibleCount + JOURNAL_LOAD_MORE,
                    }))
                  }
                  className="gap-2"
                >
                  {t.showMore}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              )}
              {canCollapse && (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setVisibleCountsByFilter((prev) => ({
                      ...prev,
                      [filterKey]: JOURNAL_INITIAL_VISIBLE,
                    }))
                  }
                  className="gap-2 text-muted-foreground"
                >
                  {t.showLess}
                  <ChevronUp className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {modal}
      </div>
    </SectionContainer>
  );
}
