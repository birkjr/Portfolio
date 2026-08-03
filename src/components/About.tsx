"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import { about } from "@/content/about";

export function About({ motion = "depth" }: { motion?: "depth" | "none" }) {
  const { language } = useLanguage();
  const t = about[language];

  const content = (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center sm:mb-10">
        <div className="section-badge">
          <div className="section-badge-dot" />
          <span className="section-badge-label">{t.label}</span>
        </div>
        <h2 className="mb-3 text-3xl font-bold sm:text-4xl">{t.title}</h2>
      </div>

      <div className="space-y-5">
        {t.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  // Embedded in scroll journey — no section chrome, sits directly on page bg
  if (motion === "none") {
    return <div id="about">{content}</div>;
  }

  return (
    <SectionContainer id="about" motion={motion}>
      {content}
    </SectionContainer>
  );
}
