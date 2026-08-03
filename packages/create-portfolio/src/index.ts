#!/usr/bin/env node
import { runCli } from "./prompts.js";

export { generateProject, getTemplateDir, runPostInstall } from "./generate.js";
export type { ProjectConfig } from "./utils.js";

function parseDirectoryArg() {
  const arg = process.argv[2];
  if (!arg || arg.startsWith("-")) return undefined;
  return arg;
}

const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith("/index.ts") ||
    process.argv[1].endsWith("/index.js") ||
    process.argv[1].endsWith("/create-portfolio.js") ||
    process.argv[1].endsWith("/create-birk-portfolio.js"));

if (isDirectRun) {
  runCli(process.cwd(), parseDirectoryArg()).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
