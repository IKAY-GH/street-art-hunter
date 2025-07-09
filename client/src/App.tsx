import { Outlet } from "react-router";

/*import BoutonConnexion from "./components/boutonConnexion";*/
import Footer from "./components/FooterComponent";
import BoutonAccueil from "./components/boutonAccueil";
import MenuBurger from "./components/menuBurger";

import "./assets/styles/reset.css"
import "./assets/styles/accueil.css";
import "./assets/styles/boutonAccueil.css";
import "./components/FooterComponent.css";

function App() {
  return (
    <>
      <MenuBurger />
      <BoutonAccueil />
      <Footer />
      <Outlet />
    </>
  );
}

export default App;
