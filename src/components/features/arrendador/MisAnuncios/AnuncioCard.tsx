import React, { useState } from 'react';
import { IconTipo } from '../../../ui';
import { Button } from '../../../ui';
import './AnuncioCard.css';

export interface Anuncio {
  id: string;
  titulo: string;
  tipo: 'casa' | 'departamento' | 'cuarto';
  estado: 'activo' | 'en revisión' | 'pausado' | 'rechazado' | string;
  precio: number;
  fechaCreacion: Date;
  imageUrl: string;
  ubicacion: string;
}

export interface AnuncioCardProps {
  anuncio: Anuncio;
  onEdit?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const EstadoBadge: React.FC<{ estado: Anuncio['estado'] }> = ({ estado }) => {
  const getEstadoConfig = () => {
    const config: Record<string, { label: string; className: string; icon: string }> = {
      'activo': { 
        label: 'Activo', 
        className: 'estado-badge--active',
        icon: '✅'
      },
      'en revisión': { 
        label: 'En revisión', 
        className: 'estado-badge--pending',
        icon: '⏳'
      },
      'pausado': { 
        label: 'Pausado', 
        className: 'estado-badge--paused',
        icon: '⏸️'
      },
      'rechazado': { 
        label: 'Rechazado', 
        className: 'estado-badge--warning',
        icon: '⚠️'
      }
    };
    // Si el estado no está en el config, usar valores por defecto
    return config[estado] || {
      label: estado,
      className: 'estado-badge--default',
      icon: '📋'
    };
  };

  const config = getEstadoConfig();
  
  return (
    <span className={`estado-badge ${config.className}`}>
      <span className="estado-badge__icon">{config.icon}</span>
      <span className="estado-badge__label">{config.label}</span>
    </span>
  );
};


export const AnuncioCard: React.FC<AnuncioCardProps> = ({
  anuncio,
  onEdit,
  onToggleStatus,
  onViewDetails
}) => {
  const { id, titulo, tipo, estado, precio, fechaCreacion, imageUrl, ubicacion } = anuncio;
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [hasErrored, setHasErrored] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-PE', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(date);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    } else {
      // Por ahora navegar a página de edición (por implementar)
      console.log(`Editar anuncio: ${id}`);
    }
  };

  const handleToggleStatus = () => {
    if (onToggleStatus) {
      onToggleStatus(id);
    } else {
      console.log(`Cambiar estado de anuncio: ${id}`);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(id);
    } else {
      console.log(`Ver detalles de anuncio: ${id}`);
    }
  };

  return (
    <div className="anuncio-card">
      {/* Imagen de la propiedad */}
      <div className="anuncio-card__image-container">
        <img 
          src={imgSrc} 
          alt={titulo} 
          className="anuncio-card__image"
          onError={() => {
            if (!hasErrored) {
              setHasErrored(true);
              setImgSrc('/placeholder-property.jpg');
            }
          }}
        />
        <IconTipo tipo={tipo} />
      </div>
      
      
      {/* Información del anuncio */}
      <div className="anuncio-card__content">
        {/* Header con título y estado */}
        <div className="anuncio-card__header">
          <h3 className="anuncio-card__titulo">{titulo}</h3>
          <EstadoBadge estado={estado} />
        </div>
        
        {/* Información básica */}
        <div className="anuncio-card__info">
          <p className="anuncio-card__ubicacion">
            <span className="anuncio-card__icon">📍</span>
            {ubicacion}
          </p>
          <p className="anuncio-card__precio">
            <span className="anuncio-card__icon">💰</span>
            S/ {precio.toLocaleString()} / mes
          </p>
          <p className="anuncio-card__fecha">
            <span className="anuncio-card__icon">📅</span>
            Creado: {formatDate(fechaCreacion)}
          </p>
        </div>
        
        {/* Acciones */}
        <div className="anuncio-card__actions">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewDetails}
          >
            Ver detalles
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleEdit}
          >
            Editar
          </Button>
          
          {estado === 'activo' ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleToggleStatus}
            >
              Pausar
            </Button>
          ) : estado === 'pausado' ? (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleToggleStatus}
            >
              Activar
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};