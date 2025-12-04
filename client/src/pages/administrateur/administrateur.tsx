import "../../assets/styles/page-layout.css";
import "./administrateur.css";
import DesktopTabs from "../../components/Tabs/DesktopTabs";
import MobileTabs from "../../components/Tabs/MobileTabs.tsx";

export default function administrateur() {
  return (
    <div className="administrator-container">
      <div className="page-content">
        <h1 className="page-title">Administrateur</h1>
        <MobileTabs />
        <DesktopTabs />
      </div>
    </div>
  );
}
