import { useState } from "react";
import { Link } from "react-router-dom";

function Cover() {
  const [count, setCount] = useState(0);

  return (
      <div className="h-screen thom-div flex-none sm:flex m-auto px-16 py-10">
        <div className="divmin1 flex-grow-1 flex flex-col justify-around">
          <div className="thom-div1">
            <div className="pres flex">
              <h2 className="lg:text-6xl sm:text-2xl font-bold">Gestion de Projet Collaboratif</h2>
              <img src="/plane.png" alt="photo-avion" className="sm:w-40 w-30 ml-4"/>
            </div>
            <p className="max-w-xl wrap-break-word mt-10">La plateforme de collaboration en ligne pour les equipes en tout temps, tout lieu et tous ensemble.</p>
            <div className="mt-8">
              <button type="button" class="thom-btn btn rounded p-4 ms-auto cursor-pointer text-gray-50">
                <Link to={"/loguptest"}>Commencer <i className="fas fa-arrow-right"></i></Link>
              </button>
              <small className="block mt-2">Gratuit à vie — Pas de carte de crédit requise.</small>
            </div>
          </div>

          <div className="div2">
            <img src="/lan1.png" alt="" className=""/>
          </div>
        </div>

        <div className="divmin2 flex-grow-1 flex flex-col justify-around">
          <div className="div3">
            <img
              src="/lan2.png"
              alt=""
            />
          </div>

          <div className="div4">
            <h2 className="lg:text-2xl sm:text-xxl font-bold">Restez organisés et connectés</h2>
            <p className="max-w-xl wrap-break-word">Travaillez en équipe dans un espace collaboratif, organisez vos projets selon vos préférences et restez connectés où que vous soyez.</p>
          </div>
        </div>
      </div>
  );
}

export default Cover;
