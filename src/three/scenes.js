/**
 * three/scenes.js
 * -----------------------------------------------------------------------------
 * Mise en scène de chaque chapitre : quelle forme afficher et comment.
 * L'index dans ce tableau = le champ "scene" des sections (data/chapters.js).
 *
 *   make  : fonction qui construit la forme
 *   rx/ry : rotation de base (radians) sur les axes X et Y
 *   spin  : vitesse de rotation continue (0 = immobile)
 *   wave  : force de l'ondulation (eau, vent)
 *   y / z : décalage vertical / profondeur
 *   op    : opacité globale (plus faible derrière les formulaires)
 *   sc    : échelle
 */
import {
  mapShape, globeShape, waveShape, cityShape, domeShape,
  mountainShape, festivalShape, gemShape, textShape,
} from "./shapes/index.js";

export const SCENES = [
  /* 0 Accueil      */ { make: mapShape,      rx: 0.62, ry: 0,    spin: 0,    wave: 0,    y: -0.2, z: 0,  op: 1,    sc: 1 },
  /* 1 Voyages      */ { make: globeShape,    rx: 0.25, ry: -1.2, spin: 0.08, wave: 0,    y: 0,    z: 0,  op: 1,    sc: 1 },
  /* 2 Littoral     */ { make: waveShape,     rx: 0.28, ry: 0,    spin: 0,    wave: 1,    y: 0,    z: 0,  op: 1,    sc: 0.95 },
  /* 3 Abidjan      */ { make: cityShape,     rx: 0.18, ry: 0.25, spin: 0,    wave: 0,    y: 0.1,  z: 0,  op: 1,    sc: 1 },
  /* 4 Patrimoine   */ { make: domeShape,     rx: 0.3,  ry: 0.4,  spin: 0.06, wave: 0,    y: -1.1, z: 0,  op: 1,    sc: 0.82 },
  /* 5 Nature       */ { make: mountainShape, rx: 0.38, ry: -0.2, spin: 0,    wave: 0.12, y: 0.3,  z: 0,  op: 1,    sc: 0.95 },
  /* 6 Culture      */ { make: festivalShape, rx: 0.1,  ry: 0,    spin: 0.1,  wave: 0,    y: 0,    z: 0,  op: 1,    sc: 1 },
  /* 7 Sur-mesure   */ { make: gemShape,      rx: 0.35, ry: 0,    spin: 0.18, wave: 0,    y: 0.2,  z: 0,  op: 1,    sc: 1 },
  /* 8 Configurateur*/ { make: globeShape,    rx: 0.25, ry: -1.2, spin: 0.05, wave: 0,    y: 0,    z: -3, op: 0.3,  sc: 1.2 },
  /* 9 La Maison    */ { make: textShape("225", 360), rx: 0, ry: 0, spin: 0,  wave: 0.05, y: 1.0,  z: -2, op: 0.45, sc: 1.9 },
];
