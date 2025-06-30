import { Outlet } from "react-router";

import Footer from "./components/FooterComponent";
import BoutonAccueil from "./components/boutonAccueil";
import BoutonDesktop from "./components/boutonDesktop";
import MenuBurger from "./components/menuBurger";

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
      <Footer />
    </>
  );
}

export default App;
