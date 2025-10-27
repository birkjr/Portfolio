"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, LinkedinIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const content = {
  no: {
    title: "Kontakt meg",
    subtitle: "Er min profil spennende eller har du noe spørsmål? Kontakt meg!",
    cardTitle: "Send meg en melding",
    cardDescription: "Jeg svarer vanligvis innen 24 timer på arbeidsdager."
  },
  en: {
    title: "Contact me",
    subtitle: "Is my profile interesting or do you have any questions? Contact me!",
    cardTitle: "Send me a message",
    cardDescription: "I usually reply within 24 hours on weekdays."
  }
};

export function Contact() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section className="pt-32 pb-20 flex-grow flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t.cardTitle}</CardTitle>
              <CardDescription>
                {t.cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Button variant="outline" className="h-14 sm:h-16" asChild>
                  <a href="mailto:birkrams@gmail.com" className="text-sm sm:text-base">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="truncate">birkrams@gmail.com</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-14 sm:h-16" asChild>
                  <a
                    href="https://www.linkedin.com/in/birkjramstad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base"
                  >
                    <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
