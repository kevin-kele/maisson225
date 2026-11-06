/**
 * vite.config.js
 * -----------------------------------------------------------------------------
 * Configuration de Vite (l'outil qui lance le serveur de développement
 * et compile le projet pour la production).
 * Le plugin React active le JSX et le rechargement à chaud (HMR).
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // "./" = chemins relatifs : le dossier dist/ fonctionne sur n'importe quel hébergeur
  base: "./",
  // Three.js est volumineux : on relève le seuil d'avertissement de taille
  build: { chunkSizeWarningLimit: 900 },
});
