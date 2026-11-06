/**
 * data/geo.js
 * -----------------------------------------------------------------------------
 * Données géographiques utilisées par la scène 3D.
 */

/**
 * Contour simplifié de la Côte d'Ivoire : liste de points [longitude, latitude].
 * Sert à dessiner la carte en particules et à colorer le pays sur le globe.
 */
export const CI_OUTLINE = [
  [-8.60, 10.47], [-8.03, 10.21], [-7.90, 10.30], [-7.62, 10.15], [-6.85, 10.34], [-6.67, 10.43],
  [-6.49, 10.41], [-6.21, 10.52], [-6.05, 10.10], [-5.82, 10.22], [-5.40, 10.37], [-4.95, 10.15],
  [-4.78, 9.82], [-4.33, 9.61], [-3.98, 9.86], [-3.51, 9.90], [-2.83, 9.64], [-2.56, 8.49],
  [-2.81, 7.95], [-3.03, 7.54], [-3.24, 6.25], [-2.81, 5.39], [-2.86, 5.10], [-3.31, 5.12],
  [-4.01, 5.18], [-4.65, 5.17], [-5.83, 4.99], [-6.53, 4.71], [-7.52, 4.34], [-7.71, 4.36],
  [-7.64, 5.19], [-7.54, 5.31], [-7.57, 5.71], [-7.99, 6.13], [-8.31, 6.19], [-8.60, 6.47],
  [-8.39, 6.91], [-8.49, 7.40], [-8.28, 7.69], [-8.22, 8.12], [-8.30, 8.32], [-7.83, 8.58],
  [-8.08, 9.38], [-8.31, 9.79], [-8.23, 10.13],
];

/**
 * Villes mises en lumière sur la carte : [nom, longitude, latitude, hauteur du faisceau].
 * Plus la hauteur est grande, plus la colonne de lumière est haute.
 */
export const CITIES = [
  ["Abidjan", -4.03, 5.32, 1.9],
  ["Yamoussoukro", -5.28, 6.82, 1.3],
  ["Bouaké", -5.03, 7.69, 1.0],
  ["Korhogo", -5.63, 9.46, 0.9],
  ["Man", -7.55, 7.41, 0.9],
  ["San-Pédro", -6.64, 4.75, 0.8],
  ["Assinie", -3.40, 5.13, 0.7],
  ["Grand-Bassam", -3.74, 5.20, 0.7],
  ["Kong", -4.61, 9.15, 0.6],
  ["Bondoukou", -2.80, 8.04, 0.6],
  ["Sassandra", -6.08, 4.95, 0.55],
  ["Odienné", -7.56, 9.51, 0.55],
];

/** Coordonnées d'Abidjan [latitude, longitude] : point de départ des routes aériennes. */
export const ABIDJAN_LATLON = [5.32, -4.03];

/** Destinations reliées à Abidjan sur le globe : [latitude, longitude]. */
export const FLIGHT_DESTINATIONS = [
  [48.86, 2.35],   // Paris
  [51.5, -0.12],   // Londres
  [40.7, -74.0],   // New York
  [25.2, 55.3],    // Dubaï
  [-26.2, 28.0],   // Johannesburg
  [33.6, -7.6],    // Casablanca
  [6.5, 3.4],      // Lagos
  [14.7, -17.4],   // Dakar
  [5.6, -0.2],     // Accra
  [41.0, 28.9],    // Istanbul
];
