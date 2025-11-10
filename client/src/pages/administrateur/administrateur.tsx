import "./administrateur.css";
// import "../assets/styles/global.css";
import DesktopTabs from "../../components/Tabs/DesktopTabs.tsx";
import MobileTabs from "../../components/Tabs/MobileTabs.tsx";

export default function administrateur() {
  return (
    <main className="administrator-container">
      <h2>Administrateur</h2>
      <MobileTabs />
      <DesktopTabs />
    </main>
  );
}
