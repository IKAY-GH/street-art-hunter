import { NavLink } from "react-router";

import "../assets/styles/boutonInscription.css";

function BoutonInscription() {
  return (
    <>
      <NavLink to={"/inscription"}>
        <button className="btn-inscription" type="button">
          Inscription
        </button>
      </NavLink>
    </>
  );
}

export default BoutonInscription;
