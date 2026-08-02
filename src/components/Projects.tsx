"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  ChevronLeft,
  ChevronRight,
  Code,
  ExternalLink,
  LucideIcon,
  Database,
  Boxes,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import {
  getProjectEntries,
  projectsSection,
  type ProjectIcon,
} from "@/content/projects";

const PROJECT_ICONS: Record<ProjectIcon, LucideIcon> = {
  database: Database,
};

type Project = ReturnType<typeof getProjectEntries>[number];

const SWIPE_THRESHOLD = 80;

function ProjectCardContent({
  project,
  t,
}: {
  project: Project;
  t: (typeof projectsSection)["no"];
}) {
  const link = project.demo || project.github;
  const hasImage = Boolean(project.image);
  const IconComponent = project.icon ? PROJECT_ICONS[project.icon] : undefined;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-border dark:border-border/60 dark:backdrop-blur-xl card-gradient-bg shadow-xl">
      <div className="card-shine" />

      <div className="relative aspect-[16/10] overflow-hidden bg-muted/20 sm:aspect-[21/9]">
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
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
      </div>

      <CardHeader className="flex-1 p-4 pb-2">
        <CardTitle className="mb-1.5 text-lg font-bold">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-muted-foreground/80">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-4 pb-4 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-border text-xs font-medium text-muted-foreground"
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

        {link && (
          <Button
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              window.open(link, "_blank");
            }}
          >
            {t.viewProject}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function Projects() {
  const { language } = useLanguage();
  const projects = getProjectEntries(language);
  const t = projectsSection[language];
  const count = projects.length;

  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(
    null
  );
  const pointerStart = useRef({ x: 0, y: 0 });
  const isAnimating = useRef(false);

  const goTo = useCallback(
    (direction: "next" | "prev") => {
      if (isAnimating.current || count <= 1) return;

      isAnimating.current = true;
      setExitDirection(direction === "next" ? "left" : "right");
      setDragX(0);
      setIsDragging(false);

      window.setTimeout(() => {
        setIndex((current) =>
          direction === "next"
            ? (current + 1) % count
            : (current - 1 + count) % count
        );
        setExitDirection(null);
        isAnimating.current = false;
      }, 280);
    },
    [count]
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating.current) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isAnimating.current) return;
    setDragX(event.clientX - pointerStart.current.x);
  };

  const finishDrag = () => {
    if (!isDragging || isAnimating.current) return;
    setIsDragging(false);

    if (dragX > SWIPE_THRESHOLD) {
      goTo("prev");
      return;
    }
    if (dragX < -SWIPE_THRESHOLD) {
      goTo("next");
      return;
    }
    setDragX(0);
  };

  const handlePointerUp = () => {
    finishDrag();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo("prev");
      if (event.key === "ArrowRight") goTo("next");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  const stackSize = Math.min(3, count);
  const stackProjects = Array.from({ length: stackSize }, (_, offset) => {
    return projects[(index + offset) % count];
  });

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
          {count > 1 && (
            <p className="mt-2 text-xs text-muted-foreground/70">
              {t.swipeHint}
            </p>
          )}
        </div>

        <div className="relative mx-auto h-[32rem] w-full max-w-md sm:h-[34rem] sm:max-w-lg">
          {stackProjects
            .slice()
            .reverse()
            .map((project, reverseIndex) => {
              const stackIndex = stackSize - 1 - reverseIndex;
              const isTop = stackIndex === 0;

              let transform = "";
              let opacity = 1;
              let zIndex = stackSize - stackIndex;

              if (isTop) {
                if (exitDirection === "left") {
                  transform = "translateX(-130%) rotate(-12deg)";
                  opacity = 0;
                } else if (exitDirection === "right") {
                  transform = "translateX(130%) rotate(12deg)";
                  opacity = 0;
                } else {
                  const rotate = dragX * 0.04;
                  transform = `translateX(${dragX}px) rotate(${rotate}deg)`;
                }
              } else {
                const scale = 1 - stackIndex * 0.04;
                const translateY = stackIndex * 14;
                transform = `scale(${scale}) translateY(${translateY}px)`;
                opacity = 1 - stackIndex * 0.12;
                zIndex = stackSize - stackIndex;
              }

              return (
                <div
                  key={`${project.title}-${stackIndex}-${index}`}
                  className="absolute inset-x-0 top-0 touch-none select-none"
                  style={{
                    zIndex,
                    transform,
                    opacity,
                    transition: isDragging
                      ? "none"
                      : "transform 0.28s ease, opacity 0.28s ease",
                    cursor: isTop
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                  }}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerUp : undefined}
                >
                  <ProjectCardContent project={project} t={t} />
                </div>
              );
            })}
        </div>

        {count > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => goTo("prev")}
                aria-label={t.previous}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="min-w-[4rem] text-center text-sm text-muted-foreground tabular-nums">
                {index + 1} / {count}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => goTo("next")}
                aria-label={t.next}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex gap-2">
              {projects.map((project, dotIndex) => (
                <button
                  key={project.title}
                  type="button"
                  aria-label={`${dotIndex + 1}. ${project.title}`}
                  onClick={() => {
                    if (!isAnimating.current) setIndex(dotIndex);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    dotIndex === index
                      ? "w-6 bg-foreground"
                      : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
