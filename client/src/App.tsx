import { Outlet } from "react-router";

import BoutonAccueil from "./components/boutonAccueil";
import MenuBurger from "./components/menuBurger";
import BoutonDesktop from "./components/boutonDesktop";

import "./assets/styles/accueil.css";
import "./assets/styles/boutonAccueil.css";
import "./assets/styles/connexion.css";
import "./assets/styles/formulaire.css";

function App() {
  return (
    <>
      <MenuBurger />
      <BoutonDesktop />
      <BoutonAccueil />
      <Outlet />
    </>
  );
}

export default App;
