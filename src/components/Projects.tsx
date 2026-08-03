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
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, LucideIcon, Database, Boxes } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import {
  getProjectEntries,
  projectsSection,
  type ProjectIcon,
} from "@/content/projects";
import { getGridRevealObserverOptions } from "@/lib/utils";

const PROJECT_ICONS: Record<ProjectIcon, LucideIcon> = {
  database: Database,
};

interface CardTilt {
  rotateX: number;
  rotateY: number;
  shineX: number;
  shineY: number;
  shineIntensity: number;
}

const DEFAULT_TILT: CardTilt = {
  rotateX: 0,
  rotateY: 0,
  shineX: 50,
  shineY: 50,
  shineIntensity: 0,
};

export function Projects() {
  const { language } = useLanguage();
  const projects = getProjectEntries(language);
  const t = projectsSection[language];

  const [cardTilts, setCardTilts] = useState<CardTilt[]>(() =>
    projects.map(() => ({ ...DEFAULT_TILT }))
  );
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const wasInView = useRef(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!wasInView.current) {
            setIsVisible(false);
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          }
          wasInView.current = true;
        } else {
          setIsVisible(false);
          wasInView.current = false;
        }
      });
    }, getGridRevealObserverOptions());

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setCardTilts((prev) => {
      const next = [...prev];
      next[index] = { rotateX, rotateY, shineX, shineY, shineIntensity: 0.65 };
      return next;
    });
  };

  const handleCardMouseLeave = (index: number) => {
    setCardTilts((prev) => {
      const next = [...prev];
      next[index] = { ...DEFAULT_TILT };
      return next;
    });
  };

  return (
    <SectionContainer id="projects">
      <div className="mx-auto max-w-7xl">
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

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {projects.map((project, index) => {
            const link = project.demo || project.github;
            const hasImage = Boolean(project.image);
            const IconComponent = project.icon
              ? PROJECT_ICONS[project.icon]
              : undefined;
            const tilt = cardTilts[index] ?? DEFAULT_TILT;

            return (
              <div
                key={project.title}
                className={`card-project [perspective:1000px] ${
                  isVisible ? "tech-card-slide-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.07}s` }}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
              >
                <Card
                  className="group relative flex h-full flex-col overflow-hidden border-2 border-border transition-all duration-500 hover-glow hover:shadow-2xl hover:shadow-black/10 card-gradient-bg dark:border-border/60 dark:backdrop-blur-xl"
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.shineIntensity > 0 ? 1.02 : 1})`,
                    transformStyle: "preserve-3d",
                    transition:
                      tilt.shineIntensity > 0
                        ? "transform 0.15s ease-out"
                        : "transform 0.5s cubic-bezier(0.22,0.61,0.36,1)",
                    willChange: "transform",
                  }}
                >
                  <div className="card-shine" />

                  <div
                    className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-screen transition-opacity duration-150"
                    style={{
                      opacity: tilt.shineIntensity,
                      background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(148,163,184,0.15), transparent 55%), radial-gradient(circle at ${100 - tilt.shineX}% ${100 - tilt.shineY}%, rgba(100,116,139,0.1), transparent 60%)`,
                    }}
                  />

                  <div className="relative aspect-[21/9] overflow-hidden bg-muted/20">
                    {hasImage ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={project.image.includes("ThyloInsight")}
                      />
                    ) : (
                      IconComponent && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="card-accent-icon flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl shadow-black/20">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {project.isSystem ? (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="border-0 bg-foreground text-background shadow-lg">
                          <Boxes className="mr-1 h-3 w-3" />
                          {t.systemBadge}
                        </Badge>
                      </div>
                    ) : (
                      project.featured && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="border-0 bg-foreground text-background shadow-lg">
                            <Code className="mr-1 h-3 w-3" />
                            {t.featuredBadge}
                          </Badge>
                        </div>
                      )
                    )}

                    {link && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <Button
                          size="lg"
                          className="bg-white/95 text-slate-900 shadow-xl hover:bg-white dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(link, "_blank");
                          }}
                        >
                          {t.viewProject}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <CardHeader className="flex-1 p-3 pb-1">
                    <CardTitle className="mb-1.5 text-base font-bold transition-colors duration-300 group-hover:text-foreground sm:text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-3 pb-3 pt-0">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-border text-xs font-medium text-muted-foreground transition-colors duration-300 hover:bg-muted/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge
                          variant="outline"
                          className="border-border text-xs font-medium text-muted-foreground"
                        >
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
