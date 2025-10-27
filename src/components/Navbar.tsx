"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Om Meg", href: "#home" },
    { name: "Utdanning", href: "#education" },
    { name: "Prosjekter", href: "#projects" },
    { name: "Erfaringer", href: "#experience" },
    { name: "Ferdigheter", href: "#skills" },
    { name: "Kontakt", href: "#contact" },
  ];

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
      <div className="container mx-auto px-8">
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
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-sm font-normal hover:text-white/80 transition-colors duration-200 tracking-wide"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-black">
            <div className="py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-white text-sm font-normal hover:text-white/80 transition-colors py-2"
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
