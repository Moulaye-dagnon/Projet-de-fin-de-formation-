import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { SortByPriorityAndOrder } from "../Utils/getTryByPriority";

export async function AddTaskApi({
  data,
  alltasks,
  setAllTasks,
  userId,
  projectId,
}) {
  try {
    const response = await axios.post(
      `http://localhost:4000/task/${userId}/new`,
      {
        name: data.name,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        assignTo: data.assignTo,
        projectId: projectId,
      }
    );
    console.log(response.data.task);
    setAllTasks((prevTask) => {
      const updateTasks = [...prevTask, response.data.task];
      return SortByPriorityAndOrder(updateTasks);
    });
  } catch (error) {
    console.error("Erreur:", error);
  }
}
