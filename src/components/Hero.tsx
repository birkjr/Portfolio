"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TextType from "@/components/TextType";
import { SectionContainer } from "./SectionContainer";

export function Hero() {
  const { language } = useLanguage();

  const content = {
    no: {
      info: "Gründer og CTO for Thylo Insight",
      role: "Full-Stack Developer",
      greeting: "Hei, jeg er",
      name: "Birk Jonathan Ramstad",
      description:
        "Gründer og CTO for Thylo Insight. Full-stack utvikler fokusert på AI-systemer, cybersikkerhet og moderne web-infrastruktur.",
      location: "Trondheim/Oslo, Norge",
      born: "Født 5. april 2003",
      cta: "Se prosjekter",
      ctaSecondary: "Kontakt meg",
    },
    en: {
      info: "Founder and CTO of Thylo Insight",
      role: "Full-Stack Developer",
      greeting: "Hello, I'm",
      name: "Birk Jonathan Ramstad",
      description:
        "Founder and CTO of Thylo Insight. Full-stack engineer focused on AI systems, cybersecurity and modern web infrastructure.",
      location: "Trondheim/Oslo, Norway",
      born: "Born April 5th, 2003",
      cta: "View Projects",
      ctaSecondary: "Get in Touch",
    },
  };

  const t = content[language];

  // State for 3D tilt + shine on hero portrait
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const [shine, setShine] = useState({
    x: 50,
    y: 50,
    intensity: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      { threshold: 0.1 }
    );

    if (heroImageRef.current) {
      observer.observe(heroImageRef.current);
    }

    return () => {
      if (heroImageRef.current) {
        observer.unobserve(heroImageRef.current);
      }
    };
  }, []);

  const handleTiltMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    const rotateX = percentY * -14; // invert so it tilts correctly
    const rotateY = percentX * 14;

    setTilt({
      rotateX,
      rotateY,
      scale: 1.04,
    });

    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      intensity: 1,
    });
  };

  const handleTiltLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });

    setShine((prev) => ({
      ...prev,
      intensity: 0,
    }));
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {t.info}
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="block text-foreground">{t.greeting}</span>
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                <TextType
                  text={[t.name]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Portrait Card with 3D tilt (shown between description and CTAs on mobile) */}
          <div className="flex justify-center lg:hidden">
            <div className="relative" ref={heroImageRef}>
              {/* Animated gradient orb behind avatar */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/18 via-cyan-500/20 to-blue-500/18 rounded-[2.25rem] blur-3xl animate-pulse" />

              {/* 3D tilt wrapper with deep slide-in animation */}
              <div
                className={`relative z-10 [perspective:1100px] ${
                  isVisible
                    ? "hero-card-slide-up"
                    : "opacity-0 translate-y-[260px] scale-[0.94]"
                }`}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div
                  className="relative w-56 sm:w-72 md:w-80 lg:w-80 rounded-[2rem] bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/98 border border-slate-800/70 shadow-[0_20px_60px_rgba(15,23,42,0.75)] overflow-hidden transition-transform duration-150 ease-out will-change-transform"
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Portrait image section */}
                  <div className="relative h-64 sm:h-88 md:h-96 bg-slate-900 overflow-hidden rounded-t-[2rem]">
                    {/* Portrait image (not round) */}
                    <div className="absolute inset-0">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage
                          src="/Selvportrett-kopi.png"
                          alt="Birk Ramstad"
                          className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                          BJR
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  {/* Text section below image - dark background, part of card */}
                  <div className="bg-slate-950/95 px-4 py-4 rounded-b-[2rem] border-t border-slate-800/50 relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-slate-300">
                          {t.role} · Thylo Insight
                        </p>
                      </div>
                      <div className="hidden sm:flex w-8 h-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 items-center justify-center text-[10px] font-semibold text-white shadow-md">
                        BJR
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center rounded-full bg-blue-500/15 border border-blue-400/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                        NTNU
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-400/40 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                        AI &amp; Security
                      </span>
                      <span className="inline-flex items-center rounded-full bg-sky-500/15 border border-sky-400/40 px-2 py-0.5 text-[10px] font-medium text-sky-200">
                        Founder
                      </span>
                    </div>
                  </div>

                  {/* Shine overlay that follows cursor across the whole card */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-screen transition-opacity duration-150 z-30"
                    style={{
                      opacity: shine.intensity,
                      background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(59,130,246,0.45), transparent 60%), radial-gradient(circle at ${100 - shine.x}% ${100 - shine.y}%, rgba(56,189,248,0.35), transparent 65%)`,
                      transform: "translateZ(40px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center lg:items-start sm:items-center gap-3 pt-2">
            <Button
              onClick={() => scrollToSection("#projects")}
              className="group h-11 px-6 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              {t.cta}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              className="h-11 px-6 text-sm font-semibold border-2 hover:bg-accent transition-all duration-300"
            >
              {t.ctaSecondary}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
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

          {/* Location & Date */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-xs text-muted-foreground">
                {t.location}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 backdrop-blur-sm border border-border/50">
              <Calendar className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs text-muted-foreground">{t.born}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Portrait Card with 3D tilt (desktop only) */}
        <div className="hidden lg:flex justify-end order-2">
          <div className="relative" ref={heroImageRef}>
            {/* Animated gradient orb behind avatar */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/18 via-cyan-500/20 to-blue-500/18 rounded-[2.25rem] blur-3xl animate-pulse" />

            {/* 3D tilt wrapper with deep slide-in animation */}
            <div
              className={`relative z-10 [perspective:1100px] ${
                isVisible
                  ? "hero-card-slide-up"
                  : "opacity-0 translate-y-[260px] scale-[0.94]"
              }`}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
              <div
                className="relative w-80 rounded-[2rem] bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/98 border border-slate-800/70 shadow-[0_20px_60px_rgba(15,23,42,0.75)] overflow-hidden transition-transform duration-150 ease-out will-change-transform"
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Portrait image section */}
                <div className="relative h-96 bg-slate-900 overflow-hidden rounded-t-[2rem]">
                  {/* Portrait image (not round) */}
                  <div className="absolute inset-0">
                    <Avatar className="w-full h-full rounded-none">
                      <AvatarImage
                        src="/Selvportrett-kopi.png"
                        alt="Birk Ramstad"
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        BJR
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Text section below image - dark background, part of card */}
                <div className="bg-slate-950/95 px-4 py-4 rounded-b-[2rem] border-t border-slate-800/50 relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        {t.role} · Thylo Insight
                      </p>
                    </div>
                    <div className="flex w-8 h-8 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 items-center justify-center text-[10px] font-semibold text-white shadow-md">
                      BJR
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-blue-500/15 border border-blue-400/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                      NTNU
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-400/40 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                      AI &amp; Security
                    </span>
                    <span className="inline-flex items-center rounded-full bg-sky-500/15 border border-sky-400/40 px-2 py-0.5 text-[10px] font-medium text-sky-200">
                      Founder
                    </span>
                  </div>
                </div>

                {/* Shine overlay that follows cursor across the whole card */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-screen transition-opacity duration-150 z-30"
                  style={{
                    opacity: shine.intensity,
                    background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(59,130,246,0.45), transparent 60%), radial-gradient(circle at ${100 - shine.x}% ${100 - shine.y}%, rgba(56,189,248,0.35), transparent 65%)`,
                    transform: "translateZ(40px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
