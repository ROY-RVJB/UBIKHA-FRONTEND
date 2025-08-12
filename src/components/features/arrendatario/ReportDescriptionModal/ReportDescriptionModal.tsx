import React, { useState } from 'react';
import { Button } from '../../../ui';
import './ReportDescriptionModal.css';

interface ReportDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSubmit: (description: string) => void;
  reason: string; // La razón seleccionada del modal anterior
}

const ReportDescriptionModal: React.FC<ReportDescriptionModalProps> = ({
  isOpen,
  onClose,
  onBack,
  onSubmit,
  reason,
}) => {
  const [description, setDescription] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(description);
    setDescription(''); // Reset description after submission
  };

  return (
    <div className="report-modal-overlay" onClick={onClose}>
      <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-modal-header">
          <button className="report-modal-back" onClick={onBack}>
          </button>
          <h3>Cuéntanos por qué el anuncio es incorrecto o impreciso</h3>
          <button className="report-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="report-modal-body">
          <p>Razón seleccionada: <strong>{reason}</strong></p>
          <textarea
            className="report-description-textarea"
            placeholder="Ejemplo: este anuncio dice que es un alojamiento entero, pero en realidad es una habitación privada."
            value={description}
            onChange={handleDescriptionChange}
            rows={6}
          ></textarea>
        </div>
        <div className="report-modal-footer">
          <Button variant="secondary" onClick={onBack}>
            Atrás
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!description.trim()}
          >
            Enviar Reporte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportDescriptionModal;
