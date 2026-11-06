/**
 * hooks/useToast.js
 * -----------------------------------------------------------------------------
 * Hook pour afficher un petit message temporaire ("Demande copiée ✦").
 * Renvoie le message courant, s'il est visible, et la fonction show().
 */
import { useCallback, useEffect, useRef, useState } from "react";

export default function useToast(duration = 2200) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  // Affiche un message puis le masque après "duration" millisecondes
  const show = useCallback(
    (text) => {
      setMessage(text);
      setVisible(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), duration);
    },
    [duration]
  );

  // Nettoie le minuteur si le composant est démonté
  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, visible, show };
}
