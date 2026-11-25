import axiosClient from "./axiosClient";

// En cas d'erreur ou de liste vide : renvoie [] (rien n'est affiché)
const liste = (url, params) =>
  axiosClient.get(url, { params }).then((r) => r.data.data ?? []).catch(() => []);

export const getRegions = () => liste("/regions");
export const getVilles = (regionId) => liste("/villes", regionId ? { region_id: regionId } : {});
export const getTypesBien = () => liste("/types-bien");
