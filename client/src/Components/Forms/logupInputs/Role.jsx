export default function Role({ data, setData, update }) {
  function remplissage(e) {
    let value = e.target.value;
    if (e.target.value[0] === " ") {
      value = e.target.value.slice(1);
    }
    setData({ ...data, role: value });
  }
  return (
    <>
      <label htmlFor="role">Role</label>
      {!update ? (
        <select
          name=""
          id="role"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.role}
          onChange={(e) => remplissage(e)}
          required
        >
          <option value="">Role</option>
          <option value="admin">Administrateur</option>
          <option value="collaborateur">Collaborateur</option>
        </select>
      ) : (
        <select
          name=""
          id="role"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.role}
          onChange={(e) => remplissage(e)}
        >
          <option value="">Vous etes?</option>
          <option value="admin">Administrateur</option>
          <option value="collaborateur">Collaborateur</option>
        </select>
      )}
    </>
  );
}
