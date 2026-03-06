"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Code,
  Users,
  TrendingUp,
  Star,
  Brain,
  LucideIcon,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface Experience {
  title: string;
  description: string;
  year: string;
  icon: LucideIcon;
  detailedDescription?: string;
}

const experiences_no: Experience[] = [
  {
    title: "Medgründer og CTO",
    description:
      "Thylo Insight - Helsetech startup som leverer innsikt og analyse av kundenes Thyroid data ved hjelp av AI",
    year: "2025 - Nå",
    icon: Activity,
    detailedDescription:
      "Som medgründer og CTO for Thylo Insight har jeg jobbet med utvikling av appen og nettsiden. Gjennom dette prosjektet har jeg tatt hovedansvar for frontend-utvikling med React Native og React, samt backend-utvikling med Supabase. Jeg har også samarbeidet tett med teamet for å sikre at løsningen oppfyller organisasjonens behov og standarder. Denne rollen har gitt meg verdifull erfaring innen full-stack utvikling, prosjektledelse og samarbeid med tverrfaglige team.",
  },
  {
    title: "IT-utvikler",
    description: "Teknologiporten, NTNU - Full-stack utvikler",
    year: "2023 - Nå",
    icon: Code,
    detailedDescription:
      "Som IT-utvikler ved Teknologiporten har jeg jobbet med utvikling av organisasjonens offisielle nettside. Gjennom dette prosjektet har jeg tatt hovedansvar for frontend-utvikling med React og Next.js, samt backend-utvikling med Supabase. Jeg har også samarbeidet tett med teamet for å sikre at løsningen oppfyller organisasjonens behov og standarder. Denne rollen har gitt meg verdifull erfaring innen full-stack utvikling, prosjektledelse og samarbeid med tverrfaglige team.",
  },
  {
    title: "AI og maskinlærings Analytiker",
    description:
      "Concentrix - Analyse og utvikling av AI-løsninger med fokus på machine learning og kunstig intelligens",
    year: "2025",
    icon: Brain,
    detailedDescription:
      "I rollen som AI og maskinlærings analytiker hos Concentrix arbeidet jeg med analyse og utvikling av AI-løsninger.",
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
    title: "Co-founder and CTO",
    description:
      "Thylo Insight - Health-tech startup that provides insights and analysis of customers Thyroid data using AI",
    year: "2025 - Now",
    icon: Activity,
    detailedDescription:
      "As co-founder and CTO of Thylo Insight, I have worked on developing the app and website. Through this project, I have taken primary responsibility for frontend development with React Native and React, as well as backend development with Supabase. I have also collaborated closely with the team to ensure that the solution meets the organization's needs and standards. This role has given me valuable experience in full-stack development, project management, and collaboration with interdisciplinary teams.",
  },
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
      "As a waiter at Risør Fiskemottak Restaurant, I gained valuable experience in customer service and sales. This role taught me to work under time pressure, handle different customer situations, and ensure high service quality. Although this was not a technical role, I developed skills in communication, problem-solving, and adaptability that are transferable to all aspects of my career.",
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
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // If already animated, don't set up observer again
    if (hasAnimated.current) return;

    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          // Trigger animation when section enters viewport
          // Lower threshold on mobile, higher on desktop to prevent multiple sections triggering
          const minRatio = isMobile ? 0.3 : 0.7;

          if (
            isIntersecting &&
            intersectionRatio >= minRatio &&
            !hasAnimated.current
          ) {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) {
              setScrollDirection("down");
            } else if (currentScrollY < lastScrollY.current) {
              setScrollDirection("up");
            }
            setIsVisible(true);
            hasAnimated.current = true;
            // Unobserve after animation triggers to prevent re-triggering
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1.0], // Multiple thresholds to catch different screen sizes
        rootMargin: isMobile ? "0px 0px -50px 0px" : "-150px 0px -200px 0px", // Smaller margin on mobile, larger bottom for footer on desktop
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <SectionContainer id="experience" className="pb-20 sm:pb-24 md:pb-28">
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          isVisible
            ? scrollDirection === "down"
              ? "section-slide-up"
              : "section-slide-down"
            : scrollDirection === "down"
              ? "opacity-0 translate-y-[260px] scale-[0.94]"
              : "opacity-0 -translate-y-[260px] scale-[0.94]"
        }`}
        ref={sectionRef}
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm mb-4">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {t.label}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Modal Overlay */}
        {selectedExperience !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 sm:px-6"
            onClick={() => setSelectedExperience(null)}
          >
            <Card
              className="hover-glow relative w-full max-w-3xl animate-fade-in text-left shadow-[0_20px_60px_rgba(15,23,42,0.45)] border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl card-gradient-bg"
              style={{
                maxHeight: "90vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute right-4 top-4 rounded-full bg-slate-900/70 dark:bg-slate-800/70 p-2 text-white/80 transition-colors hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700 z-10"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <CardHeader className="space-y-4 pb-4 sm:pb-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 sm:h-16 sm:w-16">
                    {(() => {
                      const IconComponent =
                        experiences[selectedExperience].icon;
                      return (
                        <IconComponent className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                      );
                    })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-xl sm:text-2xl text-foreground">
                      {experiences[selectedExperience].title}
                    </CardTitle>
                    <CardDescription className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400 sm:text-lg">
                      {experiences[selectedExperience].description}
                    </CardDescription>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {experiences[selectedExperience].year}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 sm:pt-2">
                <p className="text-sm leading-relaxed text-muted-foreground/90 sm:hidden">
                  {experiences[selectedExperience].description}
                </p>
                <p className="hidden text-base leading-relaxed text-muted-foreground/90 sm:block md:text-lg">
                  {experiences[selectedExperience].detailedDescription ||
                    experiences[selectedExperience].description}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden text-center hover-glow transition-all duration-300 cursor-pointer h-full flex flex-col border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 card-gradient-bg"
                style={{
                  opacity:
                    selectedExperience !== null && selectedExperience !== index
                      ? 0.3
                      : 1,
                  transform:
                    selectedExperience === index ? "scale(1.05)" : undefined,
                }}
                onClick={() => setSelectedExperience(index)}
              >
                <div className="card-shine" />
                <CardHeader className="flex-1 p-4 pb-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {experience.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {experience.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 pb-4 px-4">
                  <Badge variant="outline" className="text-xs">
                    {experience.year}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
