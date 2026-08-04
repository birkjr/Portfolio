"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { SectionContainer } from "@/components/animations/SectionContainer";
import { cn, getGridRevealObserverOptions } from "@/lib/utils";
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
      <div className="skills-card-icon-wrap skills-card-icon-wrap--image">
        <Image
          src={item.imageSrc}
          alt={item.name}
          width={56}
          height={56}
          className="skills-card-icon-image"
        />
      </div>
    );
  }

  return (
    <div className="skills-card-icon-shell skills-card-icon-shell--lg">
      {Icon && <Icon className="skills-card-icon" />}
    </div>
  );
}

export function Skills() {
  const { language } = useLanguage();
  const t = skillsSection[language];
  const techItems = getTechItems(language);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasRevealed = useRef(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRevealed.current) {
          hasRevealed.current = true;
          setIsVisible(false);
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
        }
      });
    }, getGridRevealObserverOptions());

    observer.observe(node);

    return () => {
      observer.unobserve(node);
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

  const modal =
    selectedItem && typeof document !== "undefined"
      ? createPortal(
          <>
            <button
              type="button"
              className="modal-backdrop"
              onClick={() => setSelectedSkill(null)}
              aria-label="Close"
            />
            <div className="modal-viewport modal-viewport--skills">
              <Card
                className="modal-card-base skills-modal-card animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedSkill(null)}
                  className="modal-close-btn modal-close-btn--md"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
                <CardHeader className="skills-modal-header">
                  <div className="skills-modal-header-row">
                    <TechIconDisplay item={selectedItem} />
                    <div className="skills-modal-header-text">
                      <CardTitle className="skills-modal-title">
                        {selectedItem.name}
                      </CardTitle>
                      <CardDescription className="skills-modal-description">
                        {selectedItem.group}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">
                    {t.whyHeading}
                  </Badge>
                </CardHeader>
                <CardContent className="skills-modal-body">
                  <p className="skills-modal-text">{selectedItem.why}</p>
                </CardContent>
              </Card>
            </div>
          </>,
          document.body
        )
      : null;

  return (
    <SectionContainer id="skills">
      <div className={cn("page-body", isModalOpen && "page-body--blurred")}>
        <div className="page-header">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="page-title">{t.title}</h2>
          <p className={cn("page-subtitle", "skills-subtitle")}>{t.subtitle}</p>
        </div>

        <div ref={gridRef} className="skills-grid">
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
                className={cn(
                  "group skills-card",
                  isVisible ? "tech-card-slide-up" : "skills-card--hidden"
                )}
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className="card-shine" />
                <CardContent className="skills-card-content">
                  {item.iconType === "image" && item.imageSrc ? (
                    <div className="skills-card-icon-wrap">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="skills-card-icon-image"
                      />
                    </div>
                  ) : (
                    <div className="skills-card-icon-shell">
                      {Icon && <Icon className="skills-card-icon" />}
                    </div>
                  )}
                  <div>
                    <p className="skills-card-name">{item.name}</p>
                    <p className="skills-card-group">{item.group}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {modal}
    </SectionContainer>
  );
}
