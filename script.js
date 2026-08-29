document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------------------------
     1. OBSERVER / REVEAL ANIMATIONS (Soporte Móvil y Desktop)
     ----------------------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.01,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  /* -----------------------------------------------------------
     2. PARALLAX SOBRIO EN EL HERO (Optimizado para Escritorio)
     ----------------------------------------------------------- */
  const heroTitle = document.querySelector(".hero h1");
  const heroLede = document.querySelector(".hero .lede");

  if ((heroTitle || heroLede) && window.innerWidth > 768) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            if (scrolled < 700) {
              if (heroTitle) {
                heroTitle.style.transform = `translateY(${scrolled * 0.1}px)`;
                heroTitle.style.opacity = 1 - scrolled / 600;
              }
              if (heroLede) {
                heroLede.style.transform = `translateY(${scrolled * 0.05}px)`;
                heroLede.style.opacity = 1 - scrolled / 500;
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  /* -----------------------------------------------------------
     3. SPOTLIGHT INTERACTIVO EN TARJETAS GLASS (MouseMove)
     ----------------------------------------------------------- */
  const glassCards = document.querySelectorAll(".glass-card");

  glassCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* -----------------------------------------------------------
     4. BANNER DE COOKIES
     ----------------------------------------------------------- */
  if (!localStorage.getItem("cookiesAccepted")) {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "flex";
  }

  /* -----------------------------------------------------------
     5. MENÚ DESPLEGABLE TIPO OVERLAY
     ----------------------------------------------------------- */
  const menuBtn = document.getElementById('menuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const navOverlay = document.getElementById('navOverlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-link-item');
  const sidebarWrapper = document.querySelector('.sidebar-content-wrapper');

  if (menuBtn && navOverlay) {
    let lastScrollTop = 0;
    let scrollTicking = false;

    menuBtn.addEventListener('click', () => {
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (sidebarWrapper) sidebarWrapper.classList.remove('sidebar-hidden');
    });

    const closeMenu = () => {
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (sidebarWrapper) sidebarWrapper.classList.remove('sidebar-hidden');
    };

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', closeMenu);
    }

    sidebarLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });

    // Lógica para ocultar/mostrar al hacer scroll dentro del overlay
    window.addEventListener('scroll', () => {
      if (!navOverlay.classList.contains('active') || !sidebarWrapper) return;

      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

          if (currentScroll > lastScrollTop && currentScroll > 20) {
            // Scroll hacia ABAJO -> Ocultar
            sidebarWrapper.classList.add('sidebar-hidden');
          } else {
            // Scroll hacia ARRIBA -> Mostrar
            sidebarWrapper.classList.remove('sidebar-hidden');
          }

          lastScrollTop = Math.max(0, currentScroll);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  /* -----------------------------------------------------------
     6. PALABRA ROTATIVA EN EL HERO
     ----------------------------------------------------------- */
  const words = ["business.", "enterprise.", "company.", "store.", "industries."];
  const rotatingSpan = document.querySelector(".rotating-word");

  if (rotatingSpan) {
    let currentIndex = 0;

    setInterval(() => {
      rotatingSpan.classList.add("fade-out");

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length;
        rotatingSpan.textContent = words[currentIndex];
        rotatingSpan.classList.remove("fade-out");
      }, 400);
    }, 3500);
  }
});

function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.style.display = "none";
}

/* -----------------------------------------------------------
     7. CURSOR PERSONALIZADO Y ELEGANTE (Solo Desktop)
     ----------------------------------------------------------- */
if (window.innerWidth > 1024) {
  const dot = document.createElement("div");
  const ring = document.createElement("div");

  dot.className = "cursor-dot";
  ring.className = "cursor-ring";

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  const render = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(render);
  };
  render();
}