export default function Poste({data,setData,update}) {
  return (
    <>
        <label htmlFor="nom">Poste</label>
        {update ? <input
          type="text"
          id="poste"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.poste}
          onChange={(e) => setData({ ...data, poste: e.target.value })}
          placeholder="Votre poste"
        /> : <input
        type="text"
        id="poste"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.poste}
        onChange={(e) => setData({ ...data, poste: e.target.value })}
        placeholder="Votre poste"
        required
      />}
    </>
  )
}