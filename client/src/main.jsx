import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { ProjectProvider } from "./Context/ProjectContext.jsx";
import { AllTasksContextProvider } from "./Context/AllTaskContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ProjectProvider>
      <AllTasksContextProvider>
        <App />
      </AllTasksContextProvider>
    </ProjectProvider>
  </UserProvider>
);
