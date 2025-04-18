import { useState } from 'react'
import './cover.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Cover() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light fixed-top" data-bs-theme="light">
  <div class=" navdiv">
    <a class="navbar-brand nav" href="#">Navbar</a>
      <ul class="navbar-nav me-auto">

      <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle active size" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">Produits</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle active size" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Solutions</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>

        <li class="nav-item dropdown ">
          <a class="nav-link dropdown-toggle active size" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Ressources</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
          </div>
        </li>

        <li class="nav-item">
          <a class="nav-link active size" href="#">Entreprise
            <span class="visually-hidden">(current)</span>
          </a>
        </li>

        <li class="nav-item ">
          <a class="nav-link active size" href="#">Prix</a>
        </li> 

        <select
        className="form-select form-select-sm bg-light text-info border-0 mb-2"
        style={{ width: '100px' }}
        onChange={(e) => console.log('Langue sélectionnée :', e.target.value)}>
        <option value="fr">Français</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>

        <li class="nav-item">
          <a class="nav-link active size" href="#">Service Commercial</a>
        </li>
        

        <li class="nav-item">
          <a class="nav-link active size" href="#">Se Connecter</a>
        </li>

        
            <div class="btndiv d-flex align-items-start">
        <button type="button" class="btn btn-primary " style={{ marginTop: '-0px' }} >S'inscrire</button>
        </div>
    

      </ul>
    
    </div>
</nav>

<div className='div'>
  <div className='divmin1'>
      <div className='div1'>
      <div className='pres'>
      <h2 >Nouvelle Plateforme de Collaboration</h2>
      La plateforme collaborative en ligne qui réunie les équipes, à tout moment, et en tout lieu.
      </div>
      <div>
      <button type="button" class="btn btn-primary">Commencer</button>
      </div>
      </div>
      
      <div className='div2'>
        <img src="https://www.managersenmission.com/wp-content/uploads/2020/09/collaboration-distance.jpg" width="494.43" height="246.06" alt="" />
      </div>
      </div>

      <div className='divmin2'>

      <div className='div3'>
      <img src="https://static.vecteezy.com/system/resources/previews/001/363/112/non_2x/man-working-from-home-home-office-concept-vector.jpg" width="500.43" height="100.8" alt="" />
      </div>

      <div className='div4'>
      <h2>Restez organisés et connectés</h2>
      Réunissez vos équipes dans un espace partagé. Choisissez l'affichage de projet qui vous convient, et collaborez où que vous soyez.
      </div>
      </div>

      </div>
      
    </div>

  )
}

export default Cover
