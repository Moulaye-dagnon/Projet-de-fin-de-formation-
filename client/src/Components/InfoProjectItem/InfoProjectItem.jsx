import React, { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { dateFormat } from "../../Utils/dateFormat";
import { NavLink } from "react-router-dom";

function InfoProjectItem({ item }) {
  const { user } = useContext(UserContext);
  return (
    <section className="flex flex-col justify-center antialiased bg-white   p-4">
      <div className="h-full">
        <div className="max-w-2xl mx-auto bg-white  shadow-lg rounded-lg">
          <div className="px-6 py-5">
            <div className="flex items-start">
              <div className="flex-grow truncate">
                <div className="w-full sm:flex justify-between items-center mb-3">
                  <h2 className="text-2xl leading-snug font-extrabold  truncate mb-1 sm:mb-0">
                    {item.name}
                  </h2>

                  <div className=" flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                    {item.owners.includes(user.id) ? "Admin" : "Collaborateur"}
                  </div>
                </div>

                <div className="flex items-end justify-between whitespace-normal">
                  <div className="max-w-md ">
                    <p className="mb-2">{item.description} </p>
                  </div>
                  <a className="" href="#0">
                    <span className="block font-bold">
                      <span className="sr-only">Read more</span>
                    </span>
                  </a>
                </div>
                <div className="sm:flex items-end justify-between whitespace-normal">
                  <div className=" ">
                    Date de creation :{dateFormat(item.createdAt)}
                  </div>
                  <div className=" ">
                    Date d'écheance :{" "}
                    {item.dueDate ? dateFormat(item.dueDate) : "Pas defini"}
                  </div>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <span>{item.menbres.length} menbres</span>
                  <NavLink
                    className=" text-blue-300 underline"
                    to={`/dashboard/project/${item._id}`}
                  >
                    Voir les taches
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoProjectItem;
