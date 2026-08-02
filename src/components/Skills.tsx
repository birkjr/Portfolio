"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { getTechItems, skillsSection, type TechIcon } from "@/content/skills";
import { SectionContainer } from "./SectionContainer";
import { Github, TerminalSquare, X, type LucideIcon } from "lucide-react";

const TECH_ICONS: Record<TechIcon, LucideIcon> = {
  github: Github,
  cursor: TerminalSquare,
};

function TechIconDisplay({
  item,
}: {
  item: ReturnType<typeof getTechItems>[number];
}) {
  const Icon = item.icon ? TECH_ICONS[item.icon] : undefined;

  if (item.iconType === "image" && item.imageSrc) {
    return (
      <div className="inline-flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
        <Image
          src={item.imageSrc}
          alt={item.name}
          width={56}
          height={56}
          className="rounded-lg object-contain"
        />
      </div>
    );
  }

  return (
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-950/80 shadow-md shadow-black/10 sm:h-14 sm:w-14">
      {Icon && <Icon className="h-6 w-6 text-muted-foreground sm:h-7 sm:w-7" />}
    </div>
  );
}

export function Skills() {
  const { language } = useLanguage();
  const t = skillsSection[language];
  const techItems = getTechItems(language);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedSkill === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedSkill(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedSkill]);

  const selectedItem = selectedSkill !== null ? techItems[selectedSkill] : null;
  const isModalOpen = selectedSkill !== null;

  return (
    <SectionContainer id="skills">
      <div className="relative mx-auto max-w-7xl" ref={sectionRef}>
        <div
          className={`transition-[filter] duration-300 ${
            isModalOpen ? "pointer-events-none blur-sm" : ""
          }`}
        >
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

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-6">
            {techItems.map((item, index) => {
              const Icon = item.icon ? TECH_ICONS[item.icon] : undefined;

              return (
                <Card
                  key={item.name}
                  role="button"
                  tabIndex={isModalOpen ? -1 : 0}
                  onClick={() => setSelectedSkill(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedSkill(index);
                    }
                  }}
                  className={`group card-gradient-bg relative cursor-pointer overflow-hidden rounded-2xl border-2 border-[#e3d4c3]/80 transition-all duration-300 hover:-translate-y-1 hover-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-slate-800/70 ${
                    isVisible ? "tech-card-slide-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="card-shine" />
                  <CardContent className="relative z-10 flex flex-col gap-3 p-4">
                    {item.iconType === "image" && item.imageSrc ? (
                      <div className="inline-flex h-12 w-12 items-center justify-center">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="rounded-lg object-contain"
                        />
                      </div>
                    ) : (
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-950/80 shadow-md shadow-black/10 dark:border-slate-700/70 dark:bg-slate-950/80">
                        {Icon && (
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {item.group}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {selectedItem && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default bg-transparent"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close"
            />
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6">
              <Card
                className="card-gradient-bg hover-glow pointer-events-auto relative w-full max-w-lg animate-fade-in border-2 border-border text-left shadow-[0_20px_60px_rgba(15,23,42,0.45)] dark:border-slate-800/50 dark:backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-slate-900/70 p-2 text-white/80 transition-colors hover:bg-slate-800 hover:text-white dark:bg-slate-800/70 dark:hover:bg-slate-700"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <CardHeader className="space-y-4 pr-12">
                  <div className="flex items-center gap-4">
                    <TechIconDisplay item={selectedItem} />
                    <div className="min-w-0">
                      <CardTitle className="text-xl text-foreground">
                        {selectedItem.name}
                      </CardTitle>
                      <CardDescription className="text-sm font-medium">
                        {selectedItem.group}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {t.whyHeading}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {selectedItem.why}
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </SectionContainer>
  );
}
