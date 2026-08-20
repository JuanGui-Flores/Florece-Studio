// Configuración de animación al hacer Scroll (IntersectionObserver)
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Función global para aceptar cookies al hacer clic en el botón
function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    cookieBanner.style.display = 'none';
  }
}

// Inicialización de lógica al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mostrar banner de cookies si no fue aceptado
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'flex';
  }

  // 2. Activar observación para las animaciones Reveal
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});