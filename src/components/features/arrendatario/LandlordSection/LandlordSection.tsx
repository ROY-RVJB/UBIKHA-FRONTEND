// src/arrendatario/LandlordSection/LandlordSection.tsx
import React from 'react';
import { FaUser } from 'react-icons/fa'; // Importa el icono de usuario de Font Awesome
import './LandlordSection.css'; // Importa el CSS específico para LandlordSection
import { Button } from '../../../ui'; // Importar el componente Button

interface LandlordSectionProps {
  arrendador: {
    nombre: string;
    fechaUnion: string;
    reseñas: number;
    verificado: boolean;
    superArrendador: boolean;
    indiceRespuestas: number;
    tiempoRespuesta: string;
  };
}

const LandlordSection: React.FC<LandlordSectionProps> = ({ arrendador }) => {
  return (
    <div className="landlord-section">
      <h2>Conoce al arrendador</h2>
      <div className="arrendador-contenido">
        <div className="arrendador-card">
          <div className="arrendador-user">
            <FaUser size={64} style={{ color: '#333' }} /> {/* Usa el icono de Font Awesome */}
            <div>
              <h3>{arrendador.nombre}</h3>
              <p>Se unió en {arrendador.fechaUnion}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => alert('Ver información del arrendador')}>
            Información del arrendador
          </Button>
        </div>
        <div className="arrendador-info">
          <h4>{arrendador.nombre} es un anfitrión</h4>
          <p>
            Los anfitriones tienen mucha experiencia.
          </p>
          <h4>Información sobre el arrendador</h4>
          <p><strong>Índice de respuestas:</strong> {arrendador.indiceRespuestas}%</p>
          <p><strong>Tiempo de respuesta:</strong> {arrendador.tiempoRespuesta}</p>
        </div>
      </div>
    </div>
  );
};

export default LandlordSection;