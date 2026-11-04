import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://florecestudio.com"), // Cambia por tu dominio real
  title: {
    default: "Florece Studio — Software & Web Development",
    template: "%s | Florece Studio",
  },
  description: "Estudio de desarrollo full-stack y diseño web. Creamos software a medida, aplicaciones web interactivas y experiencias digitales de alto rendimiento desde San Juan, Argentina.",
  keywords: [
    "desarrollo web",
    "software a medida",
    "full-stack developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "San Juan",
    "Argentina",
    "Florece Studio",
  ],
  authors: [{ name: "Juan Guillermo Flores Vargas", url: "https://florecestudio.com" }],
  creator: "Florece Studio",
  publisher: "Florece Studio",
  // Metadatos de localización (GEO)
  other: {
    "geo.region": "AR-J",
    "geo.placename": "Pocito, San Juan, Argentina",
    "geo.position": "-31.6295;-68.5374", // Coordenadas aproximadas de San Juan
    "ICBM": "-31.6295, -68.5374",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://florecestudio.com",
    title: "Florece Studio — Software & Web Development",
    description: "Diseñamos y desarrollamos el motor operativo de tu empresa.",
    siteName: "Florece Studio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="cursor-none min-h-full flex flex-col bg-white text-[#0b3c8a]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}