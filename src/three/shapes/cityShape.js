/**
 * three/shapes/cityShape.js
 * -----------------------------------------------------------------------------
 * Scène 3 (Abidjan) — Les tours du Plateau au bord de la lagune Ébrié :
 * immeubles avec fenêtres allumées, arêtes lumineuses, une pyramide,
 * reflets dans l'eau et un pont.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

const GROUND = -1.2; // altitude du sol

export function cityShape(count) {
  return makeTarget(count, (push) => {
    // Génération des immeubles : plus hauts au centre (quartier d'affaires)
    const buildings = [];
    for (let k = 0; k < 24; k++) {
      const x = (k / 23 - 0.5) * 5.6 + gauss() * 0.12;
      const center = Math.exp(-(x * x) / 2.2);
      buildings.push({ x, z: gauss() * 0.5, w: rnd(0.22, 0.4), d: rnd(0.22, 0.4), h: 0.35 + center * rnd(1.2, 2.8) });
    }
    buildings.push({ x: -0.75, z: 0.55, w: 0.75, d: 0.75, h: 1.3, pyramid: true });

    const perBuilding = Math.floor((count * 0.5) / buildings.length);

    buildings.forEach((b) => {
      // Faces latérales : points répartis sur les 4 côtés
      for (let s = 0; s < perBuilding; s++) {
        const y = Math.random() * b.h;
        const shrink = b.pyramid ? 1 - y / b.h : 1; // la pyramide se rétrécit
        const face = (Math.random() * 4) | 0;
        const u = rnd(-0.5, 0.5);
        let x = b.x;
        let z = b.z;
        if (face === 0) { x += u * b.w * shrink; z += (b.d / 2) * shrink; }
        else if (face === 1) { x += u * b.w * shrink; z -= (b.d / 2) * shrink; }
        else if (face === 2) { x += (b.w / 2) * shrink; z += u * b.d * shrink; }
        else { x -= (b.w / 2) * shrink; z += u * b.d * shrink; }
        // Une ligne sur deux = fenêtres allumées
        const lit = Math.floor(y * 16) % 2 === 0 && Math.abs((u * 8) % 1) < 0.5;
        push(x, y + GROUND, z, lit ? COLORS.amber : mix(COLORS.gold, COLORS.blue, 0.6));
      }

      // Arêtes verticales lumineuses aux 4 coins
      [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([cx, cz]) => {
        for (let s = 0; s < 45; s++) {
          const y = (s / 45) * b.h;
          const shrink = b.pyramid ? 1 - y / b.h : 1;
          push(b.x + (cx * b.w) / 2 * shrink, y + GROUND, b.z + (cz * b.d) / 2 * shrink, COLORS.ivory);
        }
      });

      // Toit doré
      if (!b.pyramid) for (let s = 0; s < 50; s++) push(b.x + rnd(-0.5, 0.5) * b.w, b.h + GROUND, b.z + rnd(-0.5, 0.5) * b.d, COLORS.gold);

      // Antenne avec feu orange sur les plus hautes tours
      if (b.h > 2.2) for (let s = 0; s < 30; s++) push(b.x, b.h + GROUND + (s / 30) * 0.35, b.z, s > 26 ? COLORS.orange : COLORS.ivory);
    });

    // Reflets des tours dans la lagune
    for (let s = 0; s < 2600; s++) {
      const b = buildings[(Math.random() * buildings.length) | 0];
      push(b.x + gauss() * b.w * 0.25, GROUND - 0.05 - Math.random() * b.h * 0.45, b.z + 1.6 + Math.random() * 0.2, mix(COLORS.amber, COLORS.blue, 0.3 + Math.random() * 0.6));
    }

    // Surface de la lagune
    for (let s = 0; s < 2200; s++) push(rnd(-6, 6), GROUND - 0.08, rnd(1.2, 3.4), mix(COLORS.blue, COLORS.turquoise, Math.random() * 0.4));

    // Pont en arc + piliers
    for (let s = 0; s < 900; s++) {
      const t = rnd(-1, 1);
      push(t * 4.2, -1.0 + Math.cos(t * 1.57) * 0.22, 1.25, COLORS.gold);
    }
    for (let k = -8; k <= 8; k++) for (let s = 0; s < 20; s++) push(k * 0.5, -1.0 + Math.cos((k / 8) * 1.57) * 0.22, 1.25, COLORS.ivory);
  });
}
