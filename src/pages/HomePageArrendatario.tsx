import { Footer } from "../components/layout";
import { NavbarArrendatario, SearchBar } from '../components/layout';
import { PropertyCard } from '../components/features/PropertyCard/PropertyCard';

function HomePageArrendatario() {
  return (
    <div>
      <NavbarArrendatario
        becomeHostText="Conviértete en Arrendador"
        userProfileText="Mi perfil"
      />
      
      <SearchBar 
        locationPlaceholder="Ubicación"
        durationPlaceholder="¿Cuánto tiempo?"
      />
      
      {/* Grid de PropertyCards con imágenes temporales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px', 
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <PropertyCard 
          title="Casa familiar con jardín"
          price={800}
          location="Puerto Maldonado Centro"
          bedrooms={2}
          imageUrl="https://picsum.photos/400/250?random=1"
        />
        
        <PropertyCard 
          title="Apartamento cerca a UNAMAD"
          price={600}
          location="Zona Universitaria"
          bedrooms={1}
          imageUrl="https://picsum.photos/400/250?random=2"
        />
        
        <PropertyCard 
          title="Duplex con vista al río"
          price={1500}
          location="Malecón Tahuamanu"
          bedrooms={4}
          imageUrl="https://picsum.photos/400/250?random=3"
        />
        
        <PropertyCard 
          title="Estudio moderno"
          price={450}
          location="Centro de Puerto Maldonado"
          bedrooms={1}
          imageUrl="https://picsum.photos/400/250?random=4"
        />
        
        <PropertyCard 
          title="Casa de dos pisos"
          price={1200}
          location="Barrio Los Cedros"
          bedrooms={3}
          imageUrl="https://picsum.photos/400/250?random=5"
        />
        
        <PropertyCard 
          title="Departamento amoblado"
          price={900}
          location="Av. León Velarde"
          bedrooms={2}
          imageUrl="https://picsum.photos/400/250?random=6"
        />
      </div>
      
      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default HomePageArrendatario;