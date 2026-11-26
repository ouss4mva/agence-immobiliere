import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ChampFormulaire from "../../components/ChampFormulaire";
import GestionPhotos from "../../components/admin/GestionPhotos";
import { creerLocation, lireLocation, modifierLocation } from "../../api/adminLocationApi";
import { getTypesBien, getVilles } from "../../api/referentielApi";
import { extraireErreurs, messageErreur } from "../../utils/erreurs";
import { DUREES, STATUTS_LOCATION, UNITES, UNITES_PAR_DUREE } from "../../utils/labels";

const VIDE = {
  titre: "", description: "", type_bien_id: "", ville_id: "", adresse: "",
  surface_m2: "", nb_chambres: "", nb_salles_bain: "",
  duree_location: "COURT_TERME", prix: "", unite_prix: "NUIT",
  statut: "DISPONIBLE", est_vedette: false,
};

export default function AdminLocationFormPage() {
  const { id } = useParams();
  const edition = Boolean(id);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState(VIDE);
  const [photos, setPhotos] = useState([]);
  const [types, setTypes] = useState([]);
  const [villes, setVilles] = useState([]);
  const [erreurs, setErreurs] = useState({});
  const [erreurGlobale, setErreurGlobale] = useState("");
  const [chargement, setChargement] = useState(edition);
  const [envoi, setEnvoi] = useState(false);

  useEffect(() => {
    getTypesBien().then(setTypes);
    getVilles().then(setVilles);
  }, []);

  useEffect(() => {
    if (!edition) return;
    lireLocation(id)
      .then((bien) => {
        setForm({
          titre: bien.titre ?? "", description: bien.description ?? "",
          type_bien_id: bien.type_bien_id ?? "", ville_id: bien.ville_id ?? "",
          adresse: bien.adresse ?? "", surface_m2: bien.surface_m2 ?? "",
          nb_chambres: bien.nb_chambres ?? "", nb_salles_bain: bien.nb_salles_bain ?? "",
          duree_location: bien.duree_location, prix: bien.prix, unite_prix: bien.unite_prix,
          statut: bien.statut, est_vedette: bien.est_vedette,
        });
        setPhotos(bien.photos ?? []);
      })
      .catch(() => setErreurGlobale("Bien introuvable."))
      .finally(() => setChargement(false));
  }, [id, edition]);

  const modifier = (e) => {
    const { name, type, value, checked } = e.target;
    const suite = { [name]: type === "checkbox" ? checked : value };
    // Changer la durée ajuste l'unité de prix (courte : nuit / longue : mois)
    if (name === "duree_location") suite.unite_prix = UNITES_PAR_DUREE[value][0];
    setForm({ ...form, ...suite });
  };

  const soumettre = async (e) => {
    e.preventDefault();
    setErreurGlobale("");
    setErreurs({});
    setEnvoi(true);
    try {
      if (edition) {
        await modifierLocation(id, form);
        navigate("/admin/locations");
      } else {
        const bien = await creerLocation(form);
        navigate(`/admin/locations/${bien.id}/modifier`, { state: { cree: true } }); // pour ajouter les photos
      }
    } catch (err) {
      const erreursApi = extraireErreurs(err);
      if (Object.keys(erreursApi).length) setErreurs(erreursApi);
      else setErreurGlobale(err.response?.data?.message ?? messageErreur(err));
    } finally {
      setEnvoi(false);
    }
  };

  if (chargement) return null;

  const champ = (nom, label, extra = {}) => (
    <ChampFormulaire label={label} nom={nom} valeur={form[nom]} onChange={modifier} erreur={erreurs[nom]} {...extra} />
  );
  const unitesPossibles = UNITES.filter((u) => UNITES_PAR_DUREE[form.duree_location].includes(u.valeur));

  return (
    <main className="container auth">
      <div className="auth-carte large">
        <Link to="/admin/locations" className="lien-retour">← Retour à la liste</Link>
        <h1>{edition ? "Modifier le bien" : "Ajouter un bien à louer"}</h1>
        {state?.cree && <p className="alerte-info">Bien créé. Ajoutez maintenant ses photos en bas de page.</p>}

        <form onSubmit={soumettre} noValidate>
          <h2 className="auth-section">Le bien</h2>
          <div className="auth-grille">
            {champ("titre", "Titre *", { className: "pleine" })}
            {champ("type_bien_id", "Type de bien *", { options: types.map((t) => ({ valeur: t.id, label: t.libelle })) })}
            {champ("ville_id", "Ville *", { options: villes.map((v) => ({ valeur: v.id, label: v.nom })) })}
            {champ("adresse", "Adresse", { className: "pleine" })}
            {champ("surface_m2", "Surface (m²)", { type: "number", min: 0, step: "0.01" })}
            {champ("nb_chambres", "Chambres", { type: "number", min: 0 })}
            {champ("nb_salles_bain", "Salles de bain", { type: "number", min: 0 })}
            {champ("description", "Description", { className: "pleine", multiligne: true, rows: 5 })}
          </div>

          <h2 className="auth-section">Location</h2>
          <div className="auth-grille">
            {champ("duree_location", "Durée *", { options: DUREES, sansVide: true })}
            {champ("unite_prix", "Unité du prix *", { options: unitesPossibles, sansVide: true })}
            {champ("prix", "Prix (DH) *", { type: "number", min: 0, step: "0.01" })}
            {champ("statut", "État *", { options: STATUTS_LOCATION, sansVide: true })}
          </div>

          <label className="case">
            <input type="checkbox" name="est_vedette" checked={form.est_vedette} onChange={modifier} />
            <span>Mettre en avant sur la page d'accueil (« Coup de cœur »)</span>
          </label>

          {erreurGlobale && <p className="alerte-erreur">{erreurGlobale}</p>}
          <button type="submit" className="bouton-plein" disabled={envoi}>
            {envoi ? "Enregistrement…" : edition ? "Enregistrer les modifications" : "Créer le bien"}
          </button>
        </form>

        {edition && (
          <>
            <h2 className="auth-section">Photos</h2>
            <GestionPhotos bienId={id} photos={photos} onChange={setPhotos} />
          </>
        )}
      </div>
    </main>
  );
}
