"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, TrendingUp, Star, LucideIcon } from "lucide-react";

interface Experience {
  title: string;
  description: string;
  year: string;
  icon: LucideIcon;
}

const experiences: Experience[] = [
  {
    title: "IT-utvikler",
    description: "Teknologiporten, NTNU - Full-stack utvikler",
    year: "2023 - Nå",
    icon: Code,
  },
  {
    title: "Teamleder Markedsføring",
    description:
      "EMIL-Link - Leder team med fokus på forhandling og samarbeid, og utviklet ferdig nettside",
    year: "2024",
    icon: Users,
  },
  {
    title: "Marketing Team Member",
    description: "EMIL-Link - Markedsføring og webdesign",
    year: "2023-2024",
    icon: TrendingUp,
  },
  {
    title: "Servitør",
    description: "Risør fiskemottak - Kundeservice og salg",
    year: "2024",
    icon: Star,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">Erfaringer</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">Erfaringer</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Noen milepæler og prestasjoner jeg er stolt av gjennom karrieren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <Card
                key={index}
                className="text-center glass hover-glow transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{experience.title}</CardTitle>
                  <CardDescription>{experience.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{experience.year}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
