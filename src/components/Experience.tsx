"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Users,
  TrendingUp,
  Star,
  Brain,
  LucideIcon,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Experience {
  title: string;
  description: string;
  year: string;
  icon: LucideIcon;
  detailedDescription?: string;
}

const experiences_no: Experience[] = [
  {
    title: "IT-utvikler",
    description: "Teknologiporten, NTNU - Full-stack utvikler",
    year: "2023 - Nå",
    icon: Code,
    detailedDescription:
      "Som IT-utvikler ved Teknologiporten har jeg jobbet med utvikling av organisasjonens offisielle nettside. Gjennom dette prosjektet har jeg tatt hovedansvar for frontend-utvikling med React og Next.js, samt backend-utvikling med Supabase. Jeg har også samarbeidet tett med teamet for å sikre at løsningen oppfyller organisasjonens behov og standarder. Denne rollen har gitt meg verdifull erfaring innen full-stack utvikling, prosjektledelse og samarbeid med tverrfaglige team.",
  },
  {
    title: "AI and Machine Learning Analyst",
    description:
      "Concentrix - Analyse og utvikling av AI-løsninger med fokus på machine learning og kunstig intelligens",
    year: "2025",
    icon: Brain,
    detailedDescription:
      "I rollen som AI and Machine Learning Analyst hos Concentrix arbeidet jeg med analyse og utvikling av AI-løsninger.",
  },
  {
    title: "Teamleder Markedsføring",
    description:
      "EMIL-Link - Leder team med fokus på forhandling og samarbeid, og utviklet ferdig nettside",
    year: "2024",
    icon: Users,
    detailedDescription:
      "Som Teamleder for Markedsføring ved EMIL-Link ledet jeg et team med fokus på forhandling, samarbeid og strategisk markedsføring. I tillegg til ledervervet tok jeg ansvar for å utvikle organisasjonens offisielle nettside fra bunnen av, ved bruk av moderne webteknologier. Dette prosjektet kombinerte mine tekniske ferdigheter med lederegenskaper og ga meg dyptgående innsikt i hvordan teknologi kan brukes til å styrke et selskaps markedsføringsinnsats.",
  },
  {
    title: "Marketing Team Member",
    description: "EMIL-Link - Markedsføring og webdesign",
    year: "2023-2024",
    icon: TrendingUp,
    detailedDescription:
      "Som medlem av markedsføringsteamet ved EMIL-Link jobbet jeg med ulike markedsføringsoppgaver og webdesign. Jeg deltok i utviklingen av markedsføringsmateriell, strategiutforming og implementering av digitale markedsføringsprogrammer. Denne rollen gav meg grunnleggende erfaring med markedsføring og var et viktig steg i min utvikling mot en mer ledende rolle i organisasjonen.",
  },
  {
    title: "Servitør",
    description: "Risør Fiskemottak Restaurant - Kundeservice og salg",
    year: "2024",
    icon: Star,
    detailedDescription:
      "Som servitør ved Risør fiskemottak fikk jeg verdifull erfaring med kundeservice og salg. Denne rollen lærte meg å jobbe under tidspress, håndtere ulike kundeskjebner og sikre høy servicekvalitet. Selv om dette ikke var en teknisk rolle, utviklet jeg ferdigheter i kommunikasjon, problemløsing og tilpasningsevne som er overførbare til alle aspekter av min karriere.",
  },
];

const experiences_en: Experience[] = [
  {
    title: "IT Developer",
    description: "Teknologiporten, NTNU - Full-stack developer",
    year: "2023 - Now",
    icon: Code,
    detailedDescription:
      "As an IT Developer at Teknologiporten, I have worked on developing the organization's official website. Through this project, I have taken primary responsibility for frontend development with React and Next.js, as well as backend development with Supabase. I have also collaborated closely with the team to ensure that the solution meets the organization's needs and standards. This role has given me valuable experience in full-stack development, project management, and collaboration with interdisciplinary teams.",
  },
  {
    title: "AI and Machine Learning Analyst",
    description:
      "Concentrix - Analysis and development of AI solutions with focus on machine learning and artificial intelligence",
    year: "2025",
    icon: Brain,
    detailedDescription:
      "In the role of AI and Machine Learning Analyst at Concentrix, I worked with analysis and development of AI solutions.",
  },
  {
    title: "Marketing Team Leader",
    description:
      "EMIL-Link - Leads team with focus on negotiation and collaboration, and developed finished website",
    year: "2024",
    icon: Users,
    detailedDescription:
      "As Marketing Team Leader at EMIL-Link, I led a team with focus on negotiation, collaboration, and strategic marketing. In addition to the leadership responsibility, I took on the role of developing the organization's official website from scratch, using modern web technologies. This project combined my technical skills with leadership qualities and gave me deep insight into how technology can be used to strengthen a company's marketing efforts.",
  },
  {
    title: "Marketing Team Member",
    description: "EMIL-Link - Marketing and web design",
    year: "2023-2024",
    icon: TrendingUp,
    detailedDescription:
      "As a member of the marketing team at EMIL-Link, I worked on various marketing tasks and web design. I participated in the development of marketing materials, strategy formulation, and implementation of digital marketing programs. This role gave me fundamental experience with marketing and was an important step in my development towards a more leading role in the organization.",
  },
  {
    title: "Waiter",
    description: "Risør Fiskemottak Restaurant - Customer service and sales",
    year: "2024",
    icon: Star,
    detailedDescription:
      "As a waiter at Risør Fish Processing, I gained valuable experience in customer service and sales. This role taught me to work under time pressure, handle different customer situations, and ensure high service quality. Although this was not a technical role, I developed skills in communication, problem-solving, and adaptability that are transferable to all aspects of my career.",
  },
];

const content = {
  no: {
    label: "Erfaringer",
    title: "Erfaringer",
    subtitle:
      "Noen milepæler og prestasjoner jeg er stolt av gjennom karrieren.",
  },
  en: {
    label: "Experience",
    title: "Experience",
    subtitle:
      "Some milestones and achievements I am proud of throughout my career.",
  },
};

export function Experience() {
  const { language } = useLanguage();
  const experiences = language === "no" ? experiences_no : experiences_en;
  const t = content[language];
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    null
  );

  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">{t.label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        {/* Modal Overlay */}
        {selectedExperience !== null && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <Card
              className="glass hover-glow w-full max-w-2xl relative animate-fade-in text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const IconComponent =
                        experiences[selectedExperience].icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-2xl mb-2">
                      {experiences[selectedExperience].title}
                    </CardTitle>
                    <CardDescription className="text-blue-300 font-medium text-lg mb-2">
                      {experiences[selectedExperience].description}
                    </CardDescription>
                    <Badge variant="outline" className="text-sm">
                      {experiences[selectedExperience].year}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground/90 leading-relaxed">
                  {experiences[selectedExperience].detailedDescription ||
                    experiences[selectedExperience].description}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <Card
                key={index}
                className="text-center glass hover-glow transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedExperience(index)}
                style={{
                  opacity:
                    selectedExperience !== null && selectedExperience !== index
                      ? 0.3
                      : 1,
                  transform:
                    selectedExperience === index ? "scale(1.05)" : "scale(1)",
                }}
              >
                <CardHeader>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">
                    {experience.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {experience.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{experience.year}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
