"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import { about } from "@/content/about";

export function About() {
  const { language } = useLanguage();
  const t = about[language];

  return (
    <SectionContainer id="about">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h2>
        </div>

        <div className="space-y-5">
          {t.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
