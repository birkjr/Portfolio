"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import {
  colorThemes,
  DEFAULT_COLOR_THEME,
  getColorTheme,
  isColorThemeId,
  type ColorThemeId,
} from "@/config/color-themes";

const LEGACY_THEME_MAP: Record<string, ColorThemeId> = {
  dark: "original",
  system: "original",
};

export function ThemePicker({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!theme) return;
    const mapped = LEGACY_THEME_MAP[theme];
    if (mapped) setTheme(mapped);
  }, [theme, setTheme]);

  const updateMenuPosition = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const menuWidth = 184;
    const viewportPadding = 12;
    const left = Math.min(
      Math.max(rect.right - menuWidth, viewportPadding),
      window.innerWidth - menuWidth - viewportPadding
    );

    setMenuStyle({
      top: rect.bottom + 8,
      left,
      width: menuWidth,
    });
  };

  useEffect(() => {
    if (!open) return;

    updateMenuPosition();

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleReposition = () => updateMenuPosition();

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const activeThemeId =
    mounted && theme && isColorThemeId(theme)
      ? theme
      : mounted && theme && LEGACY_THEME_MAP[theme]
        ? LEGACY_THEME_MAP[theme]
        : DEFAULT_COLOR_THEME;

  const activeTheme = getColorTheme(activeThemeId);

  const selectTheme = (id: ColorThemeId) => {
    setTheme(id);
    setOpen(false);
  };

  const menu =
    open && menuStyle && mounted
      ? createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-label={language === "no" ? "Fargetemaer" : "Color themes"}
            className="fixed z-[200] overflow-hidden rounded-2xl border-2 border-border/70 bg-white/95 p-1.5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/95 dark:shadow-black/40"
            style={{
              top: menuStyle.top,
              left: menuStyle.left,
              width: menuStyle.width,
            }}
          >
            {colorThemes.map((option) => {
              const selected = option.id === activeThemeId;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectTheme(option.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "bg-muted/80 text-foreground"
                      : "text-foreground/85 hover:bg-muted/50"
                  }`}
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-black/10 shadow-sm dark:border-white/15"
                    style={{ backgroundColor: option.swatch }}
                  />
                  <span className="flex-1 font-medium">
                    {option.label[language]}
                  </span>
                  {selected && (
                    <Check className="h-4 w-4 shrink-0 opacity-70" />
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group relative flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-slate-200/60 bg-white/60 px-3 text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-foreground/30 hover:text-slate-950 dark:border-slate-700/50 dark:bg-slate-800/50 dark:text-white/90 dark:hover:text-white"
        aria-label={language === "no" ? "Velg fargetema" : "Choose color theme"}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:bg-muted/50" />
        <Palette className="relative z-10 h-4 w-4" />
        <span
          className="relative z-10 hidden h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm sm:inline-block dark:border-white/20"
          style={{ backgroundColor: activeTheme.swatch }}
        />
      </button>
      {menu}
    </div>
  );
}
