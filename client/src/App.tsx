import { Outlet } from "react-router";

import BoutonConnexion from "../src/components/boutonConnexion";
import Footer from "./components/FooterComponent";
import BoutonAccueil from "./components/boutonAccueil";
import MenuBurger from "./components/menuBurger";

import "./assets/styles/accueil.css";
import "./assets/styles/boutonAccueil.css";
import "./assets/styles/boutonConnexion.css";
import "./assets/styles/formulaire.css";
import "./components/FooterComponent.css";

function App() {
  return (
    <>
      <MenuBurger />
      <BoutonConnexion />
      <BoutonAccueil />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
