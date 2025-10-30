"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 mb-4 md:mb-0 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">BJR</span>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">
                © 2025 Birk Jonathan Ramstad.
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://github.com/birkjr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a
                href="https://www.linkedin.com/in/birkjramstad/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="mailto:birkrams@gmail.com">
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
