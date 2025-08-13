import { useNavigate } from 'react-router-dom';
import { FaCameraRetro } from "react-icons/fa";
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyPresentationIntro.css';

function PropertyPresentationIntro() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main className="main-content" aria-labelledby="step-title">
        <section className="content-left">
          <div className="step-header">
            <div className="step-number-large">Paso 2</div>
            <h2 id="step-title" className="step-main-title">
              Haz que tu espacio se destaque
            </h2>
            <p className="step-description-large">
              En este paso deberás agregar algunas de las comodidades que ofrece tu espacio 
              y al menos cinco fotos. Luego, deberás crear un título y una descripción.
            </p>
          </div>
        </section>

        <section className="content-right" aria-label="Ilustración del paso">
          <div className="step-illustration-large">
            <FaCameraRetro />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="progress-wrapper">
          <WizardProgressIndicator />
        </div>
        <div className="footer-buttons">
          <button 
            className="btn-back" 
            onClick={() => navigate('/step1/capacity')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={() => navigate('/step2/amenities')}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyPresentationIntro;