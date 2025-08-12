import React, { useState } from 'react';
import { Button } from '../../../ui';
import './ReportModal.css';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Cambiado de `onSubmit` a `onSelectReason`
  onSelectReason: (reason: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSelectReason }) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(e.target.value);
  };

  // Se encarga de pasar la razón seleccionada al padre
  const handleNext = () => {
    if (selectedReason) {
      onSelectReason(selectedReason);
      setSelectedReason(null); // Reinicia el estado del radio button
    }
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <h3>¿Por qué denuncias este anuncio?</h3>
          <p>No compartiremos esto con el anfitrión.</p>
          <button className="report-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="report-modal-body">
          <label className="radio-option">
            <input
              type="radio"
              name="reportReason"
              value="Es incorrecto o poco preciso"
              checked={selectedReason === "Es incorrecto o poco preciso"}
              onChange={handleReasonChange}
            />
            Es incorrecto o poco preciso
            <span className="radio-custom"></span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="reportReason"
              value="No es un alojamiento real"
              checked={selectedReason === "No es un alojamiento real"}
              onChange={handleReasonChange}
            />
            No es un alojamiento real
            <span className="radio-custom"></span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="reportReason"
              value="Es una estafa"
              checked={selectedReason === "Es una estafa"}
              onChange={handleReasonChange}
            />
            Es una estafa
            <span className="radio-custom"></span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="reportReason"
              value="Es ofensivo"
              checked={selectedReason === "Es ofensivo"}
              onChange={handleReasonChange}
            />
            Es ofensivo
            <span className="radio-custom"></span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="reportReason"
              value="Es otra cosa"
              checked={selectedReason === "Es otra cosa"}
              onChange={handleReasonChange}
            />
            Es otra cosa
            <span className="radio-custom"></span>
          </label>
        </div>
        <div className="report-modal-footer">
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!selectedReason}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
