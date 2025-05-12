import { FiSidebar } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";

export function Header({ title, children }) {
  const [handleToggleNav] = useOutletContext();
  return (
    <div className=" w-full  flex  my-3 flex-col justify-start  ">
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
          <span>{title}</span>
        </div>
        {children}
      </div>

      <div className="w-full px-2 border-black/50 border-b h-10 flex justify-start items-center ">
        Tableau
      </div>
    </div>
  );
}
