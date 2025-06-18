import { useState } from "react";
import { Link } from "react-router-dom";

function Cover() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-full mx-auto flex flex-col justify-between sm:flex-row p-4  overflow-hidden">
      <div className="divmin1 flex-1 flex flex-col items-center justify-around h-full min-h-0">
        <div className="thom-div1 sm:mt-0 ">
          <div className="flex">
            <h2 className="text-lg sm:text-xl font-bold">
              Gestion de Projet Collaboratif
            </h2>

            <span className="flex-1 max-w-10">
              <img className="w-full" src="/plane.png" alt="photo-avion" />
            </span>
          </div>
          <p className="max-w-xl wrap-break-word mt-8">
            La plateforme de collaboration en ligne pour les equipes.
          </p>
          <div className="mt-4">
            <button
              type="button"
              className="rounded px-4 py-2 ms-auto cursor-pointer text-gray-50"
            >
              <Link to={"/login"}>
                Commencer <i className="fas fa-arrow-right"></i>
              </Link>
            </button>
            <small className="block mt-2">Gratuit à vie</small>
          </div>
        </div>

        <div className="max-w-70  ">
          <img
            src="/lan1.png"
            alt=""
            className="w-full max-h-[70%] sm:max-h-[100%] object-contain"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-around h-full min-h-0">
        <div className="hidden sm:block md:max-w-80">
          <img
            className="w-full max-h-[80%] object-contain"
            src="/lan2.png"
            alt=""
          />
        </div>

        <div className="div4">
          <p className="max-w-xl wrap-break-word">
            Organisez vos projets selon vos préférences et restez connectés où
            que vous soyez.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cover;
