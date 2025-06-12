export default function Nom({data,setData,update}) {
  return (
    <>
        <label htmlFor="nom">Nom</label>
        {update ? <input
          type="text"
          id="nom"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.nom}
          onChange={(e) => setData({ ...data, nom: e.target.value })}
          placeholder="Saisissez votre nom"
          required
          disabled
        />: <input
        type="text"
        id="nom"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.nom}
        onChange={(e) => setData({ ...data, nom: e.target.value })}
        placeholder="Saisissez votre nom"
        required
      />}
    </>
  )
}