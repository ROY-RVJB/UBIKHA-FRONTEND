import { Header } from './components/home/Header/Header';
import{Body} from './components/home/body/body'

function App() {
  return (
    <div className="app-container">
      <Header title="UBIKHA"
      text_1="Pon tu espacio en UBIKHA"
      text_2="Registrate"
      />

      <Body
      headline="Encuentra lugares para quedarte en Ubikha"
      description="Ya sea que estés buscando un cuarto,apartamento en un complejo o un castillo, en Ubikha vas a encontrar tu lugar ideal."
      />  
      
    </div>
  );
}

export default App
