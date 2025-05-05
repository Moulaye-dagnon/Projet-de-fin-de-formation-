import axios from "axios";
import { base_url } from "./config";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export async function Patch_api( tasks ) {
  const { user } = useContext(UserContext);
  const { projectId } = useParams;

  try {
    const response = await axios.patch(
      `${base_url}/tasks/reorder/${user._id}`,
      {
        tasks: tasks.map((task) => ({
          _id: task._id,
          status: task.status,
          priority: task.priority,
        })),
        projectId,
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des tâches :", error);
  }
}
