import { Outlet } from "react-router-dom";
import { NavComponent } from "../navComponent/navComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
export function LayoutComponent() {
  const [toggleNav, setToggleNav] = useState(true);
  const handleToggleNav = () => {
    setToggleNav((c) => !c);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" flex w-full relative  ">
        <NavComponent toggleNav={toggleNav} />
        <div
          className={` transition-all duration-300 flex-1 mx-2 border-bg-todo min-w-3xl h-svh overflow-hidden w-full border rounded-md ${
            toggleNav ? "ml-52" : ""
          }`}
        >
          <Outlet context={[handleToggleNav]} />
        </div>
      </div>
    </DndProvider>
  );
}
