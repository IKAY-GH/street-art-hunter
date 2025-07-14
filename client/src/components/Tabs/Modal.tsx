import "./Modal.css";
import { createPortal } from "react-dom";

export default function Modal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <dialog className="modalBase">
      <h1>Titre de mon onglet</h1>
      <div>Mettre les contenus dinamyques liés à chaque onglet</div>
      <button className="modalButton" onClick={onClose} type="button">
        Fermer
      </button>
    </dialog>,
    document.body,
  );
}
