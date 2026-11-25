import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BarreRecherche from "./BarreRecherche";
import { IconeMenu, IconeUtilisateur } from "./Icones";

const ONGLETS = [
  { label: "Tous",    to: "/",                              operation: null },
  { label: "Louer",   to: "/biens?type_operation=LOCATION", operation: "LOCATION" },
  { label: "Acheter", to: "/biens?type_operation=VENTE",    operation: "VENTE" },
];

export default function Navbar() {
  const { pathname, search } = useLocation();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const operation = new URLSearchParams(search).get("type_operation");

  const estActif = (onglet) =>
    onglet.operation === null
      ? pathname === "/"
      : pathname === "/biens" && operation === onglet.operation;

  const basculerMenu = () => setMenuOuvert(!menuOuvert);
  const fermerMenu = () => setMenuOuvert(false);

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
          <Link to="/admin" className="lien-agence">Espace agence</Link>
          <button type="button" className="bouton-rond" aria-label="Compte" onClick={basculerMenu}><IconeUtilisateur /></button>
          <button type="button" className="bouton-rond" aria-label="Menu" onClick={basculerMenu}><IconeMenu /></button>

          {menuOuvert && (
            <div className="menu-deroulant">
              <Link to="/connexion" className="gras" onClick={fermerMenu}>Connexion</Link>
              <Link to="/inscription" onClick={fermerMenu}>Inscription</Link>
              <div className="menu-separateur" />
              <Link to="/admin" onClick={fermerMenu}>Espace agence</Link>
            </div>
          )}
        </div>
      </div>

      <BarreRecherche />
    </header>
  );
}
