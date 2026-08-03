export type ColorThemeId =
  | "original"
  | "thylo"
  | "paper"
  | "warm"
  | "fjord"
  | "hellas"
  | "terminal"
  | "ember";

export const DEFAULT_COLOR_THEME: ColorThemeId = "original";

export interface ColorThemeOption {
  id: ColorThemeId;
  label: { no: string; en: string };
  swatch: string;
  /** Lighter ring on swatch button when swatch matches button bg (Thylo). */
  swatchRing?: string;
  isDark: boolean;
  /** Dark navbar/footer on a light page background (Thylo). */
  darkChrome?: boolean;
}

export const colorThemes: ColorThemeOption[] = [
  {
    id: "original",
    label: { no: "Original", en: "Original" },
    swatch: "#1e293b",
    isDark: true,
  },
  {
    id: "thylo",
    label: { no: "Thylo", en: "Thylo" },
    swatch: "#594D84",
    swatchRing: "#a89fbf",
    isDark: false,
    darkChrome: true,
  },
  {
    id: "paper",
    label: { no: "Papir", en: "Paper" },
    swatch: "#f5efe4",
    isDark: false,
  },
  {
    id: "warm",
    label: { no: "Warm sand", en: "Warm sand" },
    swatch: "#c4956a",
    isDark: true,
  },
  {
    id: "fjord",
    label: { no: "Fjord", en: "Fjord" },
    swatch: "#7a9aad",
    isDark: true,
  },
  {
    id: "hellas",
    label: { no: "Hellas", en: "Greece" },
    swatch: "#2A9D8F",
    isDark: false,
  },
  {
    id: "terminal",
    label: { no: "Terminal", en: "Terminal" },
    swatch: "#090b0a",
    isDark: true,
  },
  {
    id: "ember",
    label: { no: "Glød", en: "Ember" },
    swatch: "#c4683a",
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

export function usesDarkChrome(id: string) {
  const theme = getColorTheme(id);
  return theme.isDark;
}

export function isThyloChrome(id: string) {
  return id === "thylo";
}
