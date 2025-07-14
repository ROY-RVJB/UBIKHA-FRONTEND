

import { Header, Footer, MainContent } from '../components/layout';


function HomePage() {
  return (
    <div className="app-container">
      <Header 
        title="UBIKHA"
        text_1="Pon tu espacio en UBIKHA"
        text_2="Registrate"
      />
      <MainContent
        headline="Encuentra lugares para quedarte en Ubikha"
        description="Ya sea que estés buscando un cuarto,apartamento en un complejo o un castillo, en Ubikha vas a encontrar tu lugar ideal."
      />  
      <Footer 
        companyName="UBIKHA"
        year={2025}
      />
    </div>
  );
}

export default HomePage;
