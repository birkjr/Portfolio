"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Github,
  ExternalLink,
  LucideIcon,
  Lock,
  Binary,
  Shield,
  FileSearch,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionContainer } from "./SectionContainer";

interface CTFScript {
  title: string;
  description: string;
  language: string;
  category: string;
  github?: string;
  demo?: string;
  tags: string[];
  icon: LucideIcon;
}

const ctfScripts_no: CTFScript[] = [
  {
    title: "Reverse Engineering Challenge Analyzer",
    description:
      'Verktøy og analyser jeg har utviklet for å reverse engineere egne "crackme"-programmer. Prosjektet inkluderer Ghidra-analyse av binærer, rekonstruksjon av state-maskiner, XOR- og bitrotasjonsbaserte transformasjoner, samt bygging av brute-force scripts for å identifisere gyldige inputs. Et praktisk prosjekt som kombinerer programmering, binærforståelse og teknisk problemløsning.',
    language: "Python, C",
    category: "Reverse Engineering",
    github: "https://github.com/birkjr/ctfs",
    tags: [
      "python",
      "reverse-engineering",
      "ghidra",
      "binary",
      "analysis",
      "crackme",
    ],
    icon: Binary,
  },
  {
    title: "Malware Sandbox Simulator",
    description:
      "Et dynamisk analyseverktøy jeg bygde for å studere runtime-adferden til programmer i et kontrollert miljø. Sandboxen logger systemkall, nettverkstrafikk og filendringer, og inkluderer et egenskrevet testprogram som genererer realistisk malware-lignende aktivitet (DNS-spørringer, HTTP-trafikk, XOR-operasjoner og filmanipulasjon). Prosjektet kombinerer lavnivåprogrammering, prosessanalyse og sikkerhetsforståelse.",
    language: "Python, Bash, C",
    category: "Reverse Engineering / Cyber Security",
    github: "https://github.com/birkjr/malware_sandbox",
    tags: [
      "reverse-engineering",
      "malware-analysis",
      "sandboxing",
      "monitoring",
      "security",
    ],
    icon: Shield,
  },
  {
    title: "Forensics Toolkit",
    description:
      "Et modulært analyseverktøy for digital dokument- og filundersøkelse. Verktøysettet identifiserer ekte filtyper gjennom signaturanalyse, oppdager skjulte/embedded filer, analyserer EXIF-metadata, beregner kryptografiske hashes og gjennomfører regex-basert logganalyse. Utformet med tydelig struktur og inspirert av faktiske DFIR-metoder for å utforske integritet, sporbarhet og manipulasjon i filer.",
    language: "Python",
    category: "Digital Forensics / File Analysis",
    github: "https://github.com/birkjr/forensics_toolkit",
    tags: [
      "python",
      "filanalyse",
      "hashing",
      "metadata",
      "logganalyse",
      "sikkerhetsverktøy",
    ],
    icon: FileSearch,
  },
];

const ctfScripts_en: CTFScript[] = [
  {
    title: "Reverse Engineering Challenge Analyzer",
    description:
      'Tools and analyses I\'ve developed for reverse engineering my own "crackme" programs. The project includes Ghidra analysis of binaries, reconstruction of state machines, XOR- and bit rotation-based transformations, as well as building brute-force scripts to identify valid inputs. A practical project that combines programming, binary understanding, and technical problem solving.',
    language: "Python, C",
    category: "Reverse Engineering",
    github: "https://github.com/birkjr/ctfs",
    tags: [
      "python",
      "reverse-engineering",
      "ghidra",
      "binary",
      "analysis",
      "crackme",
    ],
    icon: Binary,
  },
  {
    title: "Malware Sandbox Simulator",
    description:
      "A dynamic analysis tool I built to study the runtime behavior of programs in a controlled environment. The sandbox logs system calls, network traffic and file changes, and includes a custom test program that generates realistic malware-like activity (DNS queries, HTTP traffic, XOR operations and file manipulation). The project combines low-level programming, process analysis and security understanding.",
    language: "Python, Bash, C",
    category: "Reverse Engineering / Cyber Security",
    github: "https://github.com/birkjr/malware_sandbox",
    tags: [
      "reverse-engineering",
      "malware-analysis",
      "sandboxing",
      "monitoring",
      "security",
    ],
    icon: Shield,
  },
  {
    title: "Forensics Toolkit",
    description:
      "A modular analysis tool for digital document and file investigation. The toolkit identifies real file types through signature analysis, discovers hidden/embedded files, analyzes EXIF metadata, calculates cryptographic hashes and performs regex-based log analysis. Designed with clear structure and inspired by actual DFIR methods to explore integrity, traceability and manipulation in files.",
    language: "Python",
    category: "Digital Forensics / File Analysis",
    github: "https://github.com/birkjr/forensics_toolkit",
    tags: [
      "python",
      "file-analysis",
      "hashing",
      "metadata",
      "log-analysis",
      "security-tools",
    ],
    icon: FileSearch,
  },
];

const content = {
  no: {
    label: "Reverse Engineering",
    title: "Reverse Engineering",
    subtitle:
      "Prosjekter og verktøy jeg har bygget for reverse engineering og sikkerhet",
    empty: "Ingen prosjekter lagt til ennå",
  },
  en: {
    label: "Reverse Engineering",
    title: "Reverse Engineering",
    subtitle:
      "Projects and tooling I've built for reverse engineering and security",
    empty: "No projects added yet",
  },
};

export function CTFScripts() {
  const { language } = useLanguage();
  const scripts = language === "no" ? ctfScripts_no : ctfScripts_en;
  const t = content[language];

  return (
    <SectionContainer id="reverse-engineering">
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

        {/* Grid */}
        {scripts.length === 0 ? (
          <div className="text-center py-16">
            <Code2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground text-lg">{t.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {scripts.map((script, index) => {
              const IconComponent = script.icon;
              return (
                <Card
                  key={index}
                  className="group hover-glow transition-all duration-300 border-2 border-[#e3d4c3]/80 dark:border-slate-800/50 dark:backdrop-blur-xl hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 flex flex-col card-gradient-bg"
                >
                  <CardHeader className="flex-1 p-4 pb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {script.title}
                        </CardTitle>
                        <CardDescription className="text-purple-600 dark:text-purple-400 font-semibold text-xs sm:text-sm mb-2">
                          {script.category}
                        </CardDescription>
                        <Badge variant="outline" className="text-xs">
                          {script.language}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 px-4 pb-4">
                    <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed mb-3">
                      {script.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {script.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      {script.github && (
                        <a
                          href={script.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {script.demo && (
                        <a
                          href={script.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
