export default function AddUserComponent() {
  return (
    <div className="rounded-3xl bg-green-100 0 w-70 flex flex-col gap-2 border-[#50b1a1] shadow-md hover:shadow-lg transition-all">
      <div className="header ml-auto cursor-pointer p-4">
        <img src="/Vector.png" alt="" />
      </div>

      <div className="flex-grow-1 p-4">
        <div className="img">
            <img
              className="w-24 h-24 rounded-full object-cover mx-auto cursor-pointer"
              src="/Group.png"
              alt="users-photodeProfil"
            />
        </div>
        <p className="text-center text-xl font-semibold text-green-800 mb-8">Ajouter un membre</p>
      </div>

    </div>
  )
}