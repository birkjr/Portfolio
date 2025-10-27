"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
      { name: "About", href: "#home" },
      { name: "Education", href: "#education" },
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "Skills", href: "#skills" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const toggleLanguage = () => {
    setLanguage(language === 'no' ? 'en' : 'no');
  };
  
  const currentNavItems = navItems[language];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
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
      <div className="container mx-auto mr-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-white flex items-center justify-center">
              <span className="text-white font-semibold text-sm">BJR</span>
            </div>
            <span className="text-white/80 text-lg font-normal">
              Birk Jonathan Ramstad
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 mr-8">
              {currentNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white text-sm font-normal hover:text-white/80 transition-colors duration-200 tracking-wide cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-white text-sm font-normal hover:text-white/80 transition-colors duration-200 pl-6 border-l border-white/20 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
              <button
                onClick={() => { toggleLanguage(); setIsOpen(false); }}
                className="flex items-center space-x-1 text-white text-sm font-normal hover:text-white/80 transition-colors py-2 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
