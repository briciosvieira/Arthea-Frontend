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
    sitemap: "https://artheaconsultorio.com.br/sitemap.xml",
  };
}
