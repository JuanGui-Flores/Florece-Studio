import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-[#0b3c8a] px-8 sm:px-16 py-24 selection:bg-[#0b3c8a] selection:text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-sm font-mono tracking-widest text-[#0b3c8a]/60 hover:opacity-100 w-fit">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight">Política de Cookies</h1>
          <p className="text-sm text-[#0b3c8a]/60 font-mono">Última actualización: 2026</p>
        </div>

        <div className="flex flex-col gap-8 text-lg font-light leading-relaxed text-[#0b3c8a]/90">
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador o dispositivo móvil) al navegar por ellos. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y proporcionar información analítica a los propietarios.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">2. ¿Cómo utilizamos las cookies?</h2>
            <p>
              Utilizamos cookies técnicas y de rendimiento esenciales para garantizar la correcta visualización de nuestra interfaz, la fluidez de las animaciones y el análisis estadístico anónimo del tráfico web mediante herramientas integradas.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">3. Control y Gestión de Cookies</h2>
            <p>
              Puedes configurar tu navegador web para rechazar o aceptar cookies, así como para eliminarlas en cualquier momento. Ten en cuenta que deshabilitar ciertas cookies puede afectar la experiencia de navegación en nuestro sitio.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">4. Consultas</h2>
            <p>
              Si tienes dudas sobre nuestra política de cookies, puedes escribirnos a <a href="mailto:florecestudio8@gmail.com" className="underline underline-offset-4 font-normal">florecestudio8@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}