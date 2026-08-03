"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TextType from "@/components/TextType";
import { SectionContainer } from "./SectionContainer";
import { hero } from "@/content/hero";

const heroAccentSurface =
  "border-[var(--hero-border)]/80 dark:border-slate-800/50 card-gradient-bg";

const portraitCardShell =
  "relative rounded-[2rem] overflow-hidden transition-transform duration-150 ease-out will-change-transform bg-gradient-to-b from-white via-[#fdf7f0] to-[#f3e6d6] border border-[var(--hero-border)]/80 shadow-lg shadow-slate-900/10 dark:from-slate-900/90 dark:via-slate-950/95 dark:to-black/98 dark:border-slate-800/70 dark:shadow-[0_20px_60px_rgba(15,23,42,0.75)]";

const portraitImageSection =
  "relative overflow-hidden rounded-t-[2rem] bg-slate-200 dark:bg-slate-900";

const portraitFooter = `relative z-10 rounded-b-[2rem] border-t-2 ${heroAccentSurface} px-4 py-4`;

const portraitLogoBadge =
  "flex items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 text-[10px] font-semibold text-slate-900 shadow-md dark:border-transparent dark:bg-foreground/90 dark:text-background";

const socialButtonShell = `group relative flex h-11 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-md border-2 ${heroAccentSurface} shadow-sm hover:border-[var(--hero-border)] hover-glow`;

function PortraitImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-200 text-4xl font-bold text-foreground dark:bg-slate-900 dark:text-white">
        BJR
      </div>
    );
  }

  return (
    <>
      <Image
        src="/paint_portrait_1.png"
        alt="Birk Ramstad"
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 416px, 448px"
        className="h-full w-full object-cover object-[center_14%] dark:brightness-[0.94]"
        onError={() => setHasError(true)}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent dark:from-black/30"
        aria-hidden
      />
    </>
  );
}

function PortraitImageFrame() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <PortraitImage />
    </div>
  );
}

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
      <div className="mt-20 flex flex-col items-center gap-6 sm:mt-16 md:mt-12 lg:mt-0 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-12">
        {/* Left Column - Content */}
        <div className="order-1 flex w-full flex-col items-center gap-14 text-center sm:gap-16 lg:grid lg:h-full lg:grid-rows-[1fr_auto] lg:items-start lg:gap-14 lg:text-left">
          <div className="flex w-full flex-col items-center gap-14 sm:gap-16 lg:items-start lg:gap-14">
            {/* Badge */}
            <div className="section-badge">
              <div className="section-badge-dot" />
              <span className="section-badge-label">{t.info}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground dark:text-slate-300">
              <span className="block">{t.greeting}</span>
              <span className="block min-h-[2.6em]">
                <TextType
                  text={[t.name]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </span>
            </h1>

            {/* Portrait Card with 3D tilt (shown between description and CTAs on mobile) */}
            <div className="flex justify-center lg:hidden">
              <div className="relative">
                {/* Animated gradient orb behind avatar */}
                <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-slate-400/10 blur-3xl dark:bg-slate-500/10" />

                {/* Mobile card always animates in on mount — no observer needed */}
                <div className="relative z-10 [perspective:1100px] hero-card-slide-up">
                  <div
                    className={`relative w-72 sm:w-[26rem] md:w-[26rem] ${portraitCardShell}`}
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
                      <PortraitImageFrame />
                    </div>

                    {/* Text section below image - dark background, part of card */}
                    <div className={portraitFooter}>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {t.name}
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
          </div>

          {/* CTAs — fixed bottom row on desktop, independent of name height */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center lg:h-11 lg:shrink-0 lg:items-start">
            <Button
              onClick={() => scrollToSection("#journal")}
              className="group h-11 border-2 border-slate-200/80 bg-white px-6 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-white dark:border-slate-600/35 dark:bg-slate-900/45 dark:text-slate-300 dark:shadow-none dark:backdrop-blur-sm dark:hover:border-slate-500/45 dark:hover:bg-slate-800/55"
            >
              {t.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className={`group relative h-11 overflow-hidden border-2 ${heroAccentSurface} px-6 text-sm font-semibold text-slate-900 shadow-sm hover:border-[var(--hero-border)] hover-glow dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent`}
            >
              <div className="card-shine" aria-hidden />
              <span className="relative z-10">{t.ctaSecondary}</span>
            </Button>
          </div>
        </div>

        {/* Right Column - Portrait Card with 3D tilt (desktop only) */}
        <div className="order-2 hidden lg:grid lg:h-full lg:grid-rows-[1fr_auto] lg:justify-items-end lg:gap-14">
          <div className="relative self-end" ref={desktopCardRef}>
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
                className={`relative w-[28rem] ${portraitCardShell}`}
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Portrait image section */}
                <div className={`relative h-96 ${portraitImageSection}`}>
                  {/* Portrait image (not round) */}
                  <PortraitImageFrame />
                </div>

                {/* Text section below image - dark background, part of card */}
                <div className={portraitFooter}>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="shrink-0 rounded-lg border border-border/50 bg-muted/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {t.role}
                      </span>
                    </div>
                    <div className="shrink-0 rounded-lg border border-border/50 bg-muted/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {t.born}
                      </span>
                    </div>
                    <div className="shrink-0 rounded-lg border border-border/50 bg-muted/50 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                        {t.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links — aligned with CTAs on the left */}
          <div className="flex w-[28rem] shrink-0 items-center justify-between gap-4 self-end">
            <a
              href="https://github.com/birkjr"
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialButtonShell} text-muted-foreground transition-colors hover:text-foreground`}
            >
              <div className="card-shine" aria-hidden />
              <Github className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-xs font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/birkjramstad/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${socialButtonShell} text-muted-foreground transition-colors hover:text-foreground`}
            >
              <div className="card-shine" aria-hidden />
              <Linkedin className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-xs font-medium">
                LinkedIn
              </span>
            </a>
            <a
              href="mailto:birkrams@gmail.com"
              className={`${socialButtonShell} text-muted-foreground transition-colors hover:text-foreground`}
            >
              <div className="card-shine" aria-hidden />
              <Mail className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="relative z-10 text-xs font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
