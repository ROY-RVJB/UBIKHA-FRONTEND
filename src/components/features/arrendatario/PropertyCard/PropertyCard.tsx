import React from 'react';
import './PropertyCard.css';

export interface Property {
  id: string;
  titulo: string;
  tipo: 'casa' | 'departamento' | 'cuarto' | 'oficina';
  precio: number;
  imageUrl: string;
  ubicacion: string;
  caracteristicas: string[];
  calificacion?: number;
  fechaDisponible?: string;
}

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onViewDetails, 
  onSave, 
  isSaved = false 
}) => {
  const {
    id,
    titulo,
    tipo,
    precio,
    imageUrl,
    ubicacion,
    caracteristicas,
    calificacion,
    fechaDisponible
  } = property;

  const tipoIcons = {
    'casa': '🏠',
    'departamento': '🏢',
    'cuarto': '🛏️',
    'oficina': '🏢'
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Evita que el clic en el botón de guardar active el evento de la tarjeta
    if (!(e.target instanceof HTMLElement && e.target.closest('.property-card__save'))) {
      onViewDetails(id);
    }
  };

  return (
    <div 
      className="property-card" 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${titulo}`}
    >
      <div className="property-card__image-container">
        <img 
          src={imageUrl} 
          alt={titulo} 
          className="property-card__image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-property.jpg';
          }}
        />
        {onSave && (
          <button 
            className={`property-card__save ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSave(id);
            }}
            aria-label={isSaved ? 'Quitar de guardados' : 'Guardar propiedad'}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        )}
        {calificacion && (
          <div className="property-card__rating">
            ⭐ {calificacion.toFixed(1)}
          </div>
        )}
      </div>

      <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__title">{titulo}</h3>
          <span className="property-card__type">
            {tipoIcons[tipo]} {tipo}
          </span>
        </div>

        <p className="property-card__location">
          📍 {ubicacion}
        </p>

        <div className="property-card__price">
          <span className="property-card__price-amount">
            S/ {precio.toLocaleString('es-PE')}
          </span>
          <span className="property-card__price-period">/mes</span>
        </div>

        {fechaDisponible && (
          <p className="property-card__availability">
            🗓️ Disponible desde {new Date(fechaDisponible).toLocaleDateString('es-PE')}
          </p>
        )}

        <div className="property-card__features">
          {caracteristicas.slice(0, 3).map((feature, index) => (
            <span key={index} className="property-card__feature">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};