import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

export async function AddTaskApi({
  data,
  alltasks,
  setAllTasks,
  userId,
  projectId,
}) {
  console.log(data.assignTo)
  try {
    const response = await axios.post(
      `http://localhost:4000/task/${userId}/new`,
      {
        name: data.name,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assignTo: data.assignTo,
        projectId: projectId,
      }
    );
    console.log(response.data.task);
    setAllTasks([...alltasks, response.data.task]);
  } catch (error) {
    console.error("Erreur:", error);
  }
}
