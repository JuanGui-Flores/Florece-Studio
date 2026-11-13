"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Gracias! Nos pondremos en contacto con: ${emailInput}`);
    setEmailInput("");
  };

  const linkAnimationClass =
    "relative inline-block py-1 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#0b3c8a] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 after:ease-out";

  // Mensaje predeterminado para las inteligencias artificiales
  const aiPrompt =
    "Dame más info sobre Florece Studio, la agencia de software Pocitana.";
  const encodedPrompt = encodeURIComponent(aiPrompt);

  // Configuración de los 3 botones con sus respectivos iconos SVG
  const aiButtons = [
    {
      name: "ChatGPT",
      url: `https://chat.openai.com/?q=${encodedPrompt}`,
      cursorText: "ChatGPT",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.9807 5.9807 0 0 0 .5157 4.9106 6.0512 6.0512 0 0 0 6.51 2.9A6.0651 6.0651 0 0 0 19.0193 19.818a5.9847 5.9847 0 0 0 3.9977-2.9 6.0462 6.0462 0 0 0-.7351-7.0969zM19.48 17.548a4.05 4.05 0 0 1-1.6146 1.7058 4.0954 4.0954 0 0 1-3.6932.2223l-.2863-.1314-1.2808 2.2205a4.05 4.05 0 0 1-5.503 1.4746 4.0913 4.0913 0 0 1-1.4771-5.5055l1.2808-2.2205-.2863-.1314a4.0533 4.0533 0 0 1-1.7058-5.5055 4.0933 4.0933 0 0 1 5.5056-1.4746l2.2204 1.2808.1314-.2863a4.0524 4.0524 0 0 1 5.5055-1.4746 4.0933 4.0933 0 0 1 1.4771 5.5056l-1.2808 2.2205.2863.1314a4.0487 4.0487 0 0 1 1.6146 3.0315z" />
        </svg>
      ),
    },
    {
      name: "Claude",
      url: `https://claude.ai/new?q=${encodedPrompt}`,
      cursorText: "Claude",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 19.5h5l5-8.5 5 8.5h5L12 2zm0 6l3.5 6h-7L12 8z" />
        </svg>
      ),
    },
    {
      name: "Perplexity",
      url: `https://www.perplexity.ai/search?q=${encodedPrompt}`,
      cursorText: "Perplexity",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l5.5 3.5v7L12 18.5 6.5 15v-7L12 4.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="contacto"
      className="w-full bg-white text-[#0b3c8a] pt-20 pb-12 px-8 sm:px-16 border-t border-[#0b3c8a]/10 selection:bg-[#0b3c8a] selection:text-white"
    >
      <div className="max-w-[1900px] mx-auto w-full flex flex-col justify-between min-h-125">
        {/* Sección Superior: Ubicación, Redes, Contacto y Formulario Masivo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
          {/* Columna Izquierda: Ubicación y Pregunta por nosotros (Botones de IA) */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            {/* Ubicación */}
            <div className="flex flex-col text-lg sm:text-xl font-light text-[#0b3c8a] leading-relaxed">
              <span>Pocito</span>
              <span>San Juan</span>
              <span>Argentina</span>
            </div>

            {/* Preguntá por nosotros */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest text-[#0b3c8a]/50 uppercase font-mono">
                Preguntá por nosotros
              </span>
              <div className="flex items-center gap-3">
                {aiButtons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Preguntar en ${btn.name}`}
                    className="w-12 h-12 rounded-2xl bg-[#0b3c8a] text-white flex items-center justify-center hover:bg-[#082a63] transition-transform hover:scale-105 shadow-md cursor-pointer shrink-0"
                    data-cursor="label"
                    data-cursor-text={btn.cursorText}
                  >
                    {btn.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Central: Redes y Canales de Atención */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Redes */}
            <div className="flex flex-col gap-2 items-start">
              <a
                href="https://www.instagram.com/florecestudio.ar?psln=MTAweW13cjdqcm81Yw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xl sm:text-2xl font-normal text-[#0b3c8a] ${linkAnimationClass}`}
                data-cursor="label"
                data-cursor-text="Visitar"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5492646224354"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xl sm:text-2xl font-normal text-[#0b3c8a] ${linkAnimationClass}`}
                data-cursor="label"
                data-cursor-text="Visitar"
              >
                WhatsApp
              </a>
            </div>

            {/* Consultas Generales y Nuevos Proyectos */}
            <div className="flex flex-col gap-8 pt-4">
              <div className="flex flex-col gap-1 items-start">
                <span className="text-sm text-[#0b3c8a]/60 font-light">
                  Consultas generales
                </span>
                <a
                  href="mailto:florecestudio8@gmail.com"
                  className={`text-lg sm:text-xl font-normal text-[#0b3c8a] ${linkAnimationClass}`}
                  data-cursor="label"
                  data-cursor-text="Email"
                >
                  florecestudio8@gmail.com
                </a>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <span className="text-sm text-[#0b3c8a]/60 font-light">
                  Nuevos proyectos
                </span>
                <a
                  href="https://wa.me/5492646224354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg sm:text-xl font-normal text-[#0b3c8a] ${linkAnimationClass}`}
                  data-cursor="label"
                  data-cursor-text="WhatsApp"
                >
                  +54 9 2646 22-4354
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Título gigante e Input de Correo */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pl-10">
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-normal tracking-tight text-[#0b3c8a] leading-[1.1]">
              Dejanos tu correo <br />y charlamos tu proyecto
            </h2>

            <form
              onSubmit={handleSubmit}
              className="relative flex items-center bg-[#f8f9fa] border border-[#0b3c8a]/15 rounded-3xl px-6 py-4 focus-within:border-[#0b3c8a] transition-all shadow-sm max-w-xl"
            >
              <input
                type="email"
                placeholder="nombre@correo.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full bg-transparent text-sm sm:text-base text-[#0b3c8a] placeholder:text-[#0b3c8a]/40 focus:outline-none"
              />
              <button
                type="submit"
                className="text-[#0b3c8a] font-bold hover:scale-110 transition-transform pl-4 cursor-pointer"
                data-cursor="label"
                data-cursor-text="Enviar"
              >
                <span className="text-xl">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Sección Inferior: Copyright y Enlaces Legales */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12 border-t border-[#0b3c8a]/10 text-xs sm:text-sm text-[#0b3c8a]/70">
          <p className="m-0">
            © 2026 Florece Studio. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium">
            <Link
              href="/terminos"
              className={`opacity-70 hover:opacity-100 ${linkAnimationClass}`}
            >
              Términos
            </Link>
            <Link
              href="/privacidad"
              className={`opacity-70 hover:opacity-100 ${linkAnimationClass}`}
            >
              Privacidad
            </Link>
            <Link
              href="/cookies"
              className={`opacity-70 hover:opacity-100 ${linkAnimationClass}`}
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
