import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import NumericCounter from '../crear/componenteCrear/NumericCounter';
import './PropertyCapacityForm.css';

interface SpaceData {
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

function PropertyCapacityForm() {
  const navigate = useNavigate();
  const [spaceData, setSpaceData] = useState<SpaceData>({
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1
  });

  const updateCount = (field: keyof SpaceData, value: number) => {
    setSpaceData(prev => ({
      ...prev,
      [field]: Math.max(1, value)
    }));
  };

  const handleNext = () => {
    console.log("Datos del espacio:", spaceData);
    navigate('/step2');
  };

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="space-title">
        <div className="space-container">
          <div className="space-header">
            <h2 id="space-title" className="space-main-title">
              Agrega algunos datos básicos sobre tu espacio
            </h2>
            <p className="space-description">
              Después podrás agregar más información, como los tipos de cama.
            </p>
          </div>
          
          <div className="counters-grid">
            <NumericCounter
              label="Huéspedes"
              value={spaceData.guests}
              onChange={(value) => updateCount('guests', value)}
              min={1}
              max={16}
            />
            
            <NumericCounter
              label="Habitaciones"
              value={spaceData.bedrooms}
              onChange={(value) => updateCount('bedrooms', value)}
              min={1}
              max={10}
            />
            
            <NumericCounter
              label="Camas"
              value={spaceData.beds}
              onChange={(value) => updateCount('beds', value)}
              min={1}
              max={16}
            />
            
            <NumericCounter
              label="Baños"
              value={spaceData.bathrooms}
              onChange={(value) => updateCount('bathrooms', value)}
              min={1}
              max={10}
            />
          </div>
        </div>
      </main>

      <div className="progress-wrapper">
        <WizardProgressIndicator />
      </div>

      <footer className="footer">
        <div className="footer-buttons">
          <button 
            className="btn-back" 
            onClick={() => navigate('/step1/accommodation')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={handleNext}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyCapacityForm;