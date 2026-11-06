/**
 * components/Gate/Gate.jsx
 * -----------------------------------------------------------------------------
 * Porte d'entrée plein écran (comme Club 918) : logo, slogan et bouton
 * "Entrer". Elle s'efface en fondu quand le visiteur clique.
 */
import { BRAND } from "../../config/contact.js";
import "./Gate.css";

/**
 * @param {boolean} entered  Le visiteur a-t-il déjà cliqué sur "Entrer" ?
 * @param {boolean} ready  La scène 3D est-elle prête ?
 * @param {Function} onEnter  Appelée au clic sur "Entrer"
 */
export default function Gate({ entered, ready, onEnter }) {
  return (
    <div className={`gate ${entered ? "gone" : ""}`} aria-hidden={entered}>
      {/* Petit drapeau tricolore + accroche */}
      <div className="gate-tag">
        <span className="flag" aria-hidden="true">
          <i style={{ background: "var(--orange)" }} />
          <i style={{ background: "#fff" }} />
          <i style={{ background: "var(--green)" }} />
        </span>
        Conciergerie privée · Côte d'Ivoire
      </div>

      {/* Logo */}
      <div className="gate-logo">
        {BRAND.name} {BRAND.accent}
        <span>{BRAND.welcome}</span>
      </div>

      <p className="gate-sub">{BRAND.tagline}</p>

      <button className="btn-enter" onClick={onEnter}>
        Entrer
      </button>

      {/* Indicateur de chargement de la 3D */}
      <div className="gate-load">{ready ? "Prête" : "Préparation de l'expérience…"}</div>
    </div>
  );
}
