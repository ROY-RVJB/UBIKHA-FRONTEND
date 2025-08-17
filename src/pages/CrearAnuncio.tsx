import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IoBedOutline } from "react-icons/io5";
import { FaDoorClosed, FaCameraRetro } from "react-icons/fa";
import './CrearAnuncio.css';

 

function CrearAnuncio() {
  const { tipo } = useParams<{ tipo: string }>();
  
  useEffect(() => {
    // Guardar el tipo de propiedad en localStorage cuando se accede con el parámetro
    if (tipo) {
      localStorage.setItem('propertyType', tipo);
    }
  }, [tipo]);
  
  return (
    <Routes>
      <Route path="/" element={<HomeCrear/>} />
    </Routes>
  );
}


function HomeCrear() {
  return (
    <div className="app">
      {/* Main Content */}
      <main className="main-content" aria-labelledby="panel-title">
        <section className="content-left">
          <h2 id="panel-title" className="main-title">
            Empezar a registrar inmuebles es muy sencillo
          </h2>
        </section>

        <section className="content-right" aria-label="Pasos del registro">
          <ol className="steps">
            <li className="step">
              <div className="step-number" aria-hidden="true">1</div>
              <div className="step-content">
                <h3 className="step-title">Describe tu inmueble</h3>
                <p className="step-description">
                  Comparte algunos datos básicos, como la ubicación y cuántos
                  huéspedes pueden quedarse en el lugar.
                </p>
              </div>
              <div className="step-illustration" aria-hidden="true">
                <IoBedOutline />
              </div>
            </li>

            <li className="step">
              <div className="step-number" aria-hidden="true">2</div>
              <div className="step-content">
                <h3 className="step-title">Haz que destaque</h3>
                <p className="step-description">
                  Agrega al menos cinco fotos, un título y una descripción.
                  Nosotros te ayudaremos.
                </p>
              </div>
              <div className="step-illustration" aria-hidden="true">
                <FaCameraRetro />
              </div>
            </li>

            <li className="step">
              <div className="step-number" aria-hidden="true">3</div>
              <div className="step-content">
                <h3 className="step-title">Terminar y publicar</h3>
                <p className="step-description">
                  Elige un precio inicial, verifica algunos detalles y publica tu
                  anuncio.
                </p>
              </div>
              <div className="step-illustration" aria-hidden="true">
                <FaDoorClosed />
              </div>
            </li>
          </ol>
        </section>
      </main>

      {/* Footer Button */}
      <footer className="footer">
        <HomeButton />
      </footer>
    </div>
  );
}

function HomeButton() {
  const navigate = useNavigate();
  
  return (
    <button
      className="btn-comenzar"
      onClick={() => navigate('/step1')}
      aria-label="Comenzar registro de inmueble"
    >
      Comencemos
    </button>
  );
}

export default CrearAnuncio;
