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
import {
  experienceSection,
  getExperienceEntries,
  type ExperienceIcon,
} from "@/content/experience";
import { SectionContainer } from "./SectionContainer";

const EXPERIENCE_ICONS: Record<ExperienceIcon, LucideIcon> = {
  activity: Activity,
  code: Code,
  brain: Brain,
  users: Users,
  trendingUp: TrendingUp,
  star: Star,
};

export function Experience() {
  const { language } = useLanguage();
  const experiences = getExperienceEntries(language);
  const t = experienceSection[language];
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    null
  );
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
        rootMargin: isMobile ? "0px 0px -50px 0px" : "-100px 0px -150px 0px", // Reduced desktop margin, larger bottom for footer
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
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
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
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-foreground/85 sm:h-16 sm:w-16">
                    {(() => {
                      const IconComponent =
                        EXPERIENCE_ICONS[experiences[selectedExperience].icon];
                      return (
                        <IconComponent className="h-7 w-7 text-white sm:h-8 sm:w-8" />
                      );
                    })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-xl sm:text-2xl text-foreground">
                      {experiences[selectedExperience].title}
                    </CardTitle>
                    <CardDescription className="mb-2 text-sm font-medium text-muted-foreground sm:text-lg">
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
            const IconComponent = EXPERIENCE_ICONS[experience.icon];
            return (
              <Card
                key={index}
                className="group relative overflow-hidden text-center hover-glow transition-all duration-300 cursor-pointer h-full flex flex-col border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10 card-gradient-bg"
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
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-foreground/85 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-foreground transition-colors">
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
