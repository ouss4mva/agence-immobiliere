import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Au chargement : retrouve l'utilisateur si un token est déjà enregistré
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setChargement(false);
      return;
    }
    authApi.moi()
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setChargement(false));
  }, []);

  const ouvrirSession = (res) => {
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const inscription = async (donnees) => ouvrirSession(await authApi.inscription(donnees));
  const connexion = async (donnees) => ouvrirSession(await authApi.connexion(donnees));
  const deconnexion = async () => {
    try { await authApi.deconnexion(); } catch { /* token déjà invalide */ }
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, chargement, inscription, connexion, deconnexion }}>
      {children}
    </AuthContext.Provider>
  );
}
