import { Header } from './components/Header/Header';
import { PropertyCard } from './components/PropertyCard/PropertyCard';

function App() {
  return (
    <div className="app-container">
      <Header title="UBIKHA"/>
      
      {/* Aquí mostramos algunas propiedades de ejemplo */}
      <div className="properties-container">
       
        
        <PropertyCard 
          title="Casa cómoda en el centro"
          price={800}
          location="Centro de Puerto Maldonado"
          bedrooms={3}
          imageUrl="https://images.pexels.com/photos/6492394/pexels-photo-6492394.jpeg"
        />
        
        <PropertyCard 
          title="Departamento moderno"
          price={600}
          location="Barrio Los Jardines"
          bedrooms={2}
          imageUrl="https://images.pexels.com/photos/7147368/pexels-photo-7147368.jpeg"
        />
        
        <PropertyCard 
          title="Casa amplia con jardín"
          price={1200}
          location="Zona Residencial"
          bedrooms={4}
          imageUrl="https://images.pexels.com/photos/6032409/pexels-photo-6032409.jpeg"
        />
      </div>
    </div>
  );
}

export default App
