export function whatsappLink(message: string) {
  const phone = process.env.WHATSAPP_PHONE || "5571992620696";
  const text = encodeURIComponent(message + "\nutm_source=portfolio&utm_medium=cta&utm_campaign=contato");
  return `https://wa.me/${phone}?text=${text}`;
}
