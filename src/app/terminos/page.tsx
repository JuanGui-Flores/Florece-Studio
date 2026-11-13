import Link from "next/link";

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white text-[#0b3c8a] px-8 sm:px-16 py-24 selection:bg-[#0b3c8a] selection:text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-sm font-mono tracking-widest text-[#0b3c8a]/60 hover:opacity-100 w-fit">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight">Términos y Condiciones</h1>
          <p className="text-sm text-[#0b3c8a]/60 font-mono">Última actualización: 2026</p>
        </div>

        <div className="flex flex-col gap-8 text-lg font-light leading-relaxed text-[#0b3c8a]/90">
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">1. Introducción</h2>
            <p>
              Bienvenido a **Florece Studio**. Al acceder a nuestro sitio web y utilizar nuestros servicios de desarrollo web y diseño digital, aceptas cumplir con los siguientes términos y condiciones de uso.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">2. Propiedad Intelectual</h2>
            <p>
              Todo el contenido publicado en este sitio web (incluyendo textos, gráficos, logotipos, iconos, código fuente y diseño de interfaz) es propiedad exclusiva de Florece Studio o cuenta con las licencias correspondientes, protegido por las normativas de propiedad intelectual vigentes.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">3. Servicios y Contratación</h2>
            <p>
              Los presupuestos, propuestas comerciales y alcances de desarrollo técnico se rigen bajo contratos específicos acordados de forma directa con cada cliente. Nos reservamos el derecho de modificar o discontinuar servicios de consultoría o desarrollo bajo previo aviso.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">4. Limitación de Responsabilidad</h2>
            <p>
              Florece Studio no se hace responsable por interrupciones temporales del servicio web ajenas a nuestra infraestructura ni por daños derivados del mal uso de las aplicaciones entregadas una vez finalizada la transferencia de código o despliegue.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">5. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estos términos, puedes comunicarte con nosotros a través de nuestro correo electrónico oficial: <a href="mailto:florecestudio8@gmail.com" className="underline underline-offset-4 font-normal">florecestudio8@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}