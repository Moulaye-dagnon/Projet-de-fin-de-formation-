import { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Nom from "../Forms/logupInputs/Nom";
import Prenom from "../Forms/logupInputs/Prenom";
import Email from "../Forms/logupInputs/Email";
import UserName from "../Forms/logupInputs/UserName";
import Password from "../Forms/logupInputs/Password";
import Tel from "../Forms/logupInputs/Tel";
import Role from "../Forms/logupInputs/Role";
import Fdp from "../Forms/logupInputs/Fdp";
import { createPortal } from "react-dom";
import ErrorModal from "../Modals/ErrorModal";
import { fetchLogup } from "../../Utils/fetchLogup";
import Poste from "../Forms/logupInputs/Poste";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogupTest() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    nom: "",
    prenom: "",
    email: "",
    username: "",
    telephone: "",
    password: "",
    role: "",
    poste: "",
    photoProfil: "",
  });
  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("nom", fields.nom);
  formData.append("prenom", fields.prenom);
  formData.append("username", fields.username);
  formData.append("tel", fields.telephone);
  formData.append("email", fields.email);
  formData.append("password", fields.password);
  formData.append("role", fields.role);
  formData.append("poste", fields.poste);
  formData.append("photoProfil", fields.photoProfil);

  const errorModal = createPortal(<ErrorModal />, document.body);

  const filter = [
    {
      champ: 0,
      url: "/img1.avif",
    },
    {
      champ: 1,
      url: "/img4.avif",
    },
    {
      champ: 2,
      url: "/img4.avif",
    },
    {
      champ: 3,
      url: "/img3.avif",
    },
    {
      champ: 4,
      url: "/img5.avif",
    },
    {
      champ: 5,
      url: "/img1.avif",
    },
    {
      champ: 6,
      url: "/img2.avif",
    },
    {
      champ: 7,
      url: "/img2.avif",
    },
    {
      champ: 8,
      url: "/img2.avif",
    },
  ];

  const [canSubmit, setCanSubmit] = useState("");
  const [current, setCurrent] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (current < 8) {
      if (current === 7) {
        setCanSubmit(true);
      }
      setCurrent(current + 1);
    } else {
      fetch("http://localhost:4000/logup", {
        method: "POST",
        body: formData,
      })
        .then((req) => {
          if(req.status === 201){
            toast.success("Utilisateur crée avec succès!")
          }else if(req.status === 409){
            toast.error("Vous avez fourni un email déjà existant!")
          }else{
            toast.error("Une erreur est survenue!")
          }
          return req.json();
        })
        .then((res) => {
          setLoading(false);
          if (res === "Cet utilisateur existe déjà..." || res.error) {
            console.log(res)
          } else {
            setCanSubmit("");
            setTimeout(() => {
              navigate("/login")
            }, 3000);
          }
        }).catch(error=>{
          toast.error("Une erreur est survenue!")
        })
    }
  }
  function handleSkip(e) {
    if (current === 7) {
      setCanSubmit(true);
    }
    setCurrent(current + 1);
  }
  function handlePrevious() {
    setCurrent(current - 1);
  }
  return (
    <div className="box lg:flex">
      <div className="left-box flex-grow-1 p-20 bg-gray-100 h-screen">
        <p className="text-start mb-30 text-xl">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black text-3xl font-bold">
          Inscrivez-vous sur GPC
        </h1>
        <p className="mb-10 text-start text-gray-400">
          Complètez vos informations
        </p>
        <form
          method="post"
          className="flex flex-col gap-3"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {current === 1 && <Prenom data={fields} setData={setFields} />}
          {current === 2 && <Email data={fields} setData={setFields} />}
          {current === 3 && <UserName data={fields} setData={setFields} />}
          {current === 4 && <Password data={fields} setData={setFields} />}
          {current === 5 && <Role data={fields} setData={setFields} />}
          {current === 6 && <Poste data={fields} setData={setFields} />}
          {current === 7 && <Tel data={fields} setData={setFields} />}
          {current === 8 && <Fdp data={fields} setData={setFields} />}
          {current === 0 && <Nom data={fields} setData={setFields} />}

          <p>
            Vous avez déjà un compte?{" "}
            <a className="text-[#50b1a1]">
              <Link to="/login">Se connecter</Link>
            </a>
          </p>
          
          <div className="flex gap-4 ms-auto">
            {current !== 0 && (
              <a
                className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                onClick={handlePrevious}
              >
                Précédent
              </a>
            )}

            <button
              className="btn rounded w-30 p-2 cursor-pointer text-gray-50"
              type="submit"
            >
              {!canSubmit ? "Suivant" : "Envoyer"}
            </button>
          </div>
        </form>
        {(current === 3 || current === 7 || current === 5) && (
          <a
            onClick={handleSkip}
            className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded "
          >
            Passer
          </a>
        )}
      </div>

      <div className="right-box w-52 flex-grow-1 hidden lg:block h-screen">
        <img
          className="h-screen w-screen"
          src={
            current
              ? filter.find((field) => field.champ === current)?.url
              : "/img1.avif"
          }
          alt="image"
        />
      </div>
      <ToastContainer/>
    </div>
  );
}
