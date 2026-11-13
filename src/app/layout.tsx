import type { Metadata } from "next";
import { Newsreader, Roboto_Flex } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

// Configuración optimizada de tipografías locales con cero bloqueos de red
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://florecestudio.com"), // Dominio de producción
  title: {
    default: "Florece Studio — Software & Web Development",
    template: "%s | Florece Studio",
  },
  description: "Estudio de desarrollo de software y diseño web en San Juan, Argentina.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
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
    "geo.position": "-31.6295;-68.5374",
    "ICBM": "-31.6295, -68.5374",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://florecestudio.com",
    title: "Florece Studio — Software & Web Development",
    description: "Diseñamos y desarrollamos el motor operativo de tu empresa.",
    siteName: "Florece Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Florece Studio Open Graph Preview",
      },
    ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${newsreader.variable} ${robotoFlex.variable} h-full antialiased scroll-smooth`}>
      <body className="cursor-none min-h-full flex flex-col bg-white text-[#0b3c8a]">
        <MotionProvider>
          <CustomCursor />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}

