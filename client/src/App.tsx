import { Outlet } from "react-router";

import BoutonAccueil from "./components/boutonAccueil";
import MenuBurger from "./components/menuBurger";

import "./assets/styles/accueil.css";
import "./assets/styles/boutonAccueil.css";

function App() {
  return (
    <>
      <MenuBurger />
      <BoutonAccueil />
      <Outlet />
    </>
  );
}

export default App;
