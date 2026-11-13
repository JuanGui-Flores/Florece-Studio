"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  // Inicializamos el estado directamente verificando localStorage de forma segura para SSR
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === "undefined") return false;
    const consent = localStorage.getItem("florece_cookie_consent");
    return !consent;
  });

  const handleAccept = () => {
    localStorage.setItem("florece_cookie_consent", "true");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("florece_cookie_consent", "false");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-[#0b3c8a]/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#0b3c8a]/80 text-center sm:text-left m-0">
              Utilizamos cookies propias y de terceros para mejorar nuestros servicios y analizar tu navegación. Si continúas navegando, consideramos que aceptas su uso. Consulta nuestra{" "}
              <Link href="/cookies" className="underline font-medium hover:text-[#0b3c8a]">
                Política de Cookies
              </Link>.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-[#0b3c8a]/70 hover:text-[#0b3c8a] transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-xs sm:text-sm font-medium bg-[#0b3c8a] text-white rounded-full hover:bg-[#0b3c8a]/90 transition-all shadow-sm"
              >
                Aceptar Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}