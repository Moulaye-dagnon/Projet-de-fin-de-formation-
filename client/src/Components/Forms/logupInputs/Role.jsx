export default function Role({data,setData}) {
  return (
    <>
        <label htmlFor="role">Role</label>
        <select
          name=""
          id="role"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="">Vous etes?</option>
          <option value="admin">Administrateur</option>
          <option value="collab">Collaborateur</option>
        </select>
    </>
  )
}