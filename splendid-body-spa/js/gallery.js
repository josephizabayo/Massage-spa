let galleryImages = [];
let currentIndex = 0;

function initGallery() {
  const grid = document.getElementById("photo-gallery");
  if (!grid) return;

  galleryImages = GALLERY;

  GALLERY.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.className = "photo-gallery__item fade-up";
    btn.type = "button";
    btn.setAttribute("aria-label", `View ${item.alt}`);
    btn.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy" />`;
    btn.addEventListener("click", () => openLightbox(index));
    grid.appendChild(btn);
  });

  const overlay = document.getElementById("lightbox-overlay");
  if (!overlay) return;

  overlay.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
  overlay.querySelector(".lightbox__nav--prev")?.addEventListener("click", () => navigateLightbox(-1));
  overlay.querySelector(".lightbox__nav--next")?.addEventListener("click", () => navigateLightbox(1));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(index) {
  currentIndex = index;
  const overlay = document.getElementById("lightbox-overlay");
  const img = overlay?.querySelector(".lightbox img");
  if (!overlay || !img) return;

  img.src = galleryImages[currentIndex].src;
  img.alt = galleryImages[currentIndex].alt;
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function navigateLightbox(direction) {
  currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
  const img = document.querySelector("#lightbox-overlay .lightbox img");
  if (img) {
    img.src = galleryImages[currentIndex].src;
    img.alt = galleryImages[currentIndex].alt;
  }
}
