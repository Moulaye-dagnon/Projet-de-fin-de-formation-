import { Link } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../Context/ProjectContext";
import { UserContext } from "../../Context/UserContext";
export default function ViewUsersComponent() {
  const { user, token, logout } = useContext(UserContext);
  const {projectId} = useParams()

  const {
    projets,
    setProjets,
    tasks,
    setTasks,
    projectUsers,
    setProjectUsers,
  } = useContext(ProjectContext);
  const showUsers = projectUsers.slice(0, 2);
  return (
    <div className="border-[#50b1a1] shadow-lg rounded-3xl bg-white w-full h-1/3 p-4 flex flex-col gap-2">
      <div className="header flex justify-between border-b">
        <p className="font-bold">Team</p>
      </div>
      <div className="flex-grow-1 flex flex-col gap-4">
        {showUsers.map((u) => (
          <div className="flex items-center" key={u._id}>
            <img
              src={
                u.photoProfil
                  ? `http://localhost:4000/images/${u.photoProfil}`
                  : "/src/assets/profil.jpg"
              }
              alt="k"
              className="w-12 h-12 rounded-[50%] inline m"
            />
            <p className="ml-2">
              {u.nom} {u.prenom}
            </p>
            <span className="ml-auto cursor-pointer">
              <Link to={`/dashboard/users/user/${u._id}`}>
                <i className="fas fa-eye"></i>
              </Link>
            </span>
          </div>
        ))}
      </div>
      <div className="footer border-t">
        <Link to={`/dashboard/users/${projectId}`}>
          <p className="font-bold text-sm text-end">
            View all({projectUsers && projectUsers.length - showUsers.length})
          </p>
        </Link>
      </div>
    </div>
  );
}
