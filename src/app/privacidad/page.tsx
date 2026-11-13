import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white text-[#0b3c8a] px-8 sm:px-16 py-24 selection:bg-[#0b3c8a] selection:text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-sm font-mono tracking-widest text-[#0b3c8a]/60 hover:opacity-100 w-fit">
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight">Política de Privacidad</h1>
          <p className="text-sm text-[#0b3c8a]/60 font-mono">Última actualización: 2026</p>
        </div>

        <div className="flex flex-col gap-8 text-lg font-light leading-relaxed text-[#0b3c8a]/90">
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">1. Recopilación de Datos</h2>
            <p>
              En Florece Studio recopilamos únicamente la información estrictamente necesaria para establecer comunicación comercial contigo, tal como tu dirección de correo electrónico cuando completas formularios de contacto o consultas de proyectos.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">2. Uso de la Información</h2>
            <p>
              Los datos suministrados se utilizan exclusivamente con el propósito de responder a tus consultas, coordinar propuestas de desarrollo de software y gestionar la relación contractual o técnica de nuestros servicios.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra accesos no autorizados, pérdida o alteración. No compartimos ni comercializamos datos personales con terceros bajo ningún concepto.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-2xl font-normal text-[#0b3c8a]">4. Tus Derechos</h2>
            <p>
              Tienes derecho a solicitar el acceso, rectificación o eliminación de tus datos personales almacenados en nuestros registros enviando un correo electrónico a <a href="mailto:florecestudio8@gmail.com" className="underline underline-offset-4 font-normal">florecestudio8@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}