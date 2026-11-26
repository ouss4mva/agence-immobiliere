import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RouteAdmin from "./components/RouteAdmin";
import AccueilPage from "./pages/AccueilPage";
import ConnexionPage from "./pages/ConnexionPage";
import InscriptionPage from "./pages/InscriptionPage";
import AdminLocationsPage from "./pages/admin/AdminLocationsPage";
import AdminLocationFormPage from "./pages/admin/AdminLocationFormPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/inscription" element={<InscriptionPage />} />

        <Route element={<RouteAdmin />}>
          <Route path="/admin" element={<Navigate to="/admin/locations" replace />} />
          <Route path="/admin/locations" element={<AdminLocationsPage />} />
          <Route path="/admin/locations/nouveau" element={<AdminLocationFormPage key="nouveau" />} />
          <Route path="/admin/locations/:id/modifier" element={<AdminLocationFormPage key="edition" />} />
        </Route>

        <Route path="*" element={<main className="container"><p className="message-vide">Page à venir.</p></main>} />
      </Routes>
    </>
  );
}
