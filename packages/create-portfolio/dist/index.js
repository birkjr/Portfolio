#!/usr/bin/env node

// src/prompts.ts
import path2 from "path";
import * as p from "@clack/prompts";
import color from "picocolors";
import validatePackageName from "validate-npm-package-name";

// src/generate.ts
import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";

// src/utils.ts
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function toPackageName(value) {
  return slugify(value).replace(/-/g, "-") || "my-portfolio";
}
function toInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 3).toUpperCase();
}
function normalizeDomain(domain) {
  return domain.trim().replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^www\./, "");
}
function toDomainUrl(domain) {
  const host = normalizeDomain(domain);
  return `https://www.${host}`;
}
function toShortName(fullName) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return fullName;
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

// src/generate.ts
var { copy, ensureDir, readFile, remove, writeFile } = fsExtra;
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".json",
  ".css",
  ".md",
  ".svg",
  ".txt",
  ".mjs"
]);
async function generateProject(templateDir, config) {
  const targetDir = path.resolve(config.targetDir);
  if (await exists(targetDir)) {
    const entries = await fs.readdir(targetDir);
    if (entries.length > 0) {
      throw new Error(`Target directory is not empty: ${targetDir}`);
    }
  }
  await ensureDir(targetDir);
  await copy(templateDir, targetDir, {
    filter(src) {
      return !src.includes(`${path.sep}node_modules${path.sep}`) && !src.includes(`${path.sep}.next${path.sep}`) && !src.endsWith(`${path.sep}.DS_Store`);
    }
  });
  if (!config.includeCursor) {
    await remove(path.join(targetDir, ".cursor"));
  }
  if (!config.includeHusky) {
    await remove(path.join(targetDir, ".husky"));
  }
  const replacements = buildReplacements(config);
  await walkAndReplace(targetDir, replacements);
  await applyTheme(path.join(targetDir, "src/config/ui-theme.css"), config);
  await writeFile(
    path.join(targetDir, "package.json"),
    JSON.stringify(
      {
        ...await readJson(path.join(targetDir, "package.json")),
        name: config.projectName,
        private: true
      },
      null,
      2
    ) + "\n"
  );
  await writeReadme(targetDir, config);
  await ensureAppFavicon(targetDir);
}
async function ensureAppFavicon(targetDir) {
  const appFavicon = path.join(targetDir, "src/app/favicon.ico");
  const publicFavicon = path.join(targetDir, "public/favicon.ico");
  try {
    const appStat = await fs.stat(appFavicon);
    if (appStat.size > 0) return;
  } catch {
  }
  if (await exists(publicFavicon)) {
    await copy(publicFavicon, appFavicon);
  }
}
function buildReplacements(config) {
  const domainHost = normalizeDomain(config.domain);
  const domainUrl = toDomainUrl(domainHost);
  const shortName = toShortName(config.authorName);
  return /* @__PURE__ */ new Map([
    ["__PROJECT_NAME__", config.projectName],
    ["__AUTHOR_NAME__", config.authorName],
    ["__AUTHOR_SHORT_NAME__", shortName],
    ["__AUTHOR_INITIALS__", config.initials],
    ["__SITE_TITLE__", config.siteTitle],
    ["__DOMAIN_HOST__", domainHost],
    ["__DOMAIN_URL__", domainUrl],
    ["__GITHUB_USERNAME__", config.githubUsername],
    ["__EMAIL__", config.email],
    ["__ACCENT_HSL__", config.theme.accent],
    ["__ACCENT_HSL_DARK__", config.theme.accentDark],
    ["__GLOW_COLOR__", config.theme.glow],
    ["__GLOW_COLOR_SECONDARY__", config.theme.glowSecondary],
    ["__PAGE_GRADIENT_LIGHT__", config.theme.pageGradientLight],
    ["__PAGE_GRADIENT_DARK__", config.theme.pageGradientDark],
    ["__HERO_BORDER_LIGHT__", config.theme.heroBorderLight]
  ]);
}
async function walkAndReplace(dir, replacements) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkAndReplace(fullPath, replacements);
      continue;
    }
    const ext = path.extname(entry.name);
    if (!TEXT_EXTENSIONS.has(ext)) continue;
    let content = await readFile(fullPath, "utf8");
    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }
    await writeFile(fullPath, content);
  }
}
async function applyTheme(themePath, config) {
  let css = await readFile(themePath, "utf8");
  css = css.replace(/__ACCENT_HSL__/g, config.theme.accent).replace(/__ACCENT_HSL_DARK__/g, config.theme.accentDark).replace(/__GLOW_COLOR__/g, config.theme.glow).replace(/__GLOW_COLOR_SECONDARY__/g, config.theme.glowSecondary).replace(/__PAGE_GRADIENT_LIGHT__/g, config.theme.pageGradientLight).replace(/__PAGE_GRADIENT_DARK__/g, config.theme.pageGradientDark);
  await writeFile(themePath, css);
}
async function writeReadme(targetDir, config) {
  const readme = `# ${config.siteTitle}

Generated with [\`create-portfolio\`](https://github.com/birkjr/Portfolio/tree/main/packages/create-portfolio).

## Getting started

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000).

## Customize

- **Content**: \`src/content/*\`
- **Theme colors**: \`src/config/ui-theme.css\`
- **Hero image**: replace \`public/hero-placeholder.svg\`
- **Metadata / SEO**: \`src/app/layout.tsx\`

## Deploy to Vercel

\`\`\`bash
pnpm dlx vercel login
pnpm dlx vercel link
pnpm dlx vercel --prod
\`\`\`

Set your domain (\`${normalizeDomain(config.domain)}\`) in the Vercel dashboard after deploy.
`;
  await writeFile(path.join(targetDir, "README.md"), readme);
}
async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}
async function runPostInstall(targetDir, includeHusky) {
  await runCommand("pnpm", ["install"], targetDir);
  if (includeHusky) {
    await runCommand("pnpm", ["exec", "husky"], targetDir);
  }
  await runCommand("git", ["init"], targetDir);
}
function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32"
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}
function getTemplateDir(fromUrl) {
  const filePath = fromUrl.startsWith("file:") ? fileURLToPath(fromUrl) : fromUrl;
  return path.resolve(path.dirname(filePath), "../template");
}

// src/theme.ts
var themePresets = [
  {
    id: "slate",
    label: "Slate (default)",
    accent: "215 16% 47%",
    accentDark: "215 20% 65%",
    glow: "rgba(100, 116, 139, 0.25)",
    glowSecondary: "rgba(100, 116, 139, 0.08)",
    pageGradientLight: "linear-gradient(to bottom right, rgb(248 250 252), rgb(241 245 249), rgb(248 250 252))",
    pageGradientDark: "linear-gradient(to bottom right, rgb(15 23 42), rgb(15 23 42), rgb(2 6 23))",
    heroBorderLight: "#e3d4c3"
  },
  {
    id: "warm",
    label: "Warm sand",
    accent: "28 35% 42%",
    accentDark: "28 40% 62%",
    glow: "rgba(180, 130, 90, 0.28)",
    glowSecondary: "rgba(180, 130, 90, 0.1)",
    pageGradientLight: "linear-gradient(to bottom right, rgb(255 251 245), rgb(250 242 230), rgb(255 248 240))",
    pageGradientDark: "linear-gradient(to bottom right, rgb(28 22 18), rgb(22 18 15), rgb(12 10 8))",
    heroBorderLight: "#e8d5bc"
  },
  {
    id: "ocean",
    label: "Ocean",
    accent: "200 65% 42%",
    accentDark: "200 70% 62%",
    glow: "rgba(56, 189, 248, 0.24)",
    glowSecondary: "rgba(56, 189, 248, 0.08)",
    pageGradientLight: "linear-gradient(to bottom right, rgb(240 249 255), rgb(224 242 254), rgb(240 249 255))",
    pageGradientDark: "linear-gradient(to bottom right, rgb(8 29 46), rgb(6 24 38), rgb(3 12 20))",
    heroBorderLight: "#b6d9ea"
  },
  {
    id: "forest",
    label: "Forest",
    accent: "150 30% 38%",
    accentDark: "150 35% 58%",
    glow: "rgba(74, 155, 110, 0.24)",
    glowSecondary: "rgba(74, 155, 110, 0.08)",
    pageGradientLight: "linear-gradient(to bottom right, rgb(244 250 246), rgb(232 245 236), rgb(244 250 246))",
    pageGradientDark: "linear-gradient(to bottom right, rgb(10 24 18), rgb(8 20 15), rgb(4 12 8))",
    heroBorderLight: "#c6dccf"
  }
];
function getThemePreset(id) {
  return themePresets.find((preset) => preset.id === id) ?? themePresets[0];
}

// src/prompts.ts
async function runCli(cwd = process.cwd(), defaultDirectory) {
  p.intro(color.bgCyan(color.black(" create-portfolio ")));
  const defaultDir = typeof defaultDirectory === "string" && defaultDirectory.trim().length > 0 ? defaultDirectory.trim() : "my-portfolio";
  const projectDir = await p.text({
    message: "Project folder name",
    placeholder: "my-portfolio",
    defaultValue: defaultDir,
    validate(value) {
      if (!value?.trim()) return "Folder name is required";
    }
  });
  if (p.isCancel(projectDir)) return cancel2();
  const authorName = await p.text({
    message: "Your full name",
    placeholder: "Ola Nordmann",
    validate(value) {
      if (!value?.trim()) return "Name is required";
    }
  });
  if (p.isCancel(authorName)) return cancel2();
  const siteTitle = await p.text({
    message: "Site title",
    defaultValue: `${authorName} | Portfolio`
  });
  if (p.isCancel(siteTitle)) return cancel2();
  const domain = await p.text({
    message: "Domain (without https://)",
    placeholder: "example.com",
    validate(value) {
      if (!value?.trim()) return "Domain is required";
      if (value.includes(" ")) return "Domain cannot contain spaces";
    }
  });
  if (p.isCancel(domain)) return cancel2();
  const githubUsername = await p.text({
    message: "GitHub username",
    placeholder: "your-username",
    validate(value) {
      if (!value?.trim()) return "GitHub username is required";
    }
  });
  if (p.isCancel(githubUsername)) return cancel2();
  const email = await p.text({
    message: "Contact email",
    placeholder: "hello@example.com",
    validate(value) {
      if (!value?.trim() || !value.includes("@")) return "Valid email is required";
    }
  });
  if (p.isCancel(email)) return cancel2();
  const themeChoice = await p.select({
    message: "Color theme",
    options: themePresets.map((preset) => ({
      value: preset.id,
      label: preset.label
    })),
    initialValue: "slate"
  });
  if (p.isCancel(themeChoice)) return cancel2();
  const theme = getThemePreset(String(themeChoice));
  const tooling = await p.multiselect({
    message: "Include tooling",
    options: [
      { value: "cursor", label: "Cursor rules (.cursor/)", default: true },
      { value: "husky", label: "Husky + lint-staged", default: true }
    ],
    required: false
  });
  if (p.isCancel(tooling)) return cancel2();
  const runInstall = await p.confirm({
    message: "Run pnpm install + git init after scaffold?",
    initialValue: true
  });
  if (p.isCancel(runInstall)) return cancel2();
  const projectNameInput = toPackageName(String(projectDir));
  const packageValidation = validatePackageName(projectNameInput);
  if (!packageValidation.validForNewPackages) {
    p.log.error(`Invalid package name: ${projectNameInput}`);
    process.exit(1);
  }
  const config = {
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
      heroBorderLight: theme.heroBorderLight
    },
    includeCursor: tooling.includes("cursor"),
    includeHusky: tooling.includes("husky"),
    targetDir: path2.resolve(cwd, String(projectDir))
  };
  const confirmed = await p.confirm({
    message: `Create portfolio in ${color.cyan(config.targetDir)}?`,
    initialValue: true
  });
  if (p.isCancel(confirmed) || !confirmed) return cancel2();
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
      `Theme: ${theme.label}`
    ].join("\n"),
    "Project ready"
  );
  p.outro(
    [
      `Next steps:`,
      `  cd ${String(projectDir)}`,
      runInstall ? `  pnpm dev` : `  pnpm install && pnpm dev`,
      `  pnpm dlx vercel link   # optional deploy`
    ].join("\n")
  );
}
function cancel2() {
  p.cancel("Cancelled.");
  process.exit(0);
}

// src/index.ts
function parseDirectoryArg() {
  const arg = process.argv[2];
  if (!arg || arg.startsWith("-")) return void 0;
  return arg;
}
var isDirectRun = process.argv[1] && (process.argv[1].endsWith("/index.ts") || process.argv[1].endsWith("/index.js") || process.argv[1].endsWith("/create-portfolio.js") || process.argv[1].endsWith("/create-birk-portfolio.js"));
if (isDirectRun) {
  runCli(process.cwd(), parseDirectoryArg()).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
export {
  generateProject,
  getTemplateDir,
  runPostInstall
};
