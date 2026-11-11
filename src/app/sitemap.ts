import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

  if (!siteUrl) {
    return [];
  }

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/work", priority: 0.9 },
    ...projects.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.7,
    })),
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
