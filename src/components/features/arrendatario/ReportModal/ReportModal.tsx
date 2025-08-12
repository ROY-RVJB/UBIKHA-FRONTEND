import React, { useState } from 'react';
import { Button } from '../../../ui';
import './ReportModal.css'; // We'll create this CSS file

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason);
      // Optionally reset selectedReason here or in parent after onSubmit
      setSelectedReason(null);
    } else {
      alert('Por favor, selecciona una razón para reportar.'); // Or a more user-friendly validation
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
            onClick={handleSubmit}
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