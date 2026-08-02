"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  educationSection,
  getEducationEntries,
  type EducationIcon,
} from "@/content/education";
import { SectionContainer } from "./SectionContainer";

const EDUCATION_ICONS: Record<EducationIcon, LucideIcon> = {
  graduationCap: GraduationCap,
  school: School,
};

export function Education() {
  const { language } = useLanguage();
  const educations = getEducationEntries(language);
  const t = educationSection[language];

  return (
    <SectionContainer id="education">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {educations.map((education, index) => {
            const IconComponent = EDUCATION_ICONS[education.icon];
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
