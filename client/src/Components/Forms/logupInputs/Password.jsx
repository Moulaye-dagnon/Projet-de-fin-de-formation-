export default function Password({ data, setData, update }) {
  return (
    <>
      <>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.password || ""}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="Saisissez votre mot de passe"
        required
      />

      </>
      {update && (
        <>
          <label htmlFor="password">Nouveau Password</label>
          <input
            type="password"
            id="newPassword"
            className="border-2 border-gray-300 rounded p-2.5"
            value={data.newPassword || ""}
            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
            placeholder="Saisissez votre mot de passe"
            required
          />
         
        </>
      )}
    </>
  );
}
