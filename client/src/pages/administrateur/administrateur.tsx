import "../../assets/styles/page-layout.css";
import DesktopTabs from "../../components/Tabs/DesktopTabs";

import MobileTabs from "../../components/Tabs/MobileTabs.tsx";

export default function administrateur() {
  return (
    <div className="administrator-container">
      <div className="page-content">
        <h2 className="page-title">Administrateur</h2>
        <MobileTabs />
        <DesktopTabs />
      </div>
    </div>
  );
}
