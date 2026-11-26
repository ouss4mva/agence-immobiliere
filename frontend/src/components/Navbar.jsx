import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BarreRecherche from "./BarreRecherche";
import { IconeMenu, IconeUtilisateur } from "./Icones";
import { useAuth } from "../context/AuthContext";

const ONGLETS = [
  { label: "Tous",    to: "/",                              operation: null },
  { label: "Louer",   to: "/biens?type_operation=LOCATION", operation: "LOCATION" },
  { label: "Acheter", to: "/biens?type_operation=VENTE",    operation: "VENTE" },
];

export default function Navbar() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { user, deconnexion } = useAuth();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const operation = new URLSearchParams(search).get("type_operation");
  const pageAuth = pathname === "/connexion" || pathname === "/inscription";

  const estActif = (onglet) =>
    onglet.operation === null
      ? pathname === "/"
      : pathname === "/biens" && operation === onglet.operation;

  const basculerMenu = () => setMenuOuvert(!menuOuvert);
  const fermerMenu = () => setMenuOuvert(false);
  const sortir = async () => {
    fermerMenu();
    await deconnexion();
    navigate("/");
  };
    if (pageAuth) return null; // aucun en-tête sur connexion / inscription
  return (
    <header className="entete">
      <div className="navbar-ligne">
        <Link to="/" className="logo">agence</Link>

        <nav className="onglets">
          {ONGLETS.map((o) => (
            <Link key={o.label} to={o.to} className={`onglet${estActif(o) ? " actif" : ""}`}>
              {o.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          {user?.role === "ADMIN" && <Link to="/admin" className="lien-agence">Espace agence</Link>}
          <button type="button" className="bouton-rond" aria-label="Compte" onClick={basculerMenu}><IconeUtilisateur /></button>
          <button type="button" className="bouton-rond" aria-label="Menu" onClick={basculerMenu}><IconeMenu /></button>

          {menuOuvert && (
            <div className="menu-deroulant">
              {user ? (
                <>
                  <div className="menu-info">Connecté : {user.prenom} {user.nom}</div>
                  {user.role === "ADMIN" && <Link to="/admin" onClick={fermerMenu}>Espace agence</Link>}
                  <div className="menu-separateur" />
                  <button type="button" onClick={sortir}>Déconnexion</button>
                </>
              ) : (
                <>
                  <Link to="/connexion" className="gras" onClick={fermerMenu}>Connexion</Link>
                  <Link to="/inscription" onClick={fermerMenu}>Inscription</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

          <BarreRecherche />
    </header>
  );
}