import { Outlet } from "react-router-dom";
import { NavComponent } from "./navComponent";

export function LayoutComponent() {
  return (
    <div className=" flex w-full max-w-7xl mx-auto  ">
      <NavComponent />
      <div className=" flex-1 px-6 min-w-3xl overflow-x-scroll">
        <Outlet />
      </div>
    </div>
  );
}
