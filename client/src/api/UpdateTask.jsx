import { useState, useContext } from "react";
import { UseAllTasksContext } from "../Context/AllTaskContext";
import { UserContext } from "../Context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "./config";
import { OrderedFunction } from "../../../server/Utils/orderdedFunction";

const useUpdateTask = () => {
  const { alltasks, setAllTasks } = UseAllTasksContext();
  const { user } = useContext(UserContext);
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTask = async (taskId, property, value) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTasks = alltasks.map((item) =>
        item._id === taskId ? { ...item, [property]: value } : item
      );
      const orderedTask = OrderedFunction(updatedTasks);

      await axios.patch(`${base_url}/task/reorder/${user._id}`, {
        tasks: orderedTask.map((task) => ({
          _id: task._id,
          [property]: task[property],
        })),
        projectId,
      });

      setAllTasks(orderedTask);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Erreur lors de la mise à jour de la tâche";
      setError(errorMessage);
      console.error(`Erreur lors de la mise à jour de ${property} :`, err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTask, isLoading, error };
};

export default useUpdateTask;
