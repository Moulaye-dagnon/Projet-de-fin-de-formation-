export default function Prenom({ data, setData, update }) {
  function remplissage(e) {
    let value = e.target.value;
    if (e.target.value[0] === " ") {
      value = e.target.value.slice(1);
    }
    setData({ ...data, prenom: value });
  }
  return (
    <>
      <label htmlFor="prenom">Prenom</label>
      {update ? (
        <input
          type="text"
          id="prenom"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.prenom}
          onChange={(e) => remplissage(e)}
          placeholder="Saisissez votre prenom"
          disabled
        />
      ) : (
        <input
          type="text"
          id="prenom"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.prenom}
          onChange={(e) => remplissage(e)}
          placeholder="Saisissez votre prenom"
          required
        />
      )}
    </>
  );
}
