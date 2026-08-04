"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "@/components/animations/SectionContainer";
import { about } from "@/content/about";

export function About({ motion = "depth" }: { motion?: "depth" | "none" }) {
  const { language } = useLanguage();
  const t = about[language];

  const content = (
    <div className="about-root">
      <div className="page-header--compact">
        <div className="section-badge">
          <div className="section-badge-dot" />
          <span className="section-badge-label">{t.label}</span>
        </div>
        <h2 className="page-title">{t.title}</h2>
      </div>

      <div className="about-paragraphs">
        {t.paragraphs.map((paragraph, index) => (
          <p key={index} className="about-paragraph">
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
