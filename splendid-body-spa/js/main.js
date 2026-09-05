function renderTrustBar() {
  const ratingEl = document.querySelector("[data-trust-rating]");
  const countEl = document.querySelector("[data-trust-count]");
  const pillsEl = document.getElementById("trust-pills");

  if (ratingEl) ratingEl.textContent = SITE_CONFIG.rating.toFixed(1);
  if (countEl) countEl.textContent = `${SITE_CONFIG.reviewCount}+ reviews`;

  if (pillsEl) {
    TRUST_PILLS.forEach((pill) => {
      const span = document.createElement("span");
      span.className = "trust-pill";
      span.textContent = pill;
      pillsEl.appendChild(span);
    });
  }
}

function renderExperienceHighlights() {
  const container = document.getElementById("experience-highlights");
  if (!container) return;

  EXPERIENCE_HIGHLIGHTS.forEach((item) => {
    const div = document.createElement("div");
    div.className = "experience-highlight fade-up";
    div.innerHTML = `
      <div class="experience-highlight__icon">${item.icon}</div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderTreatments(containerId, filterCategory, featuredOnly) {
  const grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = "";
  let filtered = TREATMENTS;

  if (featuredOnly) {
    filtered = TREATMENTS.filter((t) => t.featured);
  } else if (filterCategory && filterCategory !== "all") {
    filtered = TREATMENTS.filter((t) => t.category === filterCategory);
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="collection__empty">No treatments found in this category.</p>';
    return;
  }

  filtered.forEach((treatment) => {
    grid.appendChild(createTreatmentCard(treatment));
  });

  initScrollAnimations();
}

function renderSignatureExperience() {
  const sig = SIGNATURE_EXPERIENCE;
  const nameEl = document.querySelector("[data-signature-name]");
  const subtitleEl = document.querySelector("[data-signature-subtitle]");
  const descEl = document.querySelector("[data-signature-desc]");
  const metaEl = document.querySelector("[data-signature-meta]");
  const imageEl = document.querySelector("[data-signature-image]");
  const listEl = document.getElementById("signature-inclusions");

  if (nameEl) nameEl.textContent = sig.name;
  if (subtitleEl) subtitleEl.textContent = sig.subtitle;
  if (descEl) descEl.textContent = sig.description;
  if (metaEl) metaEl.textContent = `${sig.duration} · ${formatPrice(sig.price)}`;
  if (imageEl) {
    imageEl.src = sig.image;
    imageEl.alt = sig.name;
  }

  if (listEl) {
    sig.inclusions.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      listEl.appendChild(li);
    });
  }
}

function renderWhySplendid() {
  const grid = document.getElementById("why-splendid");
  if (!grid) return;

  WHY_SPLENDID.forEach((item) => {
    const card = document.createElement("div");
    card.className = "feature-card fade-up";
    card.innerHTML = `
      <div class="feature-card__icon">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    grid.appendChild(card);
  });
}

function renderReviews(containerId, scrollId) {
  const grid = document.getElementById(containerId);
  const scroll = scrollId ? document.getElementById(scrollId) : null;

  REVIEWS.forEach((review) => {
    const card = createReviewCard(review);
    grid?.appendChild(card.cloneNode(true));
    scroll?.appendChild(card);
  });
}

function renderLocation() {
  const addressEl = document.querySelector("[data-location-address]");
  const phoneEl = document.querySelector("[data-location-phone]");
  const emailEl = document.querySelector("[data-location-email]");
  const hoursEl = document.getElementById("location-hours");
  const mapEl = document.querySelector("[data-location-map]");
  const directionsEl = document.querySelector("[data-location-directions]");

  if (addressEl) addressEl.textContent = SITE_CONFIG.address;
  if (phoneEl) {
    phoneEl.textContent = SITE_CONFIG.phone;
    phoneEl.href = `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`;
  }
  if (emailEl) {
    emailEl.textContent = SITE_CONFIG.email;
    emailEl.href = `mailto:${SITE_CONFIG.email}`;
  }
  if (mapEl) mapEl.src = SITE_CONFIG.mapEmbedUrl;
  if (directionsEl) directionsEl.href = SITE_CONFIG.directionsUrl;

  if (hoursEl) {
    const dayLabels = {
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
    };
    Object.entries(SITE_CONFIG.hours).forEach(([key, value]) => {
      const dt = document.createElement("dt");
      dt.textContent = dayLabels[key];
      const dd = document.createElement("dd");
      dd.textContent = value;
      hoursEl.appendChild(dt);
      hoursEl.appendChild(dd);
    });
  }
}

function initTreatmentFilters() {
  const filtersEl = document.getElementById("category-filters");
  if (!filtersEl) return;

  TREATMENT_CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `chip${cat.id === "all" ? " active" : ""}`;
    btn.textContent = cat.label;
    btn.dataset.category = cat.id;
    btn.addEventListener("click", () => {
      filtersEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      renderTreatments("treatments-grid", cat.id);
    });
    filtersEl.appendChild(btn);
  });
}

function renderAboutPage() {
  const storyEl = document.getElementById("about-story");
  const valuesEl = document.getElementById("about-values");

  if (storyEl) storyEl.textContent = ABOUT_CONTENT.story;

  if (valuesEl) {
    ABOUT_CONTENT.values.forEach((v) => {
      const div = document.createElement("div");
      div.className = "about-value fade-up";
      div.innerHTML = `<h3>${v.title}</h3><p>${v.description}</p>`;
      valuesEl.appendChild(div);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initBooking();
  initGallery();
  initScrollAnimations();

  renderTrustBar();
  renderExperienceHighlights();
  renderTreatments("home-treatments-grid", null, true);
  renderSignatureExperience();
  renderWhySplendid();
  renderReviews("reviews-grid", "reviews-scroll");
  renderLocation();
  initTreatmentFilters();
  renderTreatments("treatments-grid");
  renderAboutPage();

  // Re-observe all .fade-up elements now that dynamically rendered content
  // (review cards, feature cards, gallery items) exists in the DOM.
  // Without this, elements created after the first observe() — like the
  // reviews — never receive the .visible class and stay hidden at opacity 0.
  initScrollAnimations();
});
