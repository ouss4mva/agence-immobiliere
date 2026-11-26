import axiosClient from "./axiosClient";

export const inscription = (donnees) => axiosClient.post("/inscription", donnees);
export const connexion = (donnees) => axiosClient.post("/connexion", donnees);
export const deconnexion = () => axiosClient.post("/deconnexion");
export const moi = () => axiosClient.get("/moi");
