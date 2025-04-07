import { useState } from "react";
import "./logup.css"


export default function Logup() {
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    username: "",
    tel: "",
    email: "",
    password: "",
    role: "admin",
    photoProfil: "",
  });
  console.log(data.role);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("prenom", data.prenom);
    formData.append("username", data.username);
    formData.append("tel", data.tel);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);

    if (data.photoProfil) {
      formData.append("photoProfil", data.photoProfil);
    }
    fetch("http://localhost:4000/logup", {
      method: "POST",
      body: formData,
    })
      .then((req) => req.json())
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div>
      <form
        method="post"
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          className="border-2 border-black rounded py-1"
          value={data.nom}
          onChange={(e) => setData({ ...data, nom: e.target.value })}
        />

        <label htmlFor="prenom">Prenom</label>
        <input
          type="text"
          id="prenom"
          className="border-2 border-black rounded py-1"
          value={data.prenom}
          onChange={(e) => setData({ ...data, prenom: e.target.value })}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="border-2 border-black rounded py-1"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <label htmlFor="tel">Téléphone</label>
        <input
          type="text"
          id="tel"
          className="border-2 border-black rounded py-1"
          value={data.tel}
          onChange={(e) => setData({ ...data, tel: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border-2 border-black rounded py-1"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          className="border-2 border-black rounded py-1"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <label htmlFor="role">Role</label>
        <select
          name=""
          id="role"
          className="border-2 border-black rounded py-1"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="admin">Administrateur</option>
          <option value="collab">Collaborateur</option>
        </select>

        <label htmlFor="photo">Photo de profil</label>
        <input
          type="file"
          id="photo"
          name="photoProfil"
          className="border-2 border-black rounded py-1"
          onChange={(e) => setData({ ...data, photoProfil: e.target.files[0] })}
        />

        <button type="submit" className="btn bg-blue-400">
          Envoyer
        </button>
      </form>
    </div>
  );
}
