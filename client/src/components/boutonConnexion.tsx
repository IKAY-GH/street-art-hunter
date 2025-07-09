import { NavLink } from "react-router";
import "../assets/styles/boutonConnexion.css";

 
 
 function BoutonConnexion() {
  return (
    <> 
        <NavLink to={"/connexion"}>
        <button className="btn-connexion" type="button">
          Connexion
        </button>
        </NavLink>
    </>
  );
}

export default BoutonConnexion;

 
 
 /*function connexion() {
 
    return (
      <>
<NavLink to={"/connexion"}>
        <button className="btn-connexion" type="button">
          Connexion
        </button>
        </NavLink>
       
       </>
    )
    }
 

    export default connexion*/