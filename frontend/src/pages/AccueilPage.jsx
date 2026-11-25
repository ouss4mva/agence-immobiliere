import { useEffect, useState } from "react";
import CarrouselBiens from "../components/CarrouselBiens";
import { getBiensAccueil } from "../api/bienApi";

export default function AccueilPage() {
  const [biensLocation, setBiensLocation] = useState([]);
  const [biensVente, setBiensVente] = useState([]);
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    Promise.all([getBiensAccueil("LOCATION"), getBiensAccueil("VENTE")]).then(([location, vente]) => {
      setBiensLocation(location);
      setBiensVente(vente);
      setCharge(true);
    });
  }, []);

  const aucunBien = charge && biensLocation.length === 0 && biensVente.length === 0;

  return (
    <main className="container accueil">
      <CarrouselBiens titre="Biens à louer" lien="/biens?type_operation=LOCATION" biens={biensLocation} />
      <CarrouselBiens titre="Biens à acheter" lien="/biens?type_operation=VENTE" biens={biensVente} />
      {aucunBien && <p className="message-vide">Aucun bien disponible pour le moment.</p>}
    </main>
  );
}
