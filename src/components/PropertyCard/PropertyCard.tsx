// src/components/PropertyCard/PropertyCard.tsx
import './PropertyCard.css';  // Importamos SU propio CSS

// Definimos qué información necesita nuestro componente
interface PropertyCardProps {
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  imageUrl: string;
}

export const PropertyCard = ({ title, price, location, bedrooms, imageUrl }: PropertyCardProps) => {
  return (
    <div className="property-card">
      {/* Imagen de la propiedad */}
      <img src={imageUrl} alt={title} className="property-image" />
      
      {/* Información de la propiedad */}
      <div className="property-info">
        <h3 className="property-title">{title}</h3>
        <p className="property-location">📍 {location}</p>
        <p className="property-bedrooms">🛏️ {bedrooms} habitaciones</p>
        <p className="property-price">💰 S/ {price} / mes</p>
      </div>
    </div>
  );
};