import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardProgressIndicator from '../crear/componenteCrear/WizardProgressIndicator';
import './PropertyDescriptionEditor.css';

function PropertyDescriptionEditor() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleNext = () => {
    if (description.trim()) {
      console.log("Descripción ingresada:", description.trim());
      navigate('/step3');
    }
  };

  return (
    <div className="app">
      <main className="main-content-centered" aria-labelledby="description-heading">
        <div className="description-container">
          <div className="description-header">
            <h2 id="description-heading" className="description-main-heading">
              Escribe tu descripción
            </h2>
            <p className="description-subtitle">
              Comparte lo que hace que tu espacio sea especial.
            </p>
          </div>
          
          <div className="description-input-area">
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe las características únicas de tu espacio, la ubicación, las comodidades disponibles y lo que los huéspedes pueden disfrutar durante su estadía..."
              className="description-textarea"
              maxLength={500}
              rows={6}
              aria-label="Descripción de tu propiedad"
              autoFocus
            />
            <div className="character-count">
              {description.length}/500
            </div>
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
            onClick={() => navigate('/step2/title')}
            aria-label="Volver al paso anterior"
          >
            Atrás
          </button>
          <button 
            className="btn-next" 
            onClick={handleNext}
            disabled={!description.trim()}
            aria-label="Continuar al siguiente paso"
          >
            Siguiente
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PropertyDescriptionEditor;