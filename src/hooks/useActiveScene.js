/**
 * hooks/useActiveScene.js
 * -----------------------------------------------------------------------------
 * Hook qui surveille toutes les sections marquées data-scene="N" et indique :
 *   - active : le numéro de la section actuellement visible à l'écran
 *   - seen   : l'ensemble des sections déjà vues (pour lancer leurs animations)
 * Utilise IntersectionObserver (le navigateur prévient quand une section
 * entre dans l'écran, sans calcul lourd au défilement).
 */
import { useEffect, useState } from "react";

export default function useActiveScene() {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0]));

  useEffect(() => {
    const sections = document.querySelectorAll("[data-scene]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.scene);
          setActive(index);
          // On crée un nouveau Set pour que React détecte le changement
          setSeen((prev) => (prev.has(index) ? prev : new Set(prev).add(index)));
        });
      },
      // La section compte comme "visible" quand 35 % d'elle est à l'écran
      { threshold: 0.35 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect(); // nettoyage quand le composant disparaît
  }, []);

  return { active, seen };
}
