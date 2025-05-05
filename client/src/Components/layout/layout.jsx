import { Outlet } from "react-router-dom";
import { NavComponent } from "../navComponent/navComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
export function LayoutComponent() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" flex ">
        <NavComponent />
        <div className=" flex-1 px-6 min-w-3xl overflow-x-scroll">
          <Outlet />
        </div>
      </div>
    </DndProvider>
  );
}
