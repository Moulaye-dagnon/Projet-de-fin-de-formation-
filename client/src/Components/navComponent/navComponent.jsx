import { Link, NavLink } from "react-router-dom";
import iconDashoard from "../../assets/dashboard.svg";
import iconTeams from "../../assets/teams.svg";
import { DropdownMenuList } from "../dropdownMenu/DropdownComponentMenuList";
import { useEffect, useRef, useState } from "react";
import AddProjectModal from "../Modals/AddProjectModal";
import { FiSidebar } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";

export function NavComponent({
  toggleNav,
  handleToggleModal,
  handleToggleProjectUpdate,
  userProject,
  handleToggleNav,
  handleLogOut,
}) {
  const navRef = useRef(null);

  function confirmLogOut(){
    if(window.confirm("Voulez vous vraiment vous déconnecter?")){
      handleLogOut()
    }
  }

  return (
    <div
      ref={navRef}
      className={`z-90  w-full h-full max-h-screen overflow-hidden transition-all duration-300 flex flex-col   bg-gray-100 shadow-lg rounded-2xl py-1 1`}
    >
      <div className="w-full  my-10 h-[75%]  overflow-y-auto">
        <div>
          <div className=" ml-2 mb-3 opacity-70">Espace de travail</div>
          <div className="w-full px-2 mt-2 mb-5">
            <ul>
              <li className="w-full">
                <NavLink
                  to={"/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center w-full p-2 rounded-lg transition-all ${
                      isActive ? "bg-gray-200 shadow-lg" : "bg-gray-100"
                    } hover:bg-gray-200 hover:shadow-lg`
                  }
                >
                  <span className="w-4.5 inline-block mr-2">
                    <i className="fas fa-lightbulb text-mygreen"></i>{" "}
                  </span>
                  <span className="flex-grow text-md">Aperçu</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className=" mb-3 opacity-70 px-2 cursor-pointer flex items-center">
            Mes projets
            <i
              className="fas fa-plus ml-auto text-mygreen"
              onClick={handleToggleModal}
            ></i>
          </div>
          <DropdownMenuList UserProject={userProject} handleToggleProjectUpdate={handleToggleProjectUpdate}/>
        </div>
      </div>
      <div
        onClick={confirmLogOut}
        className="flex  items-center px-2 cursor-pointer hover:underline hover:scale-90 transition duration-300"
      >
        <span className="w-5 mr-2">
          <FaSignOutAlt size={"100%"} />
        </span>
        <span>Se déconnecter</span>
      </div>
    </div>
  );
}
