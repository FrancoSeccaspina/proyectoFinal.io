import React from "react";
import "../css/ModalDeConfirmacion.css";

const ModalConfirm = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>¿Estás seguro?</h2>
        <p>{message || "Esta acción no se puede deshacer."}</p>
        <div className="modal-buttons">
          <button className="btn cancel" onClick={onClose}>Cancelar</button>
          <button className="btn confirm" onClick={onConfirm}>Confirmar</button>
        </div>
        
      </div>

    </div>
  );
};

export default ModalConfirm;
