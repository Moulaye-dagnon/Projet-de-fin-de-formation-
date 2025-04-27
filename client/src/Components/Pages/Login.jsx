import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Email from "../Forms/logupInputs/Email";
import Password from "../Forms/logupInputs/Password";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { fetchLogin } from "../../Utils/fetchLogin";
import { ProjectContext } from "../../Context/ProjectContext";
import { fetchProjet } from "../../Utils/fetchProjet";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { user, token, logout, login } = useContext(UserContext);

  const [error, setError] = useState("");
  const {
    projets,
    setProjets,
    tasks,
    setTasks,
    projectUsers,
    setProjectUsers,
    removeData,
    removeTwo
  } = useContext(ProjectContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetchLogin(data, setError, login, navigate);
  }

  return (
    <div className="box lg:flex">
      <div className="left-box flex-grow-1 p-20 bg-gray-100 h-screen">
        <p className="text-start mb-30 text-xl">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black text-3xl font-bold">
          Connectez vous à votre compte GPC
        </h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3"
        >
          <Email data={data} setData={setData} />
          <Password data={data} setData={setData} />

          <p>
            Vous n'avez pas de compte?{" "}
            <a className="text-[#50b1a1]">
              <Link to="/loguptest">S'inscrire'</Link>
            </a>
          </p>
          <p>
            Mot de passe oublié?{" "}
            <a className="text-[#50b1a1]">
              <Link to="/resetpasswordemail">Réinitialiser</Link>
            </a>
          </p>
          <button
            className="btn rounded w-30 p-2 ms-auto cursor-pointer text-gray-50"
            type="submit"
          >
            Se connecter
          </button>
          {error && (
            <p className="text-red-500 text-center">
              Mot de passe ou email incorrect!
            </p>
          )}
        </form>
      </div>

      <div className="right-box w-52 flex-grow-1 hidden lg:block h-screen">
        <img className="h-screen w-screen" src="/img1.avif" alt="image" />
      </div>
    </div>
  );
}
