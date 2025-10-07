"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Github, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Download,
  Code,
  Award,
  Star,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Sparkles,
  Zap
} from "lucide-react";

export default function Home() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-stack webapplikasjon med React, Node.js og PostgreSQL",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      title: "Mobile App",
      description: "React Native app for produktivitet med offline-støtte",
      image: "/api/placeholder/400/300",
      technologies: ["React Native", "TypeScript", "Redux"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      title: "API Service",
      description: "RESTful API med autentisering og dokumentasjon",
      image: "/api/placeholder/400/300",
      technologies: ["Python", "FastAPI", "MongoDB", "Docker"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: false
    }
  ];

  const achievements = [
    {
      title: "Teknologisk Innovasjon",
      description: "Utviklet løsning som forbedret effektiviteten med 40%",
      year: "2024",
      icon: TrendingUp
    },
    {
      title: "Lederskap",
      description: "Leder for team på 8 utviklere i et stort prosjekt",
      year: "2023",
      icon: Users
    },
    {
      title: "Prisvinner",
      description: "Førsteplass i hackathon med 50+ deltakere",
      year: "2023",
      icon: Award
    },
    {
      title: "Mentorship",
      description: "Veiledet 15+ junior utviklere gjennom karrieren",
      year: "2022-2024",
      icon: Star
    }
  ];

  const skills = [
    { name: "React/Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "PostgreSQL", level: 75, category: "Database" },
    { name: "AWS", level: 70, category: "Cloud" },
    { name: "Docker", level: 75, category: "DevOps" },
    { name: "Git", level: 90, category: "Tools" }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-purple-400 font-medium">Full-Stack Developer</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold animate-fade-in leading-tight">
                  Hei, jeg er{" "}
                  <span className="text-gradient">
                    Birk Ramstad
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl animate-slide-up leading-relaxed">
                  Full-stack utvikler med lidenskap for å skape innovative løsninger 
                  som gjør en forskjell. Spesialisert i moderne webteknologier og 
                  brukeropplevelse.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 neon-glow hover-glow transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  Last ned CV
                </Button>
                <Button variant="outline" size="lg" className="border-purple-500/50 hover:border-purple-400 hover-glow" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Mail className="w-4 h-4 mr-2" />
                  Kontakt meg
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-6">
                <div className="flex items-center space-x-2 glass rounded-full px-3 py-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">Trondheim/Oslo, Norge</span>
                </div>
                <div className="flex items-center space-x-2 glass rounded-full px-3 py-2">
                  <Calendar className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Født 2003</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative">
                {/* Main avatar circle with gradient border */}
                <div className="gradient-border p-1">
                  <div className="w-80 h-80 rounded-full flex items-center justify-center glass relative overflow-hidden">
                    <Avatar className="w-72 h-72">
                      <AvatarImage src="/api/placeholder/300/300" />
                      <AvatarFallback className="text-6xl font-bold text-gradient bg-transparent">
                        BR
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce neon-glow">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-ping">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
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

      {/* Achievements Section */}
      <section id="achievements" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Oppnåelser</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Noen milepæler og prestasjoner jeg er stolt av gjennom karrieren.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline">{achievement.year}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools'].map((category) => (
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Kontakt meg</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Har du et prosjekt på lur? La oss snakke sammen og se hvordan jeg kan hjelpe deg.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Send meg en melding</CardTitle>
                <CardDescription>
                  Jeg svarer vanligvis innen 24 timer på arbeidsdager.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12" asChild>
                    <a href="mailto:birk@example.com">
                      <Mail className="w-4 h-4 mr-2" />
                      birk@example.com
                    </a>
                  </Button>
                  <Button variant="outline" className="h-12" asChild>
                    <a href="https://linkedin.com/in/birkramstad" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
                <div className="text-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Start en samtale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">BR</span>
              </div>
              <span className="text-sm text-muted-foreground">
                © 2024 Birk Ramstad. Alle rettigheter forbeholdt.
              </span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://linkedin.com/in/birkramstad" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:birk@example.com">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
