"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#0b3c8a]/10 text-[#0b3c8a]/70 text-sm py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link
            href="/"
            className="text-lg font-bold text-[#0b3c8a] flex items-center gap-2"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#0b3c8a]" />
            Florece<span className="text-[#0b3c8a]/80">Studio</span>
          </Link>
          <p className="mt-2 text-xs text-[#0b3c8a]/60">
            Software a medida y diseño de alto rendimiento para empresas en
            crecimiento.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#0b3c8a]/80">
          <Link
            href="#servicios"
            className="hover:text-[#0b3c8a] font-medium transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="#proyectos"
            className="hover:text-[#0b3c8a] font-medium transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="#contacto"
            className="hover:text-[#0b3c8a] font-medium transition-colors"
          >
            Contacto
          </Link>
        </div>

        <div className="text-xs text-[#0b3c8a]/60 font-mono">
          &copy; {new Date().getFullYear()} Florece Studio. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
