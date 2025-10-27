"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Code,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();

  const content = {
    no: {
      info: "Datateknologi student ved NTNU",
      role: "Full-Stack Developer",
      greeting: "Hei, jeg er",
      name: "Birk Jonathan Ramstad",
      description: "Student ved NTNU som driver med full-stack utvikling. Kombinerer studier i datateknologi med praktisk erfaring i moderne webutvikling og brukeropplevelse.",
      location: "Trondheim/Oslo, Norge",
      born: "Født 2003"
    },
    en: {
      info: "Computer Science student at NTNU",
      role: "Full-Stack Developer",
      greeting: "Hello, I'm",
      name: "Birk Jonathan Ramstad",
      description: "Student at NTNU working with full-stack development. Combines studies in computer science with practical experience in modern web development and user experience.",
      location: "Trondheim/Oslo, Norway",
      born: "Born 2003"
    }
  };

  const t = content[language];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-400 font-medium">
                  {t.info}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-400 font-medium">
                  {t.role}
                </span>
                
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in leading-tight">
                {t.greeting}{" "}
                <span className="text-gradient">{t.name}</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-6">
              <div className="flex items-center space-x-2 glass rounded-full px-3 py-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{t.location}</span>
              </div>
              <div className="flex items-center space-x-2 glass rounded-full px-3 py-2">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-sm">{t.born}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-slide-in-right mt-8 lg:mt-0">
            <div className="relative">
              {/* Main avatar circle with gradient border */}
              <div className="gradient-border p-1">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center glass relative overflow-hidden">
                  <Avatar className="w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full">
                    <AvatarImage
                      src="/Selvportrett-kopi.png"
                      alt="Birk Ramstad"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient bg-transparent">
                      BR
                    </AvatarFallback>
                  </Avatar>

                  {/* Floating elements */}
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce neon-glow">
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
