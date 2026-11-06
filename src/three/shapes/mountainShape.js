/**
 * three/shapes/mountainShape.js
 * -----------------------------------------------------------------------------
 * Scène 5 (Nature) — Relief de l'Ouest montagneux (pic façon Dent de Man),
 * cascade, bassin, forêt de petits arbres et pont de lianes.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

const GROUND = -1.4;

/** Hauteur du terrain en (x, z) : somme de "collines" gaussiennes + petit relief. */
const height = (x, z) => {
  let h = 1.9 * Math.exp(-((x - 0.6) ** 2 / 0.35 + (z + 0.5) ** 2 / 0.5)); // pic principal
  h += 1.1 * Math.exp(-((x + 1.8) ** 2 / 1.2 + (z + 0.2) ** 2 / 0.9));      // massif gauche
  h += 0.8 * Math.exp(-((x - 2.8) ** 2 / 1.4 + (z + 1) ** 2 / 1));          // massif droit
  h += Math.sin(x * 2.1) * Math.cos(z * 1.7) * 0.08;                        // rugosité
  return h;
};

export function mountainShape(count) {
  return makeTarget(count, (push) => {
    // Terrain en grille ; sommets plus clairs (roche), bas plus verts
    const cols = 140;
    const rows = Math.floor((count * 0.55) / cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols - 0.5) * 9;
        const z = (r / rows - 0.5) * 5;
        const h = height(x, z);
        push(x + gauss() * 0.01, h + GROUND, z, mix(COLORS.green, h > 1.2 ? COLORS.ivory : COLORS.gold, Math.min(1, h / 1.9) * 0.7));
      }
    }

    // Cascade : filet d'eau qui descend du flanc
    for (let s = 0; s < 1600; s++) {
      const t = Math.random();
      push(1.15 + gauss() * 0.05, GROUND + height(1.15, 0.2) * (1 - t) - 0.05 * t, 0.25 + t * 0.25 + gauss() * 0.03, mix(COLORS.white, COLORS.turquoise, t));
    }
    // Bassin au pied de la cascade
    for (let s = 0; s < 500; s++) {
      const a = rnd(0, Math.PI * 2);
      const r = Math.sqrt(Math.random()) * 0.5;
      push(1.15 + Math.cos(a) * r, GROUND - 0.02, 0.6 + Math.sin(a) * r * 0.6, COLORS.turquoise);
    }

    // Forêt : 70 arbres coniques au premier plan
    for (let k = 0; k < 70; k++) {
      const x = rnd(-4.4, 4.4);
      const z = rnd(0.8, 2.5);
      const y0 = height(x, z) + GROUND;
      const treeH = rnd(0.35, 0.7);
      for (let s = 0; s < 40; s++) {
        const t = Math.random();
        const r = (1 - t) * treeH * 0.35;
        const a = rnd(0, Math.PI * 2);
        push(x + Math.cos(a) * r, y0 + t * treeH, z + Math.sin(a) * r, mix(COLORS.leaf, COLORS.green, Math.random()));
      }
    }

    // Pont de lianes suspendu
    for (let s = 0; s < 400; s++) {
      const t = s / 400;
      push(-1 + t * 1.4, -0.6 - Math.sin(t * Math.PI) * 0.3, 1.0, COLORS.gold);
    }
  });
}
