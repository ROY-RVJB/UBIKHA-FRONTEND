import React, { useState, useEffect } from 'react';
import { Button } from '../../../ui';
import './ReportModal.css';
import axios from 'axios';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReason: (reason: string) => void;
}

interface TipoReporte {
  codigo: string;
  descripcion: string;
  valor: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSelectReason }) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [tiposReporte, setTiposReporte] = useState<TipoReporte[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://26.196.154.46:8000';

  useEffect(() => {
    const fetchTiposReporte = async () => {
      try {
        const response = await axios.get(`${backendUrl}/reportes/tipos`);
        setTiposReporte(response.data.tipos_reporte);
      } catch (error) {
        console.error('Error al obtener los tipos de reporte:', error);
      }
    };

    fetchTiposReporte();
  }, []);

  if (!isOpen) {
    return null;
  }

 const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== selectedReason) {
      setSelectedReason(e.target.value);
    }
  };

  const handleNext = () => {
    if (selectedReason) {
      onSelectReason(selectedReason);
      setSelectedReason(null);
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
          {tiposReporte.map((tipo) => (
            <label className="radio-option" key={tipo.codigo}>
              <input
                type="radio"
                name="reportReason"
                value={tipo.codigo}
                checked={selectedReason === tipo.codigo}
                onChange={handleReasonChange}
              />
              {tipo.valor}
              <span className="radio-custom"></span>
            </label>
          ))}
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
