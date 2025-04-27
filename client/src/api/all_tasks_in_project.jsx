import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { base_url } from "./config";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export function use_fetch_all_tasks() {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { token } = useContext(UserContext);

  const { projectId } = useParams();
  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await axios.get(
          `${base_url}/tasks/project/${projectId}`
        );
        const result = await response.data;
        setData(result);
        const allTasks = [];
        result.tasks.forEach((group) => {
          group.tasks.forEach((task) => {
            allTasks.push({ ...task, status: group._id });
          });
        });
        setTasks(allTasks);
      } catch (error) {
        console.log("Erreur:", error);
      }
    }
    fetchProject();
  }, [projectId]);

  return { data, tasks, setData, setTasks };
}
