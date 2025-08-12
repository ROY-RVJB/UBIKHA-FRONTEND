import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/layout";
import { NavbarArrendatario, SearchBar } from '../components/layout';
import { PropertyCard } from '../components/features/arrendatario/PropertyCard/PropertyCard';
import { useInmuebles } from '../hooks/useInmuebles'; // Importar el hook useInmuebles

function HomePageArrendatario() {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const { inmuebles, loading, error } = useInmuebles(); // Usar el hook useInmuebles

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
        {loading && <p>Cargando propiedades...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && inmuebles.length === 0 && <p>No hay propiedades disponibles.</p>}
        {!loading && !error && inmuebles.map((property) => (
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
