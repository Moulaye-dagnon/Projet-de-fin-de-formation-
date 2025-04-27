import axios from "axios";
import { useEffect, useState } from "react";
import { base_url } from "./config";

export function use_fetch_all_tasks(projectId) {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);
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
  }, []);

  return { data, tasks, setData, setTasks };
}
