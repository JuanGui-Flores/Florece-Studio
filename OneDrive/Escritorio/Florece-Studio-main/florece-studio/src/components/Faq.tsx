'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import RespiraText from './RespiraText';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'empresas',
    question: '¿Con qué tipo de empresas o proyectos trabajan?',
    answer: 'Trabajamos con PyMEs, comercios, agrotech, startups y empresas en crecimiento que necesitan optimizar su operación interna con sistemas a medida, o escalar sus ventas digitales con webs y e-commerce de alto rendimiento.',
  },
  {
    id: 'tiempo',
    question: '¿Cuánto tiempo lleva desarrollar un proyecto?',
    answer: 'Depende del alcance del desarrollo. Un sitio web corporativo o landing page puede estar listo entre 2 y 3 semanas. Los sistemas a medida (ERP/Admin) o plataformas complejas se organizan en sprints funcionales con entregas continuas.',
  },
  {
    id: 'cotizacion',
    question: '¿Cómo se define la cotización y forma de pago?',
    answer: 'Primero coordinamos una breve llamada para relevar los objetivos y requerimientos técnicos de tu negocio. Con eso, presentamos una propuesta transparente de alcance, tiempos e inversión. Habitualmente trabajamos con un esquema de 50% de anticipo y 50% contra entrega.',
  },
  {
    id: 'integracion',
    question: '¿Pueden integrarse con mis sistemas actuales?',
    answer: 'Sí. Desarrollamos integraciones vía API con sistemas de facturación, pasarelas de pago, CRM, bases de datos existentes y herramientas como Tiendanube o Mercado Pago.',
  },
  {
    id: 'ubicacion',
    question: '¿Trabajan con clientes de cualquier ubicación?',
    answer: 'Por supuesto. Toda nuestra metodología de trabajo está optimizada de forma remota, manteniendo comunicación fluida, entregables transparentes en repositorios y reuniones semanales de seguimiento.',
  },
];

const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    const query = normalizeText(searchTerm);
    return faqs.filter(
      (faq) =>
        normalizeText(faq.question).includes(query) ||
        normalizeText(faq.answer).includes(query)
    );
  }, [searchTerm]);

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="preguntas" className="py-28 bg-white text-[#0b3c8a] border-t border-[#0b3c8a]/10 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <ScrollReveal direction="up">
          <div className="text-left mb-12">
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

        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-10 relative">
            <input
              type="text"
              placeholder="Buscar duda (ej. pagos, plazos, integraciones, ubicacion...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-full border border-[#0b3c8a]/20 bg-neutral-50/50 text-[#0b3c8a] placeholder-[#0b3c8a]/40 focus:outline-none focus:border-[#0b3c8a] focus:bg-white transition-all text-sm shadow-sm"
              data-cursor="label"
              data-cursor-text="Buscar"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#0b3c8a]/40 text-sm pointer-events-none">
              🔍
            </span>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-[#0b3c8a]/50 py-10 font-mono text-xs uppercase tracking-wider">
              No encontramos preguntas que coincidan con tu búsqueda.
            </p>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const slideDirection = index % 2 === 0 ? 'left' : 'right';

              return (
                <ScrollReveal key={faq.id} direction={slideDirection} delay={index * 0.06}>
                  {/* Contenedor principal animado con Framer Motion para el efecto de rebote al hacer hover */}
                  <motion.div 
                    whileHover={{ scale: 1.015, x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="rounded-2xl border border-[#0b3c8a]/15 bg-white overflow-hidden shadow-[0_2px_12px_rgba(11,60,138,0.02)] hover:border-[#0b3c8a]/40"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                      data-cursor="label"
                      data-cursor-text={isOpen ? "Cerrar" : "Abrir"}
                    >
                      <span className="font-semibold text-[#0b3c8a] text-base sm:text-lg tracking-tight">
                        {faq.question}
                      </span>
                      
                      {/* Icono con rebote elástico al rotar */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                        className="text-[#0b3c8a] font-mono text-xl shrink-0 inline-block pointer-events-none"
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Despliegue del panel con muelle físico real */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="accordion-content"
                          initial={{ height: 0, opacity: 0, scaleY: 0.95 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            scaleY: 1,
                            transition: {
                              height: { type: 'spring', stiffness: 220, damping: 18 },
                              opacity: { duration: 0.25, delay: 0.05 },
                              scaleY: { type: 'spring', stiffness: 220, damping: 18 }
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            scaleY: 0.95,
                            transition: {
                              height: { type: 'spring', stiffness: 300, damping: 25 },
                              opacity: { duration: 0.15 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-[#0b3c8a]/70 text-sm sm:text-base font-light leading-relaxed border-t border-[#0b3c8a]/10 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </ScrollReveal>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}