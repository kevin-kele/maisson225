/**
 * three/shapes/mapShape.js
 * -----------------------------------------------------------------------------
 * Scène 0 — Carte de la Côte d'Ivoire en particules.
 * Contour doré, intérieur dégradé (vert au sud forestier → orange au nord
 * savane), océan bleu et colonnes de lumière au-dessus des grandes villes.
 * La carte est posée à plat (plan XZ) puis inclinée par la caméra.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix, inPolygon } from "../utils/math.js";
import { COLORS } from "../palette.js";
import { CI_OUTLINE, CITIES } from "../../data/geo.js";

// Échelle et centrage : longitude → x, latitude → z
const SCALE = 0.8;
const toX = (lon) => (lon + 5.55) * SCALE;
const toZ = (lat) => -(lat - 7.45) * SCALE;

export function mapShape(count) {
  return makeTarget(count, (push, used) => {
    // Contour du pays : 60 points sur chaque segment
    for (let k = 0; k < CI_OUTLINE.length; k++) {
      const a = CI_OUTLINE[k];
      const b = CI_OUTLINE[(k + 1) % CI_OUTLINE.length];
      for (let s = 0; s < 60; s++) {
        const t = s / 60;
        push(toX(a[0] + (b[0] - a[0]) * t) + gauss() * 0.01, 0.02, toZ(a[1] + (b[1] - a[1]) * t) + gauss() * 0.01, COLORS.gold);
      }
    }

    // Colonnes de lumière + halo au sol pour chaque ville
    CITIES.forEach(([, lon, lat, height]) => {
      const x = toX(lon);
      const z = toZ(lat);
      const h = height * 0.7;
      for (let s = 0; s < Math.round(220 * height); s++) {
        const y = Math.pow(Math.random(), 1.6) * h; // plus dense en bas
        push(x + gauss() * 0.018, y, z + gauss() * 0.018, mix(COLORS.white, COLORS.gold, y / h));
      }
      for (let s = 0; s < 120; s++) {
        const r = Math.sqrt(Math.random()) * 0.22;
        const a = rnd(0, Math.PI * 2);
        push(x + Math.cos(a) * r, 0.01, z + Math.sin(a) * r, COLORS.ivory);
      }
    });

    // Remplissage du pays jusqu'à 62 % des particules
    const limit = Math.floor(count * 0.62);
    while (used() < limit) {
      const lon = rnd(-8.7, -2.5);
      const lat = rnd(4.3, 10.6);
      if (!inPolygon(lon, lat, CI_OUTLINE)) continue;
      const north = (lat - 4.3) / 6.3; // 0 au sud, 1 au nord
      push(toX(lon), gauss() * 0.015, toZ(lat), mix(COLORS.green, COLORS.orange, north));
    }

    // Golfe de Guinée sous la côte
    for (let s = 0; s < 1400; s++) {
      const lon = rnd(-8.6, -2.4);
      const lat = rnd(3.2, 4.9);
      if (inPolygon(lon, lat, CI_OUTLINE)) continue;
      push(toX(lon), -0.02, toZ(lat), mix(COLORS.blue, COLORS.turquoise, Math.random() * 0.5));
    }
  });
}
