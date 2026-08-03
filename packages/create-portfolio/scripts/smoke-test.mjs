import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { emptyDir } from "fs-extra";
import { generateProject, getTemplateDir } from "../dist/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.resolve("/tmp/create-portfolio-test");

await emptyDir(targetDir).catch(() => {});

const templateFrom = pathToFileURL(
  path.join(__dirname, "../dist/index.js")
).href;

await generateProject(getTemplateDir(templateFrom), {
  projectName: "test-portfolio",
  authorName: "Test User",
  siteTitle: "Test User | Portfolio",
  domain: "example.com",
  githubUsername: "testuser",
  email: "test@example.com",
  initials: "TU",
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
});

console.log("Smoke test OK:", targetDir);
