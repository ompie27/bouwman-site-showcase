import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = [
    { pad: "", prioriteit: 1.0 },
    { pad: "/diensten", prioriteit: 0.9 },
    { pad: "/projecten", prioriteit: 0.9 },
    { pad: "/contact", prioriteit: 0.9 },
    { pad: "/over-ons", prioriteit: 0.8 },
    { pad: "/reviews", prioriteit: 0.7 },
    { pad: "/privacy", prioriteit: 0.2 },
    { pad: "/toegankelijkheid", prioriteit: 0.2 },
  ];

  return paginas.map(({ pad, prioriteit }) => ({
    url: `${site.url}${pad}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: prioriteit,
  }));
}
