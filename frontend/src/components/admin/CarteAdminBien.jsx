import { Link } from "react-router-dom";
import { formatPrix } from "../../utils/formatPrix";
import { DUREES, STATUTS_LOCATION } from "../../utils/labels";

export default function CarteAdminBien({ bien, onStatut, onSupprimer }) {
  const photo = bien.photos?.[0]; // la photo principale vient en premier
  const lienModifier = `/admin/locations/${bien.id}/modifier`;
  const duree = DUREES.find((d) => d.valeur === bien.duree_location)?.label;

  return (
    <article className="carte-bien carte-admin">
      <Link to={lienModifier} className="carte-image">
        {photo && <img src={photo.url} alt={bien.titre} />}
        {bien.est_vedette && <span className="badge">Coup de cœur</span>}
      </Link>

      <div className="carte-texte">
        <h3>{bien.titre}</h3>
        <p>{[bien.ville?.nom, bien.type_bien?.libelle].filter(Boolean).join(" · ")}</p>
        <p>{[formatPrix(Number(bien.prix), bien.unite_prix), duree].filter(Boolean).join(" · ")}</p>
      </div>

      <select
        className="etat-select"
        aria-label="État du bien"
        value={bien.statut}
        onChange={(e) => onStatut(bien, e.target.value)}
      >
        {STATUTS_LOCATION.map((s) => <option key={s.valeur} value={s.valeur}>{s.label}</option>)}
      </select>

      <div className="carte-admin-actions">
        <Link to={lienModifier} className="bouton-contour">Modifier</Link>
        <button type="button" className="bouton-contour danger" onClick={() => onSupprimer(bien)}>Supprimer</button>
      </div>
    </article>
  );
}
