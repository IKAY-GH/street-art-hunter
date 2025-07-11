import { Outlet } from "react-router";

import "./assets/styles/global.css";
import Footer from "./components/FooterComponent.tsx";
import Navigation from "./components/navigation.tsx";

function App() {
  return (
    <>
      <Navigation />
      {/*<BoutonConnexion />*/}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
