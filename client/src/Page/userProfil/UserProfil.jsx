import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dateFormat } from "../../Utils/dateFormat";
import { UserContext } from "../../Context/UserContext";
import { ProjectContext } from "../../Context/ProjectContext";

export default function UserProfil() {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState("");
  const { user, token, logout, setToken } = useContext(UserContext);
  const [myTasks, setMyTasks] = useState("");
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
  const getLastConnexion = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((req) => {
      if (req.status === 401) {
        logout();
        navigate("/login");
      } else {
        return req.json();
      }
    });
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
        setUserData(res);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:4000/tasks/projecttaskbyuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projet_id: projets._id, user_id: params.id }),
    })
      .then((req) => req.json())
      .then((res) => {
        setMyTasks(res);
      });
  }, []);

  let taskTodo;
  let taskDoing;
  let taskDone;
  let totalTaches;
  let pourcentage;
  if (myTasks) {
    totalTaches = myTasks.reduce(
      (acc, current) => acc + current.tasks.length,
      0
    );
    taskTodo = myTasks.find((t) => t._id === "todo")?.tasks.length;
    taskDoing = myTasks.find((t) => t._id === "doing")?.tasks.length;
    taskDone = myTasks.find((t) => t._id === "done")?.tasks.length;
  }

  if (taskDone > 0) {
    pourcentage = (taskDone * 100) / totalTaches;
  } else {
    taskDone = 0;
    pourcentage = 0;
  }
  const isAdmin = projets?.owners?.find((owner) => owner === userData?._id);
  return (
    userData && (
      <div className="h-full sm:h-[calc(100svh-90px)] overflow-auto flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={
                userData?.photoProfil
                  ? `http://localhost:4000/images/${userData.photoProfil}`
                  : "/profil.jpg"
              }
              alt="Photo de profil"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
            />

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.prenom} {userData.nom}
              </h2>
              <p className="text-gray-600">{userData.email}</p>
              {userData.telephone && (
                <p className="text-gray-600">{userData.telephone}</p>
              )}
              {userData.username && (
                <p className="text-gray-600">{userData.username}</p>
              )}
              {userData._id === user.id && (
                <button className="mt-4 bg-[#50b1a1] hover:bg-[#3e978c] text-white px-4 py-2 rounded-xl font-medium transition-all cursor-pointer">
                  <Link
                    to={`/dashboard/users/user/update-user/${userData._id}`}
                  >
                    Modifier mon profil
                  </Link>
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Rôle</p>
              <p className="text-lg font-medium text-gray-800">
                {isAdmin ? "Administrateur" : "Collaborateur"}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Date d'inscription</p>
              <p className="text-lg font-medium text-gray-800">
                {dateFormat(userData.created_At)}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Dernière activité</p>
              <p className="text-lg font-medium text-green-600">
                {userData.last_connexion &&
                  getLastConnexion(userData.last_connexion)}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Poste</p>
              <p className="text-lg font-medium text-gray-800">
                {userData.poste}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Taches à faire</p>
              <p className="text-lg font-medium text-red-800">
                {taskTodo ? taskTodo : "0"}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Taches en cours</p>
              <p className="text-lg font-medium text-gray-800">
                {taskDoing ? taskDoing : "0"}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Taches terminés</p>
              <p className="text-lg font-medium text-green-800">
                {taskDone ? taskDone : "0"}
              </p>
            </div>
            <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Statut d'avancement</p>
              <p className="text-lg font-medium text-gray-800">
                {pourcentage <= 0 ? "Aucune tache terminé" : `${pourcentage}%`}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
