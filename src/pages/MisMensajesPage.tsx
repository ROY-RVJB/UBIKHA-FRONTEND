import { Navbar, Footer } from '../components/layout';

function MisMensajesPage() {
  return (
    <div className="arrendador-page">
      <Navbar 
        text_1="Inicio" 
        text_2="Anuncios" 
        text_3="Mensajes"
        text_4="Mi Perfil" 
      />
  
      <Footer
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default MisMensajesPage;