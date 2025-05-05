import { Outlet } from "react-router-dom";
import { NavComponent } from "../navComponent/navComponent";

export function LayoutComponent() {
  return (
    <div className=" flex w-full h-screen">
      <NavComponent />
      <div className="flex-1 px-6 overflow-x-scroll ">
        <Outlet />
      </div>
    </div>
  );
}
