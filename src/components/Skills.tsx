"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ElementType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import {
  Code2,
  Globe2,
  Cpu,
  Github,
  TerminalSquare,
  Cloud,
  Sparkles,
} from "lucide-react";

interface TechItem {
  name: string;
  group: string;
  iconType: "lucide" | "image";
  icon?: ElementType;
  imageSrc?: string;
}

const techItemsBase: TechItem[] = [
  // Core frontend
  {
    name: "React",
    group: "Frontend",
    iconType: "image",
    imageSrc: "/Icons/react.jpeg",
  },
  {
    name: "Next.js",
    group: "Frontend",
    iconType: "image",
    imageSrc: "/Icons/nextjs.jpeg",
  },
  // Language & styling
  {
    name: "TypeScript",
    group: "Language",
    iconType: "image",
    imageSrc: "/Icons/typescriptv2.png",
  },
  {
    name: "Tailwind CSS",
    group: "Styling",
    iconType: "image",
    imageSrc: "/Icons/tailwindv2.png",
  },
  // Backend / data / infra
  {
    name: "Python",
    group: "Backend / AI",
    iconType: "image",
    imageSrc: "/Icons/python.jpeg",
  },
  {
    name: "Node.js",
    group: "Backend",
    iconType: "image",
    imageSrc: "/Icons/nodejs.png",
  },
  {
    name: "Supabase",
    group: "Database",
    iconType: "image",
    imageSrc: "/Icons/supabasev2.png",
  },
  {
    name: "Vercel",
    group: "Infra",
    iconType: "image",
    imageSrc: "/Icons/vercel.png",
  },
  // Tools & collaboration
  { name: "GitHub", group: "Collaboration", iconType: "lucide", icon: Github },
  {
    name: "Cursor",
    group: "Tooling",
    iconType: "lucide",
    icon: TerminalSquare,
  },
];

const content = {
  no: {
    label: "Teknologi",
    title: "Teknologier jeg bygger med",
    subtitle:
      "Et utvalg av teknologier, rammeverk og verktøy jeg bruker til å bygge produkter, verktøy og infrastruktur.",
  },
  en: {
    label: "Tech Stack",
    title: "Technologies I build with",
    subtitle:
      "A selection of the technologies, frameworks and tools I use to build products, tools and infrastructure.",
  },
};

export function Skills() {
  const { language } = useLanguage();
  const t = content[language];
  const techItems = techItemsBase;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Reset animation when leaving viewport so it can replay
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
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
    <SectionContainer id="skills">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
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

        {/* Technology Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {techItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.name}
                className={`group relative overflow-hidden border-2 border-[#e3d4c3]/80 dark:border-slate-800/70 rounded-2xl hover-glow transition-all duration-300 hover:-translate-y-1 card-gradient-bg ${
                  isVisible ? "tech-card-slide-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {/* Glow / shine overlay */}
                <div className="card-shine" />
                <CardContent className="relative z-10 p-4 flex flex-col gap-3">
                  {item.iconType === "image" && item.imageSrc ? (
                    <div className="inline-flex items-center justify-center w-12 h-12">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950/80 dark:bg-slate-950/80 border border-slate-700/70 dark:border-slate-700/70 shadow-md shadow-blue-500/25">
                      {Icon && (
                        <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                      )}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.group}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
