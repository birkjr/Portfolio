"use client";

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
import { GitHubCommitsChart } from "@/components/GitHubCommitsChart";
import TextType from "@/components/TextType";
import { SectionContainer } from "./SectionContainer";

export function Hero() {
  const { language } = useLanguage();

  const content = {
    no: {
      info: "Datateknologi student ved NTNU",
      role: "Full-Stack Developer",
      greeting: "Hei, jeg er",
      name: "Birk Jonathan Ramstad",
      description:
        "Student ved NTNU som driver med full-stack utvikling. Kombinerer studier i datateknologi med praktisk erfaring i moderne webutvikling, brukeropplevelse og cybersikkerhet.",
      location: "Trondheim/Oslo, Norge",
      born: "Født 5. april 2003",
      cta: "Se prosjekter",
      ctaSecondary: "Kontakt meg",
    },
    en: {
      info: "Computer Science student at NTNU",
      role: "Full-Stack Developer",
      greeting: "Hello, I'm",
      name: "Birk Jonathan Ramstad",
      description:
        "Student at NTNU working with full-stack development. Combines studies in computer science with practical experience in modern web development, user experience and cybersecurity.",
      location: "Trondheim/Oslo, Norway",
      born: "Born April 5th, 2003",
      cta: "View Projects",
      ctaSecondary: "Get in Touch",
    },
  };

  const t = content[language];

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
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column - Content */}
        <div className="space-y-6">
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
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
          <div className="flex items-center gap-4 pt-2">
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
          <div className="flex flex-wrap items-center gap-3 pt-1">
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

        {/* Right Column - Avatar & Chart */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative flex flex-col items-center">
            {/* Animated gradient orb behind avatar */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />

            {/* Avatar with gradient border */}
            <div className="relative z-10">
              <div className="relative p-1 rounded-full bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/98 dark:from-slate-900/90 dark:via-slate-950/95 dark:to-black/98 border-2 border-slate-800/50 dark:border-slate-800/50">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-background p-2">
                  <Avatar className="w-full h-full rounded-full">
                    <AvatarImage
                      src="/Selvportrett-kopi.png"
                      alt="Birk Ramstad"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      BJR
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            {/* GitHub commits chart */}
            <div className="w-full max-w-xs mt-6 relative z-10">
              <GitHubCommitsChart
                username="birkjr"
                githubToken={process.env.NEXT_PUBLIC_GITHUB_TOKEN}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
