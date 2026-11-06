/**
 * three/shapes/domeShape.js
 * -----------------------------------------------------------------------------
 * Scène 4 (Patrimoine) — Silhouette inspirée de la Basilique de Yamoussoukro :
 * grand dôme nervuré, tambour, colonnade circulaire, lanterne et croix.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

export function domeShape(count) {
  return makeTarget(count, (push) => {
    const R = 1.75;   // rayon du dôme
    const base = 0.25; // hauteur du socle

    // Coupole : demi-sphère légèrement étirée en hauteur
    for (let s = 0; s < count * 0.3; s++) {
      const u = Math.random();
      const a = rnd(0, Math.PI * 2);
      const r = Math.sqrt(1 - u * u);
      push(R * r * Math.cos(a), base + 1.1 + R * u * 1.05, R * r * Math.sin(a), mix(COLORS.ivory, COLORS.turquoise, 0.18 + Math.random() * 0.1));
    }

    // 24 nervures dorées du sommet jusqu'à la base de la coupole
    for (let m = 0; m < 24; m++) {
      const a = (m / 24) * Math.PI * 2;
      for (let s = 0; s < 70; s++) {
        const t = ((s / 70) * Math.PI) / 2;
        push(R * 1.01 * Math.cos(t) * Math.cos(a), base + 1.1 + R * 1.06 * Math.sin(t), R * 1.01 * Math.cos(t) * Math.sin(a), COLORS.gold);
      }
    }

    // Tambour (cylindre sous la coupole)
    for (let s = 0; s < 2200; s++) {
      const a = rnd(0, Math.PI * 2);
      push(Math.cos(a) * R, base + rnd(0.6, 1.1), Math.sin(a) * R, COLORS.ivory);
    }

    // Colonnade : 36 colonnes + entablement doré
    for (let c = 0; c < 36; c++) {
      const a = (c / 36) * Math.PI * 2;
      for (let s = 0; s < 50; s++) push(Math.cos(a) * 2.3, base + (s / 50) * 1.1, Math.sin(a) * 2.3, COLORS.ivory);
    }
    for (let s = 0; s < 1200; s++) {
      const a = rnd(0, Math.PI * 2);
      push(Math.cos(a) * 2.3, base + 1.12, Math.sin(a) * 2.3, COLORS.gold);
    }

    // Lanterne au sommet + croix
    for (let s = 0; s < 300; s++) {
      const a = rnd(0, Math.PI * 2);
      push(Math.cos(a) * 0.25, base + 2.95 + rnd(0, 0.4), Math.sin(a) * 0.25, COLORS.gold);
    }
    for (let s = 0; s < 120; s++) push(0, base + 3.35 + (s / 120) * 0.5, 0, COLORS.white);
    for (let s = 0; s < 60; s++) push(-0.15 + (s / 60) * 0.3, base + 3.7, 0, COLORS.white);

    // Socle circulaire
    for (let s = 0; s < 1800; s++) {
      const a = rnd(0, Math.PI * 2);
      const r = rnd(0, 2.7);
      push(Math.cos(a) * r, base, Math.sin(a) * r, mix(COLORS.gold, COLORS.sand, 0.5));
    }

    // Parvis devant l'édifice
    for (let s = 0; s < 2200; s++) push(rnd(-4, 4), 0, rnd(1, 4), mix(COLORS.sand, COLORS.gold, Math.random() * 0.3));
  });
}
