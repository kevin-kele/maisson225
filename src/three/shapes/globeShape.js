/**
 * three/shapes/globeShape.js
 * -----------------------------------------------------------------------------
 * Scène 1 (Voyages) et 8 (Configurateur) — Globe terrestre.
 * La Côte d'Ivoire brille en orange, des arcs dorés relient Abidjan aux
 * grandes capitales, et un anneau orbital entoure la planète.
 */
import { makeTarget } from "../makeTarget.js";
import { rnd, gauss, mix, inPolygon, latLonToXYZ } from "../utils/math.js";
import { COLORS } from "../palette.js";
import { CI_OUTLINE, ABIDJAN_LATLON, FLIGHT_DESTINATIONS } from "../../data/geo.js";

const R = 2.3; // rayon du globe

export function globeShape(count) {
  return makeTarget(count, (push) => {
    // Surface de la sphère (55 % des particules), répartition uniforme
    for (let s = 0; s < count * 0.55; s++) {
      const u = rnd(-1, 1);
      const a = rnd(0, Math.PI * 2);
      const r = Math.sqrt(1 - u * u);
      push(R * r * Math.cos(a), R * u, R * r * Math.sin(a), mix(COLORS.blue, COLORS.ivory, Math.random() * 0.35));
    }

    // Côte d'Ivoire en surbrillance, légèrement au-dessus de la surface
    for (let s = 0; s < 900; s++) {
      const lon = rnd(-8.7, -2.5);
      const lat = rnd(4.3, 10.6);
      if (!inPolygon(lon, lat, CI_OUTLINE)) continue;
      const p = latLonToXYZ(lat, lon, R * 1.01);
      push(p[0], p[1], p[2], COLORS.orange);
    }

    // Routes aériennes : courbes de Bézier quadratiques au-dessus du globe
    const A = latLonToXYZ(ABIDJAN_LATLON[0], ABIDJAN_LATLON[1], R);
    FLIGHT_DESTINATIONS.forEach(([lat, lon]) => {
      const B = latLonToXYZ(lat, lon, R);
      const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2];
      const midLen = Math.hypot(...mid) || 1;
      const dist = Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]);
      const lift = R + dist * 0.45; // plus la route est longue, plus l'arc est haut
      const ctrl = mid.map((v) => (v / midLen) * lift);

      for (let s = 0; s < 380; s++) {
        const t = s / 380;
        const it = 1 - t;
        push(
          it * it * A[0] + 2 * it * t * ctrl[0] + t * t * B[0] + gauss() * 0.006,
          it * it * A[1] + 2 * it * t * ctrl[1] + t * t * B[1] + gauss() * 0.006,
          it * it * A[2] + 2 * it * t * ctrl[2] + t * t * B[2] + gauss() * 0.006,
          mix(COLORS.gold, COLORS.white, Math.abs(t - 0.5) * 2)
        );
      }
      // Petit point lumineux à l'arrivée
      const end = latLonToXYZ(lat, lon, R * 1.02);
      for (let s = 0; s < 40; s++) push(end[0] + gauss() * 0.03, end[1] + gauss() * 0.03, end[2] + gauss() * 0.03, COLORS.gold);
    });

    // Anneau orbital aplati
    for (let s = 0; s < 1200; s++) {
      const a = rnd(0, Math.PI * 2);
      const r = R * 1.55 + gauss() * 0.03;
      push(Math.cos(a) * r, Math.sin(a) * r * 0.12, Math.sin(a) * r, mix(COLORS.gold, COLORS.ivory, Math.random()));
    }
  });
}
