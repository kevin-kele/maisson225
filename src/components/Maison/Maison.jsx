/**
 * components/Maison/Maison.jsx
 * -----------------------------------------------------------------------------
 * Section finale "La Maison" : message de bienvenue et les 4 engagements
 * de la conciergerie. La forme 3D "225" apparaît derrière.
 */
import "./Maison.css";

// Les 4 engagements affichés en grille
const VALUES = [
  { big: "24/7", title: "Disponibilité", text: "Un interlocuteur dédié, joignable jour et nuit pendant tout le séjour." },
  { big: "31", title: "Régions", text: "Du littoral aux savanes du Nord, nous intervenons partout dans le pays." },
  { big: "∞", title: "Sur-mesure", text: "Aucun forfait imposé : chaque séjour est construit pour vous." },
  { big: "0", title: "Compromis", text: "Discrétion absolue, partenaires triés sur le volet, qualité contrôlée." },
];

export default function Maison() {
  return (
    <section id="maison" className="maison" data-scene={9}>
      <div className="kicker">La Maison</div>
      <h2>
        Akwaba.
        <br />
        <em>Bienvenue chez vous.</em>
      </h2>
      <p className="lead">
        Une équipe ivoirienne, un réseau de partenaires dans tout le pays, et une seule promesse : que votre séjour soit
        à la hauteur de la Côte d'Ivoire.
      </p>

      <div className="values">
        {VALUES.map((v) => (
          <div key={v.title}>
            <b>{v.big}</b>
            <h5>{v.title}</h5>
            <p>{v.text}</p>
          </div>
        ))}
      </div>

      <div className="btns">
        <a className="btn" href="#composer">Composer mon séjour</a>
      </div>
    </section>
  );
}
