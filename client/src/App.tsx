import "./assets/styles/accueil.css";
import { Outlet } from "react-router";
import MenuBurger from "./components/menuBurger";

function App() {
  return (
    <>
      <MenuBurger />
      <Outlet />
    </>
  );
}

export default App;
