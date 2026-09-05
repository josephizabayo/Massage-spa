function initBooking() {
  const forms = document.querySelectorAll("[data-booking-form]");

  forms.forEach((form) => {
    populateTreatmentSelect(form.querySelector('[name="treatment"]'));

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]');
      const phone = form.querySelector('[name="phone"]');
      const treatment = form.querySelector('[name="treatment"]');
      const datetime = form.querySelector('[name="datetime"]');
      const notes = form.querySelector('[name="notes"]');

      let valid = true;

      [name, phone, treatment, datetime].forEach((field) => {
        const errorEl = field.parentElement.querySelector(".form-error");
        if (errorEl) errorEl.remove();

        if (!field.value.trim()) {
          valid = false;
          const err = document.createElement("p");
          err.className = "form-error";
          err.textContent = "This field is required.";
          field.parentElement.appendChild(err);
        }
      });

      if (!valid) return;

      const message = buildBookingMessage({
        name: name.value.trim(),
        phone: phone.value.trim(),
        treatment: treatment.value,
        datetime: datetime.value.trim(),
        notes: notes?.value.trim() || "",
      });

      openWhatsApp(message);
    });
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book-treatment]");
    if (!btn) return;

    const treatmentId = btn.dataset.bookTreatment;
    const optionLabel = btn.dataset.bookOption || "";
    const treatment = getTreatmentById(treatmentId);
    if (!treatment) return;

    const treatmentName = optionLabel
      ? `${treatment.name} — ${optionLabel}`
      : treatment.name;

    const message = buildBookingMessage({
      name: "[Your name]",
      phone: "[Your phone]",
      treatment: treatmentName,
      datetime: "[Preferred date & time]",
      notes: "",
    });

    openWhatsApp(message);
  });
}
