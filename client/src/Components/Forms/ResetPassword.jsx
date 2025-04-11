import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [validate, setValidate] = useState(true)
  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    setValidate(true)
    if(ConfirmPassword === password){
      fetch("http://localhost:4000/set-new-password", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      })
        .then((req) => req.json())
        .then((res) => {
          navigate("/login");
        });
    }else{
      setValidate("")
    }
    
  }
  return (
    <div className="box lg:flex">
      <div className="flex-grow-1 p-20 bg-gray-100 h-screen">
        <p className="text-start mb-30 text-xl">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black text-3xl font-bold">
          Réinitialisation du mot de passe
        </h1>
        <form
          className="flex flex-col gap-3"
          method="post"
          onSubmit={handleSubmit}
        >
          <label htmlFor="mdp">Nouveau mot de passe</label>
          <input
            type="password"
            id="mdp"
            className="border-2 border-black rounded py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm">Confirmation</label>
          <input
            type="password"
            id="confirm"
            className="border-2 border-black rounded py-1"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!validate && <p className="text-red-500">Mot de passe non conformes!</p>}
          <button type="submit" className="btn rounded w-30 p-2 ms-auto cursor-pointer text-gray-50">Envoyer</button>
        </form>
      </div>

      <div className="flex-grow-1 right-box w-52 hidden lg:block h-screen">
          <img className="h-screen w-screen" src="/img1.avif" alt="image" />
        </div>
    </div>
  );
}
