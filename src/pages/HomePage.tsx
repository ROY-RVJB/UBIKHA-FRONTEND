

import { Header, Footer, MainContent, Features} from '../components/layout';



function HomePage() {
  return (
    <div className="app-container">
      <Header 
        title="UBIKHA"
        text_1="Pon tu espacio en UBIKHA"
        text_2="Ver anuncios"
      />
      <MainContent
        headline="Encuentra lugares para quedarte en Ubikha"
        description="Ya sea que estés buscando un cuarto,apartamento en un complejo o un castillo, en Ubikha vas a encontrar tu lugar ideal."
      /> 
       <Features 
        feature1Title="Aprovecha la flexibilidad"
        feature1Description="Gracias a los alojamientos con cancelación flexible, será más fácil que reconsideres tu reservación si cambias de planes."
        
  
        feature2Title="Con las comodidades que buscas."
        feature2Description="Jacuzzis, piscinas, parrillas. Descubre docenas de servicios adicionales que se adaptan a tus necesidades."
        
  
        feature3Title="Lee las reseñas reales"
        feature3Description="Descubre alojamientos en los que otras personas tuvieron experiencias fantásticas. ¡Te encantarán!"
      
      />
      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default HomePage;
