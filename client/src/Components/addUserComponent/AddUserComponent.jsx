import { Link } from "react-router-dom";

export default function AddUserComponent() {
  return (
    <div className="rounded-3xl bg-white h-96 0 w-70 flex flex-col gap-2 shadow-md hover:shadow-lg transition-all">
      <div className="header ml-auto cursor-pointer p-4">
      </div>

      <div className="flex-grow-1 p-4">
        <Link to={"/dashboard/users/adduser"}>
        <div className="img">
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto cursor-pointer"
              src="/Group.png"
              alt="users-photodeProfil"
            />
        </div>
        <p className="text-center text-xl font-semibold text-green-800 mb-8">Ajouter un membre</p>
        </Link>
      </div>

    </div>
  )
}