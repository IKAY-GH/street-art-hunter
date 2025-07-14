import { useState } from "react";
import tabsData from "../../data/tabsData.tsx";
import "./DesktopTabs.css";
import Modal from "./Modal.tsx";

function DesktopTabs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="desktopTabs">
      {tabsData.map((obj, index) => (
        <button key={obj.id} type="button" onClick={() => setIsOpen(true)}>
          <div>
            <img src={obj.icon} alt="" />
            <span>{tabsData[index].tabTitle}</span>
          </div>
        </button>
      ))}
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default DesktopTabs;
