import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://florecestudio.com"; // Cambia por tu dominio real

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: ["/private/"], // Descomenta si tienes rutas privadas o de administración
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}