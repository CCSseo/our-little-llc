import type { MetadataRoute } from "next";
import { BRANDS, SITE } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/story`, changeFrequency: "yearly", priority: 0.7 },
    ...BRANDS.map((b) => ({
      url: `${siteUrl}/brands/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
