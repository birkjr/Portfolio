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
import { cn } from "@/lib/utils";

const LEGACY_THEME_MAP: Record<string, ColorThemeId> = {
  dark: "original",
  midnight: "original",
  light: "thylo",
  ocean: "original",
  warm: "ember",
  hellas: "emil",
  forest: "original",
  system: "original",
};

export function ThemePicker({
  className,
  buttonClassName,
}: {
  className?: string;
  buttonClassName?: string;
}) {
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
    const menuWidth = 220;
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
            className="theme-picker-menu"
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
                  className={cn(
                    "theme-picker-option",
                    selected
                      ? "theme-picker-option--selected"
                      : "theme-picker-option--idle"
                  )}
                >
                  <span
                    className="theme-picker-option-swatch"
                    style={{ backgroundColor: option.swatch }}
                  />
                  <span className="theme-picker-option-label">
                    {option.label[language]}
                  </span>
                  {selected && <Check className="theme-picker-option-check" />}
                </button>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <div ref={containerRef} className={cn("theme-picker", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn("group theme-picker-trigger", buttonClassName)}
        aria-label={language === "no" ? "Velg fargetema" : "Choose color theme"}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="theme-picker-trigger-hover" />
        <Palette className="theme-picker-icon" />
        <span
          className="theme-picker-swatch"
          style={{
            borderColor: activeTheme.swatchRing ?? activeTheme.swatch,
          }}
        />
      </button>
      {menu}
    </div>
  );
}
