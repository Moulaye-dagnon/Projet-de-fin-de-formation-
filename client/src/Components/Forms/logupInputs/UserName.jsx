export default function UserName({ data, setData, update }) {
  function remplissage(e) {
    let value = e.target.value;
    if (e.target.value[0] === " ") {
      value = e.target.value.slice(1);
    }
    setData({ ...data, username: value });
  }
  return (
    <>
      <label htmlFor="username">Nom d'utilisateur</label>
      {!update ? (
        <input
          type="text"
          id="username"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.username}
          onChange={(e) => remplissage(e)}
          placeholder="Saisissez votre nom d'utilisateur"
        />
      ) : (
        <input
          type="text"
          id="username"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.username}
          onChange={(e) => remplissage(e)}
          placeholder="Saisissez votre nom d'utilisateur"
        />
      )}
    </>
  );
}
