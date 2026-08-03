"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TextType from "@/components/TextType";
import { SectionContainer } from "./SectionContainer";
import { hero } from "@/content/hero";

const portraitCardShell =
  "relative rounded-[2rem] overflow-hidden transition-transform duration-150 ease-out will-change-transform bg-gradient-to-b from-white via-[#fdf7f0] to-[#f3e6d6] border border-[#e3d4c3]/80 shadow-lg shadow-slate-900/10 dark:from-slate-900/90 dark:via-slate-950/95 dark:to-black/98 dark:border-slate-800/70 dark:shadow-[0_20px_60px_rgba(15,23,42,0.75)]";

const portraitImageSection =
  "relative overflow-hidden rounded-t-[2rem] bg-slate-100 dark:bg-slate-900";

const portraitImageClass =
  "h-full w-full object-cover brightness-100 dark:brightness-[0.85]";

const portraitFooter =
  "relative z-10 rounded-b-[2rem] border-t border-[#e3d4c3]/60 bg-[#fdf7f0]/95 px-4 py-4 dark:border-slate-800/50 dark:bg-slate-950/95";

const portraitLogoBadge =
  "flex items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 text-[10px] font-semibold text-slate-900 shadow-md dark:border-transparent dark:bg-foreground/90 dark:text-background";

export function Hero() {
  const { language } = useLanguage();
  const t = hero[language];

  // State for 3D tilt on hero portrait
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const [isVisible, setIsVisible] = useState(false);
  // Separate ref for the desktop card only — mobile card never needs observer
  const desktopCardRef = useRef<HTMLDivElement>(null);

  // Global mouse tracking — tilt follows cursor anywhere on screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const percentX = e.clientX / window.innerWidth - 0.5;
      const percentY = e.clientY / window.innerHeight - 0.5;

      setTilt({
        rotateX: percentY * -13,
        rotateY: percentX * 13,
        scale: 1.03,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const node = desktopCardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
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

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const navElement = document.querySelector("nav");
      const navOffset =
        navElement instanceof HTMLElement ? navElement.offsetHeight : 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(elementPosition - navOffset, 0);
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <SectionContainer variant="hero" id="home">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center mt-20 sm:mt-16 md:mt-12 lg:mt-8">
        {/* Left Column - Content */}
        <div className="space-y-6 order-1 lg:order-1 text-center lg:text-left w-full">
          {/* Badge */}
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.info}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="block text-foreground">{t.greeting}</span>
              <span className="block text-foreground">
                <TextType
                  text={[t.name]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </span>
            </h1>
          </div>

          {/* Portrait Card with 3D tilt (shown between description and CTAs on mobile) */}
          <div className="flex justify-center lg:hidden">
            <div className="relative">
              {/* Animated gradient orb behind avatar */}
              <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-slate-400/10 blur-3xl dark:bg-slate-500/10" />

              {/* Mobile card always animates in on mount — no observer needed */}
              <div className="relative z-10 [perspective:1100px] hero-card-slide-up">
                <div
                  className={`relative w-56 sm:w-72 md:w-80 lg:w-80 ${portraitCardShell}`}
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Portrait image section */}
                  <div
                    className={`relative h-64 sm:h-88 md:h-96 ${portraitImageSection}`}
                  >
                    {/* Portrait image (not round) */}
                    <div className="absolute inset-0">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="/Selvportrett-kopi.png"
                          alt="Birk Ramstad"
                          className={portraitImageClass}
                        />
                        <AvatarFallback className="text-4xl font-bold text-foreground">
                          BJR
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Text section below image - dark background, part of card */}
                  <div className={portraitFooter}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          {t.role}
                        </p>
                      </div>
                      <div
                        className={`hidden h-8 w-8 sm:flex ${portraitLogoBadge}`}
                      >
                        BJR
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start sm:items-center gap-3 pt-10">
            <Button
              onClick={() => scrollToSection("#timeline")}
              className="group h-11 border-2 border-slate-200/80 bg-white/90 px-6 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-white dark:border-transparent dark:bg-primary dark:text-primary-foreground dark:shadow-none dark:hover:bg-primary/90"
            >
              {t.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="h-11 border-2 border-slate-200/80 bg-white/60 px-6 text-sm font-semibold text-slate-900 hover:bg-white/90 dark:border-input dark:bg-background dark:text-foreground dark:hover:bg-accent"
            >
              {t.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Right Column - Portrait Card with 3D tilt (desktop only) */}
        <div className="hidden lg:flex justify-end order-2">
          <div className="relative" ref={desktopCardRef}>
            {/* Animated gradient orb behind avatar */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-slate-400/10 blur-3xl dark:bg-slate-500/10" />

            {/* 3D tilt wrapper with deep slide-in animation */}
            <div
              className={`relative z-10 flex flex-col items-center [perspective:1100px] ${
                isVisible
                  ? "hero-card-slide-up"
                  : "opacity-0 translate-y-[260px] scale-[0.94]"
              }`}
            >
              <div
                className={`relative w-[21.5rem] ${portraitCardShell}`}
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Portrait image section */}
                <div className={`relative h-96 ${portraitImageSection}`}>
                  {/* Portrait image (not round) */}
                  <div className="absolute inset-0">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src="/Selvportrett-kopi.png"
                        alt="Birk Ramstad"
                        className={portraitImageClass}
                      />
                      <AvatarFallback className="text-4xl font-bold text-foreground">
                        BJR
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Text section below image - dark background, part of card */}
                <div className={portraitFooter}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {t.role}
                      </p>
                    </div>
                    <div className={`h-8 w-8 ${portraitLogoBadge}`}>BJR</div>
                  </div>
                  <div className="flex flex-nowrap items-center gap-1.5">
                    <div className="shrink-0 rounded-lg border border-border/50 bg-muted/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {t.location}
                      </span>
                    </div>
                    <div className="shrink-0 rounded-lg border border-border/50 bg-muted/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {t.born}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex w-[21.5rem] items-center justify-center gap-4 pt-12">
                <a
                  href="https://github.com/birkjr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/birkjramstad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
                <a
                  href="mailto:birkrams@gmail.com"
                  className="group flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
