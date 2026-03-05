"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

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
    title: "Thylo Insight",
    description:
      "Medgründer og CTO for Thylo Insight, et startup som leverer innsikt og analyse av kundenes stoffskifte-data. Både app og nettside er bygget med React (Native og JS).",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "FastAPI",
      "Vercel",
      "React JS",
      "Next.js",
    ],
    github: "",
    demo: "https://thyloinsight.no",
    featured: true,
    image: "/ThyloInsightv2.png",
  },
  {
    title: "Teknologiporten NTNU",
    description: "Offisiell nettside for Teknologiporten - IT-utvikler",
    technologies: [
      "React",
      "Next.js",
      "Backend: Supabase",
      "Full-stack",
      "TypeScript",
      "Tailwind",
    ],
    github: "",
    demo: "https://tp-nettside.vercel.app/",
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
    title: "Thylo Insight",
    description:
      "Co-founder and CTO of Thylo Insight, a startup that provides insights and analysis of customers Thyroid data. Both App and Website are built with React Native and React JS.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "FastAPI",
      "Vercel",
      "React JS",
      "Next.js",
    ],
    github: "",
    demo: "https://thyloinsight.no",
    featured: true,
    image: "/ThyloInsightv2.png",
  },
  {
    title: "Teknologiporten NTNU",
    description: "Official website for Teknologiporten - IT developer",
    technologies: [
      "React",
      "Next.js",
      "Backend: Supabase",
      "Full-stack",
      "TypeScript",
      "Tailwind",
    ],
    github: "",
    demo: "https://tp-nettside.vercel.app/",
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
    viewProject: "Se prosjekt",
    visitProject: "Besøk prosjekt",
  },
  en: {
    label: "Projects",
    title: "My Projects",
    subtitle:
      "Explore some of the projects I've worked on. Each solution is designed with focus on user experience and scalability.",
    viewProject: "View Project",
    visitProject: "Visit Project",
  },
};

export function Projects() {
  const { language } = useLanguage();
  const projects = language === "no" ? projects_no : projects_en;
  const t = content[language];

  return (
    <SectionContainer id="projects">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project, index) => {
            const link = project.demo || project.github;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden h-full flex flex-col hover-glow transition-all duration-500 border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 card-gradient-bg"
              >
                {/* Image Container */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-950/20 to-cyan-950/20 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={project.image.includes("ThyloInsight")}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 shadow-lg">
                        <Code className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    <Button
                      size="lg"
                      className="bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (link) window.open(link, "_blank");
                      }}
                    >
                      {t.viewProject}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Card Content */}
                <CardHeader className="flex-1 p-4 pb-2">
                  <CardTitle className="text-lg sm:text-xl font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 pb-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="border-blue-500/30 dark:border-blue-500/50 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors duration-300 text-xs font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge
                        variant="outline"
                        className="border-blue-500/30 dark:border-blue-500/50 text-blue-700 dark:text-blue-300 text-xs font-medium"
                      >
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Link Button */}
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t.visitProject}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
