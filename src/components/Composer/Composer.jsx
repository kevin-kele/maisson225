/**
 * components/Composer/Composer.jsx
 * -----------------------------------------------------------------------------
 * Configurateur "Composez votre séjour".
 * Le visiteur coche ses envies et remplit dates / voyageurs / ambiance ;
 * un message de demande se génère automatiquement à droite.
 * Il peut le retoucher, le copier, ou l'envoyer directement sur WhatsApp.
 */
import { useEffect, useMemo, useState } from "react";
import ChipGroup from "./ChipGroup.jsx";
import Toast from "../Toast/Toast.jsx";
import useToast from "../../hooks/useToast.js";
import { COMPOSER_GROUPS, MOODS } from "../../data/composerOptions.js";
import { CONTACT } from "../../config/contact.js";
import { buildMessage, whatsappLink } from "../../utils/buildMessage.js";
import "./Composer.css";

export default function Composer() {
  // --- État du formulaire ---------------------------------------------------
  const [selected, setSelected] = useState(() => new Set()); // options cochées
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [mood, setMood] = useState(MOODS[0]);
  const [text, setText] = useState(""); // message (modifiable à la main)
  const toast = useToast();

  // Coche ou décoche une option (nouveau Set pour déclencher le rendu)
  const toggle = (option) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(option) ? next.delete(option) : next.add(option);
      return next;
    });
  };

  // Message généré à partir des choix
  const generated = useMemo(
    () => buildMessage({ groups: COMPOSER_GROUPS, selected, arrival, departure, travelers, mood }),
    [selected, arrival, departure, travelers, mood]
  );

  // À chaque changement de choix, on remplace le texte par la version générée
  useEffect(() => setText(generated), [generated]);

  // Copie du message dans le presse-papiers (avec repli si refusé)
  const copy = async (e) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.show("Demande copiée ✦");
    } catch {
      const area = e.currentTarget.closest(".summary").querySelector("textarea");
      area.select();
      toast.show("Sélectionnée — copiez avec Ctrl/Cmd + C");
    }
  };

  return (
    <section id="composer" className="composer" data-scene={8}>
      <div className="composer-grid">
        {/* ---------- Colonne gauche : les choix ---------- */}
        <div className="card">
          <div className="num">08</div>
          <div className="kicker">Your journey · Composer</div>
          <h2>
            Composez
            <br />
            <em>votre séjour.</em>
          </h2>
          <p className="lead" style={{ marginBottom: 0 }}>
            Choisissez vos envies, nous préparons le reste. Votre demande est prête à envoyer en un clic.
          </p>

          {COMPOSER_GROUPS.map((g) => (
            <ChipGroup key={g.title} title={g.title} options={g.options} selected={selected} onToggle={toggle} />
          ))}

          {/* Champs : dates, voyageurs, ambiance */}
          <div className="fields">
            <label>
              Arrivée
              <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} />
            </label>
            <label>
              Départ
              <input type="date" value={departure} min={arrival || undefined} onChange={(e) => setDeparture(e.target.value)} />
            </label>
            <label>
              Voyageurs
              <input type="number" min="1" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
            </label>
            <label>
              Ambiance
              <select value={mood} onChange={(e) => setMood(e.target.value)}>
                {MOODS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* ---------- Colonne droite : le récapitulatif ---------- */}
        <aside className="card summary">
          <h3>
            Votre demande <span className="count">{selected.size}</span>
          </h3>
          <p className="sub">Modifiable librement avant envoi.</p>

          <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} aria-label="Votre demande" />

          <div className="summary-actions">
            <a className="btn" href={whatsappLink(CONTACT.whatsapp, text)} target="_blank" rel="noopener noreferrer">
              Envoyer sur WhatsApp
            </a>
            <button type="button" className="btn ghost" onClick={copy}>
              Copier ma demande
            </button>
          </div>

          <p className="note">
            Ou écrivez-nous : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </aside>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
