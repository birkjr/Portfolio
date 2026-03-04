"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { HumanAvatar } from "@/components/Avatar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      { name: "Erfaringer", href: "#experience" },
      { name: "Prosjekter", href: "#projects" },
      { name: "Reverse Engineering", href: "#reverse-engineering" },
      { name: "Ferdigheter", href: "#skills" },
      { name: "Kontakt", href: "#contact" },
    ],
    en: [
      { name: "About Me", href: "#home" },
      { name: "Education", href: "#education" },
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
      { name: "Reverse Engineering", href: "#reverse-engineering" },
      { name: "Skills", href: "#skills" },
      { name: "Contact", href: "#contact" },
    ],
  };

  const toggleLanguage = () => {
    setLanguage(language === "no" ? "en" : "no");
  };

  const toggleTheme = () => {
    const currentTheme = theme ?? "dark";
    setTheme(currentTheme === "dark" ? "light" : "dark");
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
      className="fixed top-0 w-full z-50 px-4 sm:px-6 pt-4"
      style={{
        position: "fixed",
      }}
    >
      {/* Main navbar container - rounded, not full width */}
      <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-b from-[#fdf7f0] via-[#f8efe3] to-[#f3e6d6] border-2 border-[#e3d4c3]/80 shadow-lg shadow-slate-900/10 dark:from-slate-900/90 dark:via-slate-950/95 dark:to-black/98 dark:border-slate-800/50 dark:shadow-2xl dark:shadow-black/40">
        {/* Gradient border bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* Subtle glow effect - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-slate-200/40 pointer-events-none dark:to-black/30" />

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--grid-pattern-dot) 1px, transparent 0)`,
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
                    className="group relative px-4 py-2 rounded-lg text-slate-900/80 text-sm font-medium hover:text-slate-950 transition-all duration-300 tracking-wide cursor-pointer whitespace-nowrap overflow-hidden dark:text-white/90 dark:hover:text-white"
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
                className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-slate-200/60 hover:border-blue-500/50 text-slate-900/80 hover:text-slate-950 transition-all duration-300 cursor-pointer flex-shrink-0 overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 blur-xl" />

                <Globe className="w-4 h-4 relative z-10 text-slate-500 group-hover:text-blue-500 transition-colors duration-300 dark:text-slate-400 dark:group-hover:text-blue-400" />
                <span className="relative z-10 uppercase text-sm font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {language}
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="group relative ml-3 w-11 h-11 flex items-center justify-center rounded-lg bg-white/60 border border-slate-200/60 hover:border-blue-500/50 text-slate-700 hover:text-slate-950 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 blur-xl" />
                <div className="relative z-10">
                  {mounted && (theme ?? "dark") === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>

            {/* Mobile: Language button + Menu button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 border border-slate-200/60 hover:border-blue-500/50 text-slate-900/80 hover:text-slate-950 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 blur-xl" />
                <Globe className="w-4 h-4 relative z-10 text-slate-500 group-hover:text-blue-500 transition-colors duration-300 dark:text-slate-400 dark:group-hover:text-blue-400" />
                <span className="relative z-10 uppercase text-xs font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                  {language}
                </span>
              </button>

              <button
                onClick={toggleTheme}
                className="group relative w-11 h-11 flex items-center justify-center rounded-lg bg-white/60 border border-slate-200/60 hover:border-blue-500/50 text-slate-700 hover:text-slate-950 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-500 blur-xl" />
                <div className="relative z-10">
                  {mounted && (theme ?? "dark") === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-11 h-11 flex items-center justify-center rounded-lg bg-white/60 border border-slate-200/60 hover:border-blue-500/50 text-slate-900 hover:text-blue-600 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white dark:hover:text-blue-400"
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
            className={`absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-opacity duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-black ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--grid-pattern-dot) 1px, transparent 0)`,
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
              className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/70 border-2 border-slate-200/70 flex items-center justify-center text-slate-900 hover:bg-white hover:border-blue-500 hover:scale-110 hover:rotate-90 transition-all duration-300 group shadow-xl shadow-slate-900/10 hover:shadow-blue-500/20 dark:bg-slate-800/90 dark:border-slate-700/50 dark:text-white dark:hover:bg-slate-700"
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
                  className="group relative w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/70 border-2 border-slate-200/70 hover:border-blue-500 hover:bg-white transition-all duration-300 overflow-hidden shadow-2xl shadow-slate-900/10 hover:shadow-blue-500/15 dark:bg-slate-800/90 dark:border-slate-700/50 dark:hover:bg-slate-800 dark:hover:shadow-blue-500/20"
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
                    <span className="text-slate-900 text-xl font-semibold tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-300 dark:text-white dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400">
                      {item.name}
                    </span>
                    <ChevronRight
                      size={24}
                      className="text-slate-500 group-hover:text-blue-500 group-hover:translate-x-3 transition-all duration-300 ml-auto dark:text-slate-400 dark:group-hover:text-blue-400"
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
