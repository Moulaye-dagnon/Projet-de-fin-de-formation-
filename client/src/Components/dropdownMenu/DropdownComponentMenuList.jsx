import { All_user_project } from "../../api/all_project_by_user";
import { NavLink } from "react-router-dom";
import iconProject from "../../assets/project.svg";
import iconTask from "../../assets/task.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export function DropdownMenuList({ UserProject, handleToggleProjectUpdate }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      <ul className="flex flex-col gap-2 max-w-[280px] mx-auto ">
        {UserProject ? (
          UserProject.map((project) => {
            return (
              <li key={project._id}>
                <details className="group">
                  <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                    <span className="flex gap-2 items-center">
                      <span className="text-xs font-bold">{project.name}</span>
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </summary>

                  <article className="px-4 pb-4">
                    <ul className="flex flex-col gap-1 pl-2 mt-1">
                      <li className="flex gap-2">
                        <NavLink
                          to={`/dashboard/project/${project._id}`}
                          className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded-lg transition-all ${
                              isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                            } hover:bg-gray-100 hover:shadow-lg`
                          }
                        >
                          <span className="w-4.5 inline-block mr-2">
                            <i className="fas fa-lightbulb text-[#76b1a6]"></i>{" "}
                          </span>
                          <span className="flex-grow text-xs">Principale</span>
                        </NavLink>
                      </li>
                      <li className="flex gap-2">
                        <NavLink
                          to={`/dashboard/${project._id}/userTasks/${user.id}`}
                          className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded-lg transition-all ${
                              isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                            } hover:bg-gray-100 hover:shadow-lg`
                          }
                        >
                          <span className="w-4.5 inline-block mr-2">
                            <i className="fas fa-tasks text-[#76b1a6]"></i>{" "}
                          </span>
                          <span className="flex-grow text-xs">Mes taches</span>
                        </NavLink>
                      </li>

                      <li className="flex gap-2">
                        <NavLink
                          to={`/dashboard/users/${project._id}`}
                          className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded-lg transition-all ${
                              isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                            } hover:bg-gray-100 hover:shadow-lg`
                          }
                        >
                          <span className="w-4.5 inline-block mr-2">
                            <i className="fas fa-users text-[#76b1a6]"></i>{" "}
                          </span>
                          <span className="flex-grow text-xs">L'équipe</span>
                        </NavLink>
                      </li>

                      <li className="flex gap-2">
                        <NavLink
                          to={`/dashboard/stats/${project._id}`}
                          className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded-lg transition-all ${
                              isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                            } hover:bg-gray-100 hover:shadow-lg`
                          }
                        >
                          <span className="w-4.5 inline-block mr-2">
                            <i className="fas fa-chart-line text-[#76b1a6]"></i>
                          </span>
                          <span className="flex-grow text-xs">
                            statistiques
                          </span>
                        </NavLink>
                      </li>

                      <li
                        className="flex gap-2"
                        onClick={handleToggleProjectUpdate}
                      >
                        <NavLink
                          to={`/dashboard/project/${project._id}`}
                          className={({ isActive }) =>
                            `flex items-center w-full p-2 rounded-lg transition-all ${
                              isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                            } hover:bg-gray-100 hover:shadow-lg`
                          }
                        >
                          <span className="w-4.5 inline-block mr-2">
                            <i className="fas fa-wrench text-[#76b1a6]"></i>
                          </span>
                          <span className="flex-grow text-xs">Gérer</span>
                        </NavLink>
                      </li>
                    </ul>
                  </article>
                </details>
              </li>
            );
          })
        ) : (
          <div>Chargement</div>
        )}
      </ul>
    </div>
  );
}
