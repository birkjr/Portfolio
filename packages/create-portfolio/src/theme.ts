export interface ThemePreset {
  id: string;
  label: string;
  accent: string;
  accentDark: string;
  glow: string;
  glowSecondary: string;
  pageGradientLight: string;
  pageGradientDark: string;
  heroBorderLight: string;
}

export const themePresets: ThemePreset[] = [
  {
    id: "slate",
    label: "Slate (default)",
    accent: "215 16% 47%",
    accentDark: "215 20% 65%",
    glow: "rgba(100, 116, 139, 0.25)",
    glowSecondary: "rgba(100, 116, 139, 0.08)",
    pageGradientLight:
      "linear-gradient(to bottom right, rgb(248 250 252), rgb(241 245 249), rgb(248 250 252))",
    pageGradientDark:
      "linear-gradient(to bottom right, rgb(15 23 42), rgb(15 23 42), rgb(2 6 23))",
    heroBorderLight: "#e3d4c3",
  },
  {
    id: "warm",
    label: "Warm sand",
    accent: "28 35% 42%",
    accentDark: "28 40% 62%",
    glow: "rgba(180, 130, 90, 0.28)",
    glowSecondary: "rgba(180, 130, 90, 0.1)",
    pageGradientLight:
      "linear-gradient(to bottom right, rgb(255 251 245), rgb(250 242 230), rgb(255 248 240))",
    pageGradientDark:
      "linear-gradient(to bottom right, rgb(28 22 18), rgb(22 18 15), rgb(12 10 8))",
    heroBorderLight: "#e8d5bc",
  },
  {
    id: "ocean",
    label: "Ocean",
    accent: "200 65% 42%",
    accentDark: "200 70% 62%",
    glow: "rgba(56, 189, 248, 0.24)",
    glowSecondary: "rgba(56, 189, 248, 0.08)",
    pageGradientLight:
      "linear-gradient(to bottom right, rgb(240 249 255), rgb(224 242 254), rgb(240 249 255))",
    pageGradientDark:
      "linear-gradient(to bottom right, rgb(8 29 46), rgb(6 24 38), rgb(3 12 20))",
    heroBorderLight: "#b6d9ea",
  },
  {
    id: "forest",
    label: "Forest",
    accent: "150 30% 38%",
    accentDark: "150 35% 58%",
    glow: "rgba(74, 155, 110, 0.24)",
    glowSecondary: "rgba(74, 155, 110, 0.08)",
    pageGradientLight:
      "linear-gradient(to bottom right, rgb(244 250 246), rgb(232 245 236), rgb(244 250 246))",
    pageGradientDark:
      "linear-gradient(to bottom right, rgb(10 24 18), rgb(8 20 15), rgb(4 12 8))",
    heroBorderLight: "#c6dccf",
  },
];

export function getThemePreset(id: string) {
  return themePresets.find((preset) => preset.id === id) ?? themePresets[0];
}

export function hexToHsl(hex: string): string {
  const normalized = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));

    switch (max) {
      case r:
        hue = ((g - b) / delta) % 6;
        break;
      case g:
        hue = (b - r) / delta + 2;
        break;
      default:
        hue = (r - g) / delta + 4;
        break;
    }

    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  return `${hue} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}

export function buildCustomTheme(hex: string): ThemePreset {
  const accent = hexToHsl(hex);
  const [h, s, l] = accent.split(" ");
  const lightNum = Number.parseInt(l, 10);
  const accentDark = `${h} ${s} ${Math.min(lightNum + 18, 78)}%`;

  return {
    id: "custom",
    label: "Custom",
    accent,
    accentDark,
    glow: `rgba(${hexToRgb(hex).join(", ")}, 0.24)`,
    glowSecondary: `rgba(${hexToRgb(hex).join(", ")}, 0.08)`,
    pageGradientLight:
      "linear-gradient(to bottom right, rgb(248 250 252), rgb(241 245 249), rgb(248 250 252))",
    pageGradientDark:
      "linear-gradient(to bottom right, rgb(15 23 42), rgb(15 23 42), rgb(2 6 23))",
    heroBorderLight: hex,
  };
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}
