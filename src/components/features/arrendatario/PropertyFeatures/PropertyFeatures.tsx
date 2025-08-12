// src/arrendatario/PropertyFeatures/PropertyFeatures.tsx
import React from 'react';
import { FaDoorClosed, FaShower, FaTree, FaUtensils, FaCouch, FaChair, FaFaucet, FaWifi } from 'react-icons/fa'; // Importa los iconos de Font Awesome
import './PropertyFeatures.css'; // Importa el CSS específico para PropertyFeatures

interface PropertyFeaturesProps {
  caracteristicas: {
    nombre: string;
    icono: string;
  }[];
}

// Mapeo de los nombres de los iconos a los componentes de React-Icons/fa
const iconMap: { [key: string]: React.ElementType } = {
  "door-closed": FaDoorClosed,
  "bath": FaShower, // Usamos FaShower como un buen sustituto para "bath"
  "tree": FaTree, 
  "utensils": FaUtensils,
  "couch": FaCouch,
  "chair": FaChair,
  "faucet-drip": FaFaucet, // Usamos FaFaucet para grifo
  "wifi": FaWifi,
};

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ caracteristicas }) => {
  return (
    <div className="property-features-section">
      <h2>Lo que este lugar ofrece</h2>
      <div className="detalle-propiedad__features">
        {caracteristicas.map((feature, index) => {
          const IconComponent = iconMap[feature.icono];
          return (
            <div key={index} className="detalle-propiedad__feature">
              {IconComponent && <IconComponent size={20} />}
              <span>{feature.nombre}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyFeatures;