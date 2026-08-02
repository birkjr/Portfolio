"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import { timelineEntries } from "@/data/timeline";
import { Badge } from "@/components/ui/badge";

const content = {
  no: {
    label: "Tidslinje",
    title: "Tidslinje",
    subtitle: "Utdanning og erfaring — kronologisk.",
    education: "Utdanning",
    work: "Erfaring",
  },
  en: {
    label: "Timeline",
    title: "Timeline",
    subtitle: "Education and experience — chronological.",
    education: "Education",
    work: "Experience",
  },
};

export function Timeline() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <SectionContainer id="timeline">
      <div className="max-w-3xl mx-auto">
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

        <div className="relative">
          <div
            className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-border"
            aria-hidden
          />

          <ul className="space-y-8">
            {timelineEntries.map((entry, index) => (
              <li key={index} className="relative pl-8 sm:pl-10">
                <div
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] sm:w-[19px] sm:h-[19px] rounded-full border-2 border-border bg-background"
                  aria-hidden
                />

                <div className="rounded-xl border border-border bg-card/40 p-4 sm:p-5 hover:border-foreground/20 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {entry.period}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {entry.type === "education" ? t.education : t.work}
                    </Badge>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-0.5">
                    {entry.title[language]}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {entry.subtitle[language]}
                  </p>
                  {entry.description && (
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      {entry.description[language]}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
