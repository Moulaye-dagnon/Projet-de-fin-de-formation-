import { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Nom from "./logupInputs/Nom";
import Prenom from "./logupInputs/Prenom";
import Email from "./logupInputs/Email";
import UserName from "./logupInputs/UserName";
import Password from "./logupInputs/Password";
import Tel from "./logupInputs/Tel";
import Role from "./logupInputs/Role";
import Fdp from "./logupInputs/Fdp";
import { createPortal } from "react-dom";
import ErrorModal from "./ErrorModal";

export default function LogupTest() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    nom: "",
    prenom: "",
    email: "",
    username: "",
    tel: "",
    password: "",
    role: "",
    photoProfil: "",
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const formData = new FormData();
  formData.append("nom", fields.nom);
  formData.append("prenom", fields.prenom);
  formData.append("username", fields.username);
  formData.append("tel", fields.tel);
  formData.append("email", fields.email);
  formData.append("password", fields.password);
  formData.append("role", fields.role);
  formData.append("photoProfil", fields.photoProfil);

  const [isSubmited, setIsSubmited] = useState("");

  const errorModal = createPortal(<ErrorModal />, document.body);

  const filter = [
    {
      champ: "nom",
      url: "/img1.avif",
    },
    {
      champ: "prenom",
      url: "/img4.avif",
    },
    {
      champ: "email",
      url: "/img4.avif",
    },
    {
      champ: "password",
      url: "/img3.avif",
    },
    {
      champ: "tel",
      url: "/img5.avif",
    },
    {
      champ: "username",
      url: "/img1.avif",
    },
    {
      champ: "role",
      url: "/img2.avif",
    },
  ];

  const [canSubmit, setCanSubmit] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (isSubmited === "role") {
      setCanSubmit(true);
    }

    if (
      fields.nom &&
      !fields.prenom &&
      !fields.email &&
      !fields.password &&
      !fields.photoProfil &&
      !fields.role &&
      !fields.username &&
      !fields.tel
    ) {
      setIsSubmited("nom");
    } else if (
      fields.prenom &&
      !fields.email &&
      !fields.password &&
      !fields.photoProfil &&
      !fields.role &&
      !fields.username &&
      !fields.tel
    ) {
      setIsSubmited("prenom");
    } else if (
      fields.email &&
      !fields.password &&
      !fields.photoProfil &&
      !fields.role &&
      !fields.username &&
      !fields.tel
    ) {
      setIsSubmited("email");
    } else if (
      fields.password &&
      !fields.photoProfil &&
      !fields.role &&
      !fields.tel
    ) {
      setIsSubmited("password");
    } else if (fields.role && !fields.photoProfil) {
      if (!canSubmit) {
        setIsSubmited("role");
        setCanSubmit(true);
      } else {
        fetch("http://localhost:4000/logup", {
          method: "POST",
          body: formData,
        })
          .then((req) => {
            setLoading(true);
            return req.json();
          })
          .then((res) => {
            if (res === "Cet utilisateur existe déjà..." || res.error) {
              setFormError(true)
              setLoading(false);
            } else{
              console.log(res)
              setCanSubmit("");
              setFormError(false)
              setLoading(false);
              navigate("/login");
            }
            console.log(formError)

          });
      }
    } else if (
      fields.username &&
      !fields.password &&
      !fields.photoProfil &&
      !fields.role &&
      !fields.tel
    ) {
      setIsSubmited("username");
    } else if (fields.tel && !fields.photoProfil && !fields.role) {
      setIsSubmited("tel");
    } else if (canSubmit === true) {
      console.log("envoyé");
      fetch("http://localhost:4000/logup", {
        method: "POST",
        body: formData,
      })
        .then((req) => {
          setLoading(true);
          return req.json();
        })
        .then((res) => {
          if (res === "Cet utilisateur existe déjà..." || res.error) {
            setFormError(true)
            setLoading(false);
          } else{
            console.log(res)
            setCanSubmit("");
            setFormError(false)
            setLoading(false);
            navigate("/login");
          }
        });
    }
  }
  function handleSkip(e) {
    if (isSubmited === "password") {
      setIsSubmited("tel");
    } else if (isSubmited === "role") {
      setCanSubmit(true);
    } else if (isSubmited === "email") {
      setIsSubmited("username");
    }
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
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3"
          encType="multipart/form-data"
        >
          {isSubmited === "nom" && <Prenom data={fields} setData={setFields} />}
          {isSubmited === "prenom" && (
            <Email data={fields} setData={setFields} />
          )}
          {isSubmited === "email" && (
            <UserName data={fields} setData={setFields} />
          )}
          {isSubmited === "username" && (
            <Password data={fields} setData={setFields} />
          )}
          {isSubmited === "tel" && <Role data={fields} setData={setFields} />}
          {isSubmited === "password" && (
            <Tel data={fields} setData={setFields} />
          )}
          {isSubmited === "role" && (
            <>
              <Email data={fields} setData={setFields} />{" "}
              <Fdp data={fields} setData={setFields} />
            </>
          )}
          {isSubmited === "" && <Nom data={fields} setData={setFields} />}

          <p>
            Vous avez déjà un compte?{" "}
            <a className="text-blue-600">
              <Link to="/login">Se connecter</Link>
            </a>
          </p>
          {formError && (
            <p className="text-red-500">
              Vous essayez peut etre de vous connecter avec un mail déjà
              utilisé!
            </p>
          )}
          <button
            className="btn rounded w-30 p-2 ms-auto cursor-pointer text-gray-50"
            type="submit"
          >
            {!canSubmit ? "Suivant" : "Envoyer"}
          </button>
        </form>
        {(isSubmited === "password" || isSubmited === "email") && (
          <a onClick={handleSkip} className="cursor-pointer" type="submit">
            Passer
          </a>
        )}
      </div>

      <div className="right-box w-52 flex-grow-1 hidden lg:block h-screen">
        <img
          className="h-screen w-screen"
          src={
            isSubmited
              ? filter.find((field) => field.champ === isSubmited)?.url
              : "/img1.avif"
          }
          alt="image"
        />
      </div>
      {loading === true && errorModal}
    </div>
  );
}
