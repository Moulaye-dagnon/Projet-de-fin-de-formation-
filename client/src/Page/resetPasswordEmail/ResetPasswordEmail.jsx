import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ResetPasswordEmail() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((req) => {
        if(req.status === 200){
          toast.success("Verifiez votre boite mail")
        }else if(req.status === 409){
          toast.error("Compte introuvable!")
        }
        return req.json()
      })
      .catch(e=>{
        toast.error("Une erreur est survenue!")
      })
  }
  return (
    <div className="box lg:flex">
      <div className="flex-grow-1 p-20 bg-gray-100 h-screen">
        <p className="text-start mb-30 text-xl">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black text-3xl font-bold">
          Récupération du compte
        </h1>
        <form
          className="flex flex-col gap-3"
          method="post"
          onSubmit={handleSubmit}
        >
          <label htmlFor="nom">E-mail</label>
          <input
            type="text"
            id="nom"
            className="border-2 border-gray-300 rounded p-2.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn rounded w-30 p-2 ms-auto cursor-pointer text-gray-50"
          >
            Envoyer
          </button>
        </form>
        {response && response}
      </div>

      <div className="flex-grow-1 right-box w-52 hidden lg:block h-screen">
        <img className="h-screen w-screen" src="/img1.avif" alt="image" />
      </div>
      <ToastContainer/>
    </div>
  );
}
