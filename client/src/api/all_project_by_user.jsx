import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { base_url } from "./config";
import { UserContext } from "../Context/UserContext";

export function All_user_project() {
  const [UserProject, setUserProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    async function FetchProjectUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${base_url}/project/${user.id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProject(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }

    FetchProjectUser();
  }, [newProject]);
  return { UserProject, loading, error, setNewProject };
}
