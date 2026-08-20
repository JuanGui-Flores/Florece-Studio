document.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------------------------------------
     1. OBSERVER / REVEAL ANIMATIONS (Soporte Móvil y Desktop)
  ----------------------------------------------------------- */
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

  /* -----------------------------------------------------------
     2. PARALLAX SOBRIO EN EL HERO (Estilo Rolls-Royce)
  ----------------------------------------------------------- */
  const heroTitle = document.querySelector('.hero h1');
  const heroLede = document.querySelector('.hero .lede');

  if (heroTitle || heroLede) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      // Solo anima dentro del primer fold para no impactar rendimiento
      if (scrolled < 700) {
        if (heroTitle) {
          heroTitle.style.transform = `translateY(${scrolled * 0.12}px)`;
          heroTitle.style.opacity = 1 - scrolled / 600;
        }
        if (heroLede) {
          heroLede.style.transform = `translateY(${scrolled * 0.08}px)`;
          heroLede.style.opacity = 1 - scrolled / 500;
        }
      }
    }, { passive: true });
  }

  /* -----------------------------------------------------------
     3. SPOTLIGHT INTERACTIVO EN TARJETAS GLASS (MouseMove)
  ----------------------------------------------------------- */
  const glassCards = document.querySelectorAll('.glass-card');
  
  glassCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Envía las coordenadas del cursor como variables CSS
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* -----------------------------------------------------------
     4. BANNER DE COOKIES
  ----------------------------------------------------------- */
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