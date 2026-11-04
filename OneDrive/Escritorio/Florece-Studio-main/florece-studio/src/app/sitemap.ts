import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://florecestudio.com"; // Cambia por tu dominio real

  // Puedes añadir aquí las rutas estáticas o dinámicas de tu web
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    // Ejemplo si añades más secciones o páginas:
    // {
    //   url: `${baseUrl}/proyectos`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
  ];
}