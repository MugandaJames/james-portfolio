import type { MetadataRoute } from "next";
import { articles } from "@/content/writing";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

  if (!siteUrl) {
    return [];
  }

  const staticRoutes = [
    { path: "", priority: 1.0 },
    { path: "/work", priority: 0.9 },
    { path: "/writing", priority: 0.9 },
  ];

  const projectRoutes = projects.map((project) => ({
    path: `/work/${project.slug}`,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    path: `/writing/${article.slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes].map(
    ({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    }),
  );
}
