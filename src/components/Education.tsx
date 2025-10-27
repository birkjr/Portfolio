"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, LucideIcon, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Education {
  institution: string;
  program: string;
  period: string;
  description?: string;
  icon: LucideIcon;
  detailedDescription?: string;
}

const educations_no: Education[] = [
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Datateknologi (5-årig master)",
    period: "2025 - 2028",
    description: "3. år av 5-årig integrert masterprogram i datateknologi. Byttet fra Ingeniørvitenskap og IKT på 3. klasse. Fokus på kunstig intelligens, IoT, bærekraftige løsninger og utvikling av komplekse IT-systemer.",
    icon: GraduationCap,
    detailedDescription: "Dette er et omfattende 5-årig integrert masterprogram i datateknologi. Jeg byttet fra Ingeniørvitenskap og IKT på 3. klasse for å følge min lidenskap for datafagene. Programmet gir dybdekunnskap innen kunstig intelligens, IoT, bærekraftige løsninger og utvikling av komplekse IT-systemer. Gjennom prosjekter og praktiske oppgaver lærer vi å designe og implementere løsninger som er skalerbare, sikre og brukervennlige."
  },
  {
    institution: "Norges teknisk-naturvitenskapelige universitet (NTNU)",
    program: "Ingeniørvitenskap og IKT - Maskin og IKT (maskinlæring)",
    period: "2023 - 2025",
    description: "Etter 2 år med Ingeniørvitenskap og IKT og retningen Maskin og IKT med fokus på maskinlæring, valgte jeg å følge magefølelsen til å bytte til Datateknologi - fagene jeg elsket mest.",
    icon: GraduationCap,
    detailedDescription: "Denne toårige oppstarten på NTNU i Trondheim ga meg en solid grunnlag i ingeniørvitenskap med spesialisering innen maskinlæring og IKT. Gjennom praktiske prosjekter og teoretisk undervisning utviklet jeg en dyp forståelse for hvordan maskinlæring kan brukes i tekniske løsninger. Men jeg merket at mine interesser lå mer i programutvikling og software development enn maskindesign, noe som førte til beslutningen om å bytte til Datateknologi."
  },
  {
    institution: "Universitetet i Oslo (UiO)",
    program: "Årsenhet, Informatikk",
    period: "2022 - 2023",
    description: "Preliminære fag i informatikk og informatikk-relaterte disipliner.",
    icon: GraduationCap,
    detailedDescription: "Dette årsenhetsstudiet ved UiO fungerte som en perfekt introduksjon til informatikkfeltet. Jeg lærte grunnleggende programmeringskonsepter, datastrukturer og algoritmer som la grunnlaget for videre studier. Dette året bestemte jeg meg for å prioritere teknologistudier i fremtiden."
  },
  {
    institution: "Norges Toppidrettsskole",
    program: "Toppidrett Fotball (Stabæk)",
    period: "2019 - 2022",
    description: "Kombinert toppidrett og videregående skole med toppidrett i fotball.",
    icon: School,
    detailedDescription: "På Toppidrettsgymnaset i Bærum kombinerte jeg videregående utdanning med toppidrettsutøving i fotball. Dette lærte meg verdien av disiplin, tidsstyring og evnen til å balansere flere prioriteringer samtidig. Å være del av Stabæk Fotball sine talentprogram utviklet mine lederegenskaper og lærte meg viktigheten av teamarbeid - ferdigheter som fortsatt er verdifulle i min karriere."
  }
];

const educations_en: Education[] = [
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Computer Science (5-year master's)",
    period: "2025 - 2028",
    description: "3rd year of a 5-year integrated master's program in computer science. Switched from Engineering Science and ICT in 3rd year. Focus on artificial intelligence, IoT, sustainable solutions, and development of complex IT systems.",
    icon: GraduationCap,
    detailedDescription: "This comprehensive 5-year integrated master's program in computer science provides in-depth knowledge in artificial intelligence, IoT, sustainable solutions, and the development of complex IT systems. Through projects and practical assignments, I learn to design and implement solutions that are scalable, secure, and user-friendly."
  },
  {
    institution: "Norwegian University of Science and Technology (NTNU)",
    program: "Engineering Science and ICT - Machine and ICT (machine learning)",
    period: "2023 - 2025",
    description: "After 2 years with Engineering Science and ICT and the specialization Machine and ICT with focus on machine learning, I chose to follow my gut feeling and switch to Computer Science - the subjects I loved most.",
    icon: GraduationCap,
    detailedDescription: "These two years at NTNU in Trondheim provided a solid foundation in engineering science with a specialization in machine learning and ICT. Through practical projects and theoretical teaching, I developed a deep understanding of how machine learning can be used in technical solutions. However, I noticed that my interests were more in software development than machine design, which led to the decision to switch to Computer Science."
  },
  {
    institution: "University of Oslo (UiO)",
    program: "One-year program, Informatics",
    period: "2022 - 2023",
    description: "Preliminary subjects in informatics and informatics-related disciplines.",
    icon: GraduationCap,
    detailedDescription: "This one-year program at UiO served as a perfect introduction to the field of informatics. I learned fundamental programming concepts, data structures, and algorithms that laid the groundwork for further studies. This year I decided to prioritize technology studies in the future."
  },
  {
    institution: "Norwegian College of Elite Sport",
    program: "Elite Sport Football (Stabæk)",
    period: "2019 - 2022",
    description: "Combined elite sport and high school with elite sport in football.",
    icon: School,
    detailedDescription: "At the Elite Sports High School in Bærum, I combined high school education with elite sports in football. This taught me the value of discipline, time management, and the ability to balance multiple priorities simultaneously. Being part of Stabæk Football's talent program developed my leadership qualities and taught me the importance of teamwork - skills that are still valuable in my career."
  }
];

const content = {
  no: {
    label: "Utdanning",
    title: "Utdanning",
    subtitle: "Mitt utdanningsløp"
  },
  en: {
    label: "Education",
    title: "Education",
    subtitle: "My educational journey"
  }
};

export function Education() {
  const { language } = useLanguage();
  const educations = language === 'no' ? educations_no : educations_en;
  const t = content[language];
  const [selectedEducation, setSelectedEducation] = useState<number | null>(null);

  return (
    <section id="education" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">{t.label}</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gradient">{t.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Modal Overlay */}
        {selectedEducation !== null && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEducation(null)}
          >
            <Card
              className="glass hover-glow w-full max-w-2xl relative animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEducation(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    {(() => {
                      const IconComponent = educations[selectedEducation].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-2xl mb-2">{educations[selectedEducation].institution}</CardTitle>
                    <CardDescription className="text-blue-300 font-medium text-lg mb-2">
                      {educations[selectedEducation].program}
                    </CardDescription>
                    <Badge variant="outline" className="text-sm">
                      {educations[selectedEducation].period}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground/90 leading-relaxed">
                  {educations[selectedEducation].detailedDescription || educations[selectedEducation].description}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.map((education, index) => {
            const IconComponent = education.icon;
            return (
              <Card
                key={index}
                className="glass hover-glow transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedEducation(index)}
                style={{
                  opacity: selectedEducation !== null && selectedEducation !== index ? 0.3 : 1,
                  transform: selectedEducation === index ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg mb-2">{education.institution}</CardTitle>
                      <CardDescription className="text-blue-300 font-medium mb-2">
                        {education.program}
                      </CardDescription>
                      <Badge variant="outline" className="text-xs">
                        {education.period}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {education.description && (
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {education.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
