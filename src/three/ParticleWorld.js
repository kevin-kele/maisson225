/**
 * three/ParticleWorld.js
 * -----------------------------------------------------------------------------
 * Le "moteur" 3D du site, indépendant de React.
 * Il crée la scène Three.js, les particules, la poussière de fond, puis
 * anime en continu le passage d'une forme à l'autre.
 *
 * Utilisation (voir components/Scene3D) :
 *   const world = new ParticleWorld(canvas);
 *   world.setScene(3, "right");   // passer à la forme n°3, texte à droite
 *   world.dispose();              // tout nettoyer
 */
import * as THREE from "three";
import { SCENES } from "./scenes.js";
import { particleVertex } from "./shaders/particleVertex.js";
import { particleFragment } from "./shaders/particleFragment.js";
import { rnd, lerp } from "./utils/math.js";

// Largeur d'écran sous laquelle on passe en mise en page mobile
const MOBILE_BREAKPOINT = 980;

export default class ParticleWorld {
  /**
   * @param {HTMLCanvasElement} canvas  Canvas dans lequel dessiner
   * @param {{ onReady?: Function }} options
   */
  constructor(canvas, { onReady } = {}) {
    this.canvas = canvas;
    this.isMobile = window.innerWidth < 768;
    // Moins de particules sur mobile pour garder la fluidité
    this.count = this.isMobile ? 9000 : 16000;

    this.sceneIndex = 0;
    this.side = "left";
    this.targets = new Array(SCENES.length); // formes calculées (cache)
    this.mouse = { x: 0, y: 0, sx: 0, sy: 0 }; // position souris brute + lissée
    // Valeurs animées qui suivent doucement la scène active
    this.live = { rx: 0.6, ry: 0, x: 0, y: 0, z: 0, wave: 0, op: 1, sc: 1, spin: 0 };

    this.#initRenderer();
    this.#initParticles();
    this.#initDust();
    this.#bindEvents();

    // Prépare la première forme tout de suite, les autres en arrière-plan
    this.#getTarget(0);
    onReady?.();
    this.#precomputeOthers();

    this.clock = new THREE.Clock();
    this.#loop();
  }

  /* ------------------------------------------------------------------ */
  /* Initialisation                                                      */
  /* ------------------------------------------------------------------ */

  /** Renderer WebGL, scène, caméra et groupe qui contient les particules. */
  #initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true, // fond transparent : le dégradé CSS reste visible
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 9.5);

    this.group = new THREE.Group();
    this.scene.add(this.group);
  }

  /** Nuage de particules principal (celui qui change de forme). */
  #initParticles() {
    const n = this.count;
    this.positions = new Float32Array(n * 3); // positions actuelles
    this.colors = new Float32Array(n * 3);    // couleurs actuelles
    const scales = new Float32Array(n);       // taille de chaque particule
    this.speeds = new Float32Array(n);        // vitesse propre de chaque particule

    for (let i = 0; i < n; i++) {
      // Départ : particules dispersées loin autour de la caméra
      const r = rnd(6, 14);
      const a = rnd(0, Math.PI * 2);
      const u = rnd(-1, 1);
      this.positions[i * 3] = r * Math.sqrt(1 - u * u) * Math.cos(a);
      this.positions[i * 3 + 1] = r * u;
      this.positions[i * 3 + 2] = r * Math.sqrt(1 - u * u) * Math.sin(a);
      this.colors.set([0.8, 0.6, 0.35], i * 3);
      // 4 % de grosses particules pour un effet "étoiles"
      scales[i] = Math.random() < 0.04 ? rnd(1.8, 2.8) : rnd(0.5, 1.3);
      // Vitesses différentes = transition organique
      this.speeds[i] = rnd(0.025, 0.075);
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("aColor", new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending, // les points qui se superposent brillent davantage
      uniforms: {
        uTime: { value: 0 },
        uWave: { value: 0 },
        uSize: { value: this.isMobile ? 34 : 40 },
        uPR: { value: this.renderer.getPixelRatio() },
        uOpacity: { value: 1 },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.group.add(this.points);
  }

  /** Poussière dorée lointaine, fixe, qui donne de la profondeur. */
  #initDust() {
    const n = 1600;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = rnd(-25, 25);
      pos[i * 3 + 1] = rnd(-15, 15);
      pos[i * 3 + 2] = rnd(-30, -6);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.dustMaterial = new THREE.PointsMaterial({
      color: 0xd9b26f,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.dust = new THREE.Points(geo, this.dustMaterial);
    this.dustGeometry = geo;
    this.scene.add(this.dust);
  }

  /** Écoute souris, inclinaison du téléphone et redimensionnement. */
  #bindEvents() {
    this.onMouseMove = (e) => {
      this.mouse.x = e.clientX / window.innerWidth - 0.5;
      this.mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    this.onOrientation = (e) => {
      if (e.gamma == null) return;
      this.mouse.x = e.gamma / 90;
      this.mouse.y = (e.beta - 45) / 90;
    };
    this.onResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("deviceorientation", this.onOrientation);
    window.addEventListener("resize", this.onResize);
  }

  /* ------------------------------------------------------------------ */
  /* Formes                                                              */
  /* ------------------------------------------------------------------ */

  /** Renvoie la forme n° i, en la calculant la première fois seulement. */
  #getTarget(i) {
    if (!this.targets[i]) this.targets[i] = SCENES[i].make(this.count);
    return this.targets[i];
  }

  /**
   * Calcule les autres formes une par une, avec une petite pause entre
   * chacune pour ne pas figer la page. Attend le chargement des polices
   * car la forme "texte" en a besoin.
   */
  #precomputeOthers() {
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      let k = 1;
      const next = () => {
        if (this.disposed || k >= SCENES.length) return;
        this.#getTarget(k++);
        this.precomputeTimer = setTimeout(next, 30);
      };
      this.precomputeTimer = setTimeout(next, 60);
    });
  }

  /* ------------------------------------------------------------------ */
  /* API publique                                                        */
  /* ------------------------------------------------------------------ */

  /**
   * Change la forme affichée.
   * @param {number} index  Numéro de scène (voir three/scenes.js)
   * @param {"left"|"right"|"center"} side  Côté du texte dans la page
   */
  setScene(index, side = "center") {
    if (index < 0 || index >= SCENES.length) return;
    this.sceneIndex = index;
    this.side = side;
  }

  /** Arrête l'animation et libère la mémoire graphique. */
  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    clearTimeout(this.precomputeTimer);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("deviceorientation", this.onOrientation);
    window.removeEventListener("resize", this.onResize);
    this.geometry.dispose();
    this.material.dispose();
    this.dustGeometry.dispose();
    this.dustMaterial.dispose();
    this.renderer.dispose();
  }

  /* ------------------------------------------------------------------ */
  /* Animation                                                           */
  /* ------------------------------------------------------------------ */

  /** Décalage horizontal : la forme se place à l'opposé du texte. */
  #sideOffset() {
    if (window.innerWidth < MOBILE_BREAKPOINT) return 0;
    if (this.side === "left") return 1.9;
    if (this.side === "right") return -1.9;
    return 0;
  }

  /** Réduit la forme sur les écrans étroits (portrait). */
  #responsiveScale() {
    const aspect = window.innerWidth / window.innerHeight;
    return Math.max(0.48, Math.min(1, aspect / 1.45));
  }

  /** Boucle appelée ~60 fois par seconde. */
  #loop = () => {
    if (this.disposed) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    const S = SCENES[this.sceneIndex];
    const target = this.#getTarget(this.sceneIndex);

    // 1) Chaque particule se rapproche de sa position/couleur cible
    const n = this.count;
    const P = this.positions;
    const Cc = this.colors;
    const TP = target.positions;
    const TC = target.colors;
    for (let i = 0; i < n; i++) {
      const k = this.speeds[i];
      const j = i * 3;
      P[j] += (TP[j] - P[j]) * k;
      P[j + 1] += (TP[j + 1] - P[j + 1]) * k;
      P[j + 2] += (TP[j + 2] - P[j + 2]) * k;
      Cc[j] += (TC[j] - Cc[j]) * 0.05;
      Cc[j + 1] += (TC[j + 1] - Cc[j + 1]) * 0.05;
      Cc[j + 2] += (TC[j + 2] - Cc[j + 2]) * 0.05;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aColor.needsUpdate = true;

    // 2) Les réglages de mise en scène glissent vers ceux de la scène active
    const L = 0.04;
    const live = this.live;
    const mobileLift = window.innerWidth < MOBILE_BREAKPOINT ? 1.9 : 0; // sur mobile, la 3D passe au-dessus du texte
    live.rx = lerp(live.rx, S.rx, L);
    live.ry = lerp(live.ry, S.ry, L);
    live.y = lerp(live.y, S.y + mobileLift, L);
    live.z = lerp(live.z, S.z, L);
    live.x = lerp(live.x, this.#sideOffset(), L);
    live.wave = lerp(live.wave, S.wave, L);
    live.op = lerp(live.op, S.op, L);
    live.sc = lerp(live.sc, S.sc * this.#responsiveScale(), L);
    live.spin += S.spin * dt;

    // 3) Parallaxe : la souris oriente légèrement la forme et la caméra
    const m = this.mouse;
    m.sx = lerp(m.sx, m.x, 0.05);
    m.sy = lerp(m.sy, m.y, 0.05);

    this.group.rotation.x = live.rx + m.sy * 0.18;
    this.group.rotation.y = live.ry + live.spin + m.sx * 0.35 + Math.sin(t * 0.15) * 0.06;
    this.group.position.set(live.x, live.y, live.z);
    this.group.scale.setScalar(live.sc);

    this.material.uniforms.uTime.value = t;
    this.material.uniforms.uWave.value = live.wave;
    this.material.uniforms.uOpacity.value = live.op;

    this.dust.rotation.y = t * 0.01 + m.sx * 0.1;
    this.dust.rotation.x = m.sy * 0.05;

    this.camera.position.x = lerp(this.camera.position.x, m.sx * 0.6, 0.05);
    this.camera.position.y = lerp(this.camera.position.y, -m.sy * 0.4, 0.05);
    this.camera.lookAt(0, 0, 0);

    // 4) Rendu de l'image
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.#loop);
  };
}

/** Vérifie que le navigateur sait faire du WebGL avant de lancer la 3D. */
export function isWebGLAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}
