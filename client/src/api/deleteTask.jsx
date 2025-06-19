import axios from "axios";
import { toast } from "react-toastify";
import { base_url } from "./config";
import socket from "./socket";

async function deleteTask(userId, projectId, taskId) {
  if (!taskId || !userId || !projectId) {
    toast.error("Données manquantes pour la suppression !");
    return;
  }

  try {
    const response = await axios.delete(
      `${base_url}/task/${taskId}/${userId}`,
      {
        data: { projectId },
      }
    );
    if (response.status === 200) {
      socket.emit("task-change");
      toast.success("Tâche supprimée avec succès !");
    }
  } catch (error) {
    console.error("Il y a une erreur :", error);
    toast.error("Une erreur est survenue lors de la suppression !");
  }
}

export default deleteTask;
