"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const wordsToRotate = ["enterprise", "industries", "company", "store"];

const navItems = [
  { label: "INICIO", href: "#inicio" },
  { label: "PROYECTOS", href: "#proyectos" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "FLORECESAAS", href: "#saas" },
  { label: "DETRÁS DE FLORECE", href: "#detras" },
  { label: "CONTACTO", href: "#contacto" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordsToRotate.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Gracias! Nos pondremos en contacto contigo en: ${emailInput}`);
    setEmailInput("");
  };

  return (
    <>
      {/* Navbar Superior Fijo */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-[#0b3c8a]/5 z-50 py-5 px-8 sm:px-16">
        <div className="max-w-[1900px] mx-auto w-full flex items-center justify-between">
          <Link
            href="#inicio"
            className="group text-lg sm:text-xl font-bold tracking-tight flex items-center gap-3 font-mono text-[#0b3c8a] hover:opacity-80 transition-opacity"
          >
            <span className="h-3 w-3 rounded-full bg-[#0b3c8a] animate-pulse" />
            <span className="tracking-widest">FLORECE·STUDIO</span>
          </Link>

          {/* Botones Superiores */}
          <div className="flex items-center gap-4 relative">
            {/* Botón Hablemos (Azul Sólido) */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://wa.me/5492646224354?text=Hola%20Florece%20Studio,%20quiero%20consultar%20sobre%20un%20proyecto%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 rounded-full bg-[#0b3c8a] text-white border-2 border-[#0b3c8a] font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:bg-white hover:text-[#0b3c8a] transition-all duration-300 overflow-hidden cursor-pointer"
                data-cursor="label"
                data-cursor-text="WhatsApp"
              >
                {/* Flecha que entra desde la izquierda con transición smooth */}
                <span className="inline-block max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden text-sm">
                  →
                </span>

                <span>HABLEMOS</span>

                {/* Punto que se oculta al hacer hover */}
                <span className="w-1.5 h-1.5 bg-white group-hover:bg-transparent rounded-full transition-all duration-300" />
              </a>
            </motion.div>

            {/* Botón Menú / Cerrar (Centrado y equilibrado) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-6 py-3 rounded-full bg-white text-[#0b3c8a] border-2 border-[#0b3c8a] font-medium text-xs sm:text-sm tracking-wide flex items-center justify-center gap-3 shadow-sm hover:bg-[#0b3c8a]/5 transition-all cursor-pointer z-50 relative min-w-[115px]"
              data-cursor="label"
              data-cursor-text={isMenuOpen ? "Cerrar" : "Menú"}
            >
              {/* Contenedor del texto centrado */}
              <div className="relative h-5 overflow-hidden flex items-center w-[54px] justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMenuOpen ? "cerrar" : "menu"}
                    initial={{ y: 15, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -15, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute inline-block font-medium tracking-wide text-center w-full"
                  >
                    {isMenuOpen ? "CERRAR" : "MENÚ"}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Puntos animados con rotación */}
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex items-center shrink-0 ${isMenuOpen ? "flex-row gap-1" : "flex-col gap-1"}`}
              >
                <span className="w-1.5 h-1.5 bg-[#0b3c8a] rounded-full" />
                <span className="w-1.5 h-1.5 bg-[#0b3c8a] rounded-full" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Menú Desplegable Flotante */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-24 right-8 sm:right-16 w-[340px] sm:w-[380px] bg-white border border-[#0b3c8a]/15 rounded-3xl shadow-2xl z-50 p-6 sm:p-8 flex flex-col gap-6 backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-5">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl sm:text-2xl font-normal tracking-tight text-[#0b3c8a] hover:opacity-70 transition-opacity"
                    data-cursor="label"
                    data-cursor-text="Ir"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="bg-[#f8f9fa] rounded-2xl p-5 border border-[#0b3c8a]/10 flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[#0b3c8a]">
                  Dejanos tu correo
                </h3>

                <form
                  onSubmit={handleSubscribe}
                  className="relative flex items-center bg-white border border-[#0b3c8a]/20 rounded-xl px-4 py-3 focus-within:border-[#0b3c8a] transition-all"
                >
                  <input
                    type="email"
                    placeholder="nombre@correo.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full bg-transparent text-xs sm:text-sm text-[#0b3c8a] placeholder:text-[#0b3c8a]/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="text-[#0b3c8a] font-bold hover:scale-110 transition-transform pl-2"
                  >
                    <span className="text-lg">→</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sección Hero Principal */}
      <section className="relative min-h-[calc(100vh-90px)] w-full flex flex-col justify-center bg-white text-[#0b3c8a] overflow-hidden selection:bg-[#0b3c8a] selection:text-white py-12 px-8 sm:px-16">
        <main className="max-w-[1900px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-8">
          {/* Titular Izquierdo Masivo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-4 text-left flex flex-col justify-center pl-4 lg:pl-10 z-20"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-light text-[#0b3c8a] leading-[1.12] tracking-tight">
              Technology that grows <br />
              your{" "}
              <span className="inline-block relative overflow-hidden align-bottom min-w-[210px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordsToRotate[index]}
                    initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block font-serif italic text-[#0b3c8a]"
                  >
                    {wordsToRotate[index]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          {/* Isotipo Central Masivo (Flor azul limpia con linterna magnética) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 flex justify-center my-6 lg:my-0 relative"
          >
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[580px] lg:h-[580px] flex items-center justify-center cursor-default group select-none"
            >
              <Image
                src="/logo.png"
                alt="Florece Studio Base"
                fill
                className="object-contain opacity-30 filter grayscale mix-blend-screen"
                priority
              />

              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  WebkitMaskImage: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 100%)`,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Florece Studio Color"
                  fill
                  className="object-contain mix-blend-screen drop-shadow-[0_15px_35px_rgba(11,60,138,0.4)]"
                  priority
                />
              </motion.div>

              <motion.div
                className="absolute pointer-events-none rounded-full border border-[#0b3c8a]/40 flex items-center justify-center"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: mousePos.x - 60,
                  y: mousePos.y - 60,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.08 }}
                style={{ width: "120px", height: "120px", left: 0, top: 0 }}
              >
                <div className="w-2.5 h-2.5 bg-[#0b3c8a] rounded-full shadow-[0_0_12px_#0b3c8a]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Texto Derecho Secundario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-4 text-left lg:text-right flex flex-col justify-center items-start lg:items-end pr-4 lg:pr-10 z-20"
          >
            <p className="text-lg sm:text-xl text-[#0b3c8a]/85 font-light leading-relaxed max-w-[340px]">
              Soluciones digitales para empresas <br />
              que buscan crecer.
            </p>
          </motion.div>
        </main>

        {/* Botón Flotante de Conversión (WhatsApp) */}
        <motion.a
          href="https://wa.me/5492646224354?text=Hola%20Florece%20Studio,%20quiero%20impulsar%20mi%20proyecto%20digital."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#0b3c8a] text-white rounded-full shadow-2xl hover:bg-[#082a63] transition-all"
          aria-label="Contacto Comercial por WhatsApp"
          data-cursor="label"
          data-cursor-text="WhatsApp"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </motion.a>
      </section>
    </>
  );
}
