"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

const content = {
  no: {
    label: "Om meg",
    title: "Om meg",
    paragraphs: [
      "Jeg er programvareutvikler og datateknologistudent ved NTNU. Jeg liker å bygge produkter som er enkle å bruke, men teknisk solide under overflaten.",
      "Som medgründer og CTO for Thylo Insight jobber jeg med full-stack utvikling — fra React og Next.js i frontend til Supabase og API-er i backend. Jeg er også interessert i AI, reverse engineering og sikkerhet.",
      "Jeg trives best når jeg kan ta et problem fra idé til produksjon: forstå domenet, designe strukturen, skrive koden og levere noe folk faktisk bruker.",
    ],
  },
  en: {
    label: "About",
    title: "About",
    paragraphs: [
      "I'm a software engineer and computer science student at NTNU. I like building products that are simple to use, but technically solid under the hood.",
      "As co-founder and CTO of Thylo Insight, I work on full-stack development — from React and Next.js on the frontend to Supabase and APIs on the backend. I'm also interested in AI, reverse engineering and security.",
      "I'm at my best when I can take a problem from idea to production: understand the domain, design the structure, write the code and ship something people actually use.",
    ],
  },
};

export function About() {
  const { language } = useLanguage();
  const t = content[language];

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
