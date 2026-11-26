import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarteAdminBien from "../../components/admin/CarteAdminBien";
import { changerStatutLocation, listerLocations, supprimerLocation } from "../../api/adminLocationApi";

export default function AdminLocationsPage() {
  const [biens, setBiens] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    listerLocations()
      .then(setBiens)
      .catch(() => setErreur("Impossible de charger les biens."))
      .finally(() => setChargement(false));
  }, []);

  const changerStatut = async (bien, statut) => {
    setErreur("");
    try {
      const maj = await changerStatutLocation(bien.id, statut);
      setBiens(biens.map((b) => (b.id === bien.id ? maj : b)));
    } catch (err) {
      setErreur(err.response?.data?.message ?? "Changement d'état impossible.");
    }
  };

  const supprimer = async (bien) => {
    if (!window.confirm(`Supprimer « ${bien.titre} » ? Cette action est définitive.`)) return;
    setErreur("");
    try {
      await supprimerLocation(bien.id);
      setBiens(biens.filter((b) => b.id !== bien.id));
    } catch (err) {
      setErreur(err.response?.data?.message ?? "Suppression impossible.");
    }
  };

  return (
    <main className="container admin">
      <div className="admin-entete">
        <div>
          <h1>Biens à louer</h1>
          {!chargement && <p>{biens.length} bien{biens.length > 1 ? "s" : ""}</p>}
        </div>
        <Link to="/admin/locations/nouveau" className="bouton-noir">Ajouter un bien</Link>
      </div>

      {erreur && <p className="alerte-erreur">{erreur}</p>}
      {!chargement && !erreur && biens.length === 0 && <p className="message-vide">Aucun bien en location pour le moment.</p>}

      {biens.length > 0 && (
        <div className="piste">
          {biens.map((bien) => (
            <CarteAdminBien key={bien.id} bien={bien} onStatut={changerStatut} onSupprimer={supprimer} />
          ))}
        </div>
      )}
    </main>
  );
}
