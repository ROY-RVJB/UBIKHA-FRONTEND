import React, { useState } from 'react';
import { Button } from '../../../ui';
import './ReportDescriptionModal.css';

interface ReportDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSubmit: (description: string, reason: string) => void;
  reason: string;
  isSubmitting: boolean;
  submitError: string | null;
}

const ReportDescriptionModal: React.FC<ReportDescriptionModalProps> = ({
  isOpen,
  onClose,
  onBack,
  onSubmit,
  reason,
  isSubmitting,
  submitError,
}) => {
  const [description, setDescription] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(description, reason);
    setDescription('');
  };

  return (
    <div className="report-description-modal-overlay" onClick={onClose}>
      <div className="report-description-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="report-description-modal-header">
          <button className="report-description-modal-back" onClick={onBack}>
          </button>
          <h3>Cuéntanos por qué el anuncio es incorrecto o impreciso</h3>
          <button className="report-description-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="report-description-modal-body">
          <p>Razón seleccionada: <strong>{reason}</strong></p>
          <textarea
            className="report-description-textarea"
            placeholder="Ejemplo: este anuncio dice que es un alojamiento entero, pero en realidad es una habitación privada."
            value={description}
            onChange={handleDescriptionChange}
            rows={6}
            disabled={isSubmitting}
          ></textarea>
          {submitError && <p className="report-error-message">{submitError}</p>}
        </div>
        <div className="report-modal-footer">
          <Button variant="secondary" onClick={onBack} disabled={isSubmitting}>
            Atrás
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            disabled={!description.trim() || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportDescriptionModal;
