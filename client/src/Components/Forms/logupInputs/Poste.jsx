export default function Poste({data,setData,update}) {
  function remplissage(e) {
    let value = e.target.value;
    if (e.target.value[0] === " ") {
      value = e.target.value.slice(1);
    }
    setData({ ...data, poste: value });
  }
  return (
    <>
        <label htmlFor="nom">Poste</label>
        {update ? <input
          type="text"
          id="poste"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.poste}
          onChange={(e) => remplissage(e)}
          placeholder="Votre poste"
        /> : <input
        type="text"
        id="poste"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.poste}
        onChange={(e) => remplissage(e)}
        placeholder="Votre poste"
        required
      />}
    </>
  )
}