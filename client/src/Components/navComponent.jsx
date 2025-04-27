import { NavLink } from "react-router-dom";
import iconDashoard from "../assets/dashboard.svg";
import iconTeams from "../assets/teams.svg";
import { DropdownMenuList } from "./dropdownMenu/DropdownComponentMenuList";

export function NavComponent() {
  return (
    <div className="flex-none w-50 h-screen bg-white shadow-lg  rounded-2xl py-1">
      <div className="uppercase text-2xl ">logo</div>

      <div className="w-full my-15 h-[75%] overflow-y-auto">
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
          <div className=" mb-3 opacity-70 px-2">Your teams</div>
          <DropdownMenuList />
        </div>
      </div>
    </div>
  );
}
