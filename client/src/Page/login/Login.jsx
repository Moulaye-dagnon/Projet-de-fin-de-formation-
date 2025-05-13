import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Email from "../../Components/Forms/logupInputs/Email";
import Password from "../../Components/Forms/logupInputs/Password";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { fetchLogin } from "../../api/fetchLogin";
import { ProjectContext } from "../../Context/ProjectContext";
import { fetchProjet } from "../../api/fetchProjet";
import { ToastContainer } from "react-toastify";

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
    removeTwo,
  } = useContext(ProjectContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetchLogin(data, setError, login, navigate);
  }

  return (
    <div className="box lg:flex">
      <div className="left-box flex-grow-1 p-20 bg-gray-100 h-full">
        <p className="text-start sm:mb-30 mb-16 sm:text-xl text-sm">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black sm:text-3xl font-bold">
          Connectez vous à votre compte GPC
        </h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-3"
        >
          <Email data={data} setData={setData} />
          <Password data={data} setData={setData} />

          <p className="text-sm">
            Vous n'avez pas de compte?{" "}
            <a className="text-[#50b1a1]">
              <Link to="/loguptest">S'inscrire'</Link>
            </a>
          </p>
          <p className="text-sm">
            Mot de passe oublié?{" "}
            <a className="text-[#50b1a1]">
              <Link to="/resetpasswordemail">Réinitialiser</Link>
            </a>
          </p>
          <button
            className="btn rounded p-2 ms-auto cursor-pointer text-gray-50"
            type="submit"
          >
            Se connecter
          </button>
          
        </form>
      </div>

      <div className="right-box w-52 flex-grow-1 hidden lg:block h-screen">
        <img className="h-screen w-screen" src="/img1.avif" alt="image" />
      </div>
      <ToastContainer/>
    </div>
  );
}
