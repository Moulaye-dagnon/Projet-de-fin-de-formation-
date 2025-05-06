import { useState } from "react";
import "./cover.css";

function Cover() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="div">
        <div className="divmin1">
          <div className="div1">
            <div className="pres">
              <h2>Nouvelle Plateforme de Collaboration</h2>
              La plateforme collaborative en ligne qui réunie les équipes, à
              tout moment, et en tout lieu.
            </div>
            <div>
              <button type="button" class="btn btn-primary">
                Commencer
              </button>
            </div>
          </div>

          <div className="div2">
            <img
              src="https://www.managersenmission.com/wp-content/uploads/2020/09/collaboration-distance.jpg"
              width="494.43"
              height="246.06"
              alt=""
            />
          </div>
        </div>

        <div className="divmin2">
          <div className="div3">
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/363/112/non_2x/man-working-from-home-home-office-concept-vector.jpg"
              width="500.43"
              height="100.8"
              alt=""
            />
          </div>

          <div className="div4">
            <h2>Restez organisés et connectés</h2>
            Réunissez vos équipes dans un espace partagé. Choisissez l'affichage
            de projet qui vous convient, et collaborez où que vous soyez.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;
