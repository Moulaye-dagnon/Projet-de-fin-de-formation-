export default function Password({data,setData}) {
  return (
    <>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Saisissez votre mot de passe"
          required
        />
    </>
  )
}