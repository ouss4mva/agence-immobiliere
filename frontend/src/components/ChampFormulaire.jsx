// Champ texte, zone de texte (multiligne) ou liste déroulante (options)
export default function ChampFormulaire({
  label, nom, valeur, onChange, erreur, options, sansVide, multiligne, className = "", ...autres
}) {
  const proprietes = { id: nom, name: nom, value: valeur, onChange, "aria-invalid": Boolean(erreur), ...autres };

  return (
    <label className={`champ ${className}`}>
      <span>{label}</span>
      {options ? (
        <select {...proprietes}>
          {!sansVide && <option value="">Choisir</option>}
          {options.map((o) => <option key={o.valeur} value={o.valeur}>{o.label}</option>)}
        </select>
      ) : multiligne ? (
        <textarea {...proprietes} />
      ) : (
        <input {...proprietes} />
      )}
      {erreur && <small className="champ-erreur">{erreur}</small>}
    </label>
  );
}
