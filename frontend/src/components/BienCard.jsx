import { Link } from "react-router-dom";
import { formatPrix } from "../utils/formatPrix";

export default function BienCard({ bien }) {
  const details = [formatPrix(bien.prix, bien.unite)];
  if (bien.surface) details.push(`${bien.surface} m²`);
  if (bien.note) details.push(`★ ${String(bien.note).replace(".", ",")}`);

  return (
    <article className="carte-bien">
      <Link to={`/biens/${bien.id}`} className="carte-image">
        {bien.image && <img src={bien.image} alt={bien.titre} />}
        {bien.coupDeCoeur && <span className="badge">Coup de cœur</span>}
      </Link>

      <Link to={`/biens/${bien.id}`} className="carte-texte">
        <h3>{bien.titre}</h3>
        <p>{details.join(" · ")}</p>
      </Link>
    </article>
  );
}
