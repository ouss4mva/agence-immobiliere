import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BienCard from "./BienCard";
import { IconeChevronDroite, IconeChevronGauche, IconeFlecheDroite } from "./Icones";

export default function CarrouselBiens({ titre, lien, biens }) {
  const piste = useRef(null);
  const [peutReculer, setPeutReculer] = useState(false);
  const [peutAvancer, setPeutAvancer] = useState(true);

  const majFleches = () => {
    const el = piste.current;
    if (!el) return;
    setPeutReculer(el.scrollLeft > 0);
    setPeutAvancer(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    majFleches();
    window.addEventListener("resize", majFleches);
    return () => window.removeEventListener("resize", majFleches);
  }, [biens]);

  const defiler = (sens) =>
    piste.current.scrollBy({ left: sens * piste.current.clientWidth * 0.8, behavior: "smooth" });
    if (biens.length === 0) return null; // aucune donnée : aucune section
  return (
    <section>
      <div className="carrousel-entete">
        <Link to={lien} className="carrousel-titre">
          <h2>{titre}</h2>
          <span className="fleche-lien"><IconeFlecheDroite /></span>
        </Link>

        <div className="fleches">
          <button type="button" className="fleche" aria-label="Précédent" disabled={!peutReculer} onClick={() => defiler(-1)}><IconeChevronGauche /></button>
          <button type="button" className="fleche" aria-label="Suivant" disabled={!peutAvancer} onClick={() => defiler(1)}><IconeChevronDroite /></button>
        </div>
      </div>

      <div className="piste" ref={piste} onScroll={majFleches}>
        {biens.map((bien) => <BienCard key={bien.id} bien={bien} />)}
      </div>
    </section>
  );
}
