import { Link, NavLink } from "react-router-dom";
import iconDashoard from "../../assets/dashboard.svg";
import iconTeams from "../../assets/teams.svg";
import { DropdownMenuList } from "../dropdownMenu/DropdownComponentMenuList";

export function NavComponent() {
  return (
    <div className="flex-none hidden h-[calc(100svh-90px)] lg:block w-50 bg-gray-100 shadow-lg rounded-2xl py-1">
      <div className="w-full h-[calc(95svh-90px)] my-10 overflow-y-auto">
        <div>
          <div className=" ml-2 mb-3 opacity-70">Workspace</div>
          <div className="w-full px-2 mt-2 mb-5">
            <ul>
              <li className=" w-full">
                <NavLink
                  to={"/Teams"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-gray-100"
                    } hover:bg-gray-200 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <i className="fas fa-users text-[#76b1a6]"></i>{" "}
                  </span>
                  <span className="flex-grow">Teams</span>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to={"/Teams"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-gray-100"
                    } hover:bg-gray-200 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <i className="fas fa-lightbulb text-[#76b1a6]"></i>{" "}
                  </span>
                  <span className="flex-grow text-md">Projects</span>
                </NavLink>
              </li>
              {/* <li className="w-full">
                <NavLink
                  to={"/Teams"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-gray-100"
                    } hover:bg-gray-200 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <img src={iconDashoard} alt="Membre Icon" />
                  </span>
                  <span className="flex-grow">Membres</span>
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
        <div>
          <div className=" mb-3 opacity-70 px-2 cursor-pointer flex items-center">
            Mes projets <i className="fas fa-plus ml-auto text-[#76b1a6]"></i>
          </div>
          <DropdownMenuList />
        </div>
      </div>
    </div>
  );
}
