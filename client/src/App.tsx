import { Outlet } from "react-router";
import "./assets/styles/global.css";
import Footer from "./components/FooterComponent.tsx";
import BoutonAccueil from "./components/boutonAccueil";
import BoutonInscription from "./components/boutonInscription";
import Navigation from "./components/navigation.tsx";
function App() {
  return (
    <>
      <BoutonInscription />
      <Navigation />
      <Outlet />
      <BoutonAccueil />
      <Footer />
    </>
  );
}

export default App;
