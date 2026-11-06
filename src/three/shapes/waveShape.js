/**
 * three/shapes/waveShape.js
 * -----------------------------------------------------------------------------
 * Scène 2 (Littoral) — Océan, plage, soleil couchant et palmiers.
 * L'ondulation de l'eau est animée dans le shader (uniform uWave).
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

export function waveShape(count) {
  return makeTarget(count, (push) => {
    // Grille d'eau : 150 colonnes, nombre de lignes adapté au total
    const width = 11;
    const depth = 6;
    const cols = 150;
    const rows = Math.floor((count * 0.72) / cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols - 0.5) * width + gauss() * 0.01;
        const z = (r / rows - 0.5) * depth - 0.5;
        const y = Math.sin(x * 0.9 + z * 0.6) * 0.22 + Math.cos(z * 1.6) * 0.12;
        const foam = Math.pow(Math.max(0, y + 0.3) / 0.6, 3) * 0.6; // écume sur les crêtes
        push(x, y - 0.6, z, mix(mix(COLORS.blue, COLORS.turquoise, r / rows), COLORS.ivory, foam));
      }
    }

    // Bande de sable au premier plan
    for (let s = 0; s < 1200; s++) push(rnd(-5.5, 5.5), -0.55 + rnd(0, 0.05), rnd(2.5, 3.1), COLORS.sand);

    // Soleil couchant (disque) à l'horizon
    for (let s = 0; s < 1200; s++) {
      const a = rnd(0, Math.PI * 2);
      const r = Math.sqrt(Math.random()) * 0.75;
      push(2.6 + Math.cos(a) * r, 1.9 + Math.sin(a) * r, -3.4, mix(COLORS.amber, COLORS.orange, r));
    }

    // Trois palmiers : tronc courbé + 7 palmes retombantes
    [[-3.6, 2.6], [-2.9, 2.9], [4.2, 2.7]].forEach(([px, pz], k) => {
      const h = 2.1 + k * 0.2;
      for (let s = 0; s < 160; s++) {
        const t = s / 160;
        push(px + Math.sin(t * 1.4) * 0.35, -0.55 + t * h, pz, mix(COLORS.trunk, COLORS.sand, t * 0.4));
      }
      const top = [px + Math.sin(1.4) * 0.35, -0.55 + h, pz];
      for (let f = 0; f < 7; f++) {
        const a = (f / 7) * Math.PI * 2;
        for (let s = 0; s < 60; s++) {
          const t = s / 60;
          push(top[0] + Math.cos(a) * t, top[1] + Math.sin(t * 2.4) * 0.35 - t * t * 0.7, top[2] + Math.sin(a) * t * 0.6, COLORS.leaf);
        }
      }
    });
  });
}
