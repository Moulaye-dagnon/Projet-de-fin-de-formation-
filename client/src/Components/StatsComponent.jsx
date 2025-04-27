import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { widthPourcentage } from "../Utils/widthPourcentage";
import { dateFormat } from "../Utils/dateFormat";
import { ProjectContext } from "../Context/ProjectContext";

export default function StatsComponent() {
  const {
    projets,
    setProjets,
    tasks,
    setTasks,
    projectUsers,
    setProjectUsers
  } = useContext(ProjectContext);
  const { user, token, logout, login } = useContext(UserContext);
  let totalTaches = 0;
  let tasksDone = 0;
  let pourcentage = 0;
  if (tasks.length > 0) {
    totalTaches =
      tasks.reduce((acc,current)=> acc+current.tasks.length, 0)
    tasksDone = tasks.find((t) => t._id === "done")?.tasks.length;
  }
  if(tasksDone > 0){
    pourcentage = (tasksDone * 100) / totalTaches;
  }else{
    tasksDone = 0
    pourcentage = 0
  }
  const calculStats = () => {
    let width = "w-1/10";
    if (tasks) {
      return widthPourcentage(width, pourcentage);
    }
  };
  return (
    <div className="border-[#50b1a1] shadow-lg sm:w-2xl w-full lg:h-40 bg-white p-2 rounded-3xl">
      <p className="text-start font-bold mb-6">{projets && projets.name}</p>
      <div className="flex justify-between  align-baseline items-center flex-col lg:flex-row">
        <div className="status flex-grow-1">
          <p>Statut</p>
          <div className={`rounded-full bg-indigo-200 flex relative`}>
            <div
              className={`rounded-full  ${calculStats()} text-center`}
              style={{ backgroundColor: "#76B1A6" }}
            >
              <p className="font-bold inline">
                {pourcentage < 100 ? "Progression..." : "Terminé"}
              </p>
              <p className="text-center ml-auto font-bold inline">
                {Math.round(pourcentage)}%
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow-1">
          <p>Total Taches</p>
          <p className="font-bold">
            {tasks && tasksDone}/{tasks && totalTaches}
          </p>
        </div>
        <div className="flex-grow-1">
          <p>Echéance</p>
          <p className="font-bold">
            {projets && dateFormat(projets.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
