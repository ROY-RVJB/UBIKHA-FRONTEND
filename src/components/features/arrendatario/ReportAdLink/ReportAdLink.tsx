// src/arrendatario/ReportAdLink/ReportAdLink.tsx
import React from 'react';
import './ReportAdLink.css'; // Importa el CSS específico para ReportAdLink

interface ReportAdLinkProps {
  openReportModal: (e: React.MouseEvent) => void;
}

const ReportAdLink: React.FC<ReportAdLinkProps> = ({ openReportModal }) => {
  return (
    <div className="report-ad"> {/* Usamos la clase original para mantener la compatibilidad con el CSS existente */}
      <i className="fa-regular fa-flag"></i>
      <a href="#" onClick={openReportModal}>Reporta este anuncio</a>
    </div>
  );
};

export default ReportAdLink;
