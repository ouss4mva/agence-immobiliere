import { useState } from "react";
import { ajouterPhotos, definirPhotoPrincipale, supprimerPhoto } from "../../api/adminLocationApi";

export default function GestionPhotos({ bienId, photos, onChange }) {
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");

  const executer = async (action) => {
    setEnvoi(true);
    setErreur("");
    try {
      onChange(await action());
    } catch (err) {
      const premiere = Object.values(err.response?.data?.errors ?? {})[0];
      setErreur(premiere?.[0] ?? err.response?.data?.message ?? "Action impossible.");
    } finally {
      setEnvoi(false);
    }
  };

  const choisir = (e) => {
    const fichiers = Array.from(e.target.files);
    e.target.value = "";
    if (fichiers.length) executer(() => ajouterPhotos(bienId, fichiers));
  };

  return (
    <div>
      <label className="bouton-contour bouton-fichier">
        {envoi ? "Envoi…" : "Ajouter des photos"}
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden disabled={envoi} onChange={choisir} />
      </label>
      <p className="aide">JPG, PNG ou WEBP, 4 Mo maximum par photo, 10 photos par bien.</p>
      {erreur && <p className="alerte-erreur">{erreur}</p>}

      <div className="photos-grille">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.url} alt="" />
            {photo.est_principale && <span className="badge">Principale</span>}
            <div className="photo-actions">
              {!photo.est_principale && (
                <button type="button" disabled={envoi} onClick={() => executer(() => definirPhotoPrincipale(photo.id))}>Principale</button>
              )}
              <button type="button" className="danger" disabled={envoi} onClick={() => executer(() => supprimerPhoto(photo.id))}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
