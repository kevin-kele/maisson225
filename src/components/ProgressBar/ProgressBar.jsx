/**
 * components/ProgressBar/ProgressBar.jsx
 * -----------------------------------------------------------------------------
 * Fine barre tricolore (orange · blanc · vert) en haut de l'écran
 * qui se remplit au fil du défilement.
 */
import "./ProgressBar.css";

/** @param {number} progress  Avancement entre 0 et 1 */
export default function ProgressBar({ progress }) {
  return <div className="progress" style={{ width: `${progress * 100}%` }} />;
}
