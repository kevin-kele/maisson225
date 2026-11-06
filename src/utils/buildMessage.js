/**
 * utils/buildMessage.js
 * -----------------------------------------------------------------------------
 * Fonctions pures (sans React) qui fabriquent le message de demande
 * du configurateur et le lien WhatsApp correspondant.
 */
import { BRAND } from "../config/contact.js";

/** Convertit "2026-12-24" en "24/12/2026" (ou "à définir" si vide). */
export function formatDate(value) {
  if (!value) return "à définir";
  const [y, m, d] = value.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * Construit le texte de la demande.
 * @param {object} p
 * @param {Array<{title:string, options:string[]}>} p.groups  Groupes d'options
 * @param {Set<string>} p.selected  Options cochées
 * @param {string} p.arrival  Date d'arrivée (AAAA-MM-JJ)
 * @param {string} p.departure  Date de départ
 * @param {number|string} p.travelers  Nombre de voyageurs
 * @param {string} p.mood  Ambiance choisie
 */
export function buildMessage({ groups, selected, arrival, departure, travelers, mood }) {
  const lines = [
    `Bonjour ${BRAND.name} ${BRAND.accent},`,
    "",
    "Je souhaite organiser un séjour en Côte d'Ivoire :",
    `• Dates : du ${formatDate(arrival)} au ${formatDate(departure)}`,
    `• Voyageurs : ${travelers || "?"}`,
    `• Ambiance : ${mood}`,
  ];

  // Une ligne par groupe, seulement si au moins une option est cochée
  groups.forEach((g) => {
    const picked = g.options.filter((o) => selected.has(o));
    if (picked.length) lines.push(`• ${g.title} : ${picked.join(", ")}`);
  });

  lines.push("", "Merci de me recontacter pour finaliser.");
  return lines.join("\n");
}

/** Lien wa.me qui ouvre WhatsApp avec le message déjà rempli. */
export function whatsappLink(number, text) {
  return `https://wa.me/${number || ""}?text=${encodeURIComponent(text)}`;
}
