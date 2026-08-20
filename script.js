document.addEventListener('DOMContentLoaded', () => {
  // Ajuste para móviles: threshold bajo y margen para activar la animación antes de tiempo
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.01
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Banner de cookies
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