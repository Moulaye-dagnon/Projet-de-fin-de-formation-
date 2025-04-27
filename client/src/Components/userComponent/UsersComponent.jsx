import { Link } from "react-router-dom";

export default function UsersComponent({ user }) {
  return (
    <div className="rounded-3xl  0 w-70 flex flex-col gap-2 border-[#50b1a1] shadow-md hover:shadow-lg transition-all">
      <div className="header ml-auto cursor-pointer p-4">
        <img src="/Vector.png" alt="" />
      </div>

      <div className="flex-grow-1 p-4">
        <div className="img">
          {user.photoProfil ? (
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto"
              src={`http://localhost:4000/images/${user.photoProfil}`}
              alt="users-photodeProfil"
            />
          ) : (
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto"
              src="/src/assets/fdp.avif"
              alt="users-photodeProfil"
            />
          )}
        </div>
        <p className="text-center text-xl font-semibold text-gray-800 mb-2">{user.nom} {user.prenom}</p>
        <p className="text-gray-600 text-sm leading-relaxed text-center">{user.email}</p>
      </div>

      <div className="footer border-slate-900 bg-green-200 flex-grow-1 rounded-b-lg p-2 text-center">
        <Link to={`/dashboard/users/user/${user._id}`}>
        <p className="cursor-pointer">Voir le profil</p>
        </Link>
      </div>
    </div>
  );
}
