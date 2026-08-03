import path from "node:path";
import * as p from "@clack/prompts";
import color from "picocolors";
import validatePackageName from "validate-npm-package-name";
import { generateProject, getTemplateDir, runPostInstall } from "./generate.js";
import { getThemePreset, themePresets } from "./theme.js";
import type { ProjectConfig } from "./utils.js";
import {
  normalizeDomain,
  toDomainUrl,
  toInitials,
  toPackageName,
} from "./utils.js";

export async function runCli(cwd = process.cwd(), defaultDirectory?: string) {
  p.intro(color.bgCyan(color.black(" create-portfolio ")));

  const defaultDir =
    typeof defaultDirectory === "string" && defaultDirectory.trim().length > 0
      ? defaultDirectory.trim()
      : "my-portfolio";

  const projectDir = await p.text({
    message: "Project folder name",
    placeholder: "my-portfolio",
    defaultValue: defaultDir,
    validate(value) {
      if (!value?.trim()) return "Folder name is required";
    },
  });

  if (p.isCancel(projectDir)) return cancel();

  const authorName = await p.text({
    message: "Your full name",
    placeholder: "Ola Nordmann",
    validate(value) {
      if (!value?.trim()) return "Name is required";
    },
  });

  if (p.isCancel(authorName)) return cancel();

  const siteTitle = await p.text({
    message: "Site title",
    defaultValue: `${authorName} | Portfolio`,
  });

  if (p.isCancel(siteTitle)) return cancel();

  const domain = await p.text({
    message: "Domain (without https://)",
    placeholder: "example.com",
    validate(value) {
      if (!value?.trim()) return "Domain is required";
      if (value.includes(" ")) return "Domain cannot contain spaces";
    },
  });

  if (p.isCancel(domain)) return cancel();

  const githubUsername = await p.text({
    message: "GitHub username",
    placeholder: "your-username",
    validate(value) {
      if (!value?.trim()) return "GitHub username is required";
    },
  });

  if (p.isCancel(githubUsername)) return cancel();

  const email = await p.text({
    message: "Contact email",
    placeholder: "hello@example.com",
    validate(value) {
      if (!value?.trim() || !value.includes("@"))
        return "Valid email is required";
    },
  });

  if (p.isCancel(email)) return cancel();

  const themeChoice = await p.select({
    message: "Color theme",
    options: themePresets.map((preset) => ({
      value: preset.id,
      label: preset.label,
    })),
    initialValue: "slate",
  });

  if (p.isCancel(themeChoice)) return cancel();

  const theme = getThemePreset(String(themeChoice));

  const tooling = await p.multiselect({
    message: "Include tooling",
    options: [
      { value: "cursor", label: "Cursor rules (.cursor/)", default: true },
      { value: "husky", label: "Husky + lint-staged", default: true },
    ],
    required: false,
  });

  if (p.isCancel(tooling)) return cancel();

  const runInstall = await p.confirm({
    message: "Run pnpm install + git init after scaffold?",
    initialValue: true,
  });

  if (p.isCancel(runInstall)) return cancel();

  const projectNameInput = toPackageName(String(projectDir));
  const packageValidation = validatePackageName(projectNameInput);
  if (!packageValidation.validForNewPackages) {
    p.log.error(`Invalid package name: ${projectNameInput}`);
    process.exit(1);
  }

  const config: ProjectConfig = {
    projectName: projectNameInput,
    authorName: String(authorName).trim(),
    siteTitle: String(siteTitle).trim(),
    domain: normalizeDomain(String(domain)),
    githubUsername: String(githubUsername).trim(),
    email: String(email).trim(),
    initials: toInitials(String(authorName)),
    theme: {
      accent: theme.accent,
      accentDark: theme.accentDark,
      glow: theme.glow,
      glowSecondary: theme.glowSecondary,
      pageGradientLight: theme.pageGradientLight,
      pageGradientDark: theme.pageGradientDark,
      heroBorderLight: theme.heroBorderLight,
    },
    includeCursor: (tooling as string[]).includes("cursor"),
    includeHusky: (tooling as string[]).includes("husky"),
    targetDir: path.resolve(cwd, String(projectDir)),
  };

  const confirmed = await p.confirm({
    message: `Create portfolio in ${color.cyan(config.targetDir)}?`,
    initialValue: true,
  });

  if (p.isCancel(confirmed) || !confirmed) return cancel();

  const s = p.spinner();
  s.start("Scaffolding project...");

  try {
    const templateDir = getTemplateDir(import.meta.url);
    await generateProject(templateDir, config);
    s.stop("Project files created");

    if (runInstall) {
      const installSpinner = p.spinner();
      installSpinner.start("Installing dependencies...");
      await runPostInstall(config.targetDir, config.includeHusky);
      installSpinner.stop("Dependencies installed");
    }
  } catch (error) {
    s.stop("Failed");
    p.log.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  p.note(
    [
      `Site title: ${config.siteTitle}`,
      `Domain: ${toDomainUrl(config.domain)}`,
      `Hero placeholder: public/hero-placeholder.svg`,
      `Theme: ${theme.label}`,
    ].join("\n"),
    "Project ready"
  );

  p.outro(
    [
      `Next steps:`,
      `  cd ${String(projectDir)}`,
      runInstall ? `  pnpm dev` : `  pnpm install && pnpm dev`,
      `  pnpm dlx vercel link   # optional deploy`,
    ].join("\n")
  );
}

function cancel() {
  p.cancel("Cancelled.");
  process.exit(0);
}
