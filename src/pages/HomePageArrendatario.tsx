
import { Footer } from "../components/layout";

import { NavbarArrendatario } from '../components/layout'



function  HomePageArrendatario(){
     return (
        
       <div>
      
      <NavbarArrendatario
        becomeHostText="Conviértete en Arrendador"
        userProfileText="Mi perfil"
      />

      

      <Footer 
              companyName="UBIKHA"
              year={2025}
        />
      </div>
    
     );
};

  export default  HomePageArrendatario;