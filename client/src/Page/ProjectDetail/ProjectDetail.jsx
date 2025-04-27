import { BoardItemComponent } from "../../Components/BoardItem/BoardItemComponent";
import { useEffect, useState } from "react";
import iconMenuPoint from "../../assets/menu-point.svg";

import axios from "axios";
import { useParams } from "react-router-dom";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AddTaskComponent } from "../../Components/addTaskComponent/AddTaskComponent";
import { Patch_api } from "../../api/api";
import { use_fetch_all_tasks } from "../../api/all_tasks_in_project";
export function ProjectDetail() {
  //   const [data, setData] = useState(null);
  //   const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const { projectId } = useParams();
  const { data, tasks } = use_fetch_all_tasks(projectId);

  const handlerDrapStart = (e) => {
    const { active } = e;
    const activeTask = tasks.find((task) => task._id === active.id);
    setActiveTask(activeTask);
  };
  const handleDrapEnd = async (e) => {
    const { active, over } = e;
    setActiveTask(null);
    if (!over) return;

    const activeTaskId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((task) => task._id === activeTaskId);
    if (!activeTask) return;

    // Déterminer la colonne de destination
    let overColumn = null;
    if (tasks.some((task) => task._id === overId)) {
      overColumn = tasks.find((task) => task._id === overId).status;
    } else {
      overColumn = overId; // overId est un ID de colonne (todo, doing, done)
    }

    if (!overColumn) return;

    let updatedTasks = [...tasks];

    if (activeTask.status === overColumn) {
      // Réorganisation dans la même colonne
      const columnTasks = tasks
        .filter((task) => task.status === activeTask.status)
        .sort((a, b) => a.order - b.order);
      const activeIndex = columnTasks.findIndex(
        (task) => task._id === activeTaskId
      );
      const overIndex = columnTasks.findIndex((task) => task._id === overId);
      if (activeIndex !== overIndex) {
        const newColumnTasks = [...columnTasks];
        const [movedTask] = newColumnTasks.splice(activeIndex, 1);
        newColumnTasks.splice(overIndex, 0, movedTask);

        // Mettre à jour l'ordre
        updatedTasks = tasks.map((task) => {
          const index = newColumnTasks.findIndex((t) => t._id === task._id);
          if (index !== -1) {
            return { ...task, order: index };
          }
          return task;
        });
      }
    } else {
      // Déplacement vers une autre colonne
      updatedTasks = tasks.map((task) => {
        if (task._id === activeTaskId) {
          return { ...task, status: overColumn, order: 0 }; // Placer en haut
        }
        return task;
      });

      // Réorganiser l'ordre dans la colonne de destination
      const destinationTasks = updatedTasks
        .filter((task) => task.status === overColumn)
        .sort((a, b) => a.order - b.order);
      updatedTasks = updatedTasks.map((task) => {
        const index = destinationTasks.findIndex((t) => t._id === task._id);
        if (index !== -1) {
          return { ...task, order: index };
        }
        return task;
      });
    }

    setTasks(updatedTasks);

    // Mettre à jour le backend
    <Patch_api
      userId={"6804d0b4074c5605a5d2f5d6"}
      projectId={projectId}
      tasks={tasks}
    />;
  };

  const handlerIconPlus = (e) => {
    e.preventDefault();
    setActiveTask((c) => !c);
    console.log("test");
  };
  const todo = tasks
    .filter((task) => task.status === "todo")
    .sort((a, b) => a.order - b.order);
  const doing = tasks
    .filter((task) => task.status === "doing")
    .sort((a, b) => a.order - b.order);
  const done = tasks
    .filter((task) => task.status === "done")
    .sort((a, b) => a.order - b.order);
  const columns = ["todo", "doing", "done"];

  return (
    <>
      {data ? (
        <div className="flex flex-col h-full min-w-3xl overflow-scroll">
          <div className="mb-5 mt-3">Tableau</div>
          <DndContext
            collisionDetection={closestCenter}
            onDragStart={handlerDrapStart}
            onDragEnd={handleDrapEnd}
          >
            <SortableContext
              items={columns}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex justify-between gap-x-2 h-[100svh-24px] overflow-x-auto">
                <SortableContext
                  id="todo"
                  items={todo.map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <BoardItemComponent
                    title={"À faire"}
                    tasks={{ tasks: todo }}
                    project_name={data.Project}
                    columnid="todo"
                    handlerIconPlus={handlerIconPlus}
                  />
                </SortableContext>
                <SortableContext
                  id="doing"
                  items={doing.map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <BoardItemComponent
                    title={"En cours"}
                    tasks={{ tasks: doing }}
                    project_name={data.Project}
                    columnId="doing"
                    handlerIconPlus={handlerIconPlus}
                  />
                </SortableContext>
                <SortableContext
                  id="done"
                  items={done.map((task) => task._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <BoardItemComponent
                    title={"Terminé"}
                    tasks={{ tasks: done }}
                    project_name={data.Project}
                    columnId="done"
                    handlerIconPlus={handlerIconPlus}
                  />
                </SortableContext>
              </div>
            </SortableContext>
            <DragOverlay>
              {activeTask ? (
                <div className=" bg-white p-5 rounded-2xl m-3">
                  <div className="relative">
                    <span className="text-[8px]">Project name</span>
                    <span>
                      <img
                        className=" absolute top-2 right-2"
                        src={iconMenuPoint}
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="my-4">
                    <div className="text-[15px]">{activeTask.name}</div>
                    <div className="text-[11px]">
                      {activeTask.description || "Sans description"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    {activeTask.dueDate && (
                      <p className="text-xs text-gray-500">
                        Échéance:{" "}
                        {new Date(activeTask.dueDate).toLocaleDateString()}
                      </p>
                    )}
                    {/* <span>
				  <img src={iconPerson} alt="" />
				</span> */}
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : (
        <h1>Chargement...</h1>
      )}
      {/* <AddTaskComponent /> */}
    </>
  );
}
