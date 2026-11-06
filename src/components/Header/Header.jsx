/**
 * components/Header/Header.jsx
 * -----------------------------------------------------------------------------
 * Barre de navigation fixe en haut : logo, liens vers les chapitres
 * (le chapitre visible est souligné en doré) et bouton d'appel à l'action.
 */
import { BRAND } from "../../config/contact.js";
import "./Header.css";

/**
 * @param {number} active  Numéro de la section visible
 * @param {boolean} scrolled  La page a-t-elle défilé ? (ajoute un fond)
 * @param {Array} chapters  Liste des chapitres (data/chapters.js)
 */
export default function Header({ active, scrolled, chapters }) {
  // Seuls les chapitres qui ont un champ "nav" apparaissent dans le menu
  const navItems = chapters.filter((c) => c.nav);

  return (
    <header className={`header ${scrolled ? "solid" : ""}`}>
      <a href="#hero" className="logo">
        {BRAND.name} <em>{BRAND.accent}</em>
      </a>

      <nav className="header-nav">
        {navItems.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={active === c.scene ? "on" : ""}>
            {c.nav}
          </a>
        ))}
      </nav>

      <a href="#composer" className="header-cta">
        Composer mon séjour
      </a>
    </header>
  );
}
