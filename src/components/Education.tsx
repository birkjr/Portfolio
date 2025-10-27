"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
    description: "3. år av 5-årig integrert masterprogram i datateknologi. Byttet fra Ingeniørvitenskap og IKT på 3. klasse. Fokus på kunstig intelligens, IoT, bærekraftige løsninger og utvikling av komplekse IT-systemer.",
    icon: GraduationCap
  },
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Ingeniørvitenskap og IKT - Maskin og IKT (maskinlæring)",
    period: "2023 - 2025",
    description: "Etter 2 år med Ingeniørvitenskap og IKT og retningen Maskin og IKT med fokus på maskinlæring, valgte jeg å følge magefølelsen til å bytte til Datateknologi - fagene jeg elsket mest.",
    icon: GraduationCap
  },
  {
    institution: "Universitetet i Oslo (UiO)",
    program: "Årsenhet, Informatikk",
    period: "2022 - 2023",
    description: "Preliminære fag i informatikk og informatikk-relaterte disipliner.",
    icon: GraduationCap
  },
  {
    institution: "Norges Toppidrettsskole",
    program: "Toppidrett Fotball (Stabæk)",
    period: "2019 - 2022",
    description: "Kombinert toppidrett og videregående skole med toppidrett i fotball.",
    icon: School
  }
];

const educations_en: Education[] = [
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Computer Science (5-year master's)",
    period: "2025 - 2028",
    description: "3rd year of a 5-year integrated master's program in computer science. Switched from Engineering Science and ICT in 3rd year. Focus on artificial intelligence, IoT, sustainable solutions, and development of complex IT systems.",
    icon: GraduationCap
  },
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Engineering Science and ICT - Machine and ICT (machine learning)",
    period: "2023 - 2025",
    description: "After 2 years with Engineering Science and ICT and the specialization Machine and ICT with focus on machine learning, I chose to follow my gut feeling and switch to Computer Science - the subjects I loved most.",
    icon: GraduationCap
  },
  {
    institution: "University of Oslo (UiO)",
    program: "One-year program, Informatics",
    period: "2022 - 2023",
    description: "Preliminary subjects in informatics and informatics-related disciplines.",
    icon: GraduationCap
  },
  {
    institution: "Norwegian College of Elite Sport",
    program: "Elite Sport Football (Stabæk)",
    period: "2019 - 2022",
    description: "Combined elite sport and high school with elite sport in football.",
    icon: School
  }
];

const content = {
  no: {
    label: "Utdanning",
    title: "Utdanning",
    subtitle: "Mitt utdanningsløp"
  },
  en: {
    label: "Education",
    title: "Education",
    subtitle: "My educational journey"
  }
};

export function Education() {
  const { language } = useLanguage();
  const educations = language === 'no' ? educations_no : educations_en;
  const t = content[language];

  return (
    <section id="education" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">{t.label}</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">{t.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.map((education, index) => {
            const IconComponent = education.icon;
            return (
              <Card key={index} className="glass hover-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-2">{education.institution}</CardTitle>
                      <CardDescription className="text-blue-300 font-medium mb-2">
                        {education.program}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {education.period}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {education.description && (
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {education.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
