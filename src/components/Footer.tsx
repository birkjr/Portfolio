"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, LinkedinIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  no: {
    title: "Kontakt meg",
    subtitle: "Er min profil spennende eller har du noe spørsmål? Kontakt meg!",
    cardTitle: "Send meg en melding",
    cardDescription: "Jeg svarer alltid kjapt.",
  },
  en: {
    title: "Contact me",
    subtitle:
      "Is my profile interesting or do you have any questions? Contact me!",
    cardTitle: "Send me a message",
    cardDescription: "I always reply fast.",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="contact" className="pt-20 pb-2">
      {/* Rounded footer container - mørk, samme stil som navbar, i både light og dark */}
      <footer className="w-full rounded-2xl overflow-hidden border-2 border-slate-800/50 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/98 shadow-2xl shadow-black/40 backdrop-blur-[4px]">
        {/* Contact section inside footer */}
        <div className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-16 sm:pb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto px-2">
              {t.subtitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{t.cardTitle}</CardTitle>
                <CardDescription>{t.cardDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Button variant="outline" className="h-14 sm:h-16" asChild>
                    <a
                      href="mailto:birkrams@gmail.com"
                      className="text-sm sm:text-base"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="truncate">birkrams@gmail.com</span>
                    </a>
                  </Button>
                  <Button variant="outline" className="h-14 sm:h-16" asChild>
                    <a
                      href="https://www.linkedin.com/in/birkjramstad/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base"
                    >
                      <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800/60 mx-4 sm:mx-6 lg:mx-8" />

          {/* Footer bar: logo, copyright, socials */}
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">BJR</span>
                </div>
                <span className="text-xs sm:text-sm text-slate-300">
                  © 2026 Birk Jonathan Ramstad.
                </span>
              </div>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://github.com/birkjr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://www.linkedin.com/in/birkjramstad/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="mailto:birkrams@gmail.com">
                    <Mail className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
