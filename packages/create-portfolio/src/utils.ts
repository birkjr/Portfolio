export interface ProjectConfig {
  projectName: string;
  authorName: string;
  siteTitle: string;
  domain: string;
  githubUsername: string;
  email: string;
  initials: string;
  theme: {
    accent: string;
    accentDark: string;
    glow: string;
    glowSecondary: string;
    pageGradientLight: string;
    pageGradientDark: string;
    heroBorderLight: string;
  };
  includeCursor: boolean;
  includeHusky: boolean;
  targetDir: string;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toPackageName(value: string) {
  return slugify(value).replace(/-/g, "-") || "my-portfolio";
}

export function toInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }

  return name.slice(0, 3).toUpperCase();
}

export function normalizeDomain(domain: string) {
  return domain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .replace(/^www\./, "");
}

export function toDomainUrl(domain: string) {
  const host = normalizeDomain(domain);
  return `https://www.${host}`;
}

export function toShortName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return fullName;
  return `${parts[0]} ${parts[parts.length - 1]}`;
}
