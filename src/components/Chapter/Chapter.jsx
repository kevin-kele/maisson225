/**
 * components/Chapter/Chapter.jsx
 * -----------------------------------------------------------------------------
 * Une section "chapitre" du site (Voyages, Littoral, Abidjan…).
 * Tout le contenu vient de data/chapters.js : ce composant ne fait que
 * l'afficher. Le premier chapitre (hero) a une mise en page spéciale
 * avec un grand titre, des boutons et l'indication "Défiler".
 */
import "./Chapter.css";

/**
 * @param {object} chapter  Un objet de data/chapters.js
 * @param {boolean} isIn  true quand la section doit jouer son animation d'apparition
 */
export default function Chapter({ chapter, isIn }) {
  const { id, hero, scene, side, num, kicker, title, lead, items, tags } = chapter;

  // Classes : côté du texte, état "apparu", variante héros
  const classes = ["chap", side === "right" ? "right" : "", isIn ? "in" : "", hero ? "hero" : ""].join(" ");

  // Le héros utilise un <h1>, les autres chapitres un <h2>
  const Title = hero ? "h1" : "h2";

  return (
    <section className={classes} id={id} data-scene={scene}>
      <div className="panel">
        {num && <div className="num rv">{num}</div>}
        <div className="kicker rv">{kicker}</div>

        <Title className="rv">
          {title.line}
          <br />
          <em>{title.em}</em>
        </Title>

        <p className="lead rv">{lead}</p>

        {/* Boutons : uniquement sur le héros */}
        {hero && (
          <div className="btns rv">
            <a className="btn" href="#composer">Composer mon séjour</a>
            <a className="btn ghost" href="#arrivee">Explorer</a>
          </div>
        )}

        {/* Liste numérotée des services (i., ii., iii.…) */}
        {items && (
          <ul className="items rv">
            {items.map((item, i) => (
              <li key={item.b}>
                <span>{toRoman(i + 1)}.</span>
                <div>
                  <b>{item.b}</b>
                  {item.t}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pastilles des lieux */}
        {tags && (
          <div className="tags rv">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Indication de défilement animée, sous le héros */}
      {hero && (
        <div className="scroll-hint">
          <i />
          Défiler
        </div>
      )}
    </section>
  );
}

/** Convertit 1, 2, 3… en i, ii, iii… (petits chiffres romains). */
function toRoman(n) {
  return ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"][n - 1] || String(n);
}
