import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { SortByPriorityAndOrder } from "../Utils/getTryByPriority";
import { toast } from "react-toastify";

export async function AddTaskApi({
  data,
  alltasks,
  setAllTasks,
  userId,
  projectId,
}) {
  console.log(data.assignTo);
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
    setAllTasks((prevTask) => {
      const updateTasks = [...prevTask, response.data.task];
      return SortByPriorityAndOrder(updateTasks);
    });
  } catch (error) {
    toast.error("Une erreur est survenue!");
  }
}
