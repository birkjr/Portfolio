"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface Education {
  institution: string;
  program: string;
  period: string;
  description?: string;
  icon: LucideIcon;
}

const educations_no: Education[] = [
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Datateknologi (5-årig master)",
    period: "2025 - 2028",
    description:
      "3. år av 5-årig integrert masterprogram i datateknologi. Byttet fra Ingeniørvitenskap og IKT i 3. klasse. Fokus på kunstig intelligens, IoT, bærekraftige løsninger og utvikling av komplekse IT-systemer.",
    icon: GraduationCap,
  },
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Ingeniørvitenskap og IKT - Maskin og IKT (maskinlæring)",
    period: "2023 - 2025",
    description:
      "Etter 2 år med Ingeniørvitenskap og IKT og retningen Maskin og IKT med fokus på maskinlæring, valgte jeg å følge magefølelsen til å bytte til Datateknologi.",
    icon: GraduationCap,
  },
  {
    institution: "Universitetet i Oslo (UiO)",
    program: "Årsenhet, Informatikk",
    period: "2022 - 2023",
    description: "Fag i informatikk og informatikk-relaterte disipliner.",
    icon: GraduationCap,
  },
  {
    institution: "Norges Toppidrettsskole",
    program: "Stabæk Fotball",
    period: "2019 - 2022",
    description: "Kombinerte toppidrett i fotball og videregående skole.",
    icon: School,
  },
];

const educations_en: Education[] = [
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Computer Science (5-year master's)",
    period: "2025 - 2028",
    description:
      "3rd year of a 5-year integrated master's program in computer science. Switched from Engineering Science and ICT in 3rd year. Focus on artificial intelligence, IoT, sustainable solutions, and development of complex IT systems.",
    icon: GraduationCap,
  },
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Engineering Science and ICT - Machine and ICT (machine learning)",
    period: "2023 - 2025",
    description:
      "After 2 years with Engineering Science and ICT and the specialization Machine and ICT with focus on machine learning, I chose to follow my gut feeling and switch to Computer Science.",
    icon: GraduationCap,
  },
  {
    institution: "University of Oslo (UiO)",
    program: "One-year program, Informatics",
    period: "2022 - 2023",
    description:
      "Preliminary subjects in informatics and informatics-related disciplines.",
    icon: GraduationCap,
  },
  {
    institution: "Norwegian College of Elite Sport",
    program: "Stabæk Football Academy",
    period: "2019 - 2022",
    description: "Combined high school education with elite sport.",
    icon: School,
  },
];

const content = {
  no: {
    label: "Utdanning",
    title: "Utdanning",
    subtitle: "Min utdanningsreise",
  },
  en: {
    label: "Education",
    title: "Education",
    subtitle: "My educational journey",
  },
};

export function Education() {
  const { language } = useLanguage();
  const educations = language === "no" ? educations_no : educations_en;
  const t = content[language];

  return (
    <SectionContainer id="education">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="section-badge">
            <div className="section-badge-dot" />
            <span className="section-badge-label">{t.label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {educations.map((education, index) => {
            const IconComponent = education.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden hover-glow transition-all duration-300 border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-black/10 card-gradient-bg"
              >
                <div className="card-shine" />
                <CardHeader className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground/85 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-foreground transition-colors">
                        {education.institution}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground font-semibold text-xs sm:text-sm mb-2">
                        {education.program}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {education.period}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                {education.description && (
                  <CardContent className="p-4 pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                      {education.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
