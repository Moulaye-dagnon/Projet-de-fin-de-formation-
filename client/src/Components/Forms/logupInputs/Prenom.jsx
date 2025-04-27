export default function Prenom({data,setData,update}) {
  return (
    <>
        <label htmlFor="prenom">Prenom</label>
        {update ? <input
          type="text"
          id="prenom"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.prenom}
          onChange={(e) => setData({ ...data, prenom: e.target.value })}
          placeholder="Saisissez votre prenom"
          disabled
        /> : <input
        type="text"
        id="prenom"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.prenom}
        onChange={(e) => setData({ ...data, prenom: e.target.value })}
        placeholder="Saisissez votre prenom"
        required
      />}
    </>
  )
}