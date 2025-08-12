import { useNavigate } from 'react-router-dom';
import { IoBedOutline } from "react-icons/io5";
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertySetupIntro.css';

function PropertySetupIntro() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <main className="main-content" aria-labelledby="step-title">
        <section className="content-left">
          <div className="step-header">
            <div className="step-number-large">Paso 1</div>
            <h2 id="step-title" className="step-main-title">
              Describe tu espacio
            </h2>
            <p className="step-description-large">
              En este paso, te preguntaremos qué tipo de propiedad tienes y si los huéspedes 
              reservarán el alojamiento entero o solo una habitación. A continuación, 
              indícanos la ubicación y cuántos huéspedes pueden quedarse.
            </p>
          </div>
        </section>

        <section className="content-right" aria-label="Ilustración del paso">
          <div className="step-illustration-large">
            <IoBedOutline />
          </div>
        </section>
      </main>

      <div className="progress-wrapper">
        <WizardProgressIndicator />
      </div>

      <footer className="footer">
        <div className="footer-buttons">
          <button 
            className="btn-back" 
            onClick={() => navigate('/')}
            aria-label="Volver al panel anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={() => navigate('/step1/accommodation')}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertySetupIntro;