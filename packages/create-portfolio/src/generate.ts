import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import fsExtra from "fs-extra";
import type { ProjectConfig } from "./utils.js";
import { normalizeDomain, toDomainUrl, toShortName } from "./utils.js";

const { copy, ensureDir, readFile, remove, writeFile } = fsExtra;

const TEXT_EXTENSIONS = new Set([
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
  ".mjs",
]);

export async function generateProject(
  templateDir: string,
  config: ProjectConfig
) {
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
      return (
        !src.includes(`${path.sep}node_modules${path.sep}`) &&
        !src.includes(`${path.sep}.next${path.sep}`) &&
        !src.endsWith(`${path.sep}.DS_Store`)
      );
    },
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
        ...(await readJson(path.join(targetDir, "package.json"))),
        name: config.projectName,
        private: true,
      },
      null,
      2
    ) + "\n"
  );

  await writeReadme(targetDir, config);
  await ensureAppFavicon(targetDir);
}

async function ensureAppFavicon(targetDir: string) {
  const appFavicon = path.join(targetDir, "src/app/favicon.ico");
  const publicFavicon = path.join(targetDir, "public/favicon.ico");

  try {
    const appStat = await fs.stat(appFavicon);
    if (appStat.size > 0) return;
  } catch {
    // missing favicon — fall through to copy
  }

  if (await exists(publicFavicon)) {
    await copy(publicFavicon, appFavicon);
  }
}

function buildReplacements(config: ProjectConfig) {
  const domainHost = normalizeDomain(config.domain);
  const domainUrl = toDomainUrl(domainHost);
  const shortName = toShortName(config.authorName);

  return new Map<string, string>([
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
    ["__HERO_BORDER_LIGHT__", config.theme.heroBorderLight],
  ]);
}

async function walkAndReplace(dir: string, replacements: Map<string, string>) {
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

async function applyTheme(themePath: string, config: ProjectConfig) {
  let css = await readFile(themePath, "utf8");

  css = css
    .replace(/__ACCENT_HSL__/g, config.theme.accent)
    .replace(/__ACCENT_HSL_DARK__/g, config.theme.accentDark)
    .replace(/__GLOW_COLOR__/g, config.theme.glow)
    .replace(/__GLOW_COLOR_SECONDARY__/g, config.theme.glowSecondary)
    .replace(/__PAGE_GRADIENT_LIGHT__/g, config.theme.pageGradientLight)
    .replace(/__PAGE_GRADIENT_DARK__/g, config.theme.pageGradientDark);

  await writeFile(themePath, css);
}

async function writeReadme(targetDir: string, config: ProjectConfig) {
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

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath: string) {
  return JSON.parse(await readFile(filePath, "utf8")) as Record<
    string,
    unknown
  >;
}

export async function runPostInstall(targetDir: string, includeHusky: boolean) {
  await runCommand("pnpm", ["install"], targetDir);

  if (includeHusky) {
    await runCommand("pnpm", ["exec", "husky"], targetDir);
  }

  await runCommand("git", ["init"], targetDir);
}

function runCommand(command: string, args: string[], cwd: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(`${command} ${args.join(" ")} failed with code ${code}`)
        );
    });
  });
}

export function getTemplateDir(fromUrl: string) {
  const filePath = fromUrl.startsWith("file:")
    ? fileURLToPath(fromUrl)
    : fromUrl;

  return path.resolve(path.dirname(filePath), "../template");
}
