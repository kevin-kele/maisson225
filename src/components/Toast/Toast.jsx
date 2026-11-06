/**
 * components/Toast/Toast.jsx
 * -----------------------------------------------------------------------------
 * Petite bulle de notification en bas de l'écran (ex. "Demande copiée").
 * Elle est pilotée par le hook useToast (hooks/useToast.js).
 */
import "./Toast.css";

/**
 * @param {string} message  Texte à afficher
 * @param {boolean} visible  Afficher ou masquer la bulle
 */
export default function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? "show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
