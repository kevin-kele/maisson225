/**
 * three/shapes/textShape.js
 * -----------------------------------------------------------------------------
 * Scène 9 (La Maison) — Transforme un mot (ex. "225") en particules.
 * Principe : on écrit le mot dans un canvas 2D invisible, on lit les pixels
 * remplis, puis on place une particule sur chacun d'eux.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix } from "../utils/math.js";
import { COLORS } from "../palette.js";

/**
 * Renvoie une fonction de forme (count) => cible, pour le mot donné.
 * @param {string} word  Texte à dessiner
 * @param {number} size  Taille de police en pixels dans le canvas
 */
export function textShape(word, size = 300) {
  return (count) =>
    makeTarget(count, (push) => {
      // 1) Dessin du texte dans un canvas hors écran
      const W = 1400;
      const H = 380;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `500 ${size}px "Cormorant Garamond", Georgia, serif`;
      ctx.fillText(word, W / 2, H / 2);

      // 2) Récupération des pixels opaques (un sur deux pour aller plus vite)
      const data = ctx.getImageData(0, 0, W, H).data;
      const pixels = [];
      for (let y = 0; y < H; y += 2) {
        for (let x = 0; x < W; x += 2) {
          if (data[(y * W + x) * 4 + 3] > 140) pixels.push([x, y]);
        }
      }
      if (!pixels.length) return;

      // 3) Conversion pixels → coordonnées 3D (9 unités de large)
      const scale = 9 / W;
      const n = Math.floor(count * 0.7);
      for (let s = 0; s < n; s++) {
        const p = pixels[(Math.random() * pixels.length) | 0];
        const x = (p[0] - W / 2) * scale + gauss() * 0.008;
        const y = -(p[1] - H / 2) * scale + gauss() * 0.008;
        push(x, y, gauss() * 0.05, mix(COLORS.gold, COLORS.ivory, Math.random() * 0.5 + (y + 1) * 0.15));
      }

      // 4) Trait tricolore (orange → vert) sous le mot
      for (let s = 0; s < 900; s++) {
        const x = rnd(-4.5, 4.5);
        push(x, -1.25 + gauss() * 0.01, 0, mix(COLORS.orange, COLORS.green, (x + 4.5) / 9));
      }
    });
}
