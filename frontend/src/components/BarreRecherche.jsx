import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRegions, getTypesBien, getVilles } from "../api/referentielApi";
import { IconeRecherche, IconeRetablir } from "./Icones";

export default function BarreRecherche() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [regions, setRegions] = useState([]);
  const [villes, setVilles] = useState([]);
  const [types, setTypes] = useState([]);

  const [regionId, setRegionId] = useState("");
  const [villeId, setVilleId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    getRegions().then(setRegions);
    getTypesBien().then(setTypes);
  }, []);

  // Les villes proposées dépendent de la région choisie
  useEffect(() => {
    getVilles(regionId).then(setVilles);
    setVilleId("");
  }, [regionId]);

  const reinitialiser = () => {
    setRegionId("");
    setVilleId("");
    setTypeId("");
    setBudget("");
  };

  const rechercher = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const operation = searchParams.get("type_operation"); // garde l'onglet Louer / Acheter
    if (operation) params.set("type_operation", operation);
    if (regionId) params.set("region_id", regionId);
    if (villeId) params.set("ville_id", villeId);
    if (typeId) params.set("type_bien_id", typeId);
    if (budget) params.set("prix_max", budget);
    navigate(`/biens?${params}`); // TODO : page liste des biens
  };

  return (
    <form className="recherche" onSubmit={rechercher}>
      <label className="recherche-champ">
        <strong>Région</strong>
        <select value={regionId} onChange={(e) => setRegionId(e.target.value)} className={regionId ? "" : "champ-vide"}>
          <option value="">Choisissez une région</option>
          {regions.map((r) => <option key={r.id} value={r.id}>{r.nom}</option>)}
        </select>
      </label>

      <label className="recherche-champ">
        <strong>Ville</strong>
        <select value={villeId} onChange={(e) => setVilleId(e.target.value)} className={villeId ? "" : "champ-vide"}>
          <option value="">Choisissez villes</option>
          {villes.map((v) => <option key={v.id} value={v.id}>{v.nom}</option>)}
        </select>
      </label>

      <label className="recherche-champ">
        <strong>Type de biens</strong>
        <select value={typeId} onChange={(e) => setTypeId(e.target.value)} className={typeId ? "" : "champ-vide"}>
          <option value="">Sélectionnez le type de biens</option>
          {types.map((t) => <option key={t.id} value={t.id}>{t.libelle}</option>)}
        </select>
      </label>

      <label className="recherche-champ">
        <strong>Budget</strong>
        <input type="number" min="0" placeholder="Définissez votre budget (DH)" value={budget} onChange={(e) => setBudget(e.target.value)} />
      </label>

      <button type="button" className="recherche-reset" aria-label="Réinitialiser" onClick={reinitialiser}>
        <IconeRetablir />
      </button>

      <button type="submit" className="recherche-bouton">
        <IconeRecherche /> Recherche
      </button>
    </form>
  );
}
