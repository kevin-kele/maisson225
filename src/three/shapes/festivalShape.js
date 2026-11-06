/**
 * three/shapes/festivalShape.js
 * -----------------------------------------------------------------------------
 * Scène 6 (Culture) — Anneaux inclinés aux couleurs du drapeau
 * (comme des tambours qui vibrent), feux d'artifice et masque stylisé au centre.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

export function festivalShape(count) {
  return makeTarget(count, (push) => {
    // 7 anneaux de plus en plus grands, chacun incliné différemment
    const flag = [COLORS.orange, COLORS.white, COLORS.green];
    for (let r = 0; r < 7; r++) {
      const radius = 0.6 + r * 0.38;
      const tilt = r * 0.5;
      const color = flag[r % 3];
      for (let s = 0; s < 900; s++) {
        const a = rnd(0, Math.PI * 2);
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        push(x, y * Math.cos(tilt), y * Math.sin(tilt), mix(color, COLORS.gold, 0.25 + Math.random() * 0.2));
      }
    }

    // 5 feux d'artifice : 26 traînées qui partent du centre et retombent
    const bursts = [
      [-3, 1.6, -1, COLORS.orange],
      [3.2, 1.3, -1.5, COLORS.green],
      [0, 2.4, -2.5, COLORS.gold],
      [-2.4, -1.4, -1.2, COLORS.white],
      [2.6, -1.6, -0.8, COLORS.gold],
    ];
    bursts.forEach(([x, y, z, c]) => {
      for (let k = 0; k < 26; k++) {
        const u = rnd(-1, 1);
        const a = rnd(0, Math.PI * 2);
        const r = Math.sqrt(1 - u * u);
        const dir = [r * Math.cos(a), u, r * Math.sin(a)];
        for (let s = 0; s < 38; s++) {
          const t = s / 38;
          const len = 0.95 * t;
          push(x + dir[0] * len, y + dir[1] * len - t * t * 0.25, z + dir[2] * len, mix(c, COLORS.white, 1 - t));
        }
      }
    });

    // Masque stylisé : ovale doré plein au centre
    for (let s = 0; s < 1500; s++) {
      const a = rnd(0, Math.PI * 2);
      const r = Math.sqrt(Math.random());
      push(Math.cos(a) * 0.42 * r, Math.sin(a) * 0.62 * r, 0.05, mix(COLORS.gold, COLORS.amber, r));
    }
  });
}
