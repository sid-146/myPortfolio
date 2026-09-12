import { MetadataRoute } from "next";
import { getAllProjects, getAllArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sudhanwakaveeshwar.dev";

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/writing",
    "/lab",
    "/experience",
    "/now",
    "/resume",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = getAllArticles().map((article) => ({
    url: `${baseUrl}/writing/${article.slug}`,
    lastModified: new Date(article.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
