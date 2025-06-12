export default function Tel({ data, setData, update }) {
  return (
    <>
      <label htmlFor="tel">Téléphone</label>
      {!update ? (
        <input
          type="tel"
          id="tel"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.telephone}
          onChange={(e) => setData({ ...data, telephone: e.target.value })}
          placeholder="+212 6 12 34 56 78"
          pattern="^\+212[5-7]\d{8}$"
          required
        />
      ) : (
        <input
          type="tel"
          id="tel"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.telephone}
          onChange={(e) => setData({ ...data, telephone: e.target.value })}
          placeholder="+212 6 12 34 56 78"
          pattern="^\+212[5-7]\d{8}$"
        />
      )}
    </>
  );
}
