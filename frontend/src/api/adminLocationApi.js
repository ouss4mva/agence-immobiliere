import axiosClient from "./axiosClient";

const base = "/admin/locations";

export const listerLocations = () => axiosClient.get(base).then((r) => r.data.data ?? []);
export const lireLocation = (id) => axiosClient.get(`${base}/${id}`).then((r) => r.data.data);
export const creerLocation = (donnees) => axiosClient.post(base, donnees).then((r) => r.data.data);
export const modifierLocation = (id, donnees) => axiosClient.put(`${base}/${id}`, donnees).then((r) => r.data.data);
export const changerStatutLocation = (id, statut) =>
  axiosClient.patch(`${base}/${id}/statut`, { statut }).then((r) => r.data.data);
export const supprimerLocation = (id) => axiosClient.delete(`${base}/${id}`);

// Photos : chaque appel renvoie la liste à jour des photos du bien
export const ajouterPhotos = (bienId, fichiers) => {
  const formData = new FormData();
  fichiers.forEach((f) => formData.append("photos[]", f));
  return axiosClient.post(`/admin/biens/${bienId}/photos`, formData).then((r) => r.data.data);
};
export const definirPhotoPrincipale = (id) => axiosClient.patch(`/admin/photos/${id}/principale`).then((r) => r.data.data);
export const supprimerPhoto = (id) => axiosClient.delete(`/admin/photos/${id}`).then((r) => r.data.data);
