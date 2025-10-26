"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, Code, Star } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "Full-stack webapplikasjon med React, Node.js og PostgreSQL",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true
  },
  {
    title: "Mobile App",
    description: "React Native app for produktivitet med offline-støtte",
    technologies: ["React Native", "TypeScript", "Redux"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true
  },
  {
    title: "API Service",
    description: "RESTful API med autentisering og dokumentasjon",
    technologies: ["Python", "FastAPI", "MongoDB", "Docker"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-purple-400 font-medium">Prosjekter</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">Mine Prosjekter</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Utforsk noen av prosjektene jeg har jobbet med. Hver løsning er 
            designet med fokus på brukeropplevelse og skalerbarhet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className={`group overflow-hidden glass hover-glow transition-all duration-500 ${project.featured ? 'md:col-span-2 lg:col-span-1 border-purple-500/50' : 'border-border/50'}`}>
              <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Code className="w-16 h-16 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Utvalgt
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="group-hover:text-purple-400 transition-colors duration-300">{project.title}</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground/80">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-colors duration-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Separator className="mb-4 bg-border/50" />
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Kode
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
