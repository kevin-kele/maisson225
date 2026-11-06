/**
 * three/utils/math.js
 * -----------------------------------------------------------------------------
 * Petites fonctions mathématiques réutilisées par toutes les formes 3D.
 */

/** Nombre aléatoire entre a et b (par défaut entre 0 et 1). */
export const rnd = (a = 0, b = 1) => a + Math.random() * (b - a);

/**
 * Nombre aléatoire suivant une loi normale (moyenne 0, écart-type 1).
 * Utile pour un léger "flou" naturel autour d'une position.
 */
export const gauss = () => {
  let u = 0;
  let v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/** Mélange deux couleurs [r,g,b] : t = 0 → couleur a, t = 1 → couleur b. */
export const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Teste si un point (x, y) est à l'intérieur d'un polygone [[x,y], …]
 * (algorithme du "lancer de rayon").
 */
export const inPolygon = (x, y, polygon) => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
};

/** Convertit une latitude/longitude en position [x, y, z] sur une sphère de rayon r. */
export const latLonToXYZ = (lat, lon, r) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
};

/** Rapproche doucement une valeur de sa cible (interpolation linéaire). */
export const lerp = (current, target, factor) => current + (target - current) * factor;
