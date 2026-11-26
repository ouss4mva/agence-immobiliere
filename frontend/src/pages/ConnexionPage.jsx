import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import ChampFormulaire from "../components/ChampFormulaire";
import { useAuth } from "../context/AuthContext";
import { extraireErreurs, messageErreur } from "../utils/erreurs";

export default function ConnexionPage() {
  const { user, chargement, connexion } = useAuth();
  const location = useLocation();
  const retour = location.state?.from ?? "/"; // page où revenir après la connexion

  const [form, setForm] = useState({ email: "", password: "" });
  const [erreurs, setErreurs] = useState({});
  const [erreurGlobale, setErreurGlobale] = useState("");
  const [envoi, setEnvoi] = useState(false);

  if (chargement) return null;
  if (user) return <Navigate to={retour} replace />;

  const modifier = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const soumettre = async (e) => {
    e.preventDefault();
    setErreurGlobale("");

    const manquants = {};
    if (!form.email) manquants.email = "Entrez votre email.";
    if (!form.password) manquants.password = "Entrez votre mot de passe.";
    setErreurs(manquants);
    if (Object.keys(manquants).length) return;

    setEnvoi(true);
    try {
      await connexion(form); // la redirection se fait ensuite toute seule
    } catch (err) {
      const erreursApi = extraireErreurs(err);
      if (Object.keys(erreursApi).length) setErreurs(erreursApi);
      else setErreurGlobale(messageErreur(err));
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <main className="container auth">
            <Link to="/" className="logo auth-logo">agence</Link>
      <div className="auth-carte">
        <h1>Connexion</h1>
        <p className="auth-sous-titre">Connectez-vous pour confirmer vos réunions et réservations.</p>

        <form onSubmit={soumettre} noValidate>
          <div className="auth-grille une-colonne">
            <ChampFormulaire label="Email" nom="email" type="email" autoComplete="email" valeur={form.email} onChange={modifier} erreur={erreurs.email} />
            <ChampFormulaire label="Mot de passe" nom="password" type="password" autoComplete="current-password" valeur={form.password} onChange={modifier} erreur={erreurs.password} />
          </div>

          {erreurGlobale && <p className="alerte-erreur">{erreurGlobale}</p>}
          <button type="submit" className="bouton-plein" disabled={envoi}>{envoi ? "Connexion…" : "Se connecter"}</button>
        </form>

        <p className="auth-pied">
          Pas encore de compte ? <Link to="/inscription" state={location.state}>Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}
