import "./Modal.css";
import { createPortal } from "react-dom";
import tabsData from "../../data/tabsData";

export default function Modal({
  tabId,
  onClose,
}: {
  tabId: number | null;
  onClose: () => void;
}) {
  const tab = tabsData.find((obj) => obj.id === tabId);

  return createPortal(
    <dialog open className="modalBase">
      {tab && (
        <>
          <div className="tabTitle">{tab.tabTitle}</div>
          <div>Mettre les contenus dinamyques liés à chaque onglet</div>
        </>
      )}

      <button className="modalButton" onClick={onClose} type="button">
        Fermer
      </button>
    </dialog>,
    document.body,
  );
}
