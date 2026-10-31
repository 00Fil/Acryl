import type { MetadataRoute } from "next";
import { aiSolutions, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/soluzioni", "/ai", ...aiSolutions.map((s) => `/ai/${s.slug}`), "/chi-siamo", "/preventivo"];
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
