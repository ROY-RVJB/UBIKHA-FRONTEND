// src/arrendatario/PropertyFeatures/PropertyFeatures.tsx
import React from 'react';
import { LuDoorClosed, LuBath, LuTreePine, LuUtensils, LuSofa, LuArmchair, LuDroplet, LuWifi } from 'react-icons/lu';
import './PropertyFeatures.css'; // Importa el CSS específico para PropertyFeatures

interface PropertyFeaturesProps {
  caracteristicas: {
    nombre: string;
    icono: string;
  }[];
}

// Mapeo de los nombres de los iconos a los componentes de React-Icons/lu
const iconMap: { [key: string]: React.ElementType } = {
  "habitaciones": LuDoorClosed,
  "baños": LuBath,
  "piscina": LuTreePine,
  "jardin": LuTreePine,
  "estacionamiento": LuArmchair,
  "balcón": LuUtensils,
  "vista a la ciudad": LuWifi,
  "servicios incluidos": LuDroplet,
  "cerca a universidades": LuSofa,
};

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ caracteristicas }) => {
  return (
    <div className="property-features-section">
      <h2>Lo que este lugar ofrece</h2>
      {caracteristicas && caracteristicas.length > 0 ? (
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
      ) : (
        <p>Sin características</p>
      )}
    </div>
  );
};

export default PropertyFeatures;
