/**
 * components/Composer/ChipGroup.jsx
 * -----------------------------------------------------------------------------
 * Un groupe de pastilles cliquables (ex. "Mobilité" → Accueil VIP, Chauffeur…).
 * Une pastille sélectionnée devient dorée.
 */

/**
 * @param {string} title  Titre du groupe
 * @param {string[]} options  Libellés des pastilles
 * @param {Set<string>} selected  Pastilles actuellement cochées
 * @param {(option:string) => void} onToggle  Coche / décoche une pastille
 */
export default function ChipGroup({ title, options, selected, onToggle }) {
  return (
    <div className="group">
      <h4>{title}</h4>
      <div className="chips">
        {options.map((option) => {
          const isOn = selected.has(option);
          return (
            <button
              key={option}
              type="button"
              className={`chip ${isOn ? "on" : ""}`}
              aria-pressed={isOn}
              onClick={() => onToggle(option)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
