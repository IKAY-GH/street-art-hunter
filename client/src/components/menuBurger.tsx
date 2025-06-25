import { useState } from "react";
import { Link } from "react-router";
import burger from "../assets/icon/burger.svg";
import "../assets/styles/burger.css";

function MenuBurger() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  return (
    <>
      <button
        type="button"
        className="floating-btn"
        onClick={() => setMenuOuvert((prev) => !prev)}
        aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <img src={burger} alt="Ouvrir le menu" />
      </button>
      {menuOuvert && (
        <nav className="menu-nav">
          <div className="lien">
            <Link to="/gallerie">Galleries</Link>
            <Link to="/cartes">Cartes</Link>
            <Link to="/infos">Instructions/informations</Link>
            <Link to="/classement">Classement</Link>
            <Link to="/administrateur">Administrateur</Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default MenuBurger;
