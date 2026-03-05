"use client";

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
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const t = content[language];

  return (
    <SectionContainer id="contact" variant="featured">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Container */}
        <footer
          className="w-full rounded-3xl overflow-hidden border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 shadow-lg shadow-slate-900/10 backdrop-blur-[4px] dark:shadow-2xl dark:shadow-black/40"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(to bottom, rgb(15 23 42 / 0.9), rgb(2 6 23 / 0.95), rgb(0 0 0 / 0.98))"
                : "linear-gradient(to bottom, #fefefe, #fafafa, #f5f5f5)",
          }}
        >
          {/* Contact section inside footer */}
          <div className="px-6 sm:px-8 lg:px-12 pt-12 pb-8 sm:pt-16 sm:pb-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-foreground">
                {t.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </div>

            {/* Contact Card */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card
                className="border-slate-200/60 dark:border-slate-700/50 shadow-xl"
                style={{
                  background:
                    theme === "dark"
                      ? "rgb(15 23 42 / 0.5)"
                      : "rgba(255, 255, 255, 0.9)",
                }}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                    {t.cardTitle}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {t.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-12 text-sm font-semibold text-foreground border-2 hover:bg-accent transition-all duration-300"
                      asChild
                    >
                      <a href="mailto:birkrams@gmail.com">
                        <Mail className="w-4 h-4 mr-2 text-foreground" />
                        <span>birkrams@gmail.com</span>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 text-sm font-semibold text-foreground border-2 hover:bg-accent transition-all duration-300"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/birkjramstad/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinIcon className="w-4 h-4 mr-2 text-foreground" />
                        <span>LinkedIn</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200/60 dark:border-slate-800/60 mx-6 sm:mx-8 lg:mx-12" />

            {/* Footer bar: logo, copyright, socials */}
            <div className="py-8 px-6 sm:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">BJR</span>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground font-medium">
                    © 2026 Birk Jonathan Ramstad.
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                    asChild
                  >
                    <a
                      href="https://github.com/birkjr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/birkjramstad/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                    asChild
                  >
                    <a href="mailto:birkrams@gmail.com">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SectionContainer>
  );
}
