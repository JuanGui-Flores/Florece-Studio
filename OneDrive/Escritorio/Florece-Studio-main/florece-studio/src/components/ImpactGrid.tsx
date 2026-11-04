"use client";

import { motion } from "framer-motion";

const items = [
  {
    number: "01",
    title: "Sistemas & Software a Medida",
    description: "Desarrollamos el motor operativo de tu empresa. Arquitecturas robustas en Node.js y PostgreSQL para escalar sin límites.",
    badge: "CORE SYSTEM",
  },
  {
    number: "02",
    title: "Desarrollo Web & UI/UX",
    description: "Interfaces ultrarrápidas construidas con Next.js y Tailwind CSS, diseñadas específicamente para maximizar la conversión.",
    badge: "HIGH PERFORMANCE",
  },
  {
    number: "03",
    title: "Automatización & IA",
    description: "Integramos inteligencia artificial y flujos automatizados para reducir tiempos operativos y potenciar la productividad comercial.",
    badge: "AUTOMATION",
  },
];

export default function ImpactGrid() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white text-black max-w-7xl mx-auto w-full">
      {/* Cabecera de impacto */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 pb-8 border-b border-black/10">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase text-black/60 block mb-3">
            ARQUITECTURA DIGITAL DE ALTO RENDIMIENTO
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            Diseñado para <br />
            <span className="font-normal">convertir y escalar.</span>
          </h2>
        </div>
        <p className="mt-6 md:mt-0 text-sm md:text-base text-black/70 max-w-md font-light leading-relaxed">
          Cada línea de código y cada frame visual están estructurados milimétricamente para posicionar a tu marca en la élite digital.
        </p>
      </div>

      {/* Grid de Frames */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative p-8 rounded-xl border border-black/15 bg-neutral-50/40 hover:bg-white hover:border-black transition-all duration-300 flex flex-col justify-between"
            data-cursor="label"
            data-cursor-text="Explorar"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-black/5 text-black border border-black/10">
                  {item.badge}
                </span>
                <span className="font-mono text-xs text-black/40">
                  [{item.number}]
                </span>
              </div>
              <h3 className="text-2xl font-medium tracking-tight mb-4 group-hover:translate-x-1 transition-transform">
                {item.title}
              </h3>
              <p className="text-black/70 text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-12 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
              <span className="text-black/50">Florece Studio &copy; 2026</span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium">
                Ver solución &rarr;
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}