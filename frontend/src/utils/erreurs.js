// Erreurs de validation Laravel (422) -> { champ: "premier message" }
export const extraireErreurs = (err) =>
  Object.fromEntries(
    Object.entries(err.response?.data?.errors ?? {}).map(([champ, messages]) => [champ, messages[0]])
  );

export const messageErreur = (err) =>
  err.response
    ? `Erreur serveur (${err.response.status}) : ${err.response.data?.message ?? "réessayez."}`
    : "Impossible de contacter le serveur.";
