"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, LinkedinIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

const content = {
  no: {
    title: "Kontakt meg",
    subtitle: "Er min profil spennende eller har du noe spørsmål? Kontakt meg!",
    cardTitle: "Send meg en melding",
    cardDescription: "Jeg svarer alltid kjapt.",
    cta: "Send melding",
  },
  en: {
    title: "Contact me",
    subtitle:
      "Is my profile interesting or do you have any questions? Contact me!",
    cardTitle: "Send me a message",
    cardDescription: "I always reply fast.",
    cta: "Send message",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = content[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <SectionContainer id="contact" variant="featured">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Container */}
        <footer
          ref={sectionRef}
          className={`group relative w-full rounded-3xl overflow-hidden border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 shadow-lg shadow-slate-900/10 backdrop-blur-[4px] dark:shadow-2xl dark:shadow-black/40 card-gradient-bg hover-glow transition-all duration-500 ${
            isVisible ? "card-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Shine overlay */}
          <div className="card-shine" />
          {/* Contact section inside footer */}
          <div className="px-6 sm:px-8 lg:px-12 pt-12 pb-8 sm:pt-16 sm:pb-12">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t.subtitle}
              </p>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                  asChild
                >
                  <a
                    href="https://github.com/birkjr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-7 h-7" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/birkjramstad/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-7 h-7" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                  asChild
                >
                  <a href="mailto:birkrams@gmail.com">
                    <Mail className="w-7 h-7" />
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
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">BJR</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground font-medium">
                    © 2026 Birk Jonathan Ramstad.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SectionContainer>
  );
}
