import axios from "axios";
import { base_url } from "./config";

export async function Patch_api({ userId, tasks, projectId }) {
  try {
    await axios.patch(`${base_url}/tasks/reorder/${userId}`, {
      tasks: tasks.map((task) => ({
        _id: task._id,
        status: task.status,
        priority: task.priority,
      })),
      projectId,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour des tâches :", error);
  }
}
