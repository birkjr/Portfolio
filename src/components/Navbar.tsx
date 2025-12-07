"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HumanAvatar } from "@/components/Avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
      const navElement = document.querySelector("nav");
      const navOffset =
        navElement instanceof HTMLElement ? navElement.offsetHeight : 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(elementPosition - navOffset, 0);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50"
      style={{
        position: "fixed",
      }}
    >
      {/* Gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Main navbar container - Darker at bottom for more contrast */}
      <div className="relative w-full backdrop-blur-xl bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-black/98 border-b border-slate-800/50 shadow-2xl shadow-black/40">
        {/* Subtle glow effect - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-black/30 pointer-events-none" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 1) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Avatar - fixed to left */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
              {/* Logo with gradient border */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md border-2 border-slate-700/50 group-hover:border-blue-500/50 bg-slate-800/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-blue-500/20">
                  <span className="text-white font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    BJR
                  </span>
                </div>
              </div>

              <div className="relative hidden md:flex items-center justify-center">
                {/* Subtle glow around avatar */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <HumanAvatar />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <div className="flex items-center space-x-1 mr-6">
                {currentNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative px-4 py-2 rounded-lg text-white/90 text-sm font-medium hover:text-white transition-all duration-300 tracking-wide cursor-pointer whitespace-nowrap overflow-hidden"
                  >
                    {/* Hover background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500 blur-xl rounded-lg" />

                    {/* Text with gradient on hover */}
                    <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                      {item.name}
                    </span>

                    {/* Bottom indicator line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-[60%] transition-all duration-500 rounded-full" />
                  </button>
                ))}
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-700/50 to-transparent mr-6" />

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 text-white/90 hover:text-white transition-all duration-300 cursor-pointer flex-shrink-0 overflow-hidden backdrop-blur-sm"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 blur-xl" />

                <Globe className="w-4 h-4 relative z-10 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                <span className="relative z-10 uppercase text-sm font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {language}
                </span>
              </button>
            </div>

            {/* Mobile: Language button + Menu button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 text-white/90 hover:text-white transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 blur-xl" />
                <Globe className="w-4 h-4 relative z-10 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
                <span className="relative z-10 uppercase text-xs font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {language}
                </span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-11 h-11 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 text-white hover:text-blue-400 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm"
                aria-label="Toggle menu"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl" />

                <div className="relative z-10 w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        <div
          className={`md:hidden fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[100] transition-all duration-500 ease-in-out ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Backdrop - Solid with subtle gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundColor: "rgb(2, 6, 23)", // slate-950 solid
            }}
          />

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 1) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Menu Content */}
          <div
            className={`relative flex h-full w-full flex-col items-center px-6 pt-28 transition-transform duration-500 ${
              isOpen ? "translate-y-0" : "translate-y-8"
            }`}
            onClick={(e) => e.stopPropagation()}
            style={{
              paddingBottom: "calc(2.75rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-14 h-14 rounded-full bg-slate-800/90 border-2 border-slate-700/50 flex items-center justify-center text-white hover:bg-slate-700 hover:border-blue-500 hover:scale-110 hover:rotate-90 transition-all duration-300 group shadow-xl hover:shadow-blue-500/30"
              aria-label="Close menu"
            >
              <X size={26} className="transition-transform duration-300" />
            </button>

            {/* Navigation Items */}
            <nav className="flex w-full max-w-md flex-1 flex-col justify-center space-y-3 px-2">
              {currentNavItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="group relative w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-slate-800/90 border-2 border-slate-700/50 hover:border-blue-500 hover:bg-slate-800 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-blue-500/20"
                  style={{
                    animationDelay: `${index * 60}ms`,
                    animation: isOpen
                      ? "slideInLeft 0.6s ease-out both"
                      : "none",
                  }}
                >
                  {/* Gradient Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/30 group-hover:via-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-500 blur-2xl" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <span className="text-white text-xl font-semibold tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                      {item.name}
                    </span>
                    <ChevronRight
                      size={24}
                      className="text-slate-400 group-hover:text-blue-400 group-hover:translate-x-3 transition-all duration-300 ml-auto"
                    />
                  </div>

                  {/* Animated Hover Indicator Line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 group-hover:w-full transition-all duration-500 shadow-lg shadow-blue-500/50" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
