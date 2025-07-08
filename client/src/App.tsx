import { Outlet } from "react-router";

/*import BoutonConnexion from "./components/boutonConnexion";*/
import Footer from "./components/FooterComponent";
import BoutonAccueil from "./components/boutonAccueil";
import BoutonInscription from "./components/boutonInscription";
import MenuBurger from "./components/menuBurger";

import "./assets/styles/accueil.css";
import "./assets/styles/boutonAccueil.css";
import "./assets/styles/boutonInscription.css";
import "./assets/styles/boutonConnexion.css";
import "./assets/styles/formulaire.css";
import "./components/FooterComponent.css";

function App() {
  return (
    <>
      <MenuBurger />
      <BoutonInscription />
      <BoutonAccueil />
      <Footer />
      <Outlet />
    </>
  );
}

export default App;
