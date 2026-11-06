/**
 * components/Footer/Footer.jsx
 * -----------------------------------------------------------------------------
 * Pied de page : mentions et liens vers les réseaux sociaux.
 * Les liens Instagram / TikTok n'apparaissent que s'ils sont renseignés
 * dans config/contact.js.
 */
import { BRAND, CONTACT } from "../../config/contact.js";
import "./Footer.css";

export default function Footer() {
  // Liste des liens à afficher (on retire ceux qui n'ont pas d'URL)
  const links = [
    { label: "Instagram", href: CONTACT.instagram, external: true },
    { label: "TikTok", href: CONTACT.tiktok, external: true },
    { label: "WhatsApp", href: "#composer" },
    { label: "Contact", href: `mailto:${CONTACT.email}` },
  ].filter((l) => l.href);

  return (
    <footer className="footer">
      <div>
        © MMXXVI {BRAND.name} {BRAND.accent} · Conciergerie privée · Abidjan, Côte d'Ivoire
      </div>
      <div className="footer-links">
        {links.map((l) => (
          <a key={l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
