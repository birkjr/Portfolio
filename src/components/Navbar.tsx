"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HumanAvatar } from "@/components/Avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navItems = {
    no: [
      { name: "Om Meg", href: "#home" },
      { name: "Utdanning", href: "#education" },
      { name: "Prosjekter", href: "#projects" },
      { name: "Erfaringer", href: "#experience" },
      { name: "Ferdigheter", href: "#skills" },
      { name: "Kontakt", href: "#contact" },
    ],
    en: [
      { name: "About Me", href: "#home" },
      { name: "Education", href: "#education" },
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "Skills", href: "#skills" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const toggleLanguage = () => {
    setLanguage(language === "no" ? "en" : "no");
  };

  const currentNavItems = navItems[language];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="w-full px-2 sm:px-3">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Avatar - fixed to left */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 border border-white flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-xs sm:text-sm">
                BJR
              </span>
            </div>
            {/* 
            <span className="text-white/80 text-sm sm:text-base md:text-lg font-normal hidden sm:inline whitespace-nowrap">
              Birk Jonathan Ramstad
            </span>
            */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HumanAvatar />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <div className="flex items-center space-x-8 mr-8">
              {currentNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white text-sm font-normal hover:text-white/80 transition-colors duration-200 tracking-wide cursor-pointer whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-white text-sm font-normal hover:text-white/80 transition-colors duration-200 pl-6 border-l border-white/20 cursor-pointer flex-shrink-0"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
          </div>

          {/* Mobile: Language button + Menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-white text-sm font-normal hover:text-white/80 transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white/80 transition-colors cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-black">
            <div className="py-4 space-y-3">
              {currentNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-white text-sm font-normal hover:text-white/80 transition-colors py-2 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
