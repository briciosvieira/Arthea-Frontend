import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth", "/media", "/users", "/doctors"],
      },
    ],
    sitemap: "https://clinicaarthea.com.br/sitemap.xml",
  };
}
