"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preRef = useRef<HTMLDivElement>(null);
  const [progressVal, setProgressVal] = useState(0);
  const [showStudio, setShowStudio] = useState(false);
  const isDoneRef = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Cambiar de "Buenas" a "Somos Florece Studio" a mitad de la carga (aprox. 35%)
    const textTimer = setTimeout(() => {
      setShowStudio(true);
    }, 900);

    let currentVal = 0;
    let animId: number;
    let lastTime = performance.now();
    const duration = 2500; // Duración de la carga (ms)

    const executeExit = () => {
      if (isDoneRef.current) return;
      isDoneRef.current = true;

      const pre = preRef.current;
      if (!pre) return;

      gsap.to(pre, {
        opacity: 0,
        scale: 1.02,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          document.documentElement.classList.remove("precarga");
          if (onComplete) onComplete();
        },
      });
    };

    const loop = (now: number) => {
      if (isDoneRef.current) return;

      if (!startTimeRef.current) {
        startTimeRef.current = now;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const elapsed = now - startTimeRef.current;
      const progressRatio = Math.min(1, elapsed / duration);
      const target = progressRatio * 100;

      currentVal += (target - currentVal) * (1 - Math.exp(-8 * dt));

      if (progressRatio >= 1 && currentVal > 99) {
        currentVal = 100;
      }

      setProgressVal(currentVal);

      if (currentVal >= 100) {
        setTimeout(executeExit, 300);
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(textTimer);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  const intVal = Math.floor(progressVal);

  return (
    <div
      ref={preRef}
      className="fixed inset-0 w-screen h-screen z-99999 bg-[#0b3c8a] text-white flex flex-col justify-between p-6 sm:p-16 md:p-20 select-none overflow-hidden m-0"
    >
      {/* Parte Superior: Transición rotativa/deslizante entre "Buenas" y "Somos Florece Studio" */}
      <div className="flex flex-col w-full pt-2 sm:pt-0 h-16 sm:h-20 justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {!showStudio ? (
            <motion.div
              key="buenas"
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1 origin-bottom"
            >
              <span className="text-xl sm:text-3xl font-light tracking-tight text-white font-sans">
                Buenas
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-1 origin-bottom"
            >
              <h1 className="text-xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white font-sans">
                Somos Florece Studio
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Centro: Gran Porcentaje Ajustado para Mobile */}
      <div className="flex items-center sm:items-end justify-start w-full my-auto py-4">
        <div className="flex items-start font-serif text-[clamp(5.5rem,26vw,18rem)] leading-none tracking-tighter text-white">
          <span>{intVal}</span>
          <span className="text-[0.22em] font-light ml-2 sm:ml-3 mt-3 sm:mt-6 text-white/80">%</span>
        </div>
      </div>

      {/* Parte Inferior: Barra de Progreso y Detalles */}
      <div className="w-full flex flex-col gap-3 pb-2 sm:pb-0">
        <div className="w-full h-0.75 bg-white/20 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 bottom-0 bg-white transition-all duration-75 ease-out"
            style={{ width: `${progressVal}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest text-white/60 uppercase">
          <span>Florece Core</span>
          <span>{intVal}% CARGADO</span>
        </div>
      </div>
    </div>
  );
}