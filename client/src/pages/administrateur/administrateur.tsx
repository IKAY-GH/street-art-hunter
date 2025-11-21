import "./administrateur.css";
// import "../assets/styles/global.css";
import "../../assets/styles/page-layout.css";
import DesktopTabs from "../../components/Tabs/DesktopTabs";

import MobileTabs from "../../components/Tabs/MobileTabs.tsx";

export default function administrateur() {
  return (
    <main className="administrator-container">
      <div className="page-content">
        <h2>Administrateur</h2>
        <MobileTabs />
        <DesktopTabs />
      </div>
    </main>
  );
}
