/**
 * components/Cursor/Cursor.jsx
 * -----------------------------------------------------------------------------
 * Curseur personnalisé : un cercle doré qui suit la souris avec un léger
 * retard, et grossit au survol des liens et boutons. (Masqué sur mobile.)
 * L'animation se fait directement sur l'élément DOM (sans re-rendu React)
 * pour rester fluide.
 */
import { useEffect, useRef } from "react";
import "./Cursor.css";

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let x = -100, y = -100;   // position affichée
    let tx = -100, ty = -100; // position de la souris
    let raf;

    // Mémorise la position de la souris
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };

    // Agrandit le cercle quand la souris passe sur un élément cliquable
    const onOver = (e) => {
      el.classList.toggle("big", !!e.target.closest("a, button, .chip"));
    };

    // Le cercle rattrape la souris de 20 % à chaque image
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" />;
}
