'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import RespiraText from './RespiraText';

interface Service {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    number: '01',
    title: 'Sistemas de Gestión y Stock a Medida',
    subtitle: 'ERP, CRM y herramientas administrativas',
    description: 'Desarrollamos software adaptado exactamente a la operatoria real de tu negocio: control de inventario en tiempo real, múltiples usuarios y paneles robustos.',
    features: ['Control de miles de SKUs', 'Roles y permisos avanzados', 'Arquitectura segura y escalable'],
  },
  {
    number: '02',
    title: 'Plataformas Web & Agrotech',
    subtitle: 'Tecnología avanzada con Next.js',
    description: 'Construimos aplicaciones web complejas con bases de datos optimizadas, mapas interactivos, dashboards de negocio y experiencias de usuario de nivel internacional.',
    features: ['Optimización SEO extrema', 'Dashboards interactivos', 'Integración de APIs y bases de datos'],
  },
  {
    number: '03',
    title: 'Tiendas Online & E-Commerce',
    subtitle: 'Listas para vender y automatizadas',
    description: 'Creamos tu tienda online a medida, integrada con pasarelas de pago, gestión de envíos y sincronizada para centralizar toda tu operación comercial.',
    features: ['Diseño 100% responsive', 'Pasarelas de pago integradas', 'Experiencia de compra optimizada'],
  },
  {
    number: '04',
    title: 'Diseño UI/UX e Identidad Digital',
    subtitle: 'Interfaces que cautivan y convierten',
    description: 'Diseñamos sistemas de identidad visual, prototipos funcionales y experiencias de usuario atractivas que generan confianza inmediata desde el primer clic.',
    features: ['Prototipos en Figma', 'Branding corporativo', 'Enfoque absoluto en conversión'],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-white text-[#0b3c8a] border-t border-[#0b3c8a]/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera con revelado y RespiraText */}
        <ScrollReveal direction="up">
          <div className="text-left max-w-4xl mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0b3c8a]/70 bg-[#0b3c8a]/5 px-3.5 py-1.5 rounded-full border border-[#0b3c8a]/15">
              [ 01 ] Qué hacemos / Soluciones
            </span>
            
            <div className="mt-6">
              <RespiraText 
                text="Tecnología que|resuelve problemas|reales." 
                ancho="0.85" 
                alto="0.45" 
                radio="0.9"
                className="w-full"
              />
            </div>

            <p className="mt-6 text-[#0b3c8a]/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              Estrategia, diseño y desarrollo de software orientado a optimizar tus procesos, fortalecer tu presencia digital y escalar tus ventas.
            </p>
          </div>
        </ScrollReveal>

        {/* Grilla de Servicios minimalista y limpia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const slideDirection = index % 2 === 0 ? 'left' : 'right';
            return (
              <ScrollReveal key={index} direction={slideDirection} delay={index * 0.1}>
                <div className="p-8 sm:p-10 rounded-2xl border border-[#0b3c8a]/15 bg-white hover:border-[#0b3c8a]/40 transition-all duration-300 flex flex-col justify-between group h-full shadow-[0_4px_20px_rgba(11,60,138,0.03)] hover:shadow-[0_10px_30px_rgba(11,60,138,0.08)]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#0b3c8a]/40 font-mono group-hover:text-[#0b3c8a] transition-colors">
                        {service.number}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#0b3c8a]/5 text-xs font-mono text-[#0b3c8a]/80 border border-[#0b3c8a]/10">
                        {service.subtitle}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#0b3c8a] tracking-tight">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-[#0b3c8a]/70 text-sm leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#0b3c8a]/10">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-xs text-[#0b3c8a]/80 flex items-center gap-2 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0b3c8a]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Call to action inferior */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-16 text-center">
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0b3c8a] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#082a63] transition-all shadow-md hover:scale-105"
            >
              Cotizar mi proyecto a medida →
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}