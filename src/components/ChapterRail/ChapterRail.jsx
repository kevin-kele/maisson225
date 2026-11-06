/**
 * components/ChapterRail/ChapterRail.jsx
 * -----------------------------------------------------------------------------
 * Sommaire vertical sur le côté droit : un trait par section.
 * Le trait de la section visible s'allonge et devient doré.
 * Un clic fait défiler en douceur jusqu'à la section.
 */
import "./ChapterRail.css";

/**
 * @param {Array<{id:string,label:string,scene:number}>} sections
 * @param {number} active  Numéro de la section visible
 */
export default function ChapterRail({ sections, active }) {
  // Défilement doux vers la section cliquée
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="rail" aria-label="Chapitres">
      {sections.map((s) => (
        <button key={s.id} className={active === s.scene ? "on" : ""} onClick={() => goTo(s.id)}>
          {s.label}
          <i />
        </button>
      ))}
    </div>
  );
}
