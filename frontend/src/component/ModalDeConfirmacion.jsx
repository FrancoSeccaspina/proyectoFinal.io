import React from "react";
import "../css/ModalDeConfirmacion.css";

const ModalConfirm = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal-content">
        <h2 id="modalTitle" className="modal-title">¿Estás seguro?</h2>
        <div className="modal-body">
          <p>{message || "¿Estás seguro de realizar esta acción?"}</p>
        </div>
        <footer className="modal-footer">
          <button type="button" className="btn btn-cancel" onClick={onClose}>Cancelar</button>
          <button type="button" className="btn btn-confirm" onClick={onConfirm}>Confirmar</button>
        </footer>
      </div>
    </div>
  );
};

export default ModalConfirm;
