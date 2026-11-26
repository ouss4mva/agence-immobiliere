import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccueilPage from "./pages/AccueilPage";
import ConnexionPage from "./pages/ConnexionPage";
import InscriptionPage from "./pages/InscriptionPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/connexion" element={<ConnexionPage />} />
        <Route path="/inscription" element={<InscriptionPage />} />
        <Route path="*" element={<main className="container"><p className="message-vide">Page à venir.</p></main>} />
      </Routes>
    </>
  );
}
