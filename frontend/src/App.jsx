import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccueilPage from "./pages/AccueilPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="*" element={<main className="container"><p style={{ padding: "48px 0" }}>Page à venir.</p></main>} />
      </Routes>
    </>
  );
}