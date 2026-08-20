// Configuración de animación al hacer Scroll (IntersectionObserver)
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Agrega la clase que tenés definida en el CSS
      entry.target.classList.add('is-visible'); 
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Lógica de cookies y arranque
function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) cookieBanner.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'flex';
  }

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
});

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