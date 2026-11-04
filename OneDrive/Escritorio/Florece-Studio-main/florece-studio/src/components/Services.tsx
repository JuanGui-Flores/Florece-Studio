'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import RespiraText from './RespiraText';

interface Service {
  number: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
}

const services: Service[] = [
  {
    number: '01',
    category: 'ERP, CRM Y GESTIÓN',
    title: 'Sistemas de Gestión y Stock a Medida',
    description: 'Desarrollamos software adaptado exactamente a la operatoria real de tu negocio: control de inventario en tiempo real, múltiples usuarios y paneles robustos.',
    features: ['Control de miles de SKUs', 'Roles y permisos avanzados', 'Arquitectura segura y escalable'],
    imageSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '02',
    category: 'TECNOLOGÍA AVANZADA CON NEXT.JS',
    title: 'Plataformas Web & Agrotech',
    description: 'Construimos aplicaciones web complejas con bases de datos optimizadas, mapas interactivos, dashboards de negocio y experiencias de usuario de nivel internacional.',
    features: ['Optimización SEO extrema', 'Dashboards interactivos', 'Integración de APIs y bases de datos'],
    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '03',
    category: 'VENTAS EN LÍNEA AUTOMATIZADAS',
    title: 'Tiendas Online & E-Commerce',
    description: 'Creamos tu tienda online a medida, integrada con pasarelas de pago, gestión de envíos y sincronizada para centralizar toda tu operación comercial.',
    features: ['Diseño 100% responsive', 'Pasarelas de pago integradas', 'Experiencia de compra optimizada'],
    imageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '04',
    category: 'INTERFACES QUE CAUTIVAN',
    title: 'Diseño UI/UX e Identidad Digital',
    description: 'Diseñamos sistemas de identidad visual, prototipos funcionales y experiencias de usuario atractivas que generan confianza inmediata desde el primer clic.',
    features: ['Prototipos en Figma', 'Branding corporativo', 'Enfoque absoluto en conversión'],
    imageSrc: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-white text-[#0b3c8a] border-t border-[#0b3c8a]/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera con RespiraText y animación de entrada/salida por scroll */}
        <motion.div 
          className="text-left max-w-4xl mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>

        {/* Grilla de Tarjetas en formato oscuro tipo Bento Grid */}
        <div className="space-y-12">
          {services.map((service, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ scale: 1.01 }}
                className="rounded-3xl bg-[#0e0e0e] text-white p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl border border-white/10 overflow-hidden relative group"
              >
                {/* Columna Izquierda: Información de la Tarjeta */}
                <div className="lg:col-span-7 flex flex-col justify-between z-10">
                  <div>
                    {/* Badge de número y categoría */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-300 tracking-wider mb-6">
                      <span className="text-neutral-400">&lt;/&gt;</span>
                      <span>{service.number} · {service.category}</span>
                    </div>

                    {/* Título Principal */}
                    <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-white mb-4">
                      {service.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Features / Características inferiores */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-xs text-neutral-300 flex items-center gap-2 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer de Tarjeta con CTA */}
                  <div className="pt-8 flex items-center justify-between border-t border-white/10 mt-8">
                    <span className="text-xs font-mono tracking-widest text-white/70 uppercase">
                      COTIZACIÓN PRIVADA
                    </span>

                    <Link 
                      href="#contacto"
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#0b3c8a] group-hover:text-white"
                      data-cursor="label"
                      data-cursor-text="Abrir"
                    >
                      <span className="text-lg leading-none">→</span>
                    </Link>
                  </div>
                </div>

                {/* Columna Derecha: Imagen Bento con zoom al hacer hover */}
                <div className="lg:col-span-5 h-[260px] sm:h-[340px] w-full overflow-hidden rounded-2xl relative">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action inferior flotante */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="#contacto"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0b3c8a] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#082a63] transition-all shadow-md hover:scale-105"
            data-cursor="label"
            data-cursor-text="Cotizar"
          >
            Cotizar mi proyecto a medida →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}