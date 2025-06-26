import { Outlet } from "react-router";

import MenuBurger from "./components/menuBurger";
import BoutonAccueil from "./components/boutonAccueil"

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
