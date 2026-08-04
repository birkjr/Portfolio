"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Github, MessageCircleQuestion } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "@/components/animations/SectionContainer";
import {
  timelineSection,
  timelineEntries,
  type TimelineEntry,
  type TimelineEntryType,
} from "@/content/timeline";
import { journal } from "@/content/journal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, prefersReducedMotion } from "@/lib/utils";

const timelineTypeLabels: Record<
  TimelineEntryType,
  keyof (typeof timelineSection)["no"]
> = {
  education: "education",
  work: "work",
  summerIntern: "summerIntern",
};

function openJournal(slug: string) {
  window.location.hash = `journal-${slug}`;
  document.getElementById("journal")?.scrollIntoView({ behavior: "smooth" });
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="timeline-expand-section-title">{title}</p>
      {children}
    </div>
  );
}

function TimelineCard({
  entry,
  isActive,
}: {
  entry: TimelineEntry;
  isActive: boolean;
}) {
  const { language } = useLanguage();
  const t = timelineSection[language];
  const details = entry.expandable;
  const hasDetails = Boolean(
    details &&
      (details.architecture ||
        details.github ||
        details.demo ||
        details.journalSlugs?.length)
  );

  const linkedJournals =
    details?.journalSlugs
      ?.map((slug) => journal.find((item) => item.slug === slug))
      .filter(Boolean) ?? [];

  return (
    <div
      data-timeline-card
      className={cn(
        "timeline-card",
        isActive ? "timeline-card--active" : "timeline-card--inactive"
      )}
    >
      <div className="timeline-card-inner">
        <header className="timeline-card-header">
          <div className="timeline-card-meta">
            <span className="timeline-card-period">{entry.period}</span>
            <Badge variant="outline" className="timeline-card-type-badge">
              {t[timelineTypeLabels[entry.type]]}
            </Badge>
          </div>

          <h3 className="timeline-card-role">{entry.subtitle[language]}</h3>
          <p className="timeline-card-title">{entry.title[language]}</p>
        </header>

        {entry.description && (
          <p className="timeline-card-description">
            {entry.description[language]}
          </p>
        )}

        {hasDetails && details && (
          <div className="timeline-expand-content">
            {details.architecture && (
              <DetailSection title={t.architecture}>
                <p className="timeline-expand-text">
                  {details.architecture[language]}
                </p>
              </DetailSection>
            )}

            {(details.github || details.demo) && (
              <DetailSection title={details.github ? t.github : t.demo}>
                <div className="timeline-link-actions">
                  {details.github && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="timeline-link-btn"
                      onClick={() => window.open(details.github, "_blank")}
                    >
                      <Github className="timeline-link-btn-icon" />
                      GitHub
                      <ExternalLink className="timeline-link-btn-icon-end" />
                    </Button>
                  )}
                  {details.demo && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="timeline-link-btn"
                      onClick={() => window.open(details.demo, "_blank")}
                    >
                      {t.demo}
                      <ExternalLink className="timeline-link-btn-icon-end" />
                    </Button>
                  )}
                </div>
              </DetailSection>
            )}

            {linkedJournals.length > 0 && (
              <DetailSection title={t.journal}>
                <ul className="timeline-journal-list">
                  {linkedJournals.map((journalItem) => (
                    <li key={journalItem!.slug}>
                      <button
                        type="button"
                        onClick={() => openJournal(journalItem!.slug)}
                        className="group timeline-journal-link"
                      >
                        <MessageCircleQuestion className="timeline-journal-link-icon" />
                        <span className="timeline-journal-link-text">
                          {journalItem!.question[language]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}
          </div>
        )}

        <div className="timeline-learnings">
          <p className="timeline-learnings-label">{t.whatILearned}</p>
          <p className="timeline-learnings-text">{entry.learnings[language]}</p>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  const { language } = useLanguage();
  const t = timelineSection[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const updateActive = useCallback(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const reducedMotion = prefersReducedMotion();
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(itemCenter - viewportCenter);

      if (distanceFromCenter < closestDistance) {
        closestDistance = distanceFromCenter;
        closestIndex = index;
      }

      const card = node.querySelector<HTMLElement>("[data-timeline-card]");
      const dot = node.querySelector<HTMLElement>("[data-timeline-dot]");

      if (reducedMotion) {
        if (card) {
          card.style.opacity = "";
          card.style.transform = "";
          card.style.filter = "";
        }
        if (dot) {
          dot.style.opacity = "";
          dot.style.transform = "";
        }
        return;
      }

      // Wider sharp zone near viewport center; softer falloff at edges
      const deadZone = viewportHeight * 0.2;
      const falloff = viewportHeight * 0.68;
      const adjustedDistance = Math.max(0, distanceFromCenter - deadZone);
      let presence = 1 - Math.min(adjustedDistance / falloff, 1);
      presence = presence * presence * (3 - 2 * presence);

      if (rect.bottom < 0) {
        const offScreen = Math.min(
          Math.abs(rect.bottom) / (viewportHeight * 0.45),
          1
        );
        presence *= 1 - offScreen * 0.65;
      } else if (rect.top > viewportHeight) {
        const offScreen = Math.min(
          (rect.top - viewportHeight) / (viewportHeight * 0.45),
          1
        );
        presence *= 1 - offScreen * 0.65;
      }

      const opacity = 0.34 + presence * 0.66;
      const scale = 0.95 + presence * 0.05;
      const blur = (1 - presence) * 1.15;

      // Dots stay more readable than cards during fade in/out
      const dotOpacity = 0.62 + presence * 0.38;
      const dotScale = 0.9 + presence * 0.1;

      if (card) {
        card.style.opacity = opacity.toFixed(3);
        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.transformOrigin = "center left";
        card.style.filter = blur > 0.18 ? `blur(${blur.toFixed(2)}px)` : "";
      }

      if (dot) {
        dot.style.opacity = dotOpacity.toFixed(3);
        dot.style.transform = `scale(${dotScale.toFixed(3)})`;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    let frame = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
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
  }, [updateActive]);

  return (
    <SectionContainer id="timeline">
      <div className="timeline-root">
        <div className="page-header">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="page-title">{t.title}</h2>
          <p className="page-subtitle-wide">{t.subtitle}</p>
        </div>

        <div className="timeline-track-wrap">
          <div className="timeline-line" aria-hidden />

          <ul className="timeline-list">
            {timelineEntries.map((entry, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={entry.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-timeline-index={index}
                  className="timeline-item"
                >
                  <div className="timeline-dot-wrap" aria-hidden>
                    <div
                      data-timeline-dot
                      className={cn(
                        "timeline-dot",
                        isActive
                          ? "timeline-dot--active"
                          : "timeline-dot--inactive"
                      )}
                    />
                  </div>

                  <TimelineCard entry={entry} isActive={isActive} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
