'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import RespiraText from './RespiraText';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: '¿Con qué tipo de empresas o proyectos trabajan?',
    answer: 'Trabajamos con PyMEs, comercios, agrotech, startups y empresas en crecimiento que necesitan optimizar su operación interna con sistemas a medida, o escalar sus ventas digitales con webs y e-commerce de alto rendimiento.',
  },
  {
    question: '¿Cuánto tiempo lleva desarrollar un proyecto?',
    answer: 'Depende del alcance del desarrollo. Un sitio web corporativo o landing page puede estar listo entre 2 y 3 semanas. Los sistemas a medida (ERP/Admin) o plataformas complejas se organizan en sprints funcionales con entregas continuas.',
  },
  {
    question: '¿Cómo se define la cotización y forma de pago?',
    answer: 'Primero coordinamos una breve llamada para relevar los objetivos y requerimientos técnicos de tu negocio. Con eso, presentamos una propuesta transparente de alcance, tiempos e inversión. Habitualmente trabajamos con un esquema de 50% de anticipo y 50% contra entrega.',
  },
  {
    question: '¿Pueden integrarse con mis sistemas actuales?',
    answer: 'Sí. Desarrollamos integraciones vía API con sistemas de facturación, pasarelas de pago, CRM, bases de datos existentes y herramientas como Tiendanube o Mercado Pago.',
  },
  {
    question: '¿Trabajan con clientes de cualquier ubicación?',
    answer: 'Por supuesto. Toda nuestra metodología de trabajo está optimizada de forma remota, manteniendo comunicación fluida, entregables transparentes en repositorios y reuniones semanales de seguimiento.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="preguntas" className="py-28 bg-white text-[#0b3c8a] border-t border-[#0b3c8a]/10 relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Encabezado con RespiraText */}
        <ScrollReveal direction="up">
          <div className="text-left mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0b3c8a]/70 bg-[#0b3c8a]/5 px-3.5 py-1.5 rounded-full border border-[#0b3c8a]/15">
              [ 03 ] Cero Dudas
            </span>
            <div className="mt-6">
              <RespiraText 
                text="Preguntas/frecuentes." 
                ancho="0.8" 
                alto="0.4" 
                radio="0.9"
                className="w-full"
              />
            </div>
            <p className="mt-4 text-[#0b3c8a]/70 text-base font-light leading-relaxed max-w-xl">
              Todo lo que necesitas saber antes de iniciar tu desarrollo con Florece Studio.
            </p>
          </div>
        </ScrollReveal>

        {/* Acordeón de FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const slideDirection = index % 2 === 0 ? 'left' : 'right';

            return (
              <ScrollReveal key={index} direction={slideDirection} delay={index * 0.08}>
                <div className="rounded-2xl border border-[#0b3c8a]/15 bg-white overflow-hidden transition-all duration-300 shadow-[0_2px_12px_rgba(11,60,138,0.02)] hover:border-[#0b3c8a]/35">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-[#0b3c8a]/2 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-[#0b3c8a] text-base sm:text-lg tracking-tight">
                      {faq.question}
                    </span>
                    <span className={`text-[#0b3c8a] font-mono text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-[#0b3c8a]/70 text-sm sm:text-base font-light leading-relaxed border-t border-[#0b3c8a]/10 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}