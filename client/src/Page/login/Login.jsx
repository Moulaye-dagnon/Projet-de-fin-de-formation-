import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Email from "../../Components/Forms/logupInputs/Email";
import Password from "../../Components/Forms/logupInputs/Password";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { fetchLogin } from "../../api/fetchLogin";
import { ToastContainer } from "react-toastify";
import Spinner from "../../../public/spinner.svg"
import ErrorModal from "../../Components/Modals/ErrorModal";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState("")

  const { login } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetchLogin(data, login, navigate,setLoading);
  }

  return (
    <div className="box md:flex h-screen overflow-hidden">
      <div className="left-box flex-grow-1 p-4 md:p6 bg-gray-100 min-h-screen md:min-h-0 md:flex md:flex-col md:justify-center">
        <p className="text-start sm:mb-10 mb-16 sm:text-xl text-sm">
          <strong className="font-bold">GPC</strong> Gestion de Projet
          Collaboratif
        </p>
        <h1 className="text-start text-black sm:text-2xl font-bold">
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

      <div className="right-box w-full md:w-1/5 flex-grow-1 hidden md:block h-full">
        <img
          className="h-full w-full object-fill"
          src="/img1.avif"
          alt="image"
        />
      </div>
      {loading && <ErrorModal/>}
      <ToastContainer />
    </div>
  );
}
