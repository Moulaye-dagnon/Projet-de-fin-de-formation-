import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { ProjectProvider } from "./Context/ProjectContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ProjectProvider>
        <App />
    </ProjectProvider>
  </UserProvider>
);
