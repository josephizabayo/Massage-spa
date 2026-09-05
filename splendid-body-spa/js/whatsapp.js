function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
}

function buildBookingMessage(data) {
  const lines = [
    `Hi ${SITE_CONFIG.brandName}! I'd like to book an appointment.`,
    "",
    `Treatment: ${data.treatment}`,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Preferred date/time: ${data.datetime}`,
  ];

  if (data.notes) {
    lines.push(`Notes: ${data.notes}`);
  }

  return lines.join("\n");
}

function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}
