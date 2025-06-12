import { createContext, useContext, useState } from "react";

const TaskContext = createContext([]);

export const UseAllTasksContext = () => {
  return useContext(TaskContext);
};

export const AllTasksContextProvider = ({ children }) => {
  const [alltasks, setAllTasks] = useState([]);

  return (
    <TaskContext.Provider value={{ alltasks, setAllTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
