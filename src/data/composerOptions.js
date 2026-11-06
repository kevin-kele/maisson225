/**
 * data/composerOptions.js
 * -----------------------------------------------------------------------------
 * Options proposées dans le configurateur "Composez votre séjour".
 * Ajouter une option = ajouter une chaîne dans le bon groupe.
 */

// Groupes de pastilles cliquables
export const COMPOSER_GROUPS = [
  { title: "Mobilité", options: ["Accueil VIP aéroport", "Chauffeur privé", "Jet / hélicoptère", "Vols intérieurs", "Sécurité rapprochée"] },
  { title: "Hébergement", options: ["Villa à Assinie", "Hôtel de luxe à Abidjan", "Résidence meublée", "Éco-lodge nature"] },
  {
    title: "Expériences",
    options: [
      "Yacht & lagune", "Grand-Bassam historique", "Nuit VIP à Abidjan", "Basilique de Yamoussoukro",
      "Toiles de Korhogo", "Randonnée à Man", "Chimpanzés de Taï", "Safari à la Comoé", "Festival / concert",
    ],
  },
  { title: "Services", options: ["Shopping privé", "Chef à domicile", "Événement privé", "Immobilier / affaires", "Interprète"] },
];

// Choix de la liste déroulante "Ambiance"
export const MOODS = [
  "Détente & plages",
  "Aventure & nature",
  "Culture & patrimoine",
  "Fête & nuits d'Abidjan",
  "Affaires",
  "Un peu de tout",
];
