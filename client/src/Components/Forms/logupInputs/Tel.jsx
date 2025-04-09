export default function Tel({data,setData}) {
  return (
    <>
        <label htmlFor="tel">Téléphone</label>
        <input
          type="text"
          id="tel"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.tel}
          onChange={(e) => setData({ ...data, tel: e.target.value })}
          placeholder="Saisissez votre numéro de téléphone"
        />
    </>
  )
}