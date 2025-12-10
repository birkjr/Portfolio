import type { MetadataRoute } from "next";

const baseUrl = "https://www.birkramstad.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/#home",
    "/#education",
    "/#ctf-scripts",
    "/#projects",
    "/#experience",
    "/#skills",
    "/#contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
