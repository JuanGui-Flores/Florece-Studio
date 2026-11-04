"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch] = useState(() => 
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false
  );
  const [cursorActive] = useState(() => 
    typeof window !== "undefined" ? !window.matchMedia("(pointer: coarse)").matches : true
  );

  const [hasMoved, setHasMoved] = useState(false);
  const [estado, setEstado] = useState<"reposo" | "iman" | "lupa" | "etiqueta">("reposo");
  const [etiquetaText, setEtiquetaText] = useState("Ver proyecto");

  // Posiciones y muelles físicos con framer-motion
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Delegación de eventos global para detectar elementos interactivos en toda la web
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const magnetEl = target?.closest("[data-magnet]") as HTMLElement | null;
      const lensEl = target?.closest("[data-cursor='lens']") as HTMLElement | null;
      const labelEl = target?.closest("[data-cursor='label']") as HTMLElement | null;

      if (labelEl) {
        setEstado("etiqueta");
        setEtiquetaText(labelEl.getAttribute("data-cursor-text") || "Ver proyecto");
      } else if (lensEl) {
        setEstado("lupa");
      } else if (magnetEl) {
        setEstado("iman");
      } else {
        setEstado("reposo");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isTouch, hasMoved]);

  if (!cursorActive || isTouch || !hasMoved) return null;

  let aroSize = 38;
  let aroRadius = "50%";
  let fillOpacity = 0;
  let puntoScale = 1;

  if (estado === "iman") {
    aroSize = 60;
    fillOpacity = 1;
    puntoScale = 0;
  } else if (estado === "lupa") {
    aroSize = 150;
    fillOpacity = 1;
    puntoScale = 0;
    aroRadius = "50%";
  } else if (estado === "etiqueta") {
    aroSize = 0;
    puntoScale = 0;
  }

  return (
    <>
      {/* Aro Exterior / Lupa (Negro sólido, sin mix-blend-mode para evitar que se oculte) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] border-[1.5px] border-black rounded-full will-change-transform flex items-center justify-center bg-transparent"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: aroSize,
          height: aroSize,
          marginLeft: -aroSize / 2,
          marginTop: -aroSize / 2,
          borderRadius: aroRadius,
        }}
      >
        <div
          className="absolute inset-[-1.5px] rounded-inherit bg-black transition-opacity duration-150"
          style={{ opacity: fillOpacity, borderRadius: aroRadius }}
        />
      </motion.div>

      {/* Punto Central (Negro sólido) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 bg-black rounded-full will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -3,
          marginTop: -3,
          scale: puntoScale,
        }}
      />

      {/* Tarjeta de Etiqueta Flotante (para proyectos) */}
      {estado === "etiqueta" && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] w-28 h-28 -ml-14 -mt-14 rounded-full bg-black text-white grid place-items-center text-center font-medium text-[13px] leading-[1.15]"
          style={{
            x: cursorX,
            y: cursorY,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div>
            <span className="block max-w-20 mx-auto">{etiquetaText}</span>
            <svg className="block mx-auto mt-1.5 w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 10l6-6M5 4h5v5" />
            </svg>
          </div>
        </motion.div>
      )}
    </>
  );
}