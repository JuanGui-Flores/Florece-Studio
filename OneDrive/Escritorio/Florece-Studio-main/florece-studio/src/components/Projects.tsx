'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import RespiraText from './RespiraText';

interface Project {
  title: string;
  category: string;
  badge: string;
  description: string;
  tags: string[];
  image: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'AgroPassport AI',
    category: 'Agroindustria & BI',
    badge: 'Plataforma Digital',
    description: 'Plataforma web para la gestión agrícola integral con trazabilidad de parcelas, mapas interactivos, dashboards de negocio y control de acceso basado en roles (RBAC).',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL'],
    image: '/agropassport.png',
    highlights: ['Mapas de parcelas interactivos', 'Control de acceso granular', 'Búsqueda global y filtros enterprise'],
  },
  {
    title: 'Cris-Motos',
    category: 'Comercio & Repuestos',
    badge: 'Sistema ERP / Stock',
    description: 'Sistema de escritorio de alta capacidad diseñado para gestionar miles de SKUs de repuestos de motocicletas, facturación en punto de venta y control de stock en tiempo real.',
    tags: ['Node.js', 'PostgreSQL', 'Electron', 'Tailwind CSS'],
    image: '/desk.jpeg',
    highlights: ['+10,000 SKUs optimizados', 'Operación offline/online', 'Control de caja e historial diario'],
  },
  {
    title: 'Pulso Gym Planner',
    category: 'Fitness & Wellness Management',
    badge: 'SaaS / App Móvil',
    description: 'Plataforma interactiva para la planificación de rutinas, seguimiento de atletas y gestión de membresías en centros de entrenamiento y gimnasios.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    image: '/pulso.png',
    highlights: ['Planes de entrenamiento dinámicos', 'Panel de seguimiento de atletas', 'Interfaz ultra fluida y mobile-first'],
  },
  {
    title: 'ElevArte',
    category: 'Servicios & Experiencia Digital',
    badge: 'Experiencia Web',
    description: 'Plataforma web moderna con una arquitectura visual cuidada, enfocada en la presentación de servicios de alto impacto y retención de usuarios.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'UI/UX Design'],
    image: '/teach.jpeg',
    highlights: ['Optimización de conversión', 'Diseño de interfaz responsivo', 'Performance web de alta velocidad'],
  },
  {
    title: 'Sangucci',
    category: 'Gastronomía & E-Commerce',
    badge: 'E-Commerce / Menú',
    description: 'Experiencia web interactiva para gastronomía con menú digital dinámico, carrito de compras integrado y procesamiento de pedidos sin comisiones por intermediarios.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/patio.webp',
    highlights: ['Catálogo interactivo', 'Envíos directos a WhatsApp', 'Carga ultrarrápida en dispositivos móviles'],
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="py-28 bg-white text-[#0b3c8a] border-t border-[#0b3c8a]/10 relative overflow-hidden">
      
      {/* Contenedor extra ancho (pantalla completa estilo Axus) */}
      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Cabecera Axus: Título masivo a la izquierda y descripción concisa a la derecha */}
        <ScrollReveal direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-4xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0b3c8a]/70 bg-[#0b3c8a]/5 px-3.5 py-1.5 rounded-full border border-[#0b3c8a]/15">
                [ 02 ] Trabajos Seleccionados
              </span>
              <div className="mt-4">
                <RespiraText 
                  text="Últimos/trabajos." 
                  ancho="0.9" 
                  alto="0.5" 
                  radio="0.9"
                  className="w-full"
                />
              </div>
            </div>
            
            <p className="text-[#0b3c8a]/70 max-w-xs text-xs sm:text-sm font-light uppercase tracking-wider leading-relaxed">
              Diseñamos y construimos productos digitales que ya forman parte de operaciones, ventas y experiencias concretas.
            </p>
          </div>
        </ScrollReveal>

        {/* Grilla de Proyectos Panorámica con Swap tipográfico en Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.08}>
              <motion.div 
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col cursor-pointer"
              >
                
                {/* Imagen del Proyecto Panorámica (Estilo Axus) */}
                <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full rounded-2xl bg-[#0b3c8a]/5 overflow-hidden border border-[#0b3c8a]/15 shadow-[0_4px_24px_rgba(11,60,138,0.03)] group-hover:shadow-[0_20px_45px_rgba(11,60,138,0.12)] transition-all duration-700">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono text-[#0b3c8a] font-medium border border-[#0b3c8a]/20 shadow-sm">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Info y Swap Tipográfico al hacer Hover */}
                <div className="mt-6 flex flex-col">
                  <span className="text-[11px] font-mono text-[#0b3c8a]/60 uppercase tracking-widest mb-1.5">
                    DESARROLLAMOS SU SISTEMA • {project.category.toUpperCase()}
                  </span>
                  
                  <div className="relative overflow-hidden">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b3c8a] tracking-tight transition-transform duration-300 group-hover:-translate-y-full flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-2xl font-mono opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </h3>
                    
                    {/* Título Swap con Serif / Itálica en Hover */}
                    <h3 className="absolute top-0 left-0 text-3xl sm:text-4xl lg:text-5xl italic text-[#0b3c8a] tracking-tight transition-transform duration-300 translate-y-full group-hover:translate-y-0 font-serif flex items-center justify-between w-full">
                      <span>{project.title}</span>
                      <span className="text-2xl font-mono">→</span>
                    </h3>
                  </div>

                  <p className="mt-3 text-[#0b3c8a]/70 text-sm font-light leading-relaxed max-w-xl line-clamp-2">
                    {project.description}
                  </p>
                </div>

              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}