import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { emptyDir, remove } from "fs-extra";
import {
  generateProject,
  getTemplateDir,
  runPostInstall,
} from "../dist/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.resolve("/tmp/create-portfolio-full-test");

console.log("Cleaning", targetDir);
await remove(targetDir).catch(() => {});
await emptyDir(targetDir).catch(() => {});

const templateFrom = pathToFileURL(
  path.join(__dirname, "../dist/index.js")
).href;

const config = {
  projectName: "demo-portfolio",
  authorName: "Demo Developer",
  siteTitle: "Demo Developer | Portfolio",
  domain: "demo.dev",
  githubUsername: "demo-dev",
  email: "hello@demo.dev",
  initials: "DD",
  theme: {
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
  includeCursor: true,
  includeHusky: true,
  targetDir,
};

console.log("Generating project...");
await generateProject(getTemplateDir(templateFrom), config);

console.log("Running pnpm install + git init...");
await runPostInstall(targetDir, true);

console.log("Running pnpm build...");
const { spawn } = await import("node:child_process");
await new Promise((resolve, reject) => {
  const child = spawn("pnpm", ["build"], {
    cwd: targetDir,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  child.on("error", reject);
  child.on("close", (code) => {
    if (code === 0) resolve(undefined);
    else reject(new Error(`pnpm build failed with code ${code}`));
  });
});

console.log("\nFull test passed:", targetDir);
console.log("Try: cd /tmp/create-portfolio-full-test && pnpm dev");
