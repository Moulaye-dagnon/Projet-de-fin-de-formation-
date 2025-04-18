import { useState } from "react";
import "./logup.css"
import 'bootstrap/dist/css/bootstrap.min.css';



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
        className="flex flex-col gap-3 "
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
<div className="pdiv">
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          className="rounded"
          value={data.nom}
          onChange={(e) => setData({ ...data, nom: e.target.value })}
        /> </div>

<div className="pdiv">
        <label htmlFor="prenom">Prénom</label>
        <input
          type="text"
          id="prenom"
          className="rounded"
          class="text"
          value={data.prenom}
          onChange={(e) => setData({ ...data, prenom: e.target.value })}
        /></div>

<div className="pdiv">

        <label htmlFor="username">Nom d’utilisateur</label>
        <input
          type="text"
          id="username"
          className="rounded"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        /></div>

<div className="pdiv">
        <label htmlFor="tel">Téléphone</label>
        <input
          type="text"
          id="tel"
          className="rounded"
          value={data.tel}
          onChange={(e) => setData({ ...data, tel: e.target.value })}
        /></div>
    
<div className="pdiv">
        <label htmlFor="email">Adresse mail</label>
        <input
          type="email"
          id="email"
          className="rounded"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        /></div>

<div className="pdiv">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          className="rounded"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        /></div>

<div className="pdiv">
        <label htmlFor="role">Rôle  </label>
        <select
          name=""
          id="role"
          className="rounded"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="admin">Administrateur</option>
          <option value="collab">Collaborateur</option>
        </select></div>

<div className="pdiv">
        <label htmlFor="photo">Photo de profil  </label>
        <input
          type="file"
          id="photo"
          name="photoProfil"
          className="rounded photo"
          onChange={(e) => setData({ ...data, photoProfil: e.target.files[0] })}
        /></div>

        <button type="submit" className="btn btn-primary">
          Envoyer
        </button>
      </form>
    </div>
  );
}
