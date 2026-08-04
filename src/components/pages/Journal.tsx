"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  MessageCircleQuestion,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "@/components/animations/SectionContainer";
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
import { cn, prefersReducedMotion } from "@/lib/utils";

function JournalArticleCard({
  item,
  index,
  language,
  readAnswerLabel,
  isModalOpen,
  animationKey,
  onOpen,
}: {
  item: (typeof journal)[number];
  index: number;
  language: "no" | "en";
  readAnswerLabel: string;
  isModalOpen: boolean;
  animationKey: string;
  onOpen: (slug: string) => void;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);

    if (prefersReducedMotion()) {
      setEntered(true);
      return;
    }

    const node = liRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [item.slug, animationKey]);

  const question = item.question[language];
  const teaser = item.paragraphs[language][0];
  const tag = item.tag[language];

  return (
    <li ref={liRef}>
      <Card
        role="button"
        tabIndex={isModalOpen ? -1 : 0}
        onClick={() => onOpen(item.slug)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(item.slug);
          }
        }}
        className={cn(
          "group journal-card",
          entered ? "journal-card-slide-in" : "journal-card--hidden"
        )}
        style={
          entered
            ? { animationDelay: `${Math.min(index, 10) * 0.07}s` }
            : undefined
        }
      >
        <CardContent className="journal-card-content">
          <div className="journal-card-icon-wrap">
            <MessageCircleQuestion className="journal-card-icon" />
          </div>
          <div className="journal-card-body">
            <div className="journal-card-tags">
              <Badge variant="secondary" className="text-xs">
                {tag}
              </Badge>
            </div>
            <h3 className="journal-card-question">{question}</h3>
            <p className="journal-card-teaser">{teaser}</p>
            <span className="journal-card-link">
              {readAnswerLabel}
              <ArrowUpRight className="journal-card-link-icon" />
            </span>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}

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
              className="modal-backdrop"
              onClick={closeArticle}
              aria-label="Close"
            />
            <div className="modal-viewport">
              <Card
                className="modal-card-base journal-modal-card animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeArticle}
                  className="modal-close-btn modal-close-btn--sm"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <CardHeader className="journal-modal-header">
                  <Badge variant="outline" className="w-fit text-xs">
                    {selectedItem.tag[language]}
                  </Badge>
                  <CardTitle className="journal-modal-title">
                    {selectedItem.question[language]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="journal-modal-content">
                  <div className="journal-modal-columns">
                    {selectedItem.paragraphs[language].map(
                      (paragraph, pIndex) => (
                        <p key={pIndex} className="journal-modal-paragraph">
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
      <div className={cn("page-body", isModalOpen && "page-body--blurred")}>
        <div className="page-header">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="page-title">{t.title}</h2>
          <p className="page-subtitle">{t.subtitle}</p>
        </div>

        <div className="journal-filters">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              "journal-filter-chip",
              activeTag === null
                ? "journal-filter-chip--active"
                : "journal-filter-chip--inactive"
            )}
          >
            {t.filterAll}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                "journal-filter-chip",
                activeTag === tag
                  ? "journal-filter-chip--active"
                  : "journal-filter-chip--inactive"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <ul className="journal-list">
          {visibleJournal.map((item, index) => (
            <JournalArticleCard
              key={item.slug}
              item={item}
              index={index}
              language={language}
              readAnswerLabel={t.readAnswer}
              isModalOpen={isModalOpen}
              animationKey={filterKey}
              onOpen={openArticle}
            />
          ))}
        </ul>

        {(hasMore || canCollapse) && (
          <div className="journal-pagination">
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
                className="journal-show-less"
              >
                {t.showLess}
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {modal}
    </SectionContainer>
  );
}
