export default function Nom({data,setData,update}) {
  function remplissage(e) {
    let value = e.target.value;
    if (e.target.value[0] === " ") {
      value = e.target.value.slice(1);
    }
    setData({ ...data, nom: value });
  }
  return (
    <>
        <label htmlFor="nom">Nom</label>
        {update ? <input
          type="text"
          id="nom"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.nom}
          onChange={(e) => remplissage(e)}
          placeholder="Saisissez votre nom"
          required
          disabled
        />: <input
        type="text"
        id="nom"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.nom}
        onChange={(e) => remplissage(e)}
        placeholder="Saisissez votre nom"
        required
      />}
    </>
  )
}