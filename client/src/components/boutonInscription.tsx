import { NavLink } from "react-router";

function BoutonInscription() {
  return (
    <nav className="btn-form">
      <NavLink to={"/inscription"}>
        <button className="btn-inscription" type="button">
          Inscription
        </button>
      </NavLink>

      <NavLink to={"/connexion"}>
        <button className="btn-connexion" type="button">
          Connexion
        </button>
      </NavLink>
    </nav>
  );
}

export default BoutonInscription;
