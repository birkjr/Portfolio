"use client";

import { Brain, Database, Layers, Cpu, Workflow, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface SystemItem {
  icon: React.ElementType;
  name: string;
  description: string;
  tags: string[];
  accentColor: string;
}

const systems_en: SystemItem[] = [
  {
    icon: Brain,
    name: "AI Health Insight Engine",
    description:
      "End-to-end AI system that transforms wearable and symptom data into structured health insights via RAG architecture and LLM integration.",
    tags: ["LLM", "RAG", "AI Pipeline"],
    accentColor: "violet",
  },
  {
    icon: Database,
    name: "Secure Health Data Platform",
    description:
      "HIPAA-aware backend architecture with row-level security, encrypted storage and audit logging for sensitive health records.",
    tags: ["Supabase", "RLS", "FastAPI"],
    accentColor: "emerald",
  },
  {
    icon: Layers,
    name: "Wearable Data Integration Layer",
    description:
      "Unified ingestion pipeline that normalises and aggregates data from multiple wearable device APIs into a single structured schema.",
    tags: ["Data Pipeline", "ETL", "API Integration"],
    accentColor: "cyan",
  },
  {
    icon: Workflow,
    name: "Prompt Orchestration Framework",
    description:
      "Structured prompt-management layer that sequences, validates and routes LLM calls for consistent, context-aware AI output.",
    tags: ["LangChain", "Prompt Engineering", "LLM"],
    accentColor: "blue",
  },
  {
    icon: Cpu,
    name: "AI Insight Generation Pipeline",
    description:
      "RAG-based pipeline combining retrieval layers, model routing and response validation to synthesise actionable health recommendations.",
    tags: ["RAG", "Vector DB", "Model Router"],
    accentColor: "purple",
  },
  {
    icon: Shield,
    name: "Full-Stack Auth & Security Layer",
    description:
      "Authentication and authorisation system with JWT sessions, OAuth2 providers and fine-grained role-based access control.",
    tags: ["Auth", "OAuth2", "RBAC"],
    accentColor: "amber",
  },
];

const systems_no: SystemItem[] = [
  {
    icon: Brain,
    name: "AI Health Insight Engine",
    description:
      "Ende-til-ende AI-system som transformerer bærbar- og symptomdata til strukturerte helseinsikter via RAG-arkitektur og LLM-integrasjon.",
    tags: ["LLM", "RAG", "AI Pipeline"],
    accentColor: "violet",
  },
  {
    icon: Database,
    name: "Sikker helsedata-plattform",
    description:
      "HIPAA-bevisst backendarkitektur med rad-nivå sikkerhet, kryptert lagring og revisjonslogging for sensitive helsedata.",
    tags: ["Supabase", "RLS", "FastAPI"],
    accentColor: "emerald",
  },
  {
    icon: Layers,
    name: "Integrasjonslag for bærbar data",
    description:
      "Samlet inntakspipeline som normaliserer og aggregerer data fra flere bærbare enhets-APIer til ett strukturert skjema.",
    tags: ["Datapipeline", "ETL", "API-integrasjon"],
    accentColor: "cyan",
  },
  {
    icon: Workflow,
    name: "Prompt-orkestreringsrammeverk",
    description:
      "Strukturert prompt-håndteringslag som sekvenserer, validerer og ruter LLM-kall for konsistente AI-resultater.",
    tags: ["LangChain", "Prompt Engineering", "LLM"],
    accentColor: "blue",
  },
  {
    icon: Cpu,
    name: "AI-drevet innsiktspipeline",
    description:
      "RAG-basert pipeline som kombinerer hentingslag, modellruting og responsvalidering for handlingsrettede anbefalinger.",
    tags: ["RAG", "Vector DB", "Modellruter"],
    accentColor: "purple",
  },
  {
    icon: Shield,
    name: "Full-stack autentiserings- og sikkerhetslag",
    description:
      "Autentiserings- og autorisasjonssystem med JWT-sesjoner, OAuth2-leverandører og rollebasert tilgangskontroll.",
    tags: ["Auth", "OAuth2", "RBAC"],
    accentColor: "amber",
  },
];

const accentMap: Record<
  string,
  { border: string; bg: string; text: string; iconBg: string; tag: string }
> = {
  violet: {
    border: "border-violet-500/30 hover:border-violet-400/60",
    bg: "hover:bg-violet-500/5",
    text: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-gradient-to-br from-violet-600 to-indigo-500",
    tag: "border-violet-500/30 text-violet-700 dark:text-violet-300 bg-violet-500/5",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    bg: "hover:bg-emerald-500/5",
    text: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-gradient-to-br from-emerald-600 to-teal-500",
    tag: "border-emerald-500/30 text-emerald-700 dark:text-emerald-300 bg-emerald-500/5",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400/60",
    bg: "hover:bg-cyan-500/5",
    text: "text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-gradient-to-br from-cyan-600 to-sky-500",
    tag: "border-cyan-500/30 text-cyan-700 dark:text-cyan-300 bg-cyan-500/5",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/60",
    bg: "hover:bg-blue-500/5",
    text: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-gradient-to-br from-blue-600 to-cyan-500",
    tag: "border-blue-500/30 text-blue-700 dark:text-blue-300 bg-blue-500/5",
  },
  purple: {
    border: "border-purple-500/30 hover:border-purple-400/60",
    bg: "hover:bg-purple-500/5",
    text: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-gradient-to-br from-purple-600 to-violet-500",
    tag: "border-purple-500/30 text-purple-700 dark:text-purple-300 bg-purple-500/5",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-400/60",
    bg: "hover:bg-amber-500/5",
    text: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-gradient-to-br from-amber-600 to-orange-500",
    tag: "border-amber-500/30 text-amber-700 dark:text-amber-300 bg-amber-500/5",
  },
};

const content = {
  no: {
    label: "Systemer",
    title: "Systemer jeg har bygget",
    subtitle:
      "Et overblikk over systemene og arkitekturene som utgjør plattformene mine — fra AI-pipelines til sikre dataplattformer.",
  },
  en: {
    label: "Systems",
    title: "Systems I've Built",
    subtitle:
      "An overview of the systems and architectures that underpin my platforms — from AI pipelines to secure data infrastructure.",
  },
};

export function SystemsBuilt() {
  const { language } = useLanguage();
  const systems = language === "no" ? systems_no : systems_en;
  const t = content[language];

  return (
    <SectionContainer id="systems">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 border border-violet-500/20 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-violet-500/20 dark:border-violet-500/30 backdrop-blur-sm mb-4">
            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
              {t.label}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{t.title}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((system, index) => {
            const accent = accentMap[system.accentColor];
            const Icon = system.icon;

            return (
              <div
                key={index}
                className={`group relative flex flex-col gap-3 p-5 rounded-xl border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${accent.border} ${accent.bg}`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${accent.iconBg}`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className={`text-sm font-bold mb-1.5 transition-colors duration-200 ${accent.text}`}
                  >
                    {system.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {system.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {system.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${accent.tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
