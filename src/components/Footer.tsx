"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";
import { footer as footerContent } from "@/content/footer";
import {
  DEFAULT_COLOR_THEME,
  isColorThemeId,
  isThyloChrome,
  usesDarkChrome,
} from "@/config/color-themes";
import { cn } from "@/lib/utils";

export function Footer() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const t = footerContent[language];
  const themeId =
    mounted && theme && isColorThemeId(theme) ? theme : DEFAULT_COLOR_THEME;
  const darkChrome = usesDarkChrome(themeId);
  const thyloChrome = isThyloChrome(themeId);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
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

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <SectionContainer id="contact" variant="featured">
      {/* Main Footer Container */}
      <footer
        ref={sectionRef}
        className={cn(
          "group relative w-full overflow-hidden transition-all duration-500",
          thyloChrome
            ? "thylo-chrome rounded-2xl border overflow-hidden text-slate-700 hover-glow"
            : "rounded-3xl border-2 border-[var(--hero-border)]/80 dark:border-slate-800/50 shadow-lg shadow-slate-900/10 backdrop-blur-[4px] dark:shadow-2xl dark:shadow-black/40 card-gradient-bg hover-glow",
          darkChrome && "dark",
          isVisible ? "card-fade-in-up" : "opacity-0"
        )}
      >
        {/* Shine overlay */}
        <div className="card-shine" />
        {/* Contact section inside footer */}
        <div className="px-6 sm:px-8 lg:px-12 pt-12 pb-8 sm:pt-16 sm:pb-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {t.subtitle}
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="ghost"
                size="lg"
                className="group text-muted-foreground hover:!bg-transparent hover:text-foreground hover:scale-110"
                asChild
              >
                <a
                  href="https://github.com/birkjr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group text-muted-foreground hover:!bg-transparent hover:text-foreground hover:scale-110"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/birkjramstad/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group text-muted-foreground hover:!bg-transparent hover:text-foreground hover:scale-110"
                asChild
              >
                <a href="mailto:birkrams@gmail.com">
                  <Mail className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
                </a>
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200/60 dark:border-slate-800/60 mx-6 sm:mx-8 lg:mx-12" />

          {/* Footer bar: logo, copyright */}
          <div className="py-8 px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-slate-200/70 bg-white/90 shadow-md backdrop-blur-sm nav-chrome-logo sm:h-9 sm:w-9 dark:border-slate-700/50 dark:bg-slate-800/80 dark:shadow-lg">
                  <span className="nav-chrome-logo-text text-xs font-bold text-slate-900 sm:text-sm dark:text-white">
                    BJR
                  </span>
                </div>
                <span className="text-sm sm:text-base text-muted-foreground font-medium">
                  © 2026 Birk Jonathan Ramstad.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </SectionContainer>
  );
}
