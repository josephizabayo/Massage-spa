function formatPrice(amount) {
  return "UGX " + amount.toLocaleString("en-UG");
}

function renderStars(count) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".fade-up").forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}

function getCategoryLabel(categoryId) {
  const cat = TREATMENT_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.label : categoryId;
}

function createTreatmentCard(treatment) {
  const card = document.createElement("article");
  card.className = "treatment-card fade-up";

  const options = treatment.options || [
    { label: treatment.duration || "Session", price: treatment.price },
  ];

  const optionsHtml = options
    .map(
      (o) => `
        <li class="treatment-card__option">
          <span class="treatment-card__option-label">${o.label}</span>
          <span class="treatment-card__option-price">${formatPrice(o.price)}</span>
          ${o.note ? `<span class="treatment-card__option-note">${o.note}</span>` : ""}
        </li>`
    )
    .join("");

  const minPrice = Math.min(...options.map((o) => o.price));
  const detailsId = `taxes-details-${treatment.id}`;

  card.innerHTML = `
    <div class="treatment-card__image">
      <img src="${treatment.image}" alt="${treatment.name}" loading="lazy" />
    </div>
    <div class="treatment-card__body">
      <span class="treatment-card__category">${getCategoryLabel(treatment.category)}</span>
      <h3 class="treatment-card__name">${treatment.name}</h3>
      <p class="treatment-card__teaser">Starts from ${formatPrice(minPrice)}</p>
      <div class="treatment-card__details" id="${detailsId}">
        <div class="treatment-card__details-inner">
          <p class="treatment-card__desc">${treatment.description}</p>
          <ul class="treatment-card__options">${optionsHtml}</ul>
        </div>
      </div>
      <button class="treatment-card__toggle" type="button" aria-expanded="false" aria-controls="${detailsId}">
        <span class="treatment-card__toggle-text">View More Details</span>
        <span class="treatment-card__toggle-icon" aria-hidden="true">+</span>
      </button>
      <button class="btn btn-primary btn-sm" data-book-treatment="${treatment.id}" data-book-option="${options[0].label}">Book via WhatsApp</button>
    </div>
  `;

  const toggle = card.querySelector(".treatment-card__toggle");
  const toggleText = toggle.querySelector(".treatment-card__toggle-text");

  toggle.addEventListener("click", () => {
    const isExpanded = card.classList.contains("is-expanded");

    // Present the details for the box the user clicked. If another box in the
    // same grid is open, close it first so only one box shows details at a time.
    if (isExpanded) {
      card.classList.remove("is-expanded");
    } else {
      const grid = card.closest(".treatment-grid");
      grid?.querySelectorAll(".treatment-card.is-expanded").forEach((other) => {
        if (other === card) return;
        other.classList.remove("is-expanded");
        const otherToggle = other.querySelector(".treatment-card__toggle");
        otherToggle?.setAttribute("aria-expanded", "false");
        const otherTextEl = otherToggle?.querySelector(".treatment-card__toggle-text");
        if (otherTextEl) otherTextEl.textContent = "View More Details";
      });
      card.classList.add("is-expanded");
    }

    const nowExpanded = card.classList.contains("is-expanded");
    toggle.setAttribute("aria-expanded", nowExpanded ? "true" : "false");
    toggleText.textContent = nowExpanded ? "Show Less Details" : "View More Details";
  });

  return card;
}

function createReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card fade-up";
  const meta = review.meta
    ? `<p class="review-card__meta">${review.meta}</p>`
    : "";
  const date = review.date
    ? `<p class="review-card__date">${review.date}</p>`
    : "";
  card.innerHTML = `
    <div class="review-card__stars" aria-label="${review.stars} out of 5 stars">${renderStars(review.stars)}</div>
    <p class="review-card__quote">"${review.quote}"</p>
    <div class="review-card__attribution">
      <p class="review-card__author">${review.author}</p>
      ${meta}
      ${date}
    </div>
    <p class="review-card__treatment">${review.treatment}</p>
  `;
  return card;
}

function populateTreatmentSelect(selectEl) {
  if (!selectEl) return;
  selectEl.innerHTML = '<option value="">Select a treatment</option>';
  TREATMENTS.forEach((t) => {
    const options = t.options || [{ label: t.duration || "Session", price: t.price }];
    options.forEach((o) => {
      const opt = document.createElement("option");
      const base = `${t.name} — ${o.label}`;
      const value = o.note ? `${base} · ${o.note}` : base;
      opt.value = value;
      opt.textContent = value;
      selectEl.appendChild(opt);
    });
  });
}

function getPathPrefix() {
  const depth = window.location.pathname.split("/").filter(Boolean).length;
  const isSubpage = depth > 1 || (depth === 1 && !window.location.pathname.endsWith("index.html") && window.location.pathname !== "/" && !window.location.pathname.endsWith("/"));
  if (window.location.pathname.includes("/about/") ||
      window.location.pathname.includes("/treatments/") ||
      window.location.pathname.includes("/experience/") ||
      window.location.pathname.includes("/reviews/") ||
      window.location.pathname.includes("/contact/") ||
      window.location.pathname.includes("/book/")) {
    return "../";
  }
  return "";
}
