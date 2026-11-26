import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RouteAdmin() {
  const { user, chargement } = useAuth();
  const location = useLocation();

  if (chargement) return null;
  if (!user) return <Navigate to="/connexion" state={{ from: location.pathname }} replace />;
  if (user.role !== "ADMIN") return <Navigate to="/" replace />;

  return <Outlet />;
}
