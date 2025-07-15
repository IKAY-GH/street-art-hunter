// import { useState } from "react";
import tabsData from "../../data/tabsData.tsx";
import "./MobileTabs.css";
import "../FooterComponent.css";

function MobileTabs() {
  // const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="mobileTabs">
      {tabsData.map((obj) => (
        <button key={obj.id} type="button">
          <img src={obj.icon} alt="" />
        </button>
      ))}
    </div>
  );
}

export default MobileTabs;
