'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Sistema de Gestión / ERP',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hola Florece Studio, mi nombre es ${formData.name} (${formData.email}). Estoy interesado en: ${formData.service}. Detalle: ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/5492640000000?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="contacto" className="py-28 bg-[#060913] border-t border-slate-800/80 text-white relative overflow-hidden">
      
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-[#0038a8]/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna Izquierda: Copy Persuasivo con animación desde la izquierda */}
          <ScrollReveal direction="left">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Iniciemos una conversación
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 text-slate-100 leading-tight tracking-tight">
                ¿Listo para transformar la tecnología de tu negocio?
              </h2>
              <p className="mt-4 text-slate-400 text-base leading-relaxed">
                Cuéntanos sobre tu proyecto o desafío operativo. Te responderemos en menos de 24 horas con una propuesta clara y sin compromiso.
              </p>

              <div className="mt-8 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>Disponibilidad inmediata para nuevos desarrollos</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>Atención directa sin intermediarios técnicos</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Columna Derecha: Formulario Glassmorphism con animación desde la derecha */}
          <ScrollReveal direction="right">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-blue-500/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre o empresa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#060913]/90 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#060913]/90 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Servicio Requerido
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#060913]/90 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  >
                    <option value="Sistema de Gestión / ERP">Sistema de Gestión / ERP a medida</option>
                    <option value="Plataforma Web Next.js">Plataforma Web / App Agrotech</option>
                    <option value="Tienda Online / E-commerce">Tienda Online / E-commerce</option>
                    <option value="Diseño UI/UX & Rediseño">Diseño UI/UX & Rediseño</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Detalles del Proyecto
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe brevemente lo que necesitas o los problemas a resolver..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#060913]/90 border border-slate-800 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-white text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl hover:scale-105"
                >
                  Enviar Consulta por WhatsApp →
                </button>
              </form>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}