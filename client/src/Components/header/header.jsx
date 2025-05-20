import { FiSidebar } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import TopBar from "../topBarComponent/TopBar";

export function Header({ handleToggleNav }) {
  return (
    <div className=" w-full  flex   flex-col justify-start  ">
        <TopBar />
      <div className=" w-full flex justify-stretch items-center border-b border-black/50 h-10 ">

        <div className="flex items-center  justify-items-start">
          <span
            onClick={handleToggleNav}
            className=" inline-block px-2 mr-2  border-transparent bg-transparent 
                hover:bg-gray-50 hover:border-b-gray-50 hover:ring-opacity-75

                transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FiSidebar size={"20px"} />
          </span>
        </div>
      </div>
    </div>
  );
}
