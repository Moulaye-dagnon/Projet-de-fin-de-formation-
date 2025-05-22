import { Link, NavLink } from "react-router-dom";
import iconDashoard from "../../assets/dashboard.svg";
import iconTeams from "../../assets/teams.svg";
import { DropdownMenuList } from "../dropdownMenu/DropdownComponentMenuList";
import { useEffect, useRef, useState } from "react";
import AddProjectModal from "../Modals/AddProjectModal";
import { FiSidebar } from "react-icons/fi";

export function NavComponent({
  toggleNav,
  handleToggleModal,
  userProject,
  handleToggleNav,
}) {
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        handleToggleNav();
      }
    }

    if (toggleNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleNav]);
  return (
    <div>
      {toggleNav && (
        <div
          onClick={handleToggleNav}
          className=" z-80 flex-none overflow-hidden absolute transition-all duration-300 inset-0  backdrop-blur-sm"
        />
      )}
      <div
        ref={navRef}
        className={`z-90 flex-none overflow-hidden absolute transition-all duration-300 w-50 h-svh  bg-gray-100 shadow-lg rounded-2xl py-1 1 ${
          toggleNav
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-[-100%]"
        }`}
      >
        <div className="w-full  my-10 h-[75%]  overflow-y-auto">
          <span
            onClick={handleToggleNav}
            className="px-2 ml-auto block border-transparent bg-transparent 
                        hover:bg-gray-50 hover:border-b-gray-50 hover:ring-opacity-75
                        transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FiSidebar size={"20px"} />
          </span>
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
                      <i className="fas fa-users text-mygreen"></i>{" "}
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
                      <i className="fas fa-lightbulb text-mygreen"></i>{" "}
                    </span>
                    <span className="flex-grow text-md">Projects</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className=" mb-3 opacity-70 px-2 cursor-pointer flex items-center">
              Mes projets{" "}
              <i
                className="fas fa-plus ml-auto text-mygreen"
                onClick={handleToggleModal}
              ></i>
            </div>
            <DropdownMenuList UserProject={userProject} />
          </div>
        </div>
      </div>
    </div>
  );
}
