import { Navbar } from "../components/layout";
import { Footer } from "../components/layout";
import { ArrendadorInicio } from "../components/features/arrendador";

function HomePageArrendador() {
  return (
    <div className="arrendador-page">
      <Navbar 
        text_1="Inicio" 
        text_2="Anuncios" 
        text_3="Mensajes"
        text_4="Conviértete en Arrendatario" 
      />
      
      <ArrendadorInicio userName="Luis" />
      
      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default HomePageArrendador;