// Champ texte, ou liste déroulante si "options" est fourni
export default function ChampFormulaire({ label, nom, valeur, onChange, erreur, options, className = "", ...autres }) {
  const proprietes = { id: nom, name: nom, value: valeur, onChange, "aria-invalid": Boolean(erreur), ...autres };

  return (
    <label className={`champ ${className}`}>
      <span>{label}</span>
      {options ? (
        <select {...proprietes}>
          <option value="">Choisir</option>
          {options.map((o) => <option key={o.valeur} value={o.valeur}>{o.label}</option>)}
        </select>
      ) : (
        <input {...proprietes} />
      )}
      {erreur && <small className="champ-erreur">{erreur}</small>}
    </label>
  );
}
