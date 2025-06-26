import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import burger from "../assets/icon/burger.svg";
import "../assets/styles/burger.css";

function MenuBurger() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [fermeture, setFermeture] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fermetureAvecAnimation = () => {
      if (!menuOuvert || fermeture) return;

      setFermeture(true);
      setMenuOuvert(false);
      setFermeture(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        fermetureAvecAnimation();
      }
    };
    if (menuOuvert) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOuvert, fermeture]);

  useEffect(() => {
    const fermetureAvecAnimation = () => {
      if (!menuOuvert || fermeture) return;

      setFermeture(true);
      setMenuOuvert(false);
      setFermeture(false);
    };

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        fermetureAvecAnimation();
      }
    }
    if (menuOuvert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOuvert, fermeture]);

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
            <Link
              onClick={() => {
                setFermeture(true);
                setMenuOuvert(false);
              }}
              to="/gallerie"
            >
              Galleries
            </Link>
            <Link
              onClick={() => {
                setFermeture(true);
                setMenuOuvert(false);
              }}
              to="/carte"
            >
              Cartes
            </Link>
            <Link
              onClick={() => {
                setFermeture(true);
                setMenuOuvert(false);
              }}
              to="/infos"
            >
              Instructions/informations
            </Link>
            <Link
              onClick={() => {
                setFermeture(true);
                setMenuOuvert(false);
              }}
              to="/classement"
            >
              Classement
            </Link>
            <Link
              onClick={() => {
                setFermeture(true);
                setMenuOuvert(false);
              }}
              to="/administrateur"
            >
              Administrateur
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default MenuBurger;
