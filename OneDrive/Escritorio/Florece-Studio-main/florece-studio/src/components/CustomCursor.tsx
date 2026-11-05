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
  const [isHovered, setIsHovered] = useState(false);

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

    // Detección global de elementos interactivos (botones, enlaces, CTAs)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("button, a, [data-cursor], input, textarea") as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleMouseOver);
    };
  }, [cursorX, cursorY, isTouch, hasMoved]);

  if (!cursorActive || isTouch || !hasMoved) return null;

  // Definimos dinámicamente el tamaño y estilo del aro según si está sobre un CTA o no
  const aroSize = isHovered ? 56 : 38;

  return (
    <>
      {/* Aro Exterior (nunca desaparece, se expande con gracia al hacer hover en CTAs) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 border-[1.5px] border-[#0b3c8a] rounded-full will-change-transform flex items-center justify-center bg-[#0b3c8a]/5"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: aroSize,
          height: aroSize,
          marginLeft: -aroSize / 2,
          marginTop: -aroSize / 2,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Punto Central */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 w-1.5 h-1.5 bg-[#0b3c8a] rounded-full will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -3,
          marginTop: -3,
        }}
      />
    </>
  );
}