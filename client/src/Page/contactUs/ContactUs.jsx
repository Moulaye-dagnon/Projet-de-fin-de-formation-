import { useState } from "react";
import Email from "../../Components/Forms/logupInputs/Email";
import Nom from "../../Components/Forms/logupInputs/Nom";
import Prenom from "../../Components/Forms/logupInputs/Prenom";
import { fetchContact } from "../../api/fetchContact";
import { ToastContainer } from "react-toastify";

export default function ContactUs() {
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: "",
    objet: "",
    message: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    fetchContact(data);
  }
  return (
    <div className=" flex-1 overflow-y-auto py-10 px-2">
      <h1 className="text-sm sm:text-2xl font-bold text-center">
        Contacter l'équipe GPC
      </h1>
      <div className="mt-2  h-4/5 py-10">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Nom data={data} setData={setData} />
          <Prenom data={data} setData={setData} />
          <Email data={data} setData={setData} />
          <label htmlFor="objet">Objet</label>
          <input
            type="text"
            id="nom"
            className="border-2 border-gray-300 rounded p-2.5"
            value={data.objet}
            onChange={(e) => setData({ ...data, objet: e.target.value })}
            placeholder="Saisissez l'objet"
            required
          />
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            id="nom"
            className="border-2 border-gray-300 rounded p-2.5"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            placeholder="Saisissez le message"
            required
          />
          <button
            className="rounded p-2 ms-auto cursor-pointer text-gray-50"
            type="submit"
          >
            Envoyer
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
