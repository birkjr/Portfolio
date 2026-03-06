"use client";

import { useEffect, useRef, useState } from "react";
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
  Binary,
  Shield,
  FileSearch,
  LucideIcon,
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

// Reverse Engineering / Security tooling projects
const reverseProjects_no: Project[] = [
  {
    title: "Reverse Engineering Challenge Analyzer",
    description:
      'Verktøy og analyser for å reverse engineere egne "crackme"-programmer. Inkluderer Ghidra-analyser, rekonstruksjon av state-maskiner og brute-force scripts for å finne gyldige nøkler.',
    technologies: ["Python", "C", "Ghidra", "Reverse Engineering"],
    github: "https://github.com/birkjr/ctfs",
    demo: "",
    featured: false,
    image: "",
    icon: Binary,
  },
  {
    title: "Malware Sandbox Simulator",
    description:
      "Dynamisk analyseverktøy for å studere runtime-adferd til programmer i et kontrollert miljø. Logger systemkall, nettverkstrafikk og filendringer.",
    technologies: ["Python", "Bash", "C", "Security"],
    github: "https://github.com/birkjr/malware_sandbox",
    demo: "",
    featured: false,
    image: "",
    icon: Shield,
  },
  {
    title: "Forensics Toolkit",
    description:
      "Modulært verktøy for digital dokument- og filanalyse med signaturanalyse, metadata, hashing og logganalyse inspirert av faktiske DFIR-metoder.",
    technologies: ["Python", "Forensics", "Security"],
    github: "https://github.com/birkjr/forensics_toolkit",
    demo: "",
    featured: false,
    image: "",
    icon: FileSearch,
  },
];

const reverseProjects_en: Project[] = [
  {
    title: "Reverse Engineering Challenge Analyzer",
    description:
      'Tools and analysis for reverse engineering custom "crackme" programs. Includes Ghidra analysis, state machine reconstruction and brute-force scripts to discover valid keys.',
    technologies: ["Python", "C", "Ghidra", "Reverse Engineering"],
    github: "https://github.com/birkjr/ctfs",
    demo: "",
    featured: false,
    image: "",
    icon: Binary,
  },
  {
    title: "Malware Sandbox Simulator",
    description:
      "Dynamic analysis tooling to study runtime behaviour of programs in a controlled environment. Logs system calls, network traffic and file changes.",
    technologies: ["Python", "Bash", "C", "Security"],
    github: "https://github.com/birkjr/malware_sandbox",
    demo: "",
    featured: false,
    image: "",
    icon: Shield,
  },
  {
    title: "Forensics Toolkit",
    description:
      "Modular toolkit for digital document and file investigation, including signature analysis, metadata, hashing and log analysis inspired by DFIR practices.",
    technologies: ["Python", "Forensics", "Security"],
    github: "https://github.com/birkjr/forensics_toolkit",
    demo: "",
    featured: false,
    image: "",
    icon: FileSearch,
  },
];

const content = {
  no: {
    label: "Prosjekter",
    title: "Prosjekter",
    subtitle:
      "Et utvalg av produkter, apper og sikkerhetsverktøy jeg har bygget – fra full‑stack løsninger til reverse engineering og forensics.",
    viewProject: "Se prosjekt",
    visitProject: "Besøk prosjekt",
  },
  en: {
    label: "Projects",
    title: "Projects",
    subtitle:
      "A selection of products, apps and security tooling I have built – from full‑stack systems to reverse engineering and forensics.",
    viewProject: "View Project",
    visitProject: "Visit Project",
  },
};

export function Projects() {
  const { language } = useLanguage();
  const baseProjects = language === "no" ? projects_no : projects_en;
  const securityProjects =
    language === "no" ? reverseProjects_no : reverseProjects_en;
  const projects = [...baseProjects, ...securityProjects];
  const t = content[language];
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          // Trigger animation when section enters viewport
          // Lower threshold on mobile, higher on desktop to prevent multiple sections triggering
          const minRatio = isMobile ? 0.3 : 0.7;

          if (
            isIntersecting &&
            intersectionRatio >= minRatio &&
            !hasAnimated.current
          ) {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) {
              setScrollDirection("down");
            } else if (currentScrollY < lastScrollY.current) {
              setScrollDirection("up");
            }
            setIsVisible(true);
            hasAnimated.current = true;
            // Unobserve after animation triggers to prevent re-triggering
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5, 0.7, 1.0], // Multiple thresholds to catch different screen sizes
        rootMargin: isMobile ? "0px 0px -50px 0px" : "-150px 0px -150px 0px", // Smaller margin on mobile
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef && !hasAnimated.current) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <SectionContainer id="projects">
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          isVisible
            ? scrollDirection === "down"
              ? "section-slide-up"
              : "section-slide-down"
            : scrollDirection === "down"
              ? "opacity-0 translate-y-[260px] scale-[0.94]"
              : "opacity-0 -translate-y-[260px] scale-[0.94]"
        }`}
        ref={sectionRef}
      >
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
            const hasImage = Boolean(project.image);
            const IconComponent = project.icon;

            return (
              <Card
                key={index}
                className="group relative overflow-hidden h-full flex flex-col hover-glow transition-all duration-500 border-2 border-[#e3d4c3]/80 dark:border-slate-800/60 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/15 card-gradient-bg"
              >
                {/* Moving shine highlight */}
                <div className="card-shine" />
                {/* Visual Header (image or icon) */}
                <div className="relative aspect-[21/9] bg-gradient-to-br from-blue-950/20 to-cyan-950/20 overflow-hidden">
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
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black">
                      {IconComponent && (
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-500 flex items-center justify-center shadow-xl shadow-blue-500/40">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                  )}

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
                <CardHeader className="flex-1 p-3 pb-1">
                  <CardTitle className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 pb-3 px-3">
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
