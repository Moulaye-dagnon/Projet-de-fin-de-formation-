export default function UserName({ data, setData, update }) {
  return (
    <>
      <label htmlFor="username">Username</label>
      {!update ? (
        <input
          type="text"
          id="username"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Saisissez votre nom d'utilisateur"
          required
        />
      ) : (
        <input
          type="text"
          id="username"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Saisissez votre nom d'utilisateur"
        />
      )}
    </>
  );
}
