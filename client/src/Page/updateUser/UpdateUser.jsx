import { useNavigate, useParams } from "react-router-dom";
import Nom from "../../Components/Forms/logupInputs/Nom";
import Prenom from "../../Components/Forms/logupInputs/Prenom";
import Email from "../../Components/Forms/logupInputs/Email";
import UserName from "../../Components/Forms/logupInputs/UserName";
import Password from "../../Components/Forms/logupInputs/Password";
import Tel from "../../Components/Forms/logupInputs/Tel";
import Role from "../../Components/Forms/logupInputs/Role";
import Fdp from "../../Components/Forms/logupInputs/Fdp";
import Poste from "../../Components/Forms/logupInputs/Poste";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdateUser() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, token, logout, setToken } = useContext(UserContext);

  const [fields, setFields] = useState({
    nom: "",
    prenom: "",
    email: "",
    username: "",
    password: "",
    newPassword: "",
    poste: "",
    telephone: "",
    photoProfil: null,
  });
  const [validate, setValidate] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("nom", fields.nom);
  formData.append("prenom", fields.prenom);
  formData.append("username", fields.username);
  formData.append("telephone", fields.telephone);
  formData.append("email", fields.email);
  formData.append("password", fields.password);
  formData.append("poste", fields.poste);
  formData.append("photoProfil", fields.photoProfil);
  useEffect(() => {
    try {
      fetch("http://localhost:4000/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then((req) => {
        if (req.status === 401) {
          logout();
          navigate("/login");
          return;
        } else {
          return req.json();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [token]);
  useEffect(() => {
    fetch(`http://localhost:4000/users/user/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((req) => req.json())
      .then((res) => {
        setFields({
          ...fields,
          nom: res[0].nom,
          prenom: res[0].prenom,
          email: res[0].email,
          username: res[0].username,
          poste: res[0].poste,
          telephone: res[0].telephone,
        });
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (fields.newPassword !== fields.password) {
      setValidate("");
      toast.error("Mots de passe non conformes");
    } else {
      setLoading(true);
      setValidate(!validate);
      fetch("http://localhost:4000/update-account", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((req) => {
          if (req.status === 200) {
            setValidate(!validate);
            toast.success("Modifications enregistrée!");
          } else {
            toast.error("Une erreur s'est produite!");
            setValidate("");
          }
          return req.json();
        })
        .then((res) => {
          setLoading(false);
          setTimeout(() => {
            toast.dismiss();
            logout();
          }, 2000);
        })
        .catch((error) => {
          toast.error("Une erreur s'est produite!");
        });
    }
  }
  return (
    <div className="max-w-2xl md:max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Modifier mes informations
      </h2>

      <form className="">
        <div className="grid grid-cols-2 items-center gap-3">
          <Nom data={fields} setData={setFields} update={true} />
          <Prenom data={fields} setData={setFields} update={true} />
          <Email data={fields} setData={setFields} update={true} />
          <UserName data={fields} setData={setFields} update={true} />
          <Password data={fields} setData={setFields} update={true} />
          <Poste data={fields} setData={setFields} update={true} />
          <Tel data={fields} setData={setFields} update={true} />
          <Fdp data={fields} setData={setFields} update={true} />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="reset"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#50b1a1] text-white rounded-lg hover:bg-[#3f9488] cursor-pointer"
            onClick={handleSubmit}
            disabled={loading}
          >
            Enregistrer
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
