import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "./config";

export function All_user_project() {
  const [UserProject, setUserProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchProjectUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          `${base_url}/project/6804d0b4074c5605a5d2f5d7`
        );
        setUserProject(response.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }

    FetchProjectUser();
  }, []);

  return { UserProject, loading, error };
}
