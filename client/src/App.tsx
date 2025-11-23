import { Outlet } from "react-router";
import DesktopFooter from "./components/Footer/DesktopFooterComponent.tsx";
import MobileFooter from "./components/Footer/mobileFooterComponent.tsx";
import Navigation from "./components/Nav/Navigation.tsx";

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
