/**
 * three/shaders/particleFragment.js
 * -----------------------------------------------------------------------------
 * Fragment shader (GLSL) : dessine chaque particule comme un petit disque
 * lumineux aux bords doux (au lieu d'un carré).
 */
export const particleFragment = /* glsl */ `
  uniform float uOpacity;  // opacité globale de la scène
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Distance au centre du point (0 au centre, 0.5 au bord)
    float d = length(gl_PointCoord - 0.5);
    // Disque doux : opaque au centre, transparent au bord
    float alpha = smoothstep(0.5, 0.05, d);
    // Couleurs atténuées car les particules s'additionnent (mélange additif)
    gl_FragColor = vec4(vColor * 0.62, alpha * vAlpha * uOpacity);
  }
`;
