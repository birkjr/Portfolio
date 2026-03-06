"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills_no: Skill[] = [
  { name: "React.js", level: 85, category: "Frontend" },
  { name: "React Native", level: 80, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Webutvikling", level: 90, category: "Frontend" },
  { name: "Python", level: 90, category: "Frontend" },
  { name: "Java", level: 75, category: "Backend" },
  { name: "JavaScript", level: 75, category: "Frontend" },
  { name: "HTML", level: 70, category: "Frontend" },
  { name: "CSS", level: 80, category: "Frontend" },
  { name: "Tailwind", level: 85, category: "Frontend" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "Supabase", level: 95, category: "Backend" },
  { name: "Firebase", level: 50, category: "Backend" },
  { name: "Ghidra", level: 80, category: "Reverse Engineering" },
  { name: "Binary Analysis", level: 75, category: "Reverse Engineering" },
  { name: "Reverse Engineering", level: 80, category: "Reverse Engineering" },
  { name: "Assembly", level: 70, category: "Reverse Engineering" },
  { name: "C", level: 75, category: "Reverse Engineering" },
  { name: "Debugging", level: 80, category: "Reverse Engineering" },
  { name: "Static Analysis", level: 75, category: "Reverse Engineering" },
  { name: "Github", level: 95, category: "Tools" },
  { name: "Gitlab", level: 75, category: "Tools" },
  { name: "Vercel", level: 95, category: "Tools" },
  { name: "Expo", level: 80, category: "Tools" },
  { name: "Expo Go", level: 80, category: "Tools" },
  { name: "Swift", level: 70, category: "Frontend" },
  { name: "SwiftUI", level: 70, category: "Frontend" },
];

const skills_en: Skill[] = [
  { name: "React.js", level: 85, category: "Frontend" },
  { name: "React Native", level: 80, category: "Frontend" },
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "Web Development", level: 90, category: "Frontend" },
  { name: "Python", level: 90, category: "Frontend" },
  { name: "Java", level: 75, category: "Backend" },
  { name: "JavaScript", level: 75, category: "Frontend" },
  { name: "HTML", level: 70, category: "Frontend" },
  { name: "CSS", level: 80, category: "Frontend" },
  { name: "Tailwind", level: 85, category: "Frontend" },
  { name: "MySQL", level: 80, category: "Backend" },
  { name: "Supabase", level: 95, category: "Backend" },
  { name: "Firebase", level: 50, category: "Backend" },
  { name: "Ghidra", level: 80, category: "Reverse Engineering" },
  { name: "Binary Analysis", level: 75, category: "Reverse Engineering" },
  { name: "Reverse Engineering", level: 80, category: "Reverse Engineering" },
  { name: "Assembly", level: 70, category: "Reverse Engineering" },
  { name: "C", level: 75, category: "Reverse Engineering" },
  { name: "Debugging", level: 80, category: "Reverse Engineering" },
  { name: "Static Analysis", level: 75, category: "Reverse Engineering" },
  { name: "Github", level: 95, category: "Tools" },
  { name: "Gitlab", level: 75, category: "Tools" },
  { name: "Vercel", level: 95, category: "Tools" },
  { name: "Expo", level: 80, category: "Tools" },
  { name: "Expo Go", level: 80, category: "Tools" },
  { name: "Swift", level: 70, category: "Frontend" },
  { name: "SwiftUI", level: 70, category: "Frontend" },
];

const categories = {
  no: ["Frontend", "Backend", "Reverse Engineering", "Tools"],
  en: ["Frontend", "Backend", "Reverse Engineering", "Tools"],
};

const content = {
  no: {
    label: "Ferdigheter",
    title: "Ferdigheter",
    subtitle: "Teknologier og verktøy jeg jobber med for å skape løsninger.",
  },
  en: {
    label: "Skills",
    title: "Skills",
    subtitle: "Technologies and tools I work with to create solutions.",
  },
};

export function Skills() {
  const { language } = useLanguage();
  const skills = language === "no" ? skills_no : skills_en;
  const categories_list = categories[language];
  const t = content[language];

  return (
    <SectionContainer id="skills">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm mb-4">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {t.label}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Skills Grid (4 boxes) */}
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          {categories_list.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            if (categorySkills.length === 0) return null;

            return (
              <Card
                key={category}
                className="group hover-glow transition-all duration-300 border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 card-gradient-bg"
              >
                <CardHeader className="p-4 pb-3">
                  <CardTitle className="text-base sm:text-lg font-bold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {categorySkills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs font-semibold border-blue-500/30 text-blue-600 dark:text-blue-400"
                          >
                            {skill.level}%
                          </Badge>
                        </div>
                        <Progress
                          value={skill.level}
                          className="h-2 bg-muted"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
