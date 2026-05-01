import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/dashboard`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/mentor`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${base}/courses/${course.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: course.status === "Live MVP" ? 0.9 : 0.5,
  }));

  return [...staticRoutes, ...courseRoutes];
}
