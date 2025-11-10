import "./assets/styles/global.css";
import { Outlet } from "react-router";
import DesktopFooter from "./components/Footer/DesktopFooterComponent.tsx";
import MobileFooter from "./components/Footer/mobileFooterComponent.tsx";
import Navigation from "./components/navigation.tsx";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
      <DesktopFooter />
      <MobileFooter />
    </>
  );
}

export default App;
