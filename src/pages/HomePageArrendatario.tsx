import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/layout";
import { NavbarArrendatario, SearchBar } from '../components/layout';
import { PropertyCard } from '../components/features/arrendatario/PropertyCard/PropertyCard';

function HomePageArrendatario() {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const handleViewDetails = (id: string) => {
    navigate(`/propiedad/${id}`);
  };

  const handleSaveProperty = (id: string) => {
    setSavedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id)
        : [...prev, id]
    );
  };

  const properties = [
    {
      id: '1',
      titulo: 'Casa familiar con jardín',
      tipo: 'casa' as const,
      precio: 800,
      imageUrl: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg ',
      ubicacion: 'Puerto Maldonado Centro',
      caracteristicas: ['2 habitaciones', '1 baño', 'Jardín', 'Cocina equipada'],
      calificacion: 4.5,
      fechaDisponible: '2025-08-01'
    },
    {
      id: '2',
      titulo: 'Apartamento cerca a UNAMAD',
      tipo: 'departamento' as const,
      precio: 600,
      imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg ',
      ubicacion: 'Zona Universitaria',
      caracteristicas: ['1 habitación', '1 baño', 'Amueblado', 'Area de estudio'],
      calificacion: 4.2,
      fechaDisponible: '2025-07-15'
    },
    {
      id: '3',
      titulo: 'Habitación privada',
      tipo: 'cuarto' as const,
      precio: 300,
      imageUrl: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg ',
      ubicacion: 'Centro de Puerto Maldonado',
      caracteristicas: ['Habitación individual', 'Baño compartido', 'Incluye servicios'],
      calificacion: 4.0
    },
    {
      id: '4',
      titulo: 'Habitación privada',
      tipo: 'cuarto' as const,
      precio: 300,
      imageUrl: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg ',
      ubicacion: 'Centro de Puerto Maldonado',
      caracteristicas: ['Habitación individual', 'Baño compartido', 'Incluye servicios'],
      calificacion: 4.0
    },
    {
      id: '5',
      titulo: 'Habitación privada',
      tipo: 'cuarto' as const,
      precio: 300,
      imageUrl: 'https://picsum.photos/400/250?random=3',
      ubicacion: 'Centro de Puerto Maldonado',
      caracteristicas: ['Habitación individual', 'Baño compartido', 'Incluye servicios'],
      calificacion: 4.0
    },
    {
      id: '6',
      titulo: 'Habitación privada',
      tipo: 'cuarto' as const,
      precio: 300,
      imageUrl: 'https://picsum.photos/400/250?random=3',
      ubicacion: 'Centro de Puerto Maldonado',
      caracteristicas: ['Habitación individual', 'Baño compartido', 'Incluye servicios'],
      calificacion: 4.0
    }
  ];

  return (
    <div>
      <NavbarArrendatario
        becomeHostText="Conviértete en Arrendador"
        userProfileText=""
      />
      
      <SearchBar 
        locationPlaceholder="Ubicación"
        durationPlaceholder="¿Cuánto tiempo?"
      />
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {properties.map((property) => (
          <PropertyCard 
            key={property.id}
            property={property}
            onViewDetails={handleViewDetails}
            onSave={handleSaveProperty}
            isSaved={savedProperties.includes(property.id)}
          />
        ))}
      </div>
      
      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default HomePageArrendatario;