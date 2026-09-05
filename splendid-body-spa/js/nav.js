function initNav() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");
  const sections = document.querySelectorAll("section[id]");
  const prefix = typeof getPathPrefix === "function" ? getPathPrefix() : "";

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  });

  toggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks?.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        navLinks.classList.remove("is-open");
        toggle?.classList.remove("is-open");
        toggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.querySelectorAll(".logo[href^='#']").forEach((logo) => {
    logo.addEventListener("click", (e) => {
      if (logo.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(logo.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          navLinks?.classList.remove("is-open");
          toggle?.classList.remove("is-open");
          toggle?.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.scrollTo);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks?.querySelectorAll("a").forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => navObserver.observe(section));
  }

  const currentPath = window.location.pathname;
  navLinks?.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && !href.startsWith("#") && !href.startsWith("http")) {
      const normalizedHref = href.replace(/^\.\.\//, "").replace(/\/$/, "");
      const normalizedPath = currentPath.replace(/\/index\.html$/, "").replace(/\/$/, "");
      if (normalizedPath.endsWith(normalizedHref) || normalizedPath.includes("/" + normalizedHref)) {
        link.classList.add("is-active");
      }
    }
  });

  initFloatingActions(prefix);
}

function initFloatingActions(prefix) {
  const floating = document.querySelector(".floating-actions");
  if (!floating) return;

  window.addEventListener("scroll", () => {
    floating.classList.toggle("is-visible", window.scrollY > 400);
  });

  floating.querySelector("[data-floating-whatsapp]")?.addEventListener("click", () => {
    openWhatsApp(`Hi ${SITE_CONFIG.brandName}! I'd like to enquire about your spa services.`);
  });

  floating.querySelector("[data-floating-book]")?.addEventListener("click", () => {
    const bookSection = document.getElementById("book");
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = prefix + "book/";
    }
  });
}
