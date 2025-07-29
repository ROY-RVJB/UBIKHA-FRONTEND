import { Navbar, Footer } from '../components/layout';
import { MisAnuncios } from '../components/features/arrendador';

function MisAnunciosPage() {
  return (
    <div className="arrendador-page">
      <Navbar 
        text_1="Inicio" 
        text_2="Anuncios" 
        text_3="Mensajes"
        text_4="Mi Perfil" 
      />
      
      <MisAnuncios />
      
      <Footer
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default MisAnunciosPage;