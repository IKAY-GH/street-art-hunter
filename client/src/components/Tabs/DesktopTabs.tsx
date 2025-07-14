import { useState } from "react";
import tabsData from "../../data/tabsData.tsx";
import "./DesktopTabs.css";
import Modal from "./Modal.tsx";

function DesktopTabs() {
  const [selectedTabid, setSelectedTabId] = useState<number | null>(null);

  return (
    <div className="desktopTabs">
      {tabsData.map((obj, index) => (
        <button
          key={obj.id}
          type="button"
          onClick={() => setSelectedTabId(obj.id)}
        >
          <div>
            <img src={obj.icon} alt="" />
            <span>{tabsData[index].tabTitle}</span>
          </div>
        </button>
      ))}
      {selectedTabid !== null && (
        <Modal tabId={selectedTabid} onClose={() => setSelectedTabId(null)} />
      )}
    </div>
  );
}

export default DesktopTabs;
