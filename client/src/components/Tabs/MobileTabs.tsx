import { useState } from "react";
import tabsData from "../../data/tabsData.tsx";
import "./MobileTabs.css";
import Modal from "./Modal.tsx";

function MobileTabs() {
  const [selectedTabid, setSelectedTabId] = useState<number | null>(null);

  return (
    <div className="mobileTabs">
      {tabsData.map((obj) => (
        <button
          key={obj.id}
          type="button"
          onClick={() => setSelectedTabId(obj.id)}
        >
          <img src={obj.icon} alt="" />
        </button>
      ))}

      {selectedTabid !== null && (
        <Modal tabId={selectedTabid} onClose={() => setSelectedTabId(null)} />
      )}
    </div>
  );
}

export default MobileTabs;
