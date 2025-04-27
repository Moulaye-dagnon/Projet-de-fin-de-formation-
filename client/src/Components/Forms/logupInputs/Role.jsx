export default function Role({ data, setData, update }) {
  return (
    <>
      <label htmlFor="role">Role</label>
      {!update ? (
        <select
          name=""
          id="role"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          required
        >
          <option value="">Vous etes?</option>
          <option value="admin">Administrateur</option>
          <option value="collaborateur">Collaborateur</option>
        </select>
      ) : (
        <select
          name=""
          id="role"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="">Vous etes?</option>
          <option value="admin">Administrateur</option>
          <option value="collaborateur">Collaborateur</option>
        </select>
      )}
    </>
  );
}
