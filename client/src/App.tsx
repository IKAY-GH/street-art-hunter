import { Outlet } from "react-router";
import DesktopFooter from "./components/Footer/DesktopFooterComponent.tsx";
import MobileFooter from "./components/Footer/mobileFooterComponent.tsx";
import Navigation from "./components/Nav/Navigation.tsx";

// Root layout component - wraps all pages with navigation and footer
function App() {
  return (
    <>
      <Navigation />
      {/* React Router outlet - renders child routes */}
      <Outlet />
      <DesktopFooter />
      <MobileFooter />
    </>
  );
}

export default App;
