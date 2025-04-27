import { useState } from "react";

export async function AddTaskApi() {
  const [newTaskName, setNewTaskName] = useState("");

    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/task/${userId}/new`,
        {
          projectId,
          name: newTaskName,
          assignToId: userId,
        }
      );
      setTasks([...tasks, { ...response.data.task, status: "todo" }]);
      setNewTaskName("");
    } catch (error) {
      console.error("Erreur:", error);
    }
}
