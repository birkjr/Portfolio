"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import {
  timelineSection,
  timelineEntries,
  type TimelineEntryType,
} from "@/content/timeline";
import { Badge } from "@/components/ui/badge";

const timelineTypeLabels: Record<
  TimelineEntryType,
  keyof (typeof timelineSection)["no"]
> = {
  education: "education",
  work: "work",
  summerIntern: "summerIntern",
};

export function Timeline() {
  const { language } = useLanguage();
  const t = timelineSection[language];
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (nodes.length === 0) return;

    let frame = 0;

    const updateActive = () => {
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
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <SectionContainer id="timeline">
      <div className="mx-auto max-w-3xl">
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

        <div className="relative">
          <div
            className="absolute bottom-2 left-[7px] top-2 w-px bg-border sm:left-[9px]"
            aria-hidden
          />

          <ul className="space-y-8">
            {timelineEntries.map((entry, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-timeline-index={index}
                  className="relative pl-8 sm:pl-10"
                >
                  <div
                    className={`absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 transition-all duration-300 sm:h-[19px] sm:w-[19px] ${
                      isActive
                        ? "border-slate-900 bg-slate-900 shadow-[0_0_12px_rgba(15,23,42,0.45)] dark:border-white dark:bg-white dark:shadow-[0_0_12px_rgba(255,255,255,0.85)]"
                        : "border-border bg-background"
                    }`}
                    aria-hidden
                  />

                  <div
                    className={`rounded-xl border bg-card/40 p-4 transition-colors sm:p-5 ${
                      isActive
                        ? "border-foreground/25"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {entry.period}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {t[timelineTypeLabels[entry.type]]}
                      </Badge>
                    </div>
                    <h3 className="mb-0.5 text-base font-bold sm:text-lg">
                      {entry.title[language]}
                    </h3>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      {entry.subtitle[language]}
                    </p>
                    {entry.description && (
                      <p className="text-sm leading-relaxed text-muted-foreground/90">
                        {entry.description[language]}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
