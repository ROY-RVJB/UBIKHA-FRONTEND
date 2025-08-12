import React from 'react';
import { LuHouse, LuBuilding, LuBed, LuMapPin, LuStar, LuHeart, LuHeartOff, LuCalendar } from 'react-icons/lu';
import './PropertyCard.css';
import type { Property } from '../../../../types/property'; // Importa la interfaz Property global

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

  // Mapeo de iconos de tipo de propiedad
  const tipoIcons = {
    'casa': <LuHouse size={16} />,
    'departamento': <LuBuilding size={16} />,
    'cuarto': <LuBed size={16} />,
    'oficina': <LuBuilding size={16} /> // Puedes usar LuBuilding para oficinas
  };

  const handleCardClick = (e: React.MouseEvent) => {
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
        <div className="property-card__type-floating">
            {tipoIcons[tipo]} {tipo}
        </div>
        {onSave && (
          <button 
            className={`property-card__save ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSave(id);
            }}
            aria-label={isSaved ? 'Quitar de guardados' : 'Guardar propiedad'}
          >
            {isSaved ? <LuHeart size={20} color="red" /> : <LuHeartOff size={20} />}
          </button>
        )}
        {calificacion && (
          <div className="property-card__rating">
            <LuStar size={16} color="gold" /> {calificacion.toFixed(1)}
          </div>
        )}
      </div>

      <div className="property-card__content">
        <div className="property-card__header">
          <h3 className="property-card__title">{titulo}</h3>
        </div>

        <p className="property-card__location">
          <LuMapPin size={16} /> {ubicacion}
        </p>

        <div className="property-card__price">
          <span className="property-card__price-amount">
            S/ {precio.toLocaleString('es-PE')}
          </span>
          <span className="property-card__price-period">/mes</span>
        </div>

        {fechaDisponible && (
          <p className="property-card__availability">
            <LuCalendar size={16} /> Disponible desde {new Date(fechaDisponible).toLocaleDateString('es-PE')}
          </p>
        )}

        <div className="property-card__features">
          {caracteristicas.slice(0, 3).map((feature, index) => (
            <span key={index} className="property-card__feature">
              {feature.nombre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
