import UsersComponent from "../UsersComponent";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../../Context/ProjectContext";
import { UserContext } from "../../Context/UserContext";
import AddUserComponent from "../AddUserComponent";
export default function Users() {
  const navigate = useNavigate()
  const {
    projets,
    setProjets,
    tasks,
    setTasks,
    projectUsers,
    setProjectUsers
  } = useContext(ProjectContext);

  const { user, token, logout } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((req) => {
        if (req.status === 401) {
          logout();
          navigate("/login");
        } else {
          return req.json();
        }
      })
  }, [token]);
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 place-items-center mt-4 mb-4">
      {projets &&
        projectUsers.map((user) => (
          <UsersComponent key={user._id} user={user} />
        ))}
        <AddUserComponent/>
    </div>
  );
}
