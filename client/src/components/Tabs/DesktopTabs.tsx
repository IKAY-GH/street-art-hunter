// import { useState } from "react";
import tabsData from "../../data/tabsData.tsx";
import "./DesktopTabs.css";

function DesktopTabs() {
  // const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="desktopTabs">
      {tabsData.map((obj, index) => (
        <button key={obj.id} type="button">
          <div>
            <img src={obj.icon} alt="" />
            <span>{tabsData[index].tabTitle}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default DesktopTabs;
