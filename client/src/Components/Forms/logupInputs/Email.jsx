export default function Email({data,setData,update}) {
  return (
    <>
        <label htmlFor="email">Email</label>
        {update ? <input
          type="email"
          id="email"
          className="border-2 border-gray-300 rounded p-2.5"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Saisissez votre email"
          disabled
        /> : <input
        type="email"
        id="email"
        className="border-2 border-gray-300 rounded p-2.5"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder="Saisissez votre email"
        required
      />}
    </>
  )
}