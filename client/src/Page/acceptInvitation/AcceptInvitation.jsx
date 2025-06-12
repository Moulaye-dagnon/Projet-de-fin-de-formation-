import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nom from "../../Components/Forms/logupInputs/Nom";
import Prenom from "../../Components/Forms/logupInputs/Prenom";
import UserName from "../../Components/Forms/logupInputs/UserName";
import Password from "../../Components/Forms/logupInputs/Password";
import Tel from "../../Components/Forms/logupInputs/Tel";
import Fdp from "../../Components/Forms/logupInputs/Fdp";
import { createPortal } from "react-dom";
import ErrorModal from "../../Components/Modals/ErrorModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectContext } from "../../Context/ProjectContext";
import { UserContext } from "../../Context/UserContext";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000/", { transports: ["websocket"] });

export default function AcceptInvitation() {
  const navigate = useNavigate();
  const param = useParams();
  const { projets } = useContext(ProjectContext);
  const { user, token } = useContext(UserContext);
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
    {
      champ: 8,
      url: "/img2.avif",
    },
  ];
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/project/users/finduserinvite/${param.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("*");
        } else if (res.status === 200) {
          socket.emit("add-user");
          navigate("/login");
        }

        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          setFields({
            ...fields,
            email: data.email,
          });
        }, 1500);
      })
      .catch((err) => {
        setTimeout(() => {
          console.error("Erreur:", err);
          setLoading(false);
        }, timeout);
      });
  }, []);

  const [canSubmit, setCanSubmit] = useState("");
  const [current, setCurrent] = useState(0);
  function handleSubmit(e) {
    e.preventDefault();
    if (current < 5) {
      if (current === 4) {
        setCanSubmit(true);
      }
      setCurrent(current + 1);
    } else {
      setLoading(true);
      fetch(`http://localhost:4000/logup/acceptInvitation/${param.token}`, {
        method: "POST",
        headers: {},
        credentials: "include",

        body: formData,
      }).then((req) => {
        if (req.status === 201) {
          setTimeout(() => {
            setLoading(false);
            socket.emit("add-user");
            navigate("/login");
          }, 1500);
          toast.success("Compte créer avec succès!");
        } else {
          setTimeout(() => {
            setLoading(false);
            toast.error("Une erreur est survenue!");
          }, 1500);
        }
        return req.json();
      });
    }
  }
  function handleSkip(e) {
    if (current === 4) {
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
          Créer un compte GPC
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
          {current === 2 && <UserName data={fields} setData={setFields} />}
          {current === 3 && <Password data={fields} setData={setFields} />}
          {current === 4 && <Tel data={fields} setData={setFields} />}
          {current === 5 && <Fdp data={fields} setData={setFields} />}
          {current === 0 && <Nom data={fields} setData={setFields} />}

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
        {(current === 2 || current === 4 || current === 5) && (
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
      {loading && <ErrorModal />}
      <ToastContainer />
    </div>
  );
}
