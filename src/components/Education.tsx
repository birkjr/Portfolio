"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface Education {
  institution: string;
  program: string;
  period: string;
  description?: string;
  icon: LucideIcon;
}

const educations_no: Education[] = [
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Datateknologi (5-årig master)",
    period: "2025 - 2028",
    description:
      "3. år av 5-årig integrert masterprogram i datateknologi. Byttet fra Ingeniørvitenskap og IKT i 3. klasse. Fokus på kunstig intelligens, IoT, bærekraftige løsninger og utvikling av komplekse IT-systemer.",
    icon: GraduationCap,
  },
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Ingeniørvitenskap og IKT - Maskin og IKT (maskinlæring)",
    period: "2023 - 2025",
    description:
      "Etter 2 år med Ingeniørvitenskap og IKT og retningen Maskin og IKT med fokus på maskinlæring, valgte jeg å følge magefølelsen til å bytte til Datateknologi.",
    icon: GraduationCap,
  },
  {
    institution: "Universitetet i Oslo (UiO)",
    program: "Årsenhet, Informatikk",
    period: "2022 - 2023",
    description: "Fag i informatikk og informatikk-relaterte disipliner.",
    icon: GraduationCap,
  },
  {
    institution: "Norges Toppidrettsskole",
    program: "Stabæk Fotball",
    period: "2019 - 2022",
    description: "Kombinerte toppidrett i fotball og videregående skole.",
    icon: School,
  },
];

const educations_en: Education[] = [
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Computer Science (5-year master's)",
    period: "2025 - 2028",
    description:
      "3rd year of a 5-year integrated master's program in computer science. Switched from Engineering Science and ICT in 3rd year. Focus on artificial intelligence, IoT, sustainable solutions, and development of complex IT systems.",
    icon: GraduationCap,
  },
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Engineering Science and ICT - Machine and ICT (machine learning)",
    period: "2023 - 2025",
    description:
      "After 2 years with Engineering Science and ICT and the specialization Machine and ICT with focus on machine learning, I chose to follow my gut feeling and switch to Computer Science.",
    icon: GraduationCap,
  },
  {
    institution: "University of Oslo (UiO)",
    program: "One-year program, Informatics",
    period: "2022 - 2023",
    description:
      "Preliminary subjects in informatics and informatics-related disciplines.",
    icon: GraduationCap,
  },
  {
    institution: "Norwegian College of Elite Sport",
    program: "Stabæk Football Academy",
    period: "2019 - 2022",
    description: "Combined high school education with elite sport.",
    icon: School,
  },
];

const content = {
  no: {
    label: "Utdanning",
    title: "Utdanning",
    subtitle: "Min utdanningsreise",
  },
  en: {
    label: "Education",
    title: "Education",
    subtitle: "My educational journey",
  },
};

export function Education() {
  const { language } = useLanguage();
  const educations = language === "no" ? educations_no : educations_en;
  const t = content[language];
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasAnimated = useRef(false);
  const fallbackTimer = useRef<NodeJS.Timeout | null>(null);

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

    // Fallback: Show section after 1 second if animation hasn't triggered
    fallbackTimer.current = setTimeout(() => {
      if (!hasAnimated.current && sectionRef.current) {
        setIsVisible(true);
        hasAnimated.current = true;
      }
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          // Trigger animation when section enters viewport
          // Lower threshold on mobile, higher on desktop to prevent multiple sections triggering
          const minRatio = isMobile ? 0.3 : 0.5; // Lowered desktop threshold from 0.7 to 0.5

          if (
            isIntersecting &&
            intersectionRatio >= minRatio &&
            !hasAnimated.current
          ) {
            // Clear fallback timer
            if (fallbackTimer.current) {
              clearTimeout(fallbackTimer.current);
            }

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
        rootMargin: isMobile ? "0px 0px -50px 0px" : "-100px 0px -100px 0px", // Reduced desktop margin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
      }
    };
  }, []);

  return (
    <SectionContainer id="education">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {educations.map((education, index) => {
            const IconComponent = education.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden hover-glow transition-all duration-300 border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 card-gradient-bg"
              >
                <div className="card-shine" />
                <CardHeader className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {education.institution}
                      </CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm mb-2">
                        {education.program}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {education.period}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                {education.description && (
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                      {education.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
