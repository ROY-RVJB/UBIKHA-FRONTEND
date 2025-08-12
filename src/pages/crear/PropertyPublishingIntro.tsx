import { useNavigate } from 'react-router-dom';
import { FaDoorClosed } from "react-icons/fa";
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyPublishingIntro.css';

function PropertyPublishingIntro() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main className="main-content" aria-labelledby="step-title">
        <section className="content-left">
          <div className="step-header">
            <div className="step-number-large">Paso 3</div>
            <h2 id="step-title" className="step-main-title">
              Terminar y publicar
            </h2>
            <p className="step-description-large">
              Por último, vas a elegir la configuración de las reservaciones, 
              establecer el precio y publicar tu anuncio.
            </p>
          </div>
        </section>

        <section className="content-right" aria-label="Ilustración del paso">
          <div className="step-illustration-large">
            <FaDoorClosed />
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
            onClick={() => navigate('/step2/description')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={() => navigate('/step3/price')}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyPublishingIntro;