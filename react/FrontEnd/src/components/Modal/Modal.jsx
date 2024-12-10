import "./Modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si la modale est fermée, ne retourne rien

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

export const ModalCategories = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay">
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

