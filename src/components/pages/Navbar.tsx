"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Menu, X, Globe, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemePicker } from "@/components/ui/ThemePicker";
import { useLanguage } from "@/context/LanguageContext";
import { navbar } from "@/content/navbar";
import {
  DEFAULT_COLOR_THEME,
  isColorThemeId,
  isThyloChrome,
  usesDarkChrome,
} from "@/config/color-themes";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/scroll-nav";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [navVisible, setNavVisible] = useState(false);
  const themeId =
    mounted && theme && isColorThemeId(theme) ? theme : DEFAULT_COLOR_THEME;
  const darkChrome = usesDarkChrome(themeId);
  const thyloChrome = isThyloChrome(themeId);

  useEffect(() => {
    const t = setTimeout(() => setNavVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

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
  const currentNavItems = navItems[language];

  const toggleLanguage = () => {
    setLanguage(language === "no" ? "en" : "no");
  };

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className="navbar-root"
        style={{
          transform: navVisible ? "translateY(0)" : "translateY(-110%)",
          opacity: navVisible ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.22,0.61,0.36,1), opacity 0.5s ease",
        }}
      >
        <div
          className={cn(
            "navbar-shell",
            thyloChrome
              ? "thylo-chrome navbar-shell--thylo"
              : "navbar-shell--default",
            darkChrome && "dark"
          )}
        >
          <div className="navbar-glow-overlay" />
          <div className="navbar-pattern-overlay" />

          <div className="navbar-inner">
            <div className="navbar-bar">
              <div className="navbar-logo-wrap">
                <div className="group navbar-logo-group">
                  <div className="nav-chrome-logo navbar-logo-badge">
                    <span className="nav-chrome-logo-text navbar-logo-text">
                      BJR
                    </span>
                  </div>
                </div>
              </div>

              <div className="navbar-desktop">
                <div className="navbar-links">
                  {currentNavItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="group nav-chrome-link navbar-link"
                    >
                      <div className="navbar-link-hover-bg" />
                      <span className="nav-chrome-link-text navbar-link-text">
                        {item.name}
                      </span>
                      <div className="navbar-link-indicator" />
                    </button>
                  ))}
                </div>

                <div className="navbar-separator" />

                <button
                  onClick={toggleLanguage}
                  className="group nav-chrome-btn navbar-lang-btn navbar-lang-btn--desktop"
                >
                  <div className="navbar-chrome-btn-hover" />
                  <Globe className="nav-chrome-btn-icon navbar-lang-icon" />
                  <span className="navbar-lang-label navbar-lang-label--desktop">
                    {language}
                  </span>
                </button>

                <ThemePicker
                  className="navbar-theme-picker"
                  buttonClassName="nav-chrome-btn"
                />
              </div>

              <div className="navbar-mobile-actions">
                <button
                  onClick={toggleLanguage}
                  className="group nav-chrome-btn navbar-lang-btn navbar-lang-btn--mobile"
                >
                  <div className="navbar-chrome-btn-hover" />
                  <Globe className="nav-chrome-btn-icon navbar-lang-icon" />
                  <span className="navbar-lang-label navbar-lang-label--mobile">
                    {language}
                  </span>
                </button>

                <ThemePicker buttonClassName="nav-chrome-btn" />

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="group nav-chrome-btn navbar-menu-btn"
                  aria-label="Toggle menu"
                >
                  <div className="navbar-chrome-btn-hover" />
                  <div className="navbar-menu-icon-wrap">
                    <Menu
                      size={24}
                      className={cn(
                        "navbar-menu-icon",
                        isOpen
                          ? "navbar-menu-icon--menu-open"
                          : "navbar-menu-icon--menu-closed"
                      )}
                    />
                    <X
                      size={24}
                      className={cn(
                        "navbar-menu-icon",
                        isOpen
                          ? "navbar-menu-icon--close-open"
                          : "navbar-menu-icon--close-closed"
                      )}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "navbar-overlay",
          thyloChrome && "thylo-chrome",
          darkChrome && "dark",
          isOpen ? "navbar-overlay--open" : "navbar-overlay--closed"
        )}
        onClick={() => setIsOpen(false)}
      >
        <div className="navbar-overlay-backdrop" />
        <div className="navbar-overlay-pattern" />

        <div
          className={cn(
            "navbar-overlay-content",
            isOpen
              ? "navbar-overlay-content--open"
              : "navbar-overlay-content--closed"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="nav-chrome-btn navbar-overlay-close"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>

          <nav className="navbar-mobile-nav">
            {currentNavItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="group nav-chrome-menu-item navbar-mobile-item"
                style={{
                  animation: isOpen
                    ? `slideInLeft 0.6s ease-out ${index * 60}ms both`
                    : "none",
                }}
              >
                <div className="navbar-mobile-item-hover" />
                <div className="navbar-mobile-item-inner">
                  <span className="navbar-mobile-item-label">{item.name}</span>
                  <ChevronRight
                    size={24}
                    className="navbar-mobile-item-chevron"
                  />
                </div>
                <div className="navbar-mobile-item-line" />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
