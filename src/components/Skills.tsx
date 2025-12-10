"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import { SkillsRadarChart } from "@/components/SkillsRadarChart";

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
  { name: "Forhandling", level: 75, category: "Ledelse" },
  { name: "Ledelse", level: 85, category: "Ledelse" },
  { name: "Markedsføring", level: 75, category: "Business" },
  { name: "Webdesign", level: 80, category: "Design" },
  { name: "Samarbeid", level: 90, category: "Skills" },
  { name: "Kundeservice", level: 85, category: "Skills" },
  { name: "Salg", level: 70, category: "Skills" },
  { name: "Github", level: 95, category: "Tools" },
  { name: "Gitlab", level: 75, category: "Tools" },
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
  { name: "Supabase", level: 90, category: "Backend" },
  { name: "Firebase", level: 50, category: "Backend" },
  { name: "Ghidra", level: 80, category: "Reverse Engineering" },
  { name: "Binary Analysis", level: 75, category: "Reverse Engineering" },
  { name: "Reverse Engineering", level: 80, category: "Reverse Engineering" },
  { name: "Assembly", level: 70, category: "Reverse Engineering" },
  { name: "C", level: 75, category: "Reverse Engineering" },
  { name: "Debugging", level: 80, category: "Reverse Engineering" },
  { name: "Static Analysis", level: 75, category: "Reverse Engineering" },
  { name: "Negotiation", level: 75, category: "Leadership" },
  { name: "Leadership", level: 85, category: "Leadership" },
  { name: "Marketing", level: 75, category: "Business" },
  { name: "Web Design", level: 80, category: "Design" },
  { name: "Collaboration", level: 90, category: "Skills" },
  { name: "Customer Service", level: 85, category: "Skills" },
  { name: "Sales", level: 70, category: "Skills" },
  { name: "Github", level: 95, category: "Tools" },
  { name: "Gitlab", level: 75, category: "Tools" },
  { name: "Vite", level: 80, category: "Tools" },
  { name: "Next.js", level: 90, category: "Tools" },
  { name: "Expo", level: 80, category: "Tools" },
  { name: "Expo Go", level: 80, category: "Tools" },
  { name: "Swift", level: 70, category: "Frontend" },
  { name: "SwiftUI", level: 70, category: "Frontend" },
];

const categories = {
  no: [
    "Frontend",
    "Backend",
    "Reverse Engineering",
    "Ledelse",
    "Business",
    "Design",
    "Skills",
    "Tools",
  ],
  en: [
    "Frontend",
    "Backend",
    "Reverse Engineering",
    "Leadership",
    "Business",
    "Design",
    "Skills",
    "Tools",
  ],
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
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">{t.label}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories_list.map((category) => (
            <Card
              key={category}
              className="glass hover-glow transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl font-semibold text-center text-gradient">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                          <span className="text-xs sm:text-sm text-purple-400 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="glass hover-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold text-center text-gradient">
                {language === "no" ? "Ferdighetsoversikt" : "Skills Overview"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SkillsRadarChart skills={skills} categories={categories_list} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
