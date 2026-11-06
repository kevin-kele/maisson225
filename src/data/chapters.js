/**
 * data/chapters.js
 * -----------------------------------------------------------------------------
 * Contenu texte de chaque chapitre du site.
 * Pour modifier un texte, un service ou un lieu : c'est ici, pas dans les
 * composants. Chaque objet décrit une section :
 *   - id      : ancre HTML (ex. #littoral)
 *   - scene   : numéro de la forme 3D associée (voir three/scenes.js)
 *   - side    : côté du texte ("left" / "right") → la 3D se place à l'opposé
 *   - label   : nom court dans le rail latéral
 *   - nav     : nom dans le menu du haut (absent = pas dans le menu)
 *   - num     : numéro du chapitre affiché
 *   - kicker  : petite ligne au-dessus du titre
 *   - title   : { line: première ligne, em: seconde ligne en italique doré }
 *   - lead    : paragraphe d'introduction
 *   - items   : liste des services { b: mot en gras, t: suite du texte }
 *   - tags    : lieux affichés en pastilles
 */
export const CHAPTERS = [
  {
    id: "hero",
    hero: true,
    scene: 0,
    side: "left",
    label: "Akwaba",
    kicker: "Conciergerie privée · Côte d'Ivoire",
    title: { line: "Toute la Côte d'Ivoire,", em: "une seule clé." },
    lead:
      "De la lagune Ébrié aux cascades de Man, des plages d'Assinie aux savanes de Korhogo : nous ouvrons les portes du pays, et nous nous occupons de tout le reste.",
  },
  {
    id: "arrivee",
    scene: 1,
    side: "right",
    label: "Voyages",
    nav: "Voyages",
    num: "01",
    kicker: "Arrival · Accueil & mobilité",
    title: { line: "L'arrivée,", em: "déjà une expérience." },
    lead:
      "Dès la porte de l'avion, quelqu'un vous attend. Formalités, bagages, transferts, déplacements dans tout le pays : vous n'avez qu'à profiter.",
    items: [
      { b: "Accueil VIP", t: " à l'aéroport Félix-Houphouët-Boigny : coupe-file, salon privé, bagages pris en charge." },
      { b: "Chauffeurs privés", t: " : berlines, SUV et vans avec chauffeur, à l'heure, à la journée ou pour tout le séjour." },
      { b: "Jets privés & hélicoptères", t: ", vols intérieurs vers San-Pédro, Korhogo ou Man." },
      { b: "Billets Business & First", t: ", visas et formalités d'entrée." },
      { b: "Sécurité rapprochée", t: " et accompagnement discret sur demande." },
    ],
    tags: ["Abidjan", "Yamoussoukro", "San-Pédro", "Korhogo", "Man"],
  },
  {
    id: "littoral",
    scene: 2,
    side: "left",
    label: "Littoral",
    nav: "Littoral",
    num: "02",
    kicker: "Coastline · Littoral",
    title: { line: "Là où la lagune", em: "rencontre l'océan." },
    lead:
      "Assinie et ses villas pieds dans l'eau, Grand-Bassam et son quartier historique classé à l'UNESCO, les criques sauvages de Sassandra et de Grand-Béréby.",
    items: [
      { b: "Villas privées", t: " et hôtels de charme en bord de mer ou de lagune." },
      { b: "Yachts & bateaux", t: " : sorties en lagune, couchers de soleil, îles et passes." },
      { b: "Beach clubs", t: " : tables et transats réservés, même les week-ends complets." },
      { b: "Activités nautiques", t: " : jet-ski, surf, pêche au gros, kayak dans la mangrove." },
      { b: "Week-ends clés en main", t: " au départ d'Abidjan, transfert inclus." },
    ],
    tags: ["Assinie-Mafia", "Grand-Bassam", "Jacqueville", "Sassandra", "San-Pédro", "Grand-Béréby"],
  },
  {
    id: "abidjan",
    scene: 3,
    side: "right",
    label: "Abidjan",
    nav: "Abidjan",
    num: "03",
    kicker: "City life · Abidjan",
    title: { line: "Abidjan,", em: "la nuit comme le jour." },
    lead:
      "Le Plateau et ses tours, Cocody, la Zone 4, Marcory : la perle des lagunes vit à toute heure. Nous connaissons les bonnes tables, les bonnes adresses et les bonnes personnes.",
    items: [
      { b: "Gastronomie", t: " : tables d'exception et maquis choisis — attiéké poisson braisé, alloco, garba revisité." },
      { b: "Nuits", t: " : rooftops, clubs, carrés VIP et soirées privées." },
      { b: "Shopping privé", t: " : créateurs ivoiriens, pagnes, ateliers de couture sur mesure." },
      { b: "Bien-être", t: " : spas, coachs, soins à domicile." },
      { b: "Résidences", t: " : appartements meublés et hôtels haut de gamme." },
    ],
    tags: ["Plateau", "Cocody", "Riviera", "Zone 4", "Marcory", "Treichville"],
  },
  {
    id: "patrimoine",
    scene: 4,
    side: "left",
    label: "Patrimoine",
    nav: "Patrimoine",
    num: "04",
    kicker: "Heritage · Patrimoine",
    title: { line: "Des siècles d'histoire,", em: "à portée de route." },
    lead:
      "La Basilique Notre-Dame-de-la-Paix de Yamoussoukro, les mosquées de style soudanais de Kong, les tisserands de Korhogo, l'architecture coloniale de Grand-Bassam.",
    items: [
      { b: "Visites privées", t: " avec guides et historiens passionnés." },
      { b: "Ateliers d'artisans", t: " : toiles de Korhogo, tisserands, sculpteurs, bronziers." },
      { b: "Grands itinéraires", t: " : Yamoussoukro – Bouaké – Korhogo – Kong." },
      { b: "Rencontres", t: " avec les communautés, dans le respect des traditions." },
    ],
    tags: ["Yamoussoukro", "Kong", "Korhogo", "Bondoukou", "Grand-Bassam"],
  },
  {
    id: "nature",
    scene: 5,
    side: "right",
    label: "Nature",
    nav: "Nature",
    num: "05",
    kicker: "Wild · Nature",
    title: { line: "Forêts primaires,", em: "montagnes et cascades." },
    lead:
      "Le Parc national de Taï et ses chimpanzés, les savanes de la Comoé, la Dent de Man, la cascade et les ponts de lianes de l'Ouest montagneux.",
    items: [
      { b: "Expéditions encadrées", t: " dans les parcs nationaux, avec guides et rangers." },
      { b: "Randonnées à Man", t: " : Dent de Man, cascade, mont Tonkoui." },
      { b: "Éco-lodges", t: " et campements sélectionnés pour leur charme." },
      { b: "Safaris photo", t: ", observation des primates et des oiseaux." },
      { b: "Logistique complète", t: " : 4x4, chauffeurs, ravitaillement." },
    ],
    tags: ["Taï", "Comoé", "Man", "Danané", "Abokouamékro"],
  },
  {
    id: "culture",
    scene: 6,
    side: "left",
    label: "Culture",
    nav: "Culture",
    num: "06",
    kicker: "Access · Culture & événements",
    title: { line: "Vibrer au rythme", em: "du pays." },
    lead:
      "FEMUA, Abissa de Grand-Bassam, fêtes des masques de l'Ouest, concerts, matchs, défilés : nous vous ouvrons les meilleures places.",
    items: [
      { b: "Accès VIP", t: " aux festivals, concerts et défilés." },
      { b: "Places premium", t: " pour les grands rendez-vous sportifs." },
      { b: "Événements privés", t: " : mariages, anniversaires, dîners, organisés de A à Z." },
      { b: "Séminaires", t: " et événements d'entreprise." },
      { b: "Immersion musicale", t: " : coupé-décalé, zouglou, live et soirées." },
    ],
    tags: ["FEMUA", "Abissa", "MASA", "Fête des masques", "Paquinou"],
  },
  {
    id: "surmesure",
    scene: 7,
    side: "right",
    label: "Sur-mesure",
    num: "07",
    kicker: "Bespoke · Sur-mesure",
    title: { line: "Ce que vous imaginez,", em: "nous le trouvons." },
    lead:
      "Une demande inhabituelle ? C'est précisément notre métier. Un seul interlocuteur, joignable à toute heure.",
    items: [
      { b: "Immobilier", t: " : recherche de biens et accompagnement à l'investissement." },
      { b: "Affaires", t: " : création d'entreprise, rendez-vous, interprètes, bureaux." },
      { b: "Art & pièces rares", t: " : art contemporain ivoirien, cadeaux d'exception." },
      { b: "Véhicules de prestige", t: " en location, avec ou sans chauffeur." },
      { b: "Assistance 24h/24, 7j/7", t: " pendant tout votre séjour." },
    ],
  },
];

/**
 * Sections qui ne sont pas des chapitres classiques mais qui ont
 * quand même une forme 3D et une entrée dans le rail latéral.
 */
export const EXTRA_SECTIONS = [
  { id: "composer", scene: 8, side: "center", label: "Séjour" },
  { id: "maison", scene: 9, side: "center", label: "La Maison" },
];
