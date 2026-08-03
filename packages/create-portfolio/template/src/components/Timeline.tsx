"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Github,
  MessageCircleQuestion,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import {
  timelineSection,
  timelineEntries,
  type TimelineEntry,
  type TimelineEntryType,
} from "@/content/timeline";
import { journal } from "@/content/journal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

function TimelineCard({
  entry,
  isActive,
  isExpanded,
  onToggleExpand,
}: {
  entry: TimelineEntry;
  isActive: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const { language } = useLanguage();
  const t = timelineSection[language];
  const expandable = entry.expandable;
  const hasExpandable = Boolean(
    expandable &&
      (expandable.architecture ||
        expandable.github ||
        expandable.demo ||
        expandable.journalSlugs?.length)
  );

  const linkedJournals =
    expandable?.journalSlugs
      ?.map((slug) => journal.find((item) => item.slug === slug))
      .filter(Boolean) ?? [];

  return (
    <div
      className={cn(
        "rounded-xl border bg-card/40 transition-colors",
        isActive
          ? "border-foreground/25"
          : "border-border hover:border-foreground/20"
      )}
    >
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {entry.period}
          </span>
          <Badge variant="outline" className="text-[10px]">
            {t[timelineTypeLabels[entry.type]]}
          </Badge>
        </div>

        <h3 className="mb-0.5 text-base font-bold sm:text-lg">
          {entry.subtitle[language]}
        </h3>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          {entry.title[language]}
        </p>

        {entry.description && (
          <p className="text-sm leading-relaxed text-muted-foreground/90">
            {entry.description[language]}
          </p>
        )}

        {hasExpandable && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            className="mt-3 h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? t.readLess : t.readMore}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          </Button>
        )}

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            isExpanded && hasExpandable ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            {expandable && (
              <div className="space-y-5 pt-4">
                {expandable.architecture && (
                  <ExpandableSection title={t.architecture}>
                    <p className="text-sm leading-relaxed text-muted-foreground/90">
                      {expandable.architecture[language]}
                    </p>
                  </ExpandableSection>
                )}

                {(expandable.github || expandable.demo) && (
                  <ExpandableSection
                    title={expandable.github ? t.github : t.demo}
                  >
                    <div className="flex flex-wrap gap-2">
                      {expandable.github && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() =>
                            window.open(expandable.github, "_blank")
                          }
                        >
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          GitHub
                          <ExternalLink className="ml-1.5 h-3 w-3" />
                        </Button>
                      )}
                      {expandable.demo && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => window.open(expandable.demo, "_blank")}
                        >
                          {t.demo}
                          <ExternalLink className="ml-1.5 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </ExpandableSection>
                )}

                {linkedJournals.length > 0 && (
                  <ExpandableSection title={t.journal}>
                    <ul className="space-y-2">
                      {linkedJournals.map((journalItem) => (
                        <li key={journalItem!.slug}>
                          <button
                            type="button"
                            onClick={() => openJournal(journalItem!.slug)}
                            className="group flex w-full items-start gap-2 rounded-lg border border-border/60 bg-background/40 px-3 py-2.5 text-left transition-colors hover:border-foreground/20 hover:bg-background/70"
                          >
                            <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className="text-sm leading-snug text-foreground/90 group-hover:text-foreground">
                              {journalItem!.question[language]}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </ExpandableSection>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-border/60 pt-4">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {t.whatILearned}
          </p>
          <p className="text-sm leading-relaxed text-foreground/90 italic">
            {entry.learnings[language]}
          </p>
        </div>
      </div>
    </div>
  );
}

function ExpandableSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

export function Timeline() {
  const { language } = useLanguage();
  const t = timelineSection[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const updateActive = useCallback(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
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

  useEffect(() => {
    const frame = requestAnimationFrame(updateActive);
    return () => cancelAnimationFrame(frame);
  }, [expandedIds, updateActive]);

  return (
    <SectionContainer id="timeline">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">{t.title}</h2>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="relative -ml-1 sm:-ml-2 md:-ml-3">
          <div
            className="absolute bottom-2 left-0 top-2 w-px bg-border"
            aria-hidden
          />

          <ul className="space-y-8">
            {timelineEntries.map((entry, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={entry.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-timeline-index={index}
                  className="relative pl-7 sm:pl-9 md:pl-11"
                >
                  <div
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] -translate-x-1/2 rounded-full border-2 transition-all duration-300 sm:h-[19px] sm:w-[19px] ${
                      isActive
                        ? "border-slate-900 bg-slate-900 shadow-[0_0_12px_rgba(15,23,42,0.45)] dark:border-white dark:bg-white dark:shadow-[0_0_12px_rgba(255,255,255,0.85)]"
                        : "border-border bg-background"
                    }`}
                    aria-hidden
                  />

                  <TimelineCard
                    entry={entry}
                    isActive={isActive}
                    isExpanded={expandedIds.has(entry.id)}
                    onToggleExpand={() => toggleExpanded(entry.id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
