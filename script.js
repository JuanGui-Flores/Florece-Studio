document.addEventListener('DOMContentLoaded', () => {
  // Manejo de animaciones reveal al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Verificar estado del banner de cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'flex';
  }
});

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}