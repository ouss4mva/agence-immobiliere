import axiosClient from "./axiosClient";

// Transforme un bien de l'API Laravel en données pour BienCard
const versCarte = (bien) => {
  const photo = bien.photos?.find((p) => p.est_principale) ?? bien.photos?.[0];
  return {
    id: bien.id,
    titre: bien.titre,
    prix: Number(bien.prix),
    unite: bien.unite_prix,
    surface: bien.surface_m2 ? Number(bien.surface_m2) : null,
    image: photo?.url,
    coupDeCoeur: Boolean(bien.est_vedette),
  };
};

export const getBiensAccueil = (operation) =>
  axiosClient
    .get("/biens", { params: { type_operation: operation, par_page: 12 } })
    .then((r) => (r.data.data ?? []).map(versCarte))
    .catch(() => []);

