"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "@/components/animations/SectionContainer";
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
      <footer
        ref={sectionRef}
        className={cn(
          "group footer-card",
          thyloChrome
            ? "thylo-chrome footer-card--thylo"
            : "footer-card--default",
          darkChrome && "dark",
          isVisible ? "footer-card--visible" : "footer-card--hidden"
        )}
      >
        <div className="card-shine" />

        <div className="footer-inner">
          <div className="footer-header">
            <h2 className="footer-title">{t.title}</h2>
            <p className="footer-subtitle">{t.subtitle}</p>

            <div className="footer-social-row">
              <Button
                variant="ghost"
                size="lg"
                className="group footer-social-btn"
                asChild
              >
                <a
                  href="https://github.com/birkjr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="footer-social-icon" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group footer-social-btn"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/birkjramstad/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="footer-social-icon" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group footer-social-btn"
                asChild
              >
                <a href="mailto:birkrams@gmail.com">
                  <Mail className="footer-social-icon" />
                </a>
              </Button>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bar">
            <div className="footer-bar-inner">
              <div className="footer-brand-row">
                <div className="nav-chrome-logo footer-logo-badge">
                  <span className="nav-chrome-logo-text footer-logo-text">
                    BJR
                  </span>
                </div>
                <span className="footer-copyright">
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
