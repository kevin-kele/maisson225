# Maison 225 — Conciergerie privée Côte d'Ivoire

Site immersif en 3D (React + Three.js) qui présente une conciergerie
couvrant toute la Côte d'Ivoire : voyages, littoral, Abidjan, patrimoine,
nature, culture et services sur-mesure.

## 🚀 Lancer le projet

Il faut [Node.js](https://nodejs.org) version 18 ou plus.

```bash
npm install      # installe les dépendances (une seule fois)
npm run dev      # lance le site en local → http://localhost:5173
npm run build    # crée la version de production dans le dossier dist/
npm run preview  # affiche la version de production en local
```

Pour mettre le site en ligne : envoyez le contenu du dossier `dist/` sur
Netlify, Vercel, o2switch, Hostinger… (glisser-déposer suffit sur Netlify).

## ⚙️ À personnaliser en premier

| Quoi | Fichier |
|---|---|
| Nom, slogan, WhatsApp, email, réseaux sociaux | `src/config/contact.js` |
| Textes des chapitres, services, lieux | `src/data/chapters.js` |
| Options du configurateur | `src/data/composerOptions.js` |
| Villes du bandeau défilant | `src/data/places.js` |
| Couleurs et polices du site | `src/styles/variables.css` |
| Couleurs des particules 3D | `src/three/palette.js` |
| Forme 3D affichée pour chaque chapitre | `src/three/scenes.js` |

## 📁 Structure des dossiers

```
maison225/
├── index.html                  Page HTML de départ (polices, div #root)
├── package.json                Dépendances et commandes npm
├── vite.config.js              Configuration de Vite
└── src/
    ├── main.jsx                Point d'entrée : monte <App />
    ├── App.jsx                 Assemble toutes les sections + relie scroll ↔ 3D
    │
    ├── config/
    │   └── contact.js          Nom de marque et coordonnées
    │
    ├── data/                   CONTENU (aucun code d'affichage ici)
    │   ├── chapters.js         Textes des 7 chapitres + sections finales
    │   ├── composerOptions.js  Pastilles et ambiances du configurateur
    │   ├── places.js           Lieux du bandeau défilant
    │   └── geo.js              Contour du pays, villes, routes aériennes
    │
    ├── hooks/                  LOGIQUE RÉUTILISABLE (React)
    │   ├── useActiveScene.js   Quelle section est visible ?
    │   ├── useScrollProgress.js Avancement du défilement
    │   └── useToast.js         Petites notifications temporaires
    │
    ├── utils/
    │   └── buildMessage.js     Génère le message de demande + lien WhatsApp
    │
    ├── three/                  MOTEUR 3D (JavaScript pur, sans React)
    │   ├── ParticleWorld.js    Scène, caméra, particules, animation
    │   ├── scenes.js           Réglages de mise en scène par chapitre
    │   ├── makeTarget.js       Fabrique une forme à partir de points
    │   ├── palette.js          Couleurs des particules
    │   ├── utils/math.js       Fonctions mathématiques
    │   ├── shaders/            Programmes GLSL exécutés par la carte graphique
    │   │   ├── particleVertex.js
    │   │   └── particleFragment.js
    │   └── shapes/             Une forme 3D par fichier
    │       ├── index.js        Exporte toutes les formes
    │       ├── mapShape.js     0 · Carte de la Côte d'Ivoire
    │       ├── globeShape.js   1 · Globe + routes aériennes
    │       ├── waveShape.js    2 · Océan, palmiers, soleil
    │       ├── cityShape.js    3 · Tours du Plateau, lagune
    │       ├── domeShape.js    4 · Basilique de Yamoussoukro
    │       ├── mountainShape.js 5 · Montagnes de Man, cascade
    │       ├── festivalShape.js 6 · Anneaux et feux d'artifice
    │       ├── gemShape.js     7 · Diamant (sur-mesure)
    │       └── textShape.js    9 · Mot "225" en particules
    │
    ├── components/             UN DOSSIER PAR COMPOSANT (JSX + CSS)
    │   ├── Scene3D/            Canvas qui relie React au moteur 3D
    │   ├── Gate/               Porte d'entrée "Entrer"
    │   ├── Header/             Menu du haut
    │   ├── ChapterRail/        Sommaire vertical à droite
    │   ├── ProgressBar/        Barre tricolore de progression
    │   ├── Cursor/             Curseur doré personnalisé
    │   ├── Toast/              Bulle de notification
    │   ├── Chapter/            Section de chapitre (réutilisée 8 fois)
    │   ├── Marquee/            Bandeau des villes qui défile
    │   ├── Composer/           Configurateur de séjour (+ ChipGroup)
    │   ├── Maison/             Section finale et engagements
    │   └── Footer/             Pied de page
    │
    └── styles/                 STYLES GLOBAUX
        ├── variables.css       Couleurs et polices
        ├── global.css          Base, titres, boutons, animations
        └── effects.css         Fond, vignettage, grain
```

## 🧠 Comment ça marche

1. Chaque section de la page porte un attribut `data-scene="N"`.
2. `useActiveScene` détecte la section visible pendant le défilement.
3. `App.jsx` transmet ce numéro à `Scene3D`, qui appelle `world.setScene(N)`.
4. `ParticleWorld` déplace progressivement chacune des 16 000 particules
   vers la forme n° N définie dans `three/scenes.js`.

**Ajouter un chapitre :** ajoutez un objet dans `data/chapters.js` avec un
nouveau numéro `scene`, puis la forme correspondante dans `three/scenes.js`
(au même index).

**Créer une nouvelle forme 3D :** copiez un fichier de `three/shapes/`,
modifiez les appels à `push(x, y, z, couleur)`, puis exportez-la dans
`three/shapes/index.js`.
# maisson225
