/**
 * App.jsx
 * -----------------------------------------------------------------------------
 * Composant racine. Il assemble toutes les sections du site et fait le lien
 * entre le défilement de la page (quel chapitre est visible) et la scène 3D
 * (quelle forme les particules doivent prendre).
 */
import { useEffect, useState } from "react";

// Données
import { CHAPTERS, EXTRA_SECTIONS } from "./data/chapters.js";
import { PLACES } from "./data/places.js";

// Hooks personnalisés
import useActiveScene from "./hooks/useActiveScene.js";
import useScrollProgress from "./hooks/useScrollProgress.js";

// Composants
import Scene3D from "./components/Scene3D/Scene3D.jsx";
import Gate from "./components/Gate/Gate.jsx";
import Header from "./components/Header/Header.jsx";
import ChapterRail from "./components/ChapterRail/ChapterRail.jsx";
import ProgressBar from "./components/ProgressBar/ProgressBar.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import Chapter from "./components/Chapter/Chapter.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import Composer from "./components/Composer/Composer.jsx";
import Maison from "./components/Maison/Maison.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Liste complète des sections (chapitres + configurateur + maison),
// dans l'ordre de la page. Sert au rail latéral et à la scène 3D.
const ALL_SECTIONS = [...CHAPTERS, ...EXTRA_SECTIONS];

// Côté où placer la forme 3D pour chaque section (à l'opposé du texte).
// Calculé une seule fois, en dehors du composant.
const SIDES = ALL_SECTIONS.map((s) => s.side);

export default function App() {
  // true une fois que le visiteur a cliqué sur "Entrer"
  const [entered, setEntered] = useState(false);
  // true quand la scène 3D a fini de préparer la première forme
  const [ready3D, setReady3D] = useState(false);

  // Index de la section visible + sections déjà vues (pour les animations)
  const { active, seen } = useActiveScene();
  // Progression du défilement (0 → 1) + page défilée ou non
  const { progress, scrolled } = useScrollProgress();

  // Bloque le défilement tant que la porte d'entrée est affichée
  useEffect(() => {
    document.body.classList.toggle("locked", !entered);
  }, [entered]);

  return (
    <>
      {/* Couches de fond : dégradés, canvas 3D, vignettage, grain */}
      <div className="bg" />
      <Scene3D activeScene={active} sides={SIDES} onReady={() => setReady3D(true)} />
      <div className="vignette" />
      <div className="grain" />

      {/* Éléments d'interface fixes */}
      <ProgressBar progress={progress} />
      <Cursor />
      <Gate entered={entered} ready={ready3D} onEnter={() => setEntered(true)} />
      <Header active={active} scrolled={scrolled} chapters={CHAPTERS} />
      <ChapterRail sections={ALL_SECTIONS} active={active} />

      {/* Contenu qui défile */}
      <main>
        {CHAPTERS.map((chapter) => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            // le héros n'apparaît qu'après le clic sur "Entrer"
            isIn={chapter.hero ? entered : seen.has(chapter.scene)}
          />
        ))}
      </main>

      <Marquee places={PLACES} />
      <Composer />
      <Maison />
      <Footer />
    </>
  );
}
