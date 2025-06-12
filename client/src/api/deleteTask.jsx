import axios from "axios";
import { toast } from "react-toastify";

async function deleteTask(userId, projectId, taskId) {
  if (!taskId || !userId || !projectId) {
    toast.error("Données manquantes pour la suppression !");
    return;
  }
  console.log("task", taskId);
  console.log("user", userId);
  console.log("project", projectId);

  try {
    const response = await axios.delete(
      `http://localhost:4000/task/${taskId}/${userId}`,
      {
        data: { projectId },
      }
    );
    if (response.status === 200) {
      toast.success("Tâche supprimée avec succès !");
    }
  } catch (error) {
    console.error("Il y a une erreur :", error);
    toast.error("Une erreur est survenue lors de la suppression !");
  }
}

export default deleteTask;
