import { useState } from "react";
import tabsData from "../../data/tabsData.tsx";
import "./MobileTabs.css";
import Modal from "./Modal.tsx";

function MobileTabs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobileTabs">
      {tabsData.map((obj) => (
        <button key={obj.id} type="button" onClick={() => setIsOpen(true)}>
          <img src={obj.icon} alt="" />
        </button>
      ))}
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default MobileTabs;
