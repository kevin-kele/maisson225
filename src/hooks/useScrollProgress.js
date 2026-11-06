/**
 * hooks/useScrollProgress.js
 * -----------------------------------------------------------------------------
 * Hook qui renvoie :
 *   - progress : avancement du défilement entre 0 (haut) et 1 (bas de page)
 *   - scrolled : true dès que la page a un peu défilé (pour le menu du haut)
 */
import { useEffect, useState } from "react";

export default function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrolled: false });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight || 1;
      setState({ progress: el.scrollTop / max, scrolled: el.scrollTop > 40 });
    };
    onScroll();
    // passive: true = n'empêche jamais le défilement d'être fluide
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
