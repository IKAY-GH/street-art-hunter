import { useState } from "react";
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
            <a href="A propos">A propos</a>
            <a href="Gallerie">Galleries</a>
            <a href="Cartes">Cartes</a>
          </div>
        </nav>
      )}
    </>
  );
}

export default MenuBurger;
