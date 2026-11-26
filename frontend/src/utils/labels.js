export const STATUTS_LOCATION = [
  { valeur: "DISPONIBLE", label: "Disponible" },
  { valeur: "RESERVE", label: "Réservé" },
  { valeur: "LOUE", label: "Loué" },
];

export const DUREES = [
  { valeur: "COURT_TERME", label: "Courte durée" },
  { valeur: "LONG_TERME", label: "Longue durée" },
];

export const UNITES = [
  { valeur: "NUIT", label: "Par nuit" },
  { valeur: "SEMAINE", label: "Par semaine" },
  { valeur: "MOIS", label: "Par mois" },
];

// Unités autorisées selon la durée (même règle que le backend)
export const UNITES_PAR_DUREE = {
  COURT_TERME: ["NUIT", "SEMAINE"],
  LONG_TERME: ["MOIS"],
};
