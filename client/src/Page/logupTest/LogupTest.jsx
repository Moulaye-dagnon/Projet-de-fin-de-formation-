import { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Nom from "../../Components/Forms/logupInputs/Nom";
import Prenom from "../../Components/Forms/logupInputs/Prenom";
import Email from "../../Components/Forms/logupInputs/Email";
import UserName from "../../Components/Forms/logupInputs/UserName";
import Password from "../../Components/Forms/logupInputs/Password";
import Tel from "../../Components/Forms/logupInputs/Tel";
import Role from "../../Components/Forms/logupInputs/Role";
import Fdp from "../../Components/Forms/logupInputs/Fdp";
import { createPortal } from "react-dom";
import ErrorModal from "../../Components/Modals/ErrorModal";
import { fetchLogup } from "../../api/fetchLogup";
import Poste from "../../Components/Forms/logupInputs/Poste";
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
  ];

  const [canSubmit, setCanSubmit] = useState("");
  const [current, setCurrent] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (current < 7) {
      if (current === 6) {
        setCanSubmit(true);
      }
      setCurrent(current + 1);
    } else {
      fetch("http://localhost:4000/logup", {
        method: "POST",
        body: formData,
      })
        .then((req) => {
          if (req.status === 201) {
            toast.success("Utilisateur crée avec succès!");
          } else if (req.status === 409) {
            toast.error("Vous avez fourni un email déjà existant!");
          } else {
            toast.error("Une erreur est survenue!");
          }
          return req.json();
        })
        .then((res) => {
          setLoading(false);
          if (res === "Cet utilisateur existe déjà..." || res.error) {
            console.log(res);
          } else {
            setCanSubmit("");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        })
        .catch((error) => {
          toast.error("Une erreur est survenue!");
        });
    }
  }
  function handleSkip(e) {
    if (current === 6) {
      setCanSubmit(true);
    }
    setCurrent(current + 1);
  }
  function handlePrevious() {
    setCurrent(current - 1);
  }
  return (
    <div className="box  md:flex h-screen overflow-hidden">
      <div className="left-box flex-grow-1 p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen md:min-h-0 md:flex md:flex-col md:justify-center">
        <p className="text-start sm:mb-30 mb-16 sm:text-xl text-sm">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black sm:text-2xl font-bold ">
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
          {current === 5 && <Poste data={fields} setData={setFields} />}
          {current === 6 && <Tel data={fields} setData={setFields} />}
          {current === 7 && <Fdp data={fields} setData={setFields} />}
          {current === 0 && <Nom data={fields} setData={setFields} />}

          <p className="text-sm">
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
        {(current === 3 || current === 7 || current === 6) && (
          <a
            onClick={handleSkip}
            className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded "
          >
            Passer
          </a>
        )}
      </div>

      <div className="right-box w-full md:w-1/5 flex-grow-1 hidden md:block h-full">
        <img
          className="object-cover w-full h-full"
          src={
            current
              ? filter.find((field) => field.champ === current)?.url
              : "/img1.avif"
          }
          alt="image"
        />
      </div>
      <ToastContainer />
    </div>
  );
}
