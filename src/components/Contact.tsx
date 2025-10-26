"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, LinkedinIcon } from "lucide-react";

export function Contact() {
  return (
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
                  <a href="mailto:birkrams@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    birkrams@gmail.com
                  </a>
                </Button>
                <Button variant="outline" className="h-12" asChild>
                  <a href="https://www.linkedin.com/in/birkjramstad/" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="w-4 h-4 mr-2" />
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
