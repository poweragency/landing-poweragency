import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPostsMeta } from "@/lib/blog";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const PAGES: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/ecosistema", priority: 0.9, changeFrequency: "monthly" },
  { path: "/software", priority: 0.8, changeFrequency: "monthly" },
  { path: "/crm", priority: 0.8, changeFrequency: "monthly" },
  { path: "/prop", priority: 0.6, changeFrequency: "monthly" },
  { path: "/ecommerce", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/termini", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const posts = getAllPostsMeta().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "yearly" as Freq,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
