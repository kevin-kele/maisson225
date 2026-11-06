/**
 * three/shapes/gemShape.js
 * -----------------------------------------------------------------------------
 * Scène 7 (Sur-mesure) — Diamant taillé : couronne, table, pavillon,
 * arêtes blanches et halo doré. Symbole du service d'exception.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

export function gemShape(count) {
  return makeTarget(count, (push) => {
    const facets = 10;     // nombre de facettes autour
    const girdleR = 2.0;   // rayon de la ceinture
    const crownH = 0.9;    // hauteur de la couronne
    const pavilionH = 2.1; // profondeur du pavillon
    const tableR = 1.1;    // rayon de la table (dessus plat)

    // Remplit un triangle (A, B, C) de points aléatoires
    const triangle = (A, B, Cc, n, color) => {
      for (let s = 0; s < n; s++) {
        let u = Math.random();
        let v = Math.random();
        if (u + v > 1) { u = 1 - u; v = 1 - v; }
        push(
          A[0] + (B[0] - A[0]) * u + (Cc[0] - A[0]) * v,
          A[1] + (B[1] - A[1]) * u + (Cc[1] - A[1]) * v,
          A[2] + (B[2] - A[2]) * u + (Cc[2] - A[2]) * v,
          color()
        );
      }
    };
    // Trace une arête lumineuse entre A et B
    const edge = (A, B, n) => {
      for (let s = 0; s < n; s++) {
        const t = s / n;
        push(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t, COLORS.white);
      }
    };

    // Points clés : ceinture (milieu) et table (dessus), décalés d'un demi-pas
    const girdle = [];
    const table = [];
    for (let k = 0; k < facets; k++) {
      const a = (k / facets) * Math.PI * 2;
      girdle.push([Math.cos(a) * girdleR, 0, Math.sin(a) * girdleR]);
      table.push([Math.cos(a + 0.314) * tableR, crownH, Math.sin(a + 0.314) * tableR]);
    }
    const culet = [0, -pavilionH, 0]; // pointe du bas
    const top = [0, crownH, 0];       // centre de la table

    const crownColor = () => mix(COLORS.gold, COLORS.ivory, Math.random() * 0.6);
    const pavilionColor = () => mix(COLORS.gold, COLORS.amber, Math.random() * 0.5);

    for (let k = 0; k < facets; k++) {
      const g1 = girdle[k];
      const g2 = girdle[(k + 1) % facets];
      const t1 = table[k];
      const t0 = table[(k - 1 + facets) % facets];
      triangle(g1, g2, culet, 520, pavilionColor); // pavillon
      triangle(g1, g2, t1, 240, crownColor);       // couronne
      triangle(g1, t0, t1, 160, crownColor);       // couronne (2e facette)
      triangle(top, t0, t1, 120, () => COLORS.ivory); // table
      edge(g1, culet, 90);
      edge(g1, g2, 50);
      edge(g1, t1, 40);
      edge(t0, t1, 30);
    }

    // Halo doré sous le diamant
    for (let s = 0; s < 1800; s++) {
      const a = rnd(0, Math.PI * 2);
      const r = rnd(2.6, 3.4);
      push(Math.cos(a) * r, gauss() * 0.06 - 0.2, Math.sin(a) * r, mix(COLORS.gold, COLORS.ivory, Math.random()));
    }
  });
}
