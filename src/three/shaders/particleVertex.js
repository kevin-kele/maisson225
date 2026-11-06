/**
 * three/shaders/particleVertex.js
 * -----------------------------------------------------------------------------
 * Vertex shader (GLSL) des particules, exécuté par la carte graphique
 * pour chaque particule à chaque image.
 *  - ajoute une ondulation (uWave) pour l'eau
 *  - ajoute un léger tremblement vivant
 *  - calcule la taille du point selon la distance (perspective)
 *  - fait scintiller chaque particule
 */
export const particleVertex = /* glsl */ `
  attribute vec3 aColor;   // couleur de la particule
  attribute float aScale;  // taille relative (quelques grosses "étoiles")

  uniform float uTime;     // temps écoulé (secondes)
  uniform float uWave;     // intensité de l'ondulation
  uniform float uSize;     // taille de base
  uniform float uPR;       // densité de pixels de l'écran

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;

    // Ondulation type vague
    p.y += uWave * (sin(p.x * 1.1 + uTime * 1.3) * 0.22 + cos(p.z * 1.7 + uTime * 1.1) * 0.14);

    // Micro-mouvement pour donner de la vie
    p += vec3(
      sin(uTime * 0.7 + position.y * 9.0),
      cos(uTime * 0.6 + position.x * 8.0),
      sin(uTime * 0.5 + position.z * 7.0)
    ) * 0.012;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Scintillement propre à chaque particule
    float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + position.x * 31.0 + position.z * 17.0);

    // Plus la particule est loin, plus elle est petite
    gl_PointSize = uSize * aScale * uPR * (1.0 / -mvPosition.z) * twinkle;

    vColor = aColor;
    vAlpha = twinkle;
  }
`;
