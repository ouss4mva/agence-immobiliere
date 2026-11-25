const UNITES = { NUIT: "/ nuit", SEMAINE: "/ semaine", MOIS: "/ mois" };

// formatPrix(1215, "NUIT") -> "DH 1 215 / nuit"   |   formatPrix(1250000) -> "DH 1 250 000"
export function formatPrix(prix, unite) {
  const montant = new Intl.NumberFormat("fr-FR").format(prix);
  return `DH ${montant}${unite ? " " + UNITES[unite] : ""}`;
}
