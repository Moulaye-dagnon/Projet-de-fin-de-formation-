import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { base_url } from "./config";
import { UserContext } from "../Context/UserContext";

export function All_user_project() {
  const [UserProject, setUserProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [newProject, setNewProject] = useState("");

  useEffect(() => {
    if (user) {
      async function FetchProjectUser() {
        setError(null);
        try {
          const response = await axios.post(
            `${base_url}/project/${user.id}`,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setUserProject(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      FetchProjectUser();
    }
  }, [user, newProject]);
  return { UserProject, loading, error, setNewProject };
}
