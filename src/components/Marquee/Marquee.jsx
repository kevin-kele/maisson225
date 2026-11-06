/**
 * components/Marquee/Marquee.jsx
 * -----------------------------------------------------------------------------
 * Bandeau qui fait défiler en boucle les noms des villes et lieux.
 * La liste est doublée pour que la boucle soit invisible : quand la
 * première moitié est sortie, l'animation repart de zéro.
 */
import "./Marquee.css";

/** @param {string[]} places  Noms à faire défiler */
export default function Marquee({ places }) {
  const loop = [...places, ...places];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((place, i) => (
          <span key={`${place}-${i}`} className="marquee-item">
            <span>{place}</span>
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}
