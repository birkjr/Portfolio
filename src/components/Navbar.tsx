"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Menu, X, Globe, ChevronRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { navbar } from "@/content/navbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    // Slight delay so the mount animation fires after first paint
    const t = setTimeout(() => setNavVisible(true), 80);
    return () => clearTimeout(t);
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

  const navItems = navbar;

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
    <>
      <nav
        className="fixed top-0 w-full z-50 px-4 sm:px-6 pt-4"
        style={{
          position: "fixed",
          transform: navVisible ? "translateY(0)" : "translateY(-110%)",
          opacity: navVisible ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.22,0.61,0.36,1), opacity 0.5s ease",
        }}
      >
        {/* Main navbar container - rounded, not full width */}
        <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-b from-[#fdf7f0] via-[#f8efe3] to-[#f3e6d6] border-2 border-[#e3d4c3]/80 shadow-lg shadow-slate-900/10 dark:from-slate-900/90 dark:via-slate-950/95 dark:to-black/98 dark:border-slate-800/50 dark:shadow-2xl dark:shadow-black/40">
          {/* Gradient border bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
          {/* Subtle glow effect - stronger at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-200/40 pointer-events-none dark:to-black/30" />

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
                  <div className="absolute inset-0 rounded-md hidden" />
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-md border-2 border-slate-200/70 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 shadow-md group-hover:border-foreground/30 group-hover:shadow-slate-900/10 dark:border-slate-700/50 dark:bg-slate-800/80 dark:shadow-lg dark:group-hover:shadow-black/10">
                    <span className="text-slate-900 font-bold text-xs sm:text-sm dark:text-white">
                      BJR
                    </span>
                  </div>
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
                      <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300 rounded-lg" />

                      {/* Text with gradient on hover */}
                      <span className="relative z-10 group-hover:text-foreground transition-all duration-300">
                        {item.name}
                      </span>

                      {/* Bottom indicator line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-foreground/40 group-hover:w-[60%] transition-all duration-500 rounded-full" />
                    </button>
                  ))}
                </div>

                {/* Separator */}
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-700/50 to-transparent mr-6" />

                {/* Language Toggle */}
                <button
                  onClick={toggleLanguage}
                  className="group relative flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 border border-slate-200/60 hover:border-foreground/30 text-slate-900/80 hover:text-slate-950 transition-all duration-300 cursor-pointer flex-shrink-0 overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300" />

                  <Globe className="w-4 h-4 relative z-10 text-slate-500 group-hover:text-foreground transition-colors duration-300 dark:text-slate-400 dark:group-hover:text-foreground" />
                  <span className="relative z-10 uppercase text-sm font-medium group-hover:text-foreground transition-all duration-300">
                    {language}
                  </span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="group relative ml-3 w-11 h-11 flex items-center justify-center rounded-lg bg-white/60 border border-slate-200/60 hover:border-foreground/30 text-slate-700 hover:text-slate-950 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
                  aria-label="Toggle theme"
                >
                  <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300" />
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
                  className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 border border-slate-200/60 hover:border-foreground/30 text-slate-900/80 hover:text-slate-950 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
                >
                  <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300" />
                  <Globe className="w-4 h-4 relative z-10 text-slate-500 group-hover:text-foreground transition-colors duration-300 dark:text-slate-400 dark:group-hover:text-foreground" />
                  <span className="relative z-10 uppercase text-xs font-medium group-hover:text-foreground transition-all duration-300">
                    {language}
                  </span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="group relative w-11 h-11 flex items-center justify-center rounded-lg bg-white/60 border border-slate-200/60 hover:border-foreground/30 text-slate-700 hover:text-slate-950 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white/90 dark:hover:text-white"
                  aria-label="Toggle theme"
                >
                  <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300" />
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
                  className="group relative w-11 h-11 flex items-center justify-center rounded-lg bg-white/60 border border-slate-200/60 hover:border-foreground/30 text-slate-900 hover:text-foreground transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-white dark:hover:text-foreground"
                  aria-label="Toggle menu"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300" />

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
        </div>
      </nav>

      {/* Mobile full-screen overlay — rendered OUTSIDE the backdrop-blur container
        so that position:fixed works relative to the viewport, not the blur parent */}
      <div
        className={`md:hidden fixed inset-0 z-[200] transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--grid-pattern-dot) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Menu content */}
        <div
          className={`relative flex h-full w-full flex-col items-center px-6 pt-28 transition-transform duration-500 ${
            isOpen ? "translate-y-0" : "translate-y-8"
          }`}
          style={{
            paddingBottom: "calc(2.75rem + env(safe-area-inset-bottom, 0px))",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/70 border-2 border-slate-200/70 flex items-center justify-center text-slate-900 hover:bg-white hover:border-foreground/30 hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-black/10 dark:bg-slate-800/90 dark:border-slate-700/50 dark:text-white dark:hover:bg-slate-700"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>

          {/* Nav items */}
          <nav className="flex w-full max-w-md flex-1 flex-col justify-center space-y-3 px-2">
            {currentNavItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="group relative w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white/70 border-2 border-slate-200/70 hover:border-foreground/30 hover:bg-white transition-all duration-300 overflow-hidden shadow-lg shadow-slate-900/10 hover:shadow-black/10 dark:bg-slate-800/90 dark:border-slate-700/50 dark:hover:bg-slate-800 dark:hover:shadow-black/10"
                style={{
                  animationDelay: `${index * 60}ms`,
                  animation: isOpen ? "slideInLeft 0.6s ease-out both" : "none",
                }}
              >
                <div className="absolute inset-0 group-hover:bg-muted/50 transition-all duration-300" />

                <div className="relative z-10 flex items-center gap-4 w-full">
                  <span className="text-slate-900 text-xl font-semibold tracking-wide group-hover:text-foreground transition-all duration-300 dark:text-white">
                    {item.name}
                  </span>
                  <ChevronRight
                    size={24}
                    className="text-slate-500 group-hover:text-foreground group-hover:translate-x-3 transition-all duration-300 ml-auto dark:text-slate-400 dark:group-hover:text-foreground"
                  />
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-foreground/30 group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
