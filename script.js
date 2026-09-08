document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------------------------------------
     1. OBSERVER / REVEAL ANIMATIONS (Con soporte de carga inicial)
     ----------------------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.01,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
    
    // Seguridad: Si el elemento ya está a la vista al cargar la página, lo mostramos de una
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('is-visible');
    }
  });

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
      { passive: true }
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
  const menuBtn = document.getElementById("menuBtn");
  const closeMenuBtn = document.getElementById("closeMenuBtn");
  const navOverlay = document.getElementById("navOverlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-link-item");
  const sidebarWrapper = document.querySelector(".sidebar-content-wrapper");

  if (menuBtn && navOverlay) {
    let lastScrollTop = 0;
    let scrollTicking = false;

    menuBtn.addEventListener("click", () => {
      navOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      if (sidebarWrapper) sidebarWrapper.classList.remove("sidebar-hidden");
    });

    const closeMenu = () => {
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
      // CORRECCIÓN: Al cerrar el menú, nos aseguramos de remover el hidden
      if (sidebarWrapper) sidebarWrapper.classList.remove("sidebar-hidden");
    };

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", closeMenu);
    }

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    navOverlay.addEventListener("click", (e) => {
      if (e.target === navOverlay) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });

    navOverlay.addEventListener(
      "scroll",
      () => {
        if (!navOverlay.classList.contains("active") || !sidebarWrapper) return;

        if (!scrollTicking) {
          window.requestAnimationFrame(() => {
            let currentScroll = navOverlay.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 20) {
              sidebarWrapper.classList.add("sidebar-hidden");
            } else {
              sidebarWrapper.classList.remove("sidebar-hidden");
            }

            lastScrollTop = Math.max(0, currentScroll);
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      },
      { passive: true }
    );
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

  /* -----------------------------------------------------------
     7. SMART HEADER (Hide on Scroll Down)
     ----------------------------------------------------------- */
  const header = document.querySelector("header");

  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const navOverlay = document.getElementById("navOverlay");

            if (navOverlay?.classList.contains("active")) {
              lastScrollY = currentScrollY;
              ticking = false;
              return;
            }

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
              header.classList.add("header-hidden");
            } else {
              header.classList.remove("header-hidden");
            }

            lastScrollY = Math.max(currentScrollY, 0);
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* -----------------------------------------------------------
     8. MANEJO DE FORMULARIO CON WEB3FORMS (AJAX / Fetch)
     ----------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : "Enviar";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      if (formStatus) {
        formStatus.textContent = "Procesando tu mensaje...";
        formStatus.className = "form-status-message info";
        formStatus.style.display = "block";
      }

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        });

        const result = await response.json();

        if (response.status === 200) {
          if (formStatus) {
            formStatus.textContent = "¡Gracias! Tu mensaje ha sido enviado exitosamente.";
            formStatus.className = "form-status-message success";
          }
          contactForm.reset();
        } else if (formStatus) {
          formStatus.textContent = result.message || "Ocurrió un error al enviar el formulario.";
          formStatus.className = "form-status-message error";
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        if (formStatus) {
          formStatus.textContent = "Error de red. Por favor, inténtalo de nuevo más tarde.";
          formStatus.className = "form-status-message error";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }

        setTimeout(() => {
          if (formStatus) {
            formStatus.style.display = "none";
          }
        }, 6000);
      }
    });
  }

  /* -----------------------------------------------------------
     9. CURSOR PERSONALIZADO Y ELEGANTE
     ----------------------------------------------------------- */
    document.addEventListener("DOMContentLoaded", () => {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (!cursorDot || !cursorRing) return;

  // Activar visibilidad al mover el mouse por primera vez
  let mouseMoved = false;

  window.addEventListener("mousemove", (e) => {
    if (!mouseMoved) {
      cursorDot.style.opacity = "1";
      cursorRing.style.opacity = "1";
      mouseMoved = true;
    }

    const posX = e.clientX;
    const posY = e.clientY;

    // Posición inmediata para el punto central
    cursorDot.style.transform = `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;
    
    // Posición con leve retraso o fluidez para el anillo (opcional, o directo)
    cursorRing.style.transform = `translate3d(${posX - 18}px, ${posY - 18}px, 0)`;
  });

  // Efecto hover opcional en enlaces y botones
  const interactives = document.querySelectorAll("a, button, .glass-card");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorRing.style.transform = cursorRing.style.transform + " scale(1.5)";
      cursorRing.style.borderColor = "var(--accent-blue)";
    });
    el.addEventListener("mouseleave", () => {
      cursorRing.style.borderColor = "rgba(255, 255, 255, 0.6)";
    });
  });
});
});