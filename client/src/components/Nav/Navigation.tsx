import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import HomeButton from "./HomeButton.tsx";
import UserProfile from "../userProfile.tsx";
import "./navigation.css";

function Navigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isHomePage = location.pathname === "/";
  const { role, isAuthenticated } = useAuth();
  const closeMenu = () => setOpenMenu(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  useEffect(() => {
    if (openMenu && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a");
      firstLink?.focus();
    } else if (!openMenu && btnRef.current) {
      btnRef.current.focus();
    }
  }, [openMenu]);

  return (
    <>
      <nav className="menu-nav" ref={menuRef} aria-label="Barre de navigation">
        <HomeButton />
        {!isHomePage ? (
          <h1 className="navH1">STREET ART HUNTER</h1>
        ) : (
          <div className="nav-spacer" />
        )}
        {openMenu && (
          <ul id="main-menu" className="liens">
            <UserProfile />
            <li>
              <Link
                className="nav-button"
                onClick={closeMenu}
                to={"/connexion"}
              >
                Connexion
              </Link>
            </li>
            <li>
              <Link
                className="nav-button"
                onClick={closeMenu}
                to={"/inscription"}
              >
                Inscription
              </Link>
            </li>
            <li>
              <Link className="nav-button" onClick={closeMenu} to="/gallerie">
                Galerie
              </Link>
            </li>
            <li>
              <Link className="nav-button" onClick={closeMenu} to="/carte">
                Carte
              </Link>
            </li>
            <li>
              <Link
                className="nav-button"
                onClick={closeMenu}
                to="/instructions"
              >
                Instructions
              </Link>
            </li>
            <li>
              <Link className="nav-button" onClick={closeMenu} to="/classement">
                Classement
              </Link>
            </li>
            {isAuthenticated && role === "admin" && (
              <li>
                <Link
                  className="nav-button"
                  onClick={closeMenu}
                  to="/administrateur"
                >
                  Administrateur
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link className="nav-button" onClick={closeMenu} to="/Profil">
                  Mon profil
                </Link>
              </li>
            )}
          </ul>
        )}
        <button
          ref={btnRef}
          type="button"
          className="floating-btn"
          onClick={() => setOpenMenu((prev) => !prev)}
          aria-controls="main-menu"
          aria-expanded={openMenu}
          aria-label={openMenu ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32m448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32"
            />
          </svg>
        </button>
      </nav>
    </>
  );
}

export default Navigation;
