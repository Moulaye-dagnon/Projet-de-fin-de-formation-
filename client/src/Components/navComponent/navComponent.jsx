import { Link, NavLink } from "react-router-dom";
import iconDashoard from "../../assets/dashboard.svg";
import iconTeams from "../../assets/teams.svg";
import { DropdownMenuList } from "../dropdownMenu/DropdownComponentMenuList";

export function NavComponent({ toggleNav }) {
  return (
    <div
      className={`flex-none absolute transition-all duration-300   w-50 h-svh overflow-hidden bg-white shadow-lg rounded-2xl py-1 ${
        toggleNav
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-[-100%]"
      } `}
    >
      <div className="uppercase text-2xl cursor-pointer text-center">
        <NavLink to={"/dashboard"}>
          <img src="/logo1.png" alt="logo" className="w-30 h-30" />
        </NavLink>
      </div>

      <div className="w-full my-10 h-[75%] overflow-y-auto">
        <div>
          <div className=" ml-2 mb-3 opacity-70">Workspace</div>
          <div className="w-full px-2 mt-2 mb-5">
            <ul>
              <li className=" w-full">
                <NavLink
                  to={"/Teams"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                    } hover:bg-gray-100 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <img src={iconTeams} alt="Teams Icon" />
                  </span>
                  <span className="flex-grow">Teams</span>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to={"/Teams"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                    } hover:bg-gray-100 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <img src={iconTeams} alt="project Icon" />
                  </span>
                  <span className="flex-grow text-md">Projects</span>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to={"/Teams"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-white"
                    } hover:bg-gray-100 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <img src={iconDashoard} alt="Membre Icon" />
                  </span>
                  <span className="flex-grow">Membres</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className=" mb-3 opacity-70 px-2">Mes projets</div>
          <DropdownMenuList />
        </div>
      </div>
    </div>
  );
}
