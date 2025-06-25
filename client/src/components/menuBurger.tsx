import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import burger from "../assets/icon/burger.svg";
import "../assets/styles/burger.css";

function MenuBurger() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setMenuOuvert(false);
        console.log(menuRef.current, btnRef.current);
      }
    }
    if (menuOuvert) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOuvert]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className="floating-btn"
        onClick={() => setMenuOuvert((prev) => !prev)}
        aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <img src={burger} alt="Ouvrir le menu" />
      </button>
      {menuOuvert && (
        <nav className="menu-nav" ref={menuRef}>
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