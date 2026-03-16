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
  FileSearch,
  LucideIcon,
  Brain,
  X,
  ChevronRight,
  Database,
  Cpu,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface ProjectSection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  isArchitecture?: boolean;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  featured: boolean;
  image: string;
  icon?: LucideIcon;
  isAISystem?: boolean;
  sections?: ProjectSection[];
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

// Reverse Engineering / Security tooling + AI system projects
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
    title: "AI Health Insight Engine",
    description:
      "Ende-til-ende AI-system som transformerer bærbar- og symptomdata til strukturerte helseinsikter via en RAG-basert AI-pipeline med LLM-integrasjon og prompt-orkestrering.",
    technologies: [
      "Python",
      "FastAPI",
      "Supabase",
      "LangChain",
      "RAG",
      "LLM",
      "TypeScript",
      "Next.js",
    ],
    github: "",
    demo: "",
    featured: true,
    image: "",
    icon: Brain,
    isAISystem: true,
    sections: [
      {
        id: "problem",
        title: "Problem",
        content:
          "Folk samler store mengder helsedata fra bærbare enheter og symptomtracking, men disse dataene blir sjelden til handlingsrettede innsikter. De fleste plattformer viser bare rådata i stedet for å tolke mønstre eller generere meningsfull analyse. Utfordringen er å transformere fragmenterte helsedata til forståelige og nyttige innsikter.",
      },
      {
        id: "system",
        title: "System",
        content:
          "Systemet aggregerer bærbar data, symptomtracking og livsstilsinput i en felles datapipeline. En AI-pipeline behandler dataene og genererer strukturerte helseinsikter. Via LLM-integrasjon og prompt-orkestrering transformerer systemet rådata til meningsfulle sammendrag og anbefalinger.",
        bullets: [
          "Innhenting av bærbar data",
          "Symptomtracking",
          "Datapipeline",
          "AI-drevet analyse",
          "LLM-basert innsiktsgenerering",
        ],
      },
      {
        id: "architecture",
        title: "Systemarkitektur",
        content:
          "Systemet bruker en modulær AI-pipeline-arkitektur. Et prompt-orkestreringslag strukturerer innkommende helsedata før det sendes til en modellruter som håndterer LLM-integrasjon. Et hentingslag gir kontekstuell data via RAG-arkitektur, som lar systemet kombinere strukturerte helsedata med relevant kontekst. Responsvalidering sikrer konsistente og pålitelige utdata. All data lagres og aksesseres via en sikker datapipeline koblet til en Supabase-backend.",
        isArchitecture: true,
      },
      {
        id: "result",
        title: "Resultat",
        content:
          "Systemet genererer strukturerte ukentlige helseoppsummeringer, daglige innsikter og personlige anbefalinger. Ved å kombinere bærbar data, brukerinput og en RAG-basert AI-pipeline, transformerer plattformen rådata til forståelige og handlingsrettede innsikter.",
        bullets: [
          "Ukentlig helseoppsummering",
          "Daglige innsikter",
          "Personlige anbefalinger",
        ],
      },
    ],
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
    title: "AI Health Insight Engine",
    description:
      "End-to-end AI system that transforms wearable and symptom data into structured health insights using a RAG-based AI pipeline with LLM integration and prompt orchestration.",
    technologies: [
      "Python",
      "FastAPI",
      "Supabase",
      "LangChain",
      "RAG",
      "LLM",
      "TypeScript",
      "Next.js",
    ],
    github: "",
    demo: "",
    featured: true,
    image: "",
    icon: Brain,
    isAISystem: true,
    sections: [
      {
        id: "problem",
        title: "Problem",
        content:
          "People collect large amounts of health data from wearables and symptom tracking tools, but this data rarely becomes actionable insights. Most platforms simply display raw metrics instead of interpreting patterns or generating meaningful analysis. The challenge is transforming fragmented health data into understandable and useful insights.",
      },
      {
        id: "system",
        title: "System",
        content:
          "The system aggregates wearable data, symptom tracking and lifestyle inputs into a unified data pipeline. An AI pipeline processes the data and generates structured health insights. Through LLM integration and prompt orchestration, the system transforms raw data into meaningful summaries and recommendations.",
        bullets: [
          "Wearable data ingestion",
          "Symptom tracking",
          "Data pipeline",
          "AI-driven analysis",
          "LLM-based insight generation",
        ],
      },
      {
        id: "architecture",
        title: "System Architecture",
        content:
          "The system uses a modular AI pipeline architecture. A prompt orchestration layer structures incoming health data before sending it to a model router that handles LLM integration. A retrieval layer provides contextual data using a RAG architecture, allowing the system to combine structured health data with relevant context. Response validation ensures outputs remain consistent and reliable. All data is stored and accessed through a secure data pipeline connected to a Supabase backend.",
        isArchitecture: true,
      },
      {
        id: "result",
        title: "Result",
        content:
          "The system generates structured weekly health summaries, daily insights and personalized recommendations. By combining wearable data, user input and a RAG-based AI pipeline, the platform transforms raw data into understandable and actionable insights.",
        bullets: [
          "Weekly health summary",
          "Daily insights",
          "Personalized recommendations",
        ],
      },
    ],
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
      "Et utvalg av produkter, AI-systemer og sikkerhetsverktøy jeg har bygget – fra full‑stack løsninger til AI-pipelines og reverse engineering.",
    viewProject: "Se prosjekt",
    visitProject: "Besøk prosjekt",
    viewSystem: "Se systemet",
    close: "Lukk",
    aiSystemBadge: "AI-system",
  },
  en: {
    label: "Projects",
    title: "Projects",
    subtitle:
      "A selection of products, AI systems and security tooling I have built – from full‑stack solutions to AI pipelines and reverse engineering.",
    viewProject: "View Project",
    visitProject: "Visit Project",
    viewSystem: "View System",
    close: "Close",
    aiSystemBadge: "AI System",
  },
};

function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="min-w-[520px] flex flex-col items-center gap-3 text-xs font-medium">
        {/* Data Sources */}
        <div className="flex gap-3 w-full justify-center">
          {[
            { label: "Wearables", icon: <Cpu className="w-3.5 h-3.5" /> },
            {
              label: "Symptom Tracker",
              icon: <Layers className="w-3.5 h-3.5" />,
            },
            {
              label: "Lifestyle Input",
              icon: <Database className="w-3.5 h-3.5" />,
            },
          ].map((src) => (
            <div
              key={src.label}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300"
            >
              {src.icon}
              {src.label}
            </div>
          ))}
        </div>

        {/* Arrow down */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-slate-600" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 rotate-90" />
        </div>

        {/* Data Pipeline */}
        <div className="px-5 py-2.5 rounded-lg bg-blue-900/40 border border-blue-700/50 text-blue-300 flex items-center gap-2">
          <Database className="w-3.5 h-3.5" />
          Data Pipeline — Ingestion &amp; Normalization
        </div>

        {/* Arrow + split */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-slate-600" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 rotate-90" />
        </div>

        {/* Middle layer */}
        <div className="flex gap-3 w-full justify-center">
          <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-violet-900/40 border border-violet-700/50 text-violet-300 text-center">
            <Layers className="w-3.5 h-3.5" />
            <span>Retrieval Layer</span>
            <span className="text-[10px] text-violet-400/70">
              (RAG / Vector)
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-cyan-900/40 border border-cyan-700/50 text-cyan-300 text-center">
            <Brain className="w-3.5 h-3.5" />
            <span>Prompt Builder</span>
            <span className="text-[10px] text-cyan-400/70">
              (Orchestration)
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-center">
            <Database className="w-3.5 h-3.5" />
            <span>Supabase</span>
            <span className="text-[10px] text-emerald-400/70">
              (Data Layer)
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-slate-600" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 rotate-90" />
        </div>

        {/* LLM Integration */}
        <div className="px-5 py-2.5 rounded-lg bg-purple-900/40 border border-purple-700/50 text-purple-300 flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5" />
          LLM Integration — Model Router
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-slate-600" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 rotate-90" />
        </div>

        {/* Response Validation */}
        <div className="px-5 py-2.5 rounded-lg bg-amber-900/40 border border-amber-700/50 text-amber-300 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5" />
          Response Validation
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-slate-600" />
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 rotate-90" />
        </div>

        {/* Output */}
        <div className="flex gap-3 w-full justify-center">
          {["Weekly Summary", "Daily Insights", "Recommendations"].map(
            (out) => (
              <div
                key={out}
                className="flex-1 text-center px-2 py-2 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300"
              >
                {out}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

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
  const baseProjects = language === "no" ? projects_no : projects_en;
  const securityProjects =
    language === "no" ? reverseProjects_no : reverseProjects_en;
  const projects = [...baseProjects, ...securityProjects];
  const t = content[language];
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const hasAnimated = useRef(false);
  const fallbackTimer = useRef<NodeJS.Timeout | null>(null);

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

    // Fallback: Show section after 1 second if animation hasn't triggered
    fallbackTimer.current = setTimeout(() => {
      if (!hasAnimated.current && sectionRef.current) {
        setIsVisible(true);
        hasAnimated.current = true;
      }
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          const intersectionRatio = entry.intersectionRatio;

          // Trigger animation when section enters viewport
          // Lower threshold on mobile, higher on desktop to prevent multiple sections triggering
          const minRatio = isMobile ? 0.3 : 0.5; // Lowered desktop threshold from 0.7 to 0.5

          if (
            isIntersecting &&
            intersectionRatio >= minRatio &&
            !hasAnimated.current
          ) {
            // Clear fallback timer
            if (fallbackTimer.current) {
              clearTimeout(fallbackTimer.current);
            }

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
        rootMargin: isMobile ? "0px 0px -50px 0px" : "-100px 0px -100px 0px", // Reduced desktop margin
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
      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
      }
    };
  }, []);

  const openModal = (project: Project) => {
    setActiveProject(project);
    setActiveSection(project.sections?.[0]?.id ?? null);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveProject(null);
    setActiveSection(null);
    document.body.style.overflow = "";
  };

  return (
    <>
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
              const isAI = project.isAISystem;

              const tilt = cardTilts[index] ?? DEFAULT_TILT;

              return (
                <div
                  key={index}
                  className="card-project [perspective:1000px]"
                  onMouseMove={(e) => handleCardMouseMove(e, index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                >
                  <Card
                    className={`group relative overflow-hidden h-full flex flex-col hover-glow transition-all duration-500 border-2 hover:shadow-2xl card-gradient-bg ${
                      isAI
                        ? "border-violet-500/40 dark:border-violet-600/50 hover:shadow-violet-500/20 hover:border-violet-400/60 cursor-pointer"
                        : "border-[#e3d4c3]/80 dark:border-slate-800/60 dark:backdrop-blur-xl hover:shadow-blue-500/15"
                    }`}
                    style={{
                      transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.shineIntensity > 0 ? 1.02 : 1})`,
                      transformStyle: "preserve-3d",
                      transition:
                        tilt.shineIntensity > 0
                          ? "transform 0.15s ease-out"
                          : "transform 0.5s cubic-bezier(0.22,0.61,0.36,1)",
                      willChange: "transform",
                    }}
                    onClick={isAI ? () => openModal(project) : undefined}
                  >
                    {/* Moving shine highlight (CSS hover-based) */}
                    <div className="card-shine" />

                    {/* Dynamic shine that follows cursor (3D effect) */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen z-30 transition-opacity duration-150"
                      style={{
                        opacity: tilt.shineIntensity,
                        background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, rgba(59,130,246,0.35), transparent 55%), radial-gradient(circle at ${100 - tilt.shineX}% ${100 - tilt.shineY}%, rgba(56,189,248,0.25), transparent 60%)`,
                      }}
                    />

                    {/* Visual Header (image or icon) */}
                    <div
                      className={`relative aspect-[21/9] overflow-hidden ${
                        isAI
                          ? "bg-gradient-to-br from-violet-950/30 via-purple-950/20 to-slate-950"
                          : "bg-gradient-to-br from-blue-950/20 to-cyan-950/20"
                      }`}
                    >
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
                        <div className="absolute inset-0 flex items-center justify-center">
                          {isAI && (
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage:
                                  "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.4), transparent 60%), radial-gradient(circle at 70% 50%, rgba(99,102,241,0.3), transparent 60%)",
                              }}
                            />
                          )}
                          {IconComponent && (
                            <div
                              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl ${
                                isAI
                                  ? "bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-500 shadow-violet-500/40"
                                  : "bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-500 shadow-blue-500/40"
                              }`}
                            >
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        {isAI ? (
                          <Badge className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white border-0 shadow-lg">
                            <Brain className="w-3 h-3 mr-1" />
                            {t.aiSystemBadge}
                          </Badge>
                        ) : (
                          project.featured && (
                            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 shadow-lg">
                              <Code className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )
                        )}
                      </div>

                      {/* Hover CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        {isAI ? (
                          <Button
                            size="lg"
                            className="bg-violet-600/90 hover:bg-violet-600 text-white shadow-xl shadow-violet-500/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(project);
                            }}
                          >
                            {t.viewSystem}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        ) : link ? (
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
                        ) : null}
                      </div>
                    </div>

                    {/* Card Content */}
                    <CardHeader className="flex-1 p-3 pb-1">
                      <CardTitle
                        className={`text-base sm:text-lg font-bold mb-1.5 transition-colors duration-300 ${
                          isAI
                            ? "group-hover:text-violet-500 dark:group-hover:text-violet-400"
                            : "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        }`}
                      >
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground/80 text-xs sm:text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 pb-3 px-3">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies
                          .slice(0, 4)
                          .map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className={`text-xs font-medium transition-colors duration-300 ${
                                isAI
                                  ? "border-violet-500/40 dark:border-violet-500/50 text-violet-700 dark:text-violet-300 hover:bg-violet-500/10 dark:hover:bg-violet-500/20"
                                  : "border-blue-500/30 dark:border-blue-500/50 text-blue-700 dark:text-blue-300 hover:bg-blue-500/10 dark:hover:bg-blue-500/20"
                              }`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium ${
                              isAI
                                ? "border-violet-500/40 dark:border-violet-500/50 text-violet-700 dark:text-violet-300"
                                : "border-blue-500/30 dark:border-blue-500/50 text-blue-700 dark:text-blue-300"
                            }`}
                          >
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>

                      {/* Action */}
                      {isAI ? (
                        <button
                          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors group/link"
                          onClick={() => openModal(project)}
                        >
                          {t.viewSystem}
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        link && (
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
                        )
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* AI Project Detail Modal */}
      {activeProject && activeProject.sections && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-background border border-violet-500/30 shadow-2xl shadow-violet-500/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-gradient-to-r from-violet-950/30 via-background to-background shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{activeProject.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {t.aiSystemBadge} · End-to-end AI pipeline
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section Tabs */}
            <div className="flex gap-1 px-6 pt-4 shrink-0 overflow-x-auto">
              {activeProject.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeSection === section.id
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {activeProject.sections.map((section) => (
                <div
                  key={section.id}
                  className={activeSection === section.id ? "block" : "hidden"}
                >
                  <h4 className="text-xl font-bold mb-3">{section.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {section.content}
                  </p>

                  {section.bullets && (
                    <ul className="flex flex-col gap-2 mb-5">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.isArchitecture && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-wide">
                        Pipeline Visualization
                      </p>
                      <ArchitectureDiagram />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer — tech stack */}
            <div className="px-6 py-3 border-t border-border/60 shrink-0 bg-muted/30">
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="border-violet-500/40 text-violet-700 dark:text-violet-300 text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
