export default function Fdp({data,setData}) {
  return (
    <>
        <label htmlFor="photo">Photo de profil</label>
        <input
          type="file"
          id="photo"
          name="photoProfil"
          className="border-2 border-gray-300 rounded p-2.5"
          onChange={(e) => setData({ ...data, photoProfil: e.target.files[0] || null})}
          placeholder="Inserez votre photo de profil"
        />
    </>
  )
}