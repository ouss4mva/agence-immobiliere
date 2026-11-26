import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import ChampFormulaire from "../components/ChampFormulaire";
import { useAuth } from "../context/AuthContext";
import { getVilles } from "../api/referentielApi";
import { extraireErreurs, messageErreur } from "../utils/erreurs";

const VIDE = {
  civilite: "", nom: "", prenom: "", date_naissance: "",
  email: "", telephone: "",
  adresse: "", code_postal: "", ville: "", pays: "Maroc",
  password: "", password_confirmation: "", accepte_conditions: false,
};

const CIVILITES = [{ valeur: "M", label: "Monsieur" }, { valeur: "MME", label: "Madame" }];

function calculerAge(dateNaissance) {
  const naissance = new Date(dateNaissance);
  const auj = new Date();
  let age = auj.getFullYear() - naissance.getFullYear();
  const mois = auj.getMonth() - naissance.getMonth();
  if (mois < 0 || (mois === 0 && auj.getDate() < naissance.getDate())) age--;
  return age;
}

function valider(f) {
  const e = {};
  if (!f.civilite) e.civilite = "Choisissez une civilité.";
  if (f.nom.trim().length < 2) e.nom = "Entrez votre nom.";
  if (f.prenom.trim().length < 2) e.prenom = "Entrez votre prénom.";
  if (!f.date_naissance) e.date_naissance = "Entrez votre date de naissance.";
  else if (calculerAge(f.date_naissance) < 18) e.date_naissance = "Vous devez avoir au moins 18 ans.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Entrez une adresse email valide.";
  if (!/^[0-9+\s().-]{8,20}$/.test(f.telephone)) e.telephone = "Entrez un numéro de téléphone valide.";
  if (f.adresse.trim().length < 5) e.adresse = "Entrez votre adresse.";
  if (!f.ville.trim()) e.ville = "Entrez votre ville.";
  if (!f.pays.trim()) e.pays = "Entrez votre pays.";
  if (f.password.length < 8) e.password = "Au moins 8 caractères.";
  if (f.password !== f.password_confirmation) e.password_confirmation = "Les mots de passe ne correspondent pas.";
  if (!f.accepte_conditions) e.accepte_conditions = "Vous devez accepter pour créer un compte.";
  return e;
}

export default function InscriptionPage() {
  const { user, chargement, inscription } = useAuth();
  const location = useLocation();
  const retour = location.state?.from ?? "/";

  const [form, setForm] = useState(VIDE);
  const [erreurs, setErreurs] = useState({});
  const [erreurGlobale, setErreurGlobale] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [villes, setVilles] = useState([]); // suggestions, la saisie reste libre

  useEffect(() => { getVilles().then(setVilles); }, []);

  if (chargement) return null;
  if (user) return <Navigate to={retour} replace />;

  const modifier = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const soumettre = async (e) => {
    e.preventDefault();
    setErreurGlobale("");

    const erreursLocales = valider(form);
    setErreurs(erreursLocales);
    if (Object.keys(erreursLocales).length) return;

    setEnvoi(true);
    try {
      await inscription(form); // connecte l'utilisateur, puis redirige
    } catch (err) {
      const erreursApi = extraireErreurs(err);
      if (Object.keys(erreursApi).length) setErreurs(erreursApi);
      else setErreurGlobale(messageErreur(err));
    } finally {
      setEnvoi(false);
    }
  };

  const champ = (nom, label, extra = {}) => (
    <ChampFormulaire label={label} nom={nom} valeur={form[nom]} onChange={modifier} erreur={erreurs[nom]} {...extra} />
  );

  return (
    <main className="container auth">
      <Link to="/" className="logo auth-logo">agence</Link>
      <div className="auth-carte large">
        <h1>Créer un compte</h1>
        <p className="auth-sous-titre">Les champs marqués d'un * sont obligatoires.</p>

        <form onSubmit={soumettre} noValidate>
          <h2 className="auth-section">Identité</h2>
          <div className="auth-grille">
            {champ("civilite", "Civilité *", { options: CIVILITES })}
            {champ("date_naissance", "Date de naissance *", { type: "date", max: new Date().toISOString().split("T")[0] })}
            {champ("nom", "Nom *", { autoComplete: "family-name" })}
            {champ("prenom", "Prénom *", { autoComplete: "given-name" })}
          </div>

          <h2 className="auth-section">Contact</h2>
          <div className="auth-grille">
            {champ("email", "Email *", { type: "email", autoComplete: "email" })}
            {champ("telephone", "Téléphone *", { type: "tel", autoComplete: "tel", placeholder: "+212 6 00 00 00 00" })}
          </div>

          <h2 className="auth-section">Adresse</h2>
          <div className="auth-grille">
            {champ("adresse", "Adresse *", { className: "pleine", autoComplete: "street-address" })}
            {champ("ville", "Ville *", { list: "liste-villes", autoComplete: "address-level2" })}
            {champ("code_postal", "Code postal", { autoComplete: "postal-code" })}
            {champ("pays", "Pays *", { autoComplete: "country-name" })}
          </div>
          <datalist id="liste-villes">
            {villes.map((v) => <option key={v.id} value={v.nom} />)}
          </datalist>

          <h2 className="auth-section">Sécurité</h2>
          <div className="auth-grille">
            {champ("password", "Mot de passe *", { type: "password", autoComplete: "new-password" })}
            {champ("password_confirmation", "Confirmer le mot de passe *", { type: "password", autoComplete: "new-password" })}
          </div>

          <label className="case">
            <input type="checkbox" name="accepte_conditions" checked={form.accepte_conditions} onChange={modifier} />
            <span>J'accepte que mes données personnelles soient utilisées par l'agence pour gérer mes réunions et réservations. *</span>
          </label>
          {erreurs.accepte_conditions && <small className="champ-erreur">{erreurs.accepte_conditions}</small>}

          {erreurGlobale && <p className="alerte-erreur">{erreurGlobale}</p>}
          <button type="submit" className="bouton-plein" disabled={envoi}>{envoi ? "Création…" : "Créer mon compte"}</button>
        </form>

        <p className="auth-pied">
          Déjà un compte ? <Link to="/connexion" state={location.state}>Se connecter</Link>
        </p>
      </div>
    </main>
  );
}
