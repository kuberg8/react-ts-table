import React, { useState } from "react";
import "./Modal.css";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}>
      <div className="modal-container">
        <button className="modal-close" onClick={handleClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;