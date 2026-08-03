export type ColorThemeId = "light" | "original" | "warm" | "ocean" | "forest";

export const DEFAULT_COLOR_THEME: ColorThemeId = "original";

export interface ColorThemeOption {
  id: ColorThemeId;
  label: { no: string; en: string };
  swatch: string;
  isDark: boolean;
}

export const colorThemes: ColorThemeOption[] = [
  {
    id: "original",
    label: { no: "Original", en: "Original" },
    swatch: "#1e293b",
    isDark: true,
  },
  {
    id: "light",
    label: { no: "Lys", en: "Light" },
    swatch: "#f1f5f9",
    isDark: false,
  },
  {
    id: "warm",
    label: { no: "Warm sand", en: "Warm sand" },
    swatch: "#c4956a",
    isDark: true,
  },
  {
    id: "ocean",
    label: { no: "Hav", en: "Ocean" },
    swatch: "#38bdf8",
    isDark: true,
  },
  {
    id: "forest",
    label: { no: "Skog", en: "Forest" },
    swatch: "#4a9b6e",
    isDark: true,
  },
];

export const colorThemeIds = colorThemes.map((theme) => theme.id);

export function isColorThemeId(value: string): value is ColorThemeId {
  return colorThemeIds.includes(value as ColorThemeId);
}

export function getColorTheme(id: string) {
  return (
    colorThemes.find((theme) => theme.id === id) ??
    colorThemes.find((theme) => theme.id === DEFAULT_COLOR_THEME)!
  );
}
