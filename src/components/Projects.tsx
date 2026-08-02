"use client";

import { useState } from "react";
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
import {
  Code,
  ExternalLink,
  ArrowRight,
  LucideIcon,
  Database,
  Layers,
  Workflow,
  Cpu,
  Shield,
  Boxes,
} from "lucide-react";
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
  icon?: LucideIcon;
  isSystem?: boolean;
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

const systems_no: Project[] = [
  {
    title: "Sikker helsedata-plattform",
    description:
      "HIPAA-bevisst backendarkitektur med rad-nivå sikkerhet, kryptert lagring og revisjonslogging for sensitive helsedata.",
    technologies: ["Supabase", "RLS", "FastAPI"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Database,
    isSystem: true,
  },
  {
    title: "Integrasjonslag for bærbar data",
    description:
      "Samlet inntakspipeline som normaliserer og aggregerer data fra flere bærbare enhets-APIer til ett strukturert skjema.",
    technologies: ["Datapipeline", "ETL", "API-integrasjon"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Layers,
    isSystem: true,
  },
  {
    title: "Prompt-orkestreringsrammeverk",
    description:
      "Strukturert prompt-håndteringslag som sekvenserer, validerer og ruter LLM-kall for konsistente AI-resultater.",
    technologies: ["LangChain", "Prompt Engineering", "LLM"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Workflow,
    isSystem: true,
  },
  {
    title: "AI-drevet innsiktspipeline",
    description:
      "RAG-basert pipeline som kombinerer hentingslag, modellruting og responsvalidering for handlingsrettede anbefalinger.",
    technologies: ["RAG", "Vector DB", "Modellruter"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Cpu,
    isSystem: true,
  },
  {
    title: "Full-stack autentiserings- og sikkerhetslag",
    description:
      "Autentiserings- og autorisasjonssystem med JWT-sesjoner, OAuth2-leverandører og rollebasert tilgangskontroll.",
    technologies: ["Auth", "OAuth2", "RBAC"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Shield,
    isSystem: true,
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

const systems_en: Project[] = [
  {
    title: "Secure Health Data Platform",
    description:
      "HIPAA-aware backend architecture with row-level security, encrypted storage and audit logging for sensitive health records.",
    technologies: ["Supabase", "RLS", "FastAPI"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Database,
    isSystem: true,
  },
  {
    title: "Wearable Data Integration Layer",
    description:
      "Unified ingestion pipeline that normalises and aggregates data from multiple wearable device APIs into a single structured schema.",
    technologies: ["Data Pipeline", "ETL", "API Integration"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Layers,
    isSystem: true,
  },
  {
    title: "Prompt Orchestration Framework",
    description:
      "Structured prompt-management layer that sequences, validates and routes LLM calls for consistent, context-aware AI output.",
    technologies: ["LangChain", "Prompt Engineering", "LLM"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Workflow,
    isSystem: true,
  },
  {
    title: "AI Insight Generation Pipeline",
    description:
      "RAG-based pipeline combining retrieval layers, model routing and response validation to synthesise actionable health recommendations.",
    technologies: ["RAG", "Vector DB", "Model Router"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Cpu,
    isSystem: true,
  },
  {
    title: "Full-Stack Auth & Security Layer",
    description:
      "Authentication and authorisation system with JWT sessions, OAuth2 providers and fine-grained role-based access control.",
    technologies: ["Auth", "OAuth2", "RBAC"],
    github: "",
    demo: "",
    featured: false,
    image: "",
    icon: Shield,
    isSystem: true,
  },
];

const content = {
  no: {
    label: "Prosjekter",
    title: "Prosjekter",
    subtitle:
      "Produkter, plattformer og systemarkitekturer jeg har bygget — fra full-stack apper til AI-pipelines og sikker datainfrastruktur.",
    viewProject: "Se prosjekt",
    visitProject: "Besøk prosjekt",
    systemBadge: "System",
  },
  en: {
    label: "Projects",
    title: "Projects",
    subtitle:
      "Products, platforms and system architectures I have built — from full-stack apps to AI pipelines and secure data infrastructure.",
    viewProject: "View Project",
    visitProject: "Visit Project",
    systemBadge: "System",
  },
};

// Per-card 3D tilt state
interface CardTilt {
  rotateX: number;
  rotateY: number;
  shineX: number;
  shineY: number;
  shineIntensity: number;
}

const DEFAULT_TILT: CardTilt = {
  rotateX: 0,
  rotateY: 0,
  shineX: 50,
  shineY: 50,
  shineIntensity: 0,
};

export function Projects() {
  const { language } = useLanguage();
  const projects =
    language === "no"
      ? [...projects_no, ...systems_no]
      : [...projects_en, ...systems_en];
  const t = content[language];

  // Per-card tilt state array (one entry per project)
  const [cardTilts, setCardTilts] = useState<CardTilt[]>(() =>
    projects.map(() => ({ ...DEFAULT_TILT }))
  );

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setCardTilts((prev) => {
      const next = [...prev];
      next[index] = { rotateX, rotateY, shineX, shineY, shineIntensity: 0.65 };
      return next;
    });
  };

  const handleCardMouseLeave = (index: number) => {
    setCardTilts((prev) => {
      const next = [...prev];
      next[index] = { ...DEFAULT_TILT };
      return next;
    });
  };

  return (
    <SectionContainer id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {projects.map((project, index) => {
            const link = project.demo || project.github;
            const hasImage = Boolean(project.image);
            const IconComponent = project.icon;
            const tilt = cardTilts[index] ?? DEFAULT_TILT;

            return (
              <div
                key={index}
                className="card-project [perspective:1000px]"
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
              >
                <Card
                  className="group relative overflow-hidden h-full flex flex-col hover-glow transition-all duration-500 border-2 border-border dark:border-border/60 dark:backdrop-blur-xl hover:shadow-2xl hover:shadow-black/10 card-gradient-bg"
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.shineIntensity > 0 ? 1.02 : 1})`,
                    transformStyle: "preserve-3d",
                    transition:
                      tilt.shineIntensity > 0
                        ? "transform 0.15s ease-out"
                        : "transform 0.5s cubic-bezier(0.22,0.61,0.36,1)",
                    willChange: "transform",
                  }}
                >
                  <div className="card-shine" />

                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen z-30 transition-opacity duration-150"
                    style={{
                      opacity: tilt.shineIntensity,
                      background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(148,163,184,0.15), transparent 55%), radial-gradient(circle at ${100 - tilt.shineX}% ${100 - tilt.shineY}%, rgba(100,116,139,0.1), transparent 60%)`,
                    }}
                  />

                  <div className="relative aspect-[21/9] overflow-hidden bg-muted/20">
                    {hasImage ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={project.image.includes("ThyloInsight")}
                      />
                    ) : (
                      IconComponent && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl card-accent-icon shadow-black/20">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {project.isSystem ? (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-foreground text-background border-0 shadow-lg">
                          <Boxes className="w-3 h-3 mr-1" />
                          {t.systemBadge}
                        </Badge>
                      </div>
                    ) : (
                      project.featured && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-foreground text-background border-0 shadow-lg">
                            <Code className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )
                    )}

                    {link && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        <Button
                          size="lg"
                          className="bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-900 shadow-xl"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(link, "_blank");
                          }}
                        >
                          {t.viewProject}
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <CardHeader className="flex-1 p-3 pb-1">
                    <CardTitle className="text-base sm:text-lg font-bold mb-1.5 transition-colors duration-300 group-hover:text-foreground">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/80 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 pb-3 px-3">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies
                        .slice(0, 4)
                        .map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs font-medium border-border text-muted-foreground hover:bg-muted/50 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      {project.technologies.length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-xs font-medium border-border text-muted-foreground"
                        >
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>

                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors group/link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t.visitProject}
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
