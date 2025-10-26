"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "React.js", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "Webutvikling", level: 90, category: "Frontend" },
  { name: "Supabase", level: 80, category: "Backend" },
  { name: "Firebase", level: 50, category: "Backend" },
  { name: "IT-utvikling", level: 85, category: "Development" },
  { name: "Forhandling", level: 85, category: "Leadership" },
  { name: "Ledelse", level: 80, category: "Leadership" },
  { name: "Markedsføring", level: 75, category: "Business" },
  { name: "Webdesign", level: 80, category: "Design" },
  { name: "Samarbeid", level: 90, category: "Skills" },
  { name: "Kundeservice", level: 85, category: "Skills" },
  { name: "Salg", level: 80, category: "Skills" },
  { name: "Git", level: 85, category: "Tools" }
];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">Ferdigheter</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">Ferdigheter</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Teknologier og verktøy jeg jobber med for å skape løsninger.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Frontend', 'Backend', 'Development', 'Leadership', 'Business', 'Design', 'Skills', 'Tools'].map((category) => (
            <Card key={category} className="glass hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-center text-gradient">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skills.filter(skill => skill.category === category).map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-purple-400 font-semibold">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
