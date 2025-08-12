import React from 'react';
import { Button } from '../../../ui';
import './ReportConfirmationModal.css';

interface ReportConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportConfirmationModal: React.FC<ReportConfirmationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <button className="report-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="report-modal-body">
          <h3>Recibimos la denuncia</h3>
          <p>Gracias por contarnos lo que ocurre. Denuncias como la tuya nos ayudan a simplificar el proceso de búsqueda.</p>
        </div>
        <div className="report-modal-footer">
          <Button variant="primary" onClick={onClose}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportConfirmationModal;
