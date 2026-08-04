"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, MessageCircleQuestion, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "@/components/animations/SectionContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { journalSection, journal } from "@/content/journal";
import { getJournalSlugFromHash } from "@/content/timeline";
import { computeJournalCardMotion } from "@/lib/scroll-presence";
import { cn, prefersReducedMotion } from "@/lib/utils";

function JournalArticleCard({
  item,
  language,
  readAnswerLabel,
  isModalOpen,
  onOpen,
  liRef,
}: {
  item: (typeof journal)[number];
  language: "no" | "en";
  readAnswerLabel: string;
  isModalOpen: boolean;
  onOpen: (slug: string) => void;
  liRef: (el: HTMLLIElement | null) => void;
}) {
  const question = item.question[language];
  const teaser = item.paragraphs[language][0];
  const tag = item.tag[language];

  return (
    <li ref={liRef}>
      <Card
        data-journal-card
        role="button"
        tabIndex={isModalOpen ? -1 : 0}
        onClick={() => onOpen(item.slug)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen(item.slug);
          }
        }}
        className="group journal-card journal-card--scroll-driven"
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
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const updateJournalCards = useCallback(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const reducedMotion = prefersReducedMotion();
    const viewportHeight = window.innerHeight;

    nodes.forEach((node) => {
      const card = node.querySelector<HTMLElement>("[data-journal-card]");
      if (!card) return;

      if (reducedMotion) {
        card.style.opacity = "";
        card.style.transform = "";
        return;
      }

      const rect = node.getBoundingClientRect();
      const { translateX, opacity } = computeJournalCardMotion(
        rect,
        viewportHeight
      );

      card.style.opacity = opacity.toFixed(3);
      card.style.transform = `translateX(${translateX.toFixed(2)}px)`;
    });
  }, []);

  useEffect(() => {
    let frame = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateJournalCards);
    };

    frame = requestAnimationFrame(() => {
      requestAnimationFrame(scheduleUpdate);
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateJournalCards]);

  useEffect(() => {
    const frame = requestAnimationFrame(updateJournalCards);
    return () => cancelAnimationFrame(frame);
  }, [language, updateJournalCards]);

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
    <SectionContainer id="journal" motion="none">
      <div className={cn("page-body", isModalOpen && "page-body--blurred")}>
        <div className="page-header">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="page-title">{t.title}</h2>
          <p className="page-subtitle">{t.subtitle}</p>
        </div>

        <ul className="journal-list">
          {journal.map((item, index) => (
            <JournalArticleCard
              key={item.slug}
              item={item}
              language={language}
              readAnswerLabel={t.readAnswer}
              isModalOpen={isModalOpen}
              onOpen={openArticle}
              liRef={(el) => {
                itemRefs.current[index] = el;
              }}
            />
          ))}
        </ul>
      </div>

      {modal}
    </SectionContainer>
  );
}
