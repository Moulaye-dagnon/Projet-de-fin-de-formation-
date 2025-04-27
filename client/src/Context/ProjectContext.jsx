import { createContext, useState } from "react";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  
  const [projets, setProjets] = useState(() => {
    return JSON.parse(localStorage.getItem("project")) || [];
  });
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [projectUsers, setProjectUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("projectUsers")) || [];
  });

  function removeData() {
    localStorage.removeItem("project");
    localStorage.removeItem("projectUsers");
    localStorage.removeItem("tasks");
    setProjets([])
    setProjectUsers([])
    setTasks([])
  }

  function removeTwo() {
    localStorage.removeItem("projectUsers");
    localStorage.removeItem("tasks");
    setProjectUsers([])
    setTasks([])
  }

  return (
    <ProjectContext.Provider
      value={{
        projets,
        setProjets,
        tasks,
        setTasks,
        projectUsers,
        setProjectUsers,
        removeData,
        removeTwo
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
