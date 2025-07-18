import { Navbar } from "../components/layout";
import { Footer } from "../components/layout";



function  HomePageArrendador(){
     return (
        
       <div>
      <Navbar 
        text_1="Inicio" 
        text_2="Anuncios" 
        text_3="Mensajes"
        text_4="Comviertete en Arrendador" 
        
      />
      <Footer 
          companyName="UBIKHA"
          year={2025}
      />
            
      </div>
    
     );
    
}


  export default  HomePageArrendador;