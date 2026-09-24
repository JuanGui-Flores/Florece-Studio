# Changelog

Todas las notas notables de este proyecto serán documentadas en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere al versionado semántico [Semantic Versioning](https://semver.org/spec/v2.0.0-0.html).

## [1.1.0] - 2026-09-08

### Agregado
- **Cursor personalizado avanzado:** Implementación de punto central de precisión directa y anillo exterior con inercia fluida (*lerp*) utilizando bucles de renderizado con `requestAnimationFrame`.
- **Efectos interactivos del puntero:** Transición de colores y estados dinámicos al pasar el cursor sobre enlaces, botones y tarjetas glassmorphic.

### Modificado
- Ocultado definitivo del cursor nativo del sistema mediante selectores globales y reglas de `cursor: none !important`.
- Limpieza y reestructuración de eventos en JavaScript para evitar listeners duplicados y optimizar el rendimiento general.

---

## [1.0.0] - 2026-03-XX

### Agregado
- Lanzamiento inicial del sitio web institucional para el estudio.
- Diseño visual basado en la estética *Glassmorphism* con tema oscuro y tipografías personalizadas.
- Estructura completamente responsiva para dispositivos móviles, tablets y escritorios.
- Formulario de contacto funcional integrado.
- Configuración de despliegue continuo (*Continuous Deployment*) en **Vercel**.
- Integración de analíticas con Vercel Analytics y Google Analytics.
- Generación automática de sitemap y optimización SEO básica.