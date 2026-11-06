/**
 * components/Scene3D/Scene3D.jsx
 * -----------------------------------------------------------------------------
 * Pont entre React et le moteur 3D (three/ParticleWorld.js).
 * - crée le monde 3D au montage, le détruit au démontage
 * - transmet la scène active à chaque changement de chapitre
 */
import { useEffect, useRef } from "react";
import ParticleWorld, { isWebGLAvailable } from "../../three/ParticleWorld.js";
import "./Scene3D.css";

/**
 * @param {number} activeScene  Numéro de la section visible
 * @param {string[]} sides  Côté du texte pour chaque section
 * @param {Function} onReady  Appelée quand la 3D est prête
 */
export default function Scene3D({ activeScene, sides, onReady }) {
  const canvasRef = useRef(null);
  const worldRef = useRef(null);
  // On garde onReady dans une ref pour ne pas recréer le monde à chaque rendu
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // Création / destruction du monde 3D (une seule fois)
  useEffect(() => {
    if (!isWebGLAvailable()) {
      // Navigateur sans WebGL : le site reste utilisable, sans la 3D
      onReadyRef.current?.();
      return undefined;
    }
    const world = new ParticleWorld(canvasRef.current, { onReady: () => onReadyRef.current?.() });
    worldRef.current = world;
    return () => {
      world.dispose();
      worldRef.current = null;
    };
  }, []);

  // Changement de chapitre → nouvelle forme
  useEffect(() => {
    worldRef.current?.setScene(activeScene, sides[activeScene]);
  }, [activeScene, sides]);

  return <canvas ref={canvasRef} className="scene3d" aria-hidden="true" />;
}
