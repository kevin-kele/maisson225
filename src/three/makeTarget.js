/**
 * three/makeTarget.js
 * -----------------------------------------------------------------------------
 * Fabrique une "cible" : les positions et couleurs que les particules
 * doivent atteindre pour dessiner une forme.
 *
 * Chaque forme (carte, globe, vague…) appelle makeTarget avec une fonction
 * `fill(push, count)` qui ajoute des points un par un via push(x, y, z, couleur).
 */
import { rnd, mix } from "./utils/math.js";
import { COLORS } from "./palette.js";

/**
 * @param {number} count  Nombre total de particules
 * @param {(push: Function, used: Function) => void} fill  Dessine la forme
 * @returns {{ positions: Float32Array, colors: Float32Array }}
 */
export function makeTarget(count, fill) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  let i = 0;

  // Ajoute un point ; renvoie false quand toutes les particules sont utilisées
  const push = (x, y, z, c) => {
    if (i >= count) return false;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    colors[i * 3] = c[0];
    colors[i * 3 + 1] = c[1];
    colors[i * 3 + 2] = c[2];
    i++;
    return true;
  };

  // Nombre de points déjà placés (utile pour remplir "jusqu'à X %")
  const used = () => i;

  // 1) La forme dessine ses points
  fill(push, used);

  // 2) Les particules restantes deviennent une poussière dorée lointaine
  while (i < count) {
    const r = rnd(5, 9);
    const theta = rnd(0, Math.PI * 2);
    const phi = Math.acos(rnd(-1, 1));
    push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi) * 0.6,
      r * Math.sin(phi) * Math.sin(theta) - 2,
      mix(COLORS.gold, COLORS.ivory, Math.random())
    );
  }

  // 3) Mélange aléatoire de l'ordre des points : chaque particule part
  //    vers un endroit différent → transitions organiques entre les formes
  for (let k = count - 1; k > 0; k--) {
    const j = (Math.random() * (k + 1)) | 0;
    for (let a = 0; a < 3; a++) {
      let tmp = positions[k * 3 + a];
      positions[k * 3 + a] = positions[j * 3 + a];
      positions[j * 3 + a] = tmp;
      tmp = colors[k * 3 + a];
      colors[k * 3 + a] = colors[j * 3 + a];
      colors[j * 3 + a] = tmp;
    }
  }

  return { positions, colors };
}
