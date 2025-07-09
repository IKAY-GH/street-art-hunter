import BoutonConnexion from "../components/boutonConnexion";
import BoutonInscription from "../components/boutonInscription";

import "../assets/styles/accueil.css";

function accueil() {
  function handleclick() {}
  return (
    <nav className="nav-container">
      <h1>STREET ART HUNTER</h1>
      <BoutonInscription />
      <BoutonConnexion />
      <div className="">
        <button className="btn-start" onClick={handleclick} type="button">
          START
        </button>
      </div>
    </nav>
  );
}

export default accueil;
