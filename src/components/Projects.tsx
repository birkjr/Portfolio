"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  image: string;
}

const projects_no: Project[] = [
  {
    title: "Teknologiporten NTNU",
    description: "Offisiell nettside for Teknologiporten - IT-utvikler rolle",
    technologies: [
      "React",
      "Next.js",
      "Backend: Supabase",
      "Full-stack",
      "TypeScript",
      "Tailwind",
    ],
    github: "https://github.com/Teknologiporten/tp-nettside",
    demo: "",
    featured: true,
    image: "/teknologiporten_nettside.png",
  },
  {
    title: "EMIL-Link",
    description:
      "Markedsførings- og webdesign prosjekt som Teamleder Markedsføring",
    technologies: [
      "Webdesign",
      "Backend: Supabase",
      "Full-stack",
      "TypeScript",
      "Tailwind",
      "React",
    ],
    github: "",
    demo: "https://www.emil-link.no",
    featured: true,
    image: "/emil_link.png",
  },
];

const projects_en: Project[] = [
  {
    title: "Teknologiporten NTNU",
    description: "Official website for Teknologiporten - IT developer role",
    technologies: [
      "React",
      "Next.js",
      "Backend: Supabase",
      "Full-stack",
      "TypeScript",
      "Tailwind",
    ],
    github: "https://github.com/Teknologiporten/tp-nettside",
    demo: "",
    featured: true,
    image: "/teknologiporten_nettside.png",
  },
  {
    title: "EMIL-Link",
    description: "Marketing and web design project as Marketing Team Leader",
    technologies: [
      "Web Design",
      "Backend: Supabase",
      "Full-stack",
      "TypeScript",
      "Tailwind",
      "React",
    ],
    github: "",
    demo: "https://www.emil-link.no",
    featured: true,
    image: "/emil_link.png",
  },
];

const content = {
  no: {
    label: "Prosjekter",
    title: "Mine Prosjekter",
    subtitle:
      "Utforsk noen av prosjektene jeg har jobbet med. Hver løsning er designet med fokus på brukeropplevelse og skalerbarhet.",
  },
  en: {
    label: "Projects",
    title: "My Projects",
    subtitle:
      "Explore some of the projects I've worked on. Each solution is designed with focus on user experience and scalability.",
  },
};

export function Projects() {
  const { language } = useLanguage();
  const projects = language === "no" ? projects_no : projects_en;
  const t = content[language];

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
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

        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => {
            const link = project.demo || project.github;
            return (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-md"
              >
                <Card className="group overflow-hidden glass hover-glow transition-all duration-500 border-border/50 h-full cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-blue-950/20 to-cyan-950/20 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0">
                          <Code className="w-3 h-3 mr-1" />
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-blue-400 transition-colors duration-300 text-base sm:text-lg">
                        {project.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground/80 text-sm sm:text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition-colors duration-300 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
