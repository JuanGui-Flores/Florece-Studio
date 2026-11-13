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

  // Posiciones con Framer Motion (optimizadas para GPU)
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Configuración de muelles ajustada para fluidez extrema a 60Hz/120Hz
  const springConfig = { damping: 30, stiffness: 350, mass: 0.08 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("button, a, [data-cursor], input, textarea") as HTMLElement | null;
      setIsHovered(!!interactiveEl);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver); // Corregido el leak del event listener
    };
  }, [cursorX, cursorY, isTouch, hasMoved]);

  if (!cursorActive || isTouch || !hasMoved) return null;

  const aroSize = isHovered ? 56 : 38;

  return (
    <>
      {/* Aro Exterior con aceleración por hardware */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 border-[1.5px] border-[#0b3c8a] rounded-full will-change-transform transform-gpu flex items-center justify-center bg-[#0b3c8a]/5"
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

      {/* Punto Central Instantáneo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 w-1.5 h-1.5 bg-[#0b3c8a] rounded-full will-change-transform transform-gpu"
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